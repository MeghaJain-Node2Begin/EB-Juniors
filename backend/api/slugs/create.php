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

if (!empty($data->template_rule)) {
    try {
        $template = trim($data->template_rule);

        $query = "INSERT INTO course_slug (template_rule) VALUES (:template_rule)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':template_rule', $template);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Template was created."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to create template."]);
        }
    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Database error.", "error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. template_rule is required."]);
}
?>
