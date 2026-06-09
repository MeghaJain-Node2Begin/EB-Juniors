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

if (!empty($data->slug_id) && !empty($data->template_rule)) {
    try {
        $query = "UPDATE class_slug SET template_rule = :template_rule WHERE slug_id = :slug_id";
        $stmt = $pdo->prepare($query);
        
        $stmt->bindValue(':template_rule', trim($data->template_rule));
        $stmt->bindValue(':slug_id', $data->slug_id);

        if ($stmt->execute()) {
            // Check if this slug is primary, if so, apply globally
            $checkPrimaryStmt = $pdo->prepare("SELECT is_primary FROM class_slug WHERE slug_id = :slug_id");
            $checkPrimaryStmt->bindValue(':slug_id', $data->slug_id);
            $checkPrimaryStmt->execute();
            if ($checkPrimaryStmt->fetchColumn()) {
                $template = trim($data->template_rule);
                $classStmt = $pdo->query("SELECT class_id, class_name FROM classes");
                $classes = $classStmt->fetchAll(PDO::FETCH_ASSOC);
                
                $updateClassStmt = $pdo->prepare("UPDATE classes SET slug_title = :slug_title WHERE class_id = :class_id");
                
                foreach ($classes as $c) {
                    $slugifiedName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $c['class_name']), '-'));
                    $newSlugTitle = str_replace('keyword', $slugifiedName, $template);
                    
                    $updateClassStmt->bindValue(':slug_title', $newSlugTitle);
                    $updateClassStmt->bindValue(':class_id', $c['class_id']);
                    $updateClassStmt->execute();
                }
            }

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Template was updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to update template."]);
        }
    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Database error.", "error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. slug_id and template_rule are required."]);
}
?>
