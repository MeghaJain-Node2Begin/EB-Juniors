<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';

$slug_or_id = isset($_GET['id']) ? $_GET['id'] : die();

try {
    $query = "SELECT * FROM events WHERE event_id = :id OR slug = :slug LIMIT 1";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $slug_or_id);
    $stmt->bindParam(':slug', $slug_or_id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["success" => true, "data" => $row]);
    } else {
        echo json_encode(["success" => false, "message" => "Event not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
