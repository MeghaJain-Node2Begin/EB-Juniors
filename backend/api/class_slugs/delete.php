<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';

require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

if (!empty($data->slug_id)) {
    try {
        $pdo->beginTransaction();

        // Fetch the template rule first
        $templateStmt = $pdo->prepare("SELECT template_rule FROM class_slug WHERE slug_id = :slug_id");
        $templateStmt->bindValue(':slug_id', $data->slug_id);
        $templateStmt->execute();
        $templateRow = $templateStmt->fetch(PDO::FETCH_ASSOC);

        if ($templateRow) {
            $template = $templateRow['template_rule'];
            
            // Fetch all classes
            $courseStmt = $pdo->query("SELECT class_id, class_name, slug_title FROM classes");
            $courses = $courseStmt->fetchAll(PDO::FETCH_ASSOC);
            
            $updateCourseStmt = $pdo->prepare("UPDATE classes SET slug_title = '' WHERE class_id = :class_id");
            
            foreach ($courses as $course) {
                if (!empty($course['slug_title'])) {
                    $slugifiedName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $course['class_name']), '-'));
                    $expectedSlug = str_replace('keyword', $slugifiedName, $template);
                    
                    // If the current slug matches what this template would produce, clear it
                    if ($course['slug_title'] === $expectedSlug) {
                        $updateCourseStmt->bindValue(':class_id', $course['class_id']);
                        $updateCourseStmt->execute();
                    }
                }
            }
        }

        $query = "DELETE FROM class_slug WHERE slug_id = :slug_id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':slug_id', $data->slug_id);

        if ($stmt->execute()) {
            $pdo->commit();
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Template was deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to delete template."]);
        }
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Database error.", "error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. slug_id is required."]);
}
?>
