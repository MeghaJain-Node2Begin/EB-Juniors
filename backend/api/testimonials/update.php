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

if (!empty($data->testimonial_id) && !empty($data->student_name) && !empty($data->review)) {
    try {
        $query = "UPDATE testimonials SET 
            student_name = :student_name, 
            parent_name = :parent_name, 
            review = :review, 
            rating = :rating, 
            image = :image,
            approved = :approved 
            WHERE testimonial_id = :testimonial_id";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindValue(':testimonial_id', $data->testimonial_id);
        $stmt->bindValue(':student_name', $data->student_name);
        $stmt->bindValue(':parent_name', $data->parent_name ?? '');
        $stmt->bindValue(':review', $data->review);
        $stmt->bindValue(':rating', isset($data->rating) ? (int)$data->rating : 5);
        $stmt->bindValue(':image', $data->image ?? '');
        $stmt->bindValue(':approved', (int)($data->approved ?? 0));

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Testimonial updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to update testimonial."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to update testimonial. Data is incomplete."]);
}
