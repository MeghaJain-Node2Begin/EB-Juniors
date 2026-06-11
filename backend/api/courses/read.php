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

    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get primary slug template
    $primarySlugStmt = $pdo->query("SELECT template_rule FROM course_slug WHERE is_primary = 1 LIMIT 1");
    $primaryTemplate = $primarySlugStmt->fetchColumn();

    if ($primaryTemplate) {
        foreach ($courses as &$course) {
            if (empty($course['slug_title'])) {
                $baseSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $course['course_name'] ?? '')));
                $course['slug_title'] = str_replace('keyword', $baseSlug, $primaryTemplate);
            }
        }
    } else {
        foreach ($courses as &$course) {
            if (empty($course['slug_title'])) {
                $course['slug_title'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $course['course_name'] ?? '')));
            }
        }
    }

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
