<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../../config/database.php';

require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

if (!isset($data->groq_api_key)) {
    echo json_encode(["success" => false, "message" => "API key is required."]);
    exit();
}

try {
    $query = "UPDATE settings SET groq_api_key = :groq_api_key";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':groq_api_key', $data->groq_api_key);
    
    if($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "AI Config updated successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Unable to update config."
        ]);
    }
} catch(PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
