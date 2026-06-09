<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

// Accept either ID or slug
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    try {
        $stmt = $pdo->prepare("SELECT c.*, cl.class_name 
                  FROM courses c 
                  LEFT JOIN classes cl ON c.class_id = cl.class_id 
                  WHERE c.course_id = :id OR c.slug_title = :slug_title LIMIT 1");
                  
        $stmt->bindValue(':id', is_numeric($id) ? (int)$id : null, PDO::PARAM_INT);
        $stmt->bindValue(':slug_title', $id);
        $stmt->execute();

        $course = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$course) {
            // Fallback: Check if the slug matches any secondary template rule
            $templateStmt = $pdo->query("SELECT template_rule FROM course_slug");
            $templates = $templateStmt->fetchAll(PDO::FETCH_ASSOC);

            if ($templates) {
                $allCoursesStmt = $pdo->query("SELECT course_id, course_name FROM courses");
                $allCourses = $allCoursesStmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($allCourses as $c) {
                    $slugifiedName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $c['course_name']), '-'));
                    foreach ($templates as $t) {
                        $expectedSlug = str_replace('keyword', $slugifiedName, $t['template_rule']);
                        if ($expectedSlug === $id) {
                            $fetchStmt = $pdo->prepare("SELECT c.*, cl.class_name FROM courses c LEFT JOIN classes cl ON c.class_id = cl.class_id WHERE c.course_id = :cid");
                            $fetchStmt->bindValue(':cid', $c['course_id']);
                            $fetchStmt->execute();
                            $course = $fetchStmt->fetch(PDO::FETCH_ASSOC);
                            break 2;
                        }
                    }
                }
            }
        }

        if ($course) {
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "data" => $course
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Course not found."
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Course ID or slug is required."
    ]);
}
