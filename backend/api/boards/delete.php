<?php
// backend/api/boards/delete.php

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database config
require_once '../../config/database.php';

// Get JSON POST data
require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

// Validate incoming data
if (!empty($data->board_id)) {
    try {
        // Prepare SQL query
        $query = "DELETE FROM boards WHERE board_id = :board_id";
        $stmt = $pdo->prepare($query);

        // Sanitize and bind data
        $stmt->bindParam(':board_id', $data->board_id);

        // Execute query
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Board deleted successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to delete board."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    // Incomplete data
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to delete board. ID is missing."]);
}
