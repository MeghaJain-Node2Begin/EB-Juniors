<?php
// backend/api/courses/update.php

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

if (!empty($data->course_id) && !empty($data->course_name) && !empty($data->class_id)) {
    try {
        $query = "UPDATE courses SET 
            class_id = :class_id, 
            course_name = :course_name, 
            slug_title = :slug_title, 
            short_description = :short_description, 
            full_description = :full_description, 
            duration = :duration, 
            fees = :fees, 
            level = :level, 
            is_featured = :is_featured, 
            status = :status,
            thumbnail_image = :thumbnail_image,
            seo_title = :seo_title,
            seo_description = :seo_description,
            seo_keywords = :seo_keywords,
            og_title = :og_title,
            og_description = :og_description,
            twitter_title = :twitter_title,
            twitter_description = :twitter_description,
            primary_keyword = :primary_keyword,
            secondary_keywords = :secondary_keywords,
            canonical_url = :canonical_url,
            schema_json = :schema_json,
            city = :city,
            area = :area,
            local_seo_enabled = :local_seo_enabled
            WHERE course_id = :course_id";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindValue(':course_id', $data->course_id);
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
        $stmt->bindValue(':seo_title', $data->seo_title ?? '');
        $stmt->bindValue(':seo_description', $data->seo_description ?? '');
        $stmt->bindValue(':seo_keywords', $data->seo_keywords ?? '');
        $stmt->bindValue(':og_title', $data->og_title ?? '');
        $stmt->bindValue(':og_description', $data->og_description ?? '');
        $stmt->bindValue(':twitter_title', $data->twitter_title ?? '');
        $stmt->bindValue(':twitter_description', $data->twitter_description ?? '');
        $stmt->bindValue(':primary_keyword', $data->primary_keyword ?? '');
        $stmt->bindValue(':secondary_keywords', $data->secondary_keywords ?? '');
        $stmt->bindValue(':canonical_url', $data->canonical_url ?? '');
        $schema_json = !empty($data->schema_json) ? $data->schema_json : null;
        $stmt->bindValue(':schema_json', $schema_json);
        $stmt->bindValue(':city', $data->city ?? '');
        $stmt->bindValue(':area', $data->area ?? '');
        $stmt->bindValue(':local_seo_enabled', (int)($data->local_seo_enabled ?? 0));

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Course updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to update course."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to update course. Data is incomplete."]);
}
