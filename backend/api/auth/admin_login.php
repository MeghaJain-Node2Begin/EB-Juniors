<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

    if (!isset($data->username) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing credentials."]);
        exit();
    }

    $query = "SELECT * FROM admins WHERE email = :username LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':username', $data->username);
    $stmt->execute();

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($data->password, $admin['password'])) {
        unset($admin['password']);
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "data" => $admin
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid username or password."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
