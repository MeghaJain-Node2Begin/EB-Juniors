<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

try {
    $query = "SELECT * FROM events ORDER BY event_date DESC, event_time DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $events = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $events
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
