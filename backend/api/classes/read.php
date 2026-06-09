<?php
// backend/api/classes/read.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

try {
    // Join with boards to get board_name
    $query = "SELECT c.*, b.board_name 
              FROM classes c 
              LEFT JOIN boards b ON c.board_id = b.board_id 
              ORDER BY c.display_order ASC, c.class_id DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $classes = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $classes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
