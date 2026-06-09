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

    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing email or password."]);
        exit();
    }

    $query = "SELECT student_id, full_name, email, phone, password, profile_image FROM students WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            // Remove password from response
            unset($row['password']);
            
            http_response_code(200);
            echo json_encode([
                "success" => true, 
                "message" => "Login successful.",
                "user" => $row
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid email or password."]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid email or password."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
