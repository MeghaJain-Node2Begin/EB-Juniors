<?php
// backend/api/courses/create.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';

require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

if (!empty($data->course_name) && !empty($data->class_id)) {
    try {
        $query = "INSERT INTO courses 
            (class_id, course_name, slug_title, short_description, full_description, duration, fees, level, is_featured, status, thumbnail_image) 
            VALUES 
            (:class_id, :course_name, :slug_title, :short_description, :full_description, :duration, :fees, :level, :is_featured, :status, :thumbnail_image)";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindValue(':class_id', $data->class_id);
        $stmt->bindValue(':course_name', $data->course_name ?? '');
        $stmt->bindValue(':slug_title', $data->slug_title ?? '');
        $stmt->bindValue(':short_description', $data->short_description ?? '');
        $stmt->bindValue(':full_description', $data->full_description ?? '');
        $stmt->bindValue(':duration', $data->duration ?? '');
        $stmt->bindValue(':fees', (float)($data->fees ?? 0.00));
        $stmt->bindValue(':level', $data->level ?? 'Beginner');
        $stmt->bindValue(':is_featured', (int)($data->is_featured ?? 0));
        $stmt->bindValue(':status', $data->status ?? 'active');
        $stmt->bindValue(':thumbnail_image', $data->thumbnail_image ?? '');

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Course created successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to create course."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to create course. Data is incomplete."]);
}
