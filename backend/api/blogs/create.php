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

if (!empty($data->title)) {
    try {
        $query = "INSERT INTO blogs 
            (category_id, title, slug, short_description, content, author_name, meta_title, meta_description, is_featured, status, thumbnail_image) 
            VALUES 
            (:category_id, :title, :slug, :short_description, :content, :author_name, :meta_title, :meta_description, :is_featured, :status, :thumbnail_image)";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindValue(':category_id', $data->category_id ? (int)$data->category_id : null);
        $stmt->bindValue(':title', $data->title);
        $stmt->bindValue(':slug', $data->slug ?? '');
        $stmt->bindValue(':short_description', $data->short_description ?? '');
        // allow html for content, maybe not strip tags if it's a rich editor, but let's be safe for basic setup
        $stmt->bindValue(':content', $data->content ?? ''); 
        $stmt->bindValue(':author_name', $data->author_name ?? '');
        $stmt->bindValue(':meta_title', $data->meta_title ?? '');
        $stmt->bindValue(':meta_description', $data->meta_description ?? '');
        $stmt->bindValue(':is_featured', (int)($data->is_featured ?? 0));
        $stmt->bindValue(':status', $data->status ?? 'draft');
        $stmt->bindValue(':thumbnail_image', $data->thumbnail_image ?? '');

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Blog created successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to create blog."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to create blog. Data is incomplete."]);
}
