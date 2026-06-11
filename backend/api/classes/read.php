<?php
// backend/api/classes/read.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

try {
    // Join with boards to get board_name
    $query = "SELECT c.*, b.board_name 
              FROM classes c 
              LEFT JOIN boards b ON c.board_id = b.board_id 
              ORDER BY c.display_order ASC, c.class_id DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get primary slug template
    $primarySlugStmt = $pdo->query("SELECT template_rule FROM class_slug WHERE is_primary = 1 LIMIT 1");
    $primaryTemplate = $primarySlugStmt->fetchColumn();

    if ($primaryTemplate) {
        foreach ($classes as &$cls) {
            if (empty($cls['slug_title'])) {
                $baseSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $cls['class_name'] ?? '')));
                $cls['slug_title'] = str_replace('keyword', $baseSlug, $primaryTemplate);
            }
        }
    } else {
        foreach ($classes as &$cls) {
            if (empty($cls['slug_title'])) {
                $cls['slug_title'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $cls['class_name'] ?? '')));
            }
        }
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $classes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
