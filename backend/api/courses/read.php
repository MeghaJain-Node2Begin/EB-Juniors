<?php
// backend/api/courses/read.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

try {
    // Join with classes to get class_name
    $query = "SELECT c.*, cl.class_name 
              FROM courses c 
              LEFT JOIN classes cl ON c.class_id = cl.class_id 
              ORDER BY c.course_id DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $courses = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $courses
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
