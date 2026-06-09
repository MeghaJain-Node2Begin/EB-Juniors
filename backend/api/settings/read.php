<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';

try {
    $query = "SELECT * FROM settings LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    if($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode([
            "success" => true,
            "data" => $row
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "No settings found"
        ]);
    }
} catch(PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
