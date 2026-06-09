<?php
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

if (!empty($data->title) && !empty($data->event_date)) {
    try {
        $query = "INSERT INTO events 
            (title, slug, description, event_image, gallery_images, event_date, event_time, location, registration_link, status) 
            VALUES 
            (:title, :slug, :description, :event_image, :gallery_images, :event_date, :event_time, :location, :registration_link, :status)";
        
        $stmt = $pdo->prepare($query);

        $galleryImagesJson = isset($data->gallery_images) && is_array($data->gallery_images) ? json_encode($data->gallery_images) : json_encode([]);

        $stmt->bindValue(':title', $data->title);
        $stmt->bindValue(':slug', $data->slug ?? '');
        $stmt->bindValue(':description', $data->description ?? '');
        $stmt->bindValue(':event_image', $data->event_image ?? '');
        $stmt->bindValue(':gallery_images', $galleryImagesJson);
        $stmt->bindValue(':event_date', $data->event_date);
        $stmt->bindValue(':event_time', $data->event_time ?? '');
        $stmt->bindValue(':location', $data->location ?? '');
        $stmt->bindValue(':registration_link', $data->registration_link ?? '');
        $stmt->bindValue(':status', $data->status ?? 'upcoming');

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Event created successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to create event."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to create event. Data is incomplete."]);
}
