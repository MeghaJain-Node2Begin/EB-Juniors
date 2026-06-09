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

    if (!isset($data->fullName) || !isset($data->email) || !isset($data->phone)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit();
    }

    $persona = isset($data->persona) ? $data->persona : 'Not specified';
    $interest = isset($data->interest) ? $data->interest : 'Not specified';
    $raw_message = isset($data->message) ? $data->message : '';

    $formatted_message = "[Persona: $persona, Interest: $interest]\n$raw_message";

    $query = "INSERT INTO inquiries (full_name, email, phone, message, inquiry_type, status) VALUES (:full_name, :email, :phone, :message, 'contact', 'new')";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':full_name', $data->fullName);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':phone', $data->phone);
    $stmt->bindParam(':message', $formatted_message);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Inquiry submitted successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Unable to submit inquiry."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
