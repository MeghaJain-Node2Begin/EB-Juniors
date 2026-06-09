<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';

$slug_or_id = isset($_GET['id']) ? $_GET['id'] : die();

try {
    // Check if the parameter is a slug (string) or an ID (number)
    $query = "SELECT b.*, c.category_name 
              FROM blogs b 
              LEFT JOIN blog_categories c ON b.category_id = c.category_id 
              WHERE b.blog_id = :id OR b.slug = :slug LIMIT 1";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $slug_or_id);
    $stmt->bindParam(':slug', $slug_or_id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Update view count
        $updateQuery = "UPDATE blogs SET views = views + 1 WHERE blog_id = :id";
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->bindParam(':id', $row['blog_id']);
        $updateStmt->execute();

        echo json_encode(["success" => true, "data" => $row]);
    } else {
        echo json_encode(["success" => false, "message" => "Blog not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
