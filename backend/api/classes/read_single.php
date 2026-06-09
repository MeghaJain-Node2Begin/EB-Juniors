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
        $query = "SELECT c.*, b.board_name 
                  FROM classes c 
                  LEFT JOIN boards b ON c.board_id = b.board_id 
                  WHERE c.class_id = :id OR c.slug_title = :slug_title LIMIT 1";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', is_numeric($id) ? (int)$id : null, PDO::PARAM_INT);
        $stmt->bindValue(':slug_title', $id);
        $stmt->execute();

        $class = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$class) {
            // Fallback: Check if the slug matches any secondary template rule
            $templateStmt = $pdo->query("SELECT template_rule FROM class_slug");
            $templates = $templateStmt->fetchAll(PDO::FETCH_ASSOC);

            if ($templates) {
                $allClassesStmt = $pdo->query("SELECT class_id, class_name FROM classes");
                $allClasses = $allClassesStmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($allClasses as $c) {
                    $slugifiedName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $c['class_name']), '-'));
                    foreach ($templates as $t) {
                        $expectedSlug = str_replace('keyword', $slugifiedName, $t['template_rule']);
                        if ($expectedSlug === $id) {
                            $fetchStmt = $pdo->prepare("SELECT c.*, b.board_name FROM classes c LEFT JOIN boards b ON c.board_id = b.board_id WHERE c.class_id = :cid");
                            $fetchStmt->bindValue(':cid', $c['class_id']);
                            $fetchStmt->execute();
                            $class = $fetchStmt->fetch(PDO::FETCH_ASSOC);
                            break 2;
                        }
                    }
                }
            }
        }

        if ($class) {
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "data" => $class
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Class not found."
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
        "message" => "Class ID or slug is required."
    ]);
}
