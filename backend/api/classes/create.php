<?php
// backend/api/classes/create.php

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

if (!empty($data->class_name) && !empty($data->board_id)) {
    try {
        $query = "INSERT INTO classes 
            (board_id, class_name, slug_title, syllabus_type, focus_area, class_description, recommended_courses, learning_level, age_group, duration, status, display_order, thumbnail_image) 
            VALUES 
            (:board_id, :class_name, :slug_title, :syllabus_type, :focus_area, :class_description, :recommended_courses, :learning_level, :age_group, :duration, :status, :display_order, :thumbnail_image)";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindValue(':board_id', $data->board_id);
        $stmt->bindValue(':class_name', $data->class_name);
        $stmt->bindValue(':slug_title', $data->slug_title ?? '');
        $stmt->bindValue(':syllabus_type', $data->syllabus_type ?? '');
        $stmt->bindValue(':focus_area', $data->focus_area ?? '');
        $stmt->bindValue(':class_description', $data->class_description ?? '');
        $stmt->bindValue(':recommended_courses', $data->recommended_courses ?? '');
        $stmt->bindValue(':learning_level', $data->learning_level ?? 'Beginner');
        $stmt->bindValue(':age_group', $data->age_group ?? '');
        $stmt->bindValue(':duration', $data->duration ?? '');
        $stmt->bindValue(':status', $data->status ?? 'active');
        $stmt->bindValue(':display_order', (int)($data->display_order ?? 0));
        $stmt->bindValue(':thumbnail_image', $data->thumbnail_image ?? '');

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Class created successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to create class."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to create class. Data is incomplete."]);
}
