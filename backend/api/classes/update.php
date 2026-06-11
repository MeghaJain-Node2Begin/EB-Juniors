<?php
// backend/api/classes/update.php

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

if (!empty($data->class_id) && !empty($data->class_name) && !empty($data->board_id)) {
    try {
        $query = "UPDATE classes SET 
            board_id = :board_id, 
            class_name = :class_name, 
            slug_title = :slug_title, 
            syllabus_type = :syllabus_type, 
            focus_area = :focus_area, 
            class_description = :class_description, 
            recommended_courses = :recommended_courses, 
            learning_level = :learning_level, 
            age_group = :age_group, 
            duration = :duration, 
            status = :status, 
            display_order = :display_order,
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
            WHERE class_id = :class_id";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindValue(':class_id', $data->class_id);
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
            echo json_encode(["success" => true, "message" => "Class updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to update class."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Unable to update class. Data is incomplete."]);
}
