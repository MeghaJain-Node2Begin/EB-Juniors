<?php
// backend/api/boards/create.php

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database config
require_once '../../config/database.php';

// Get posted data
require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

// Validate input
if (
    !empty($data->board_name) &&
    !empty($data->status)
) {
    try {
        // Prepare SQL query
        $query = "INSERT INTO boards (board_name, board_description, status) 
                  VALUES (:board_name, :board_description, :status)";
        
        $stmt = $pdo->prepare($query);

        // Sanitize and bind parameters
        $board_name = $data->board_name;
        $board_description = !empty($data->board_description) ? $data->board_description : null;
        $status = $data->status;

        $stmt->bindParam(":board_name", $board_name);
        $stmt->bindParam(":board_description", $board_description);
        $stmt->bindParam(":status", $status);

        // Execute query
        if ($stmt->execute()) {
            http_response_code(201); // Created
            echo json_encode([
                "success" => true,
                "message" => "Board created successfully."
            ]);
        } else {
            http_response_code(503); // Service unavailable
            echo json_encode([
                "success" => false,
                "message" => "Unable to create board."
            ]);
        }
    } catch (PDOException $e) {
        // Check for duplicate board_name (unique constraint)
        if ($e->errorInfo[1] == 1062) {
            http_response_code(400); // Bad Request
            echo json_encode([
                "success" => false,
                "message" => "A board with this name already exists."
            ]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode([
                "success" => false,
                "message" => "Database error: " . $e->getMessage()
            ]);
        }
    }
} else {
    // Incomplete data
    http_response_code(400); // Bad request
    echo json_encode([
        "success" => false,
        "message" => "Unable to create board. Data is incomplete."
    ]);
}
