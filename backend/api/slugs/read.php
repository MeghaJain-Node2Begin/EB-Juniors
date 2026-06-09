<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../config/database.php';

try {
    $query = "SELECT * FROM course_slug ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $num = $stmt->rowCount();
    
    if($num > 0) {
        $slugs_arr = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $slug_item = array(
                "slug_id" => $slug_id,
                "template_rule" => html_entity_decode($template_rule),
                "is_primary" => (bool)$is_primary,
                "created_at" => $created_at
            );
            array_push($slugs_arr, $slug_item);
        }
        
        http_response_code(200);
        echo json_encode(["success" => true, "data" => $slugs_arr]);
    } else {
        http_response_code(200);
        echo json_encode(["success" => true, "data" => []]);
    }
} catch (PDOException $e) {
    http_response_code(503);
    echo json_encode(["success" => false, "message" => "Database error.", "error" => $e->getMessage()]);
}
?>
