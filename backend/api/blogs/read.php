<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

try {
    $query = "SELECT b.*, c.category_name 
              FROM blogs b 
              LEFT JOIN blog_categories c ON b.category_id = c.category_id 
              ORDER BY b.blog_id DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $blogs = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $blogs
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
