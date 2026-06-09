<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

try {
    $query = "SELECT * FROM blog_categories ORDER BY category_name ASC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $categories = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $categories
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
