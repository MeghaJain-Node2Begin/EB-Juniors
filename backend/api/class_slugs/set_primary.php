<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';

require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

if (!empty($data->slug_id)) {
    try {
        $pdo->beginTransaction();

        // Set all to false
        $query1 = "UPDATE class_slug SET is_primary = FALSE";
        $pdo->exec($query1);

        // Set the chosen one to true
        $query2 = "UPDATE class_slug SET is_primary = TRUE WHERE slug_id = :slug_id";
        $stmt = $pdo->prepare($query2);
        $stmt->bindValue(':slug_id', $data->slug_id);
        $stmt->execute();

        // Fetch the template rule
        $templateStmt = $pdo->prepare("SELECT template_rule FROM class_slug WHERE slug_id = :slug_id");
        $templateStmt->bindValue(':slug_id', $data->slug_id);
        $templateStmt->execute();
        $templateRow = $templateStmt->fetch(PDO::FETCH_ASSOC);

        if ($templateRow) {
            $template = $templateRow['template_rule'];
            
            // Fetch all classes
            $courseStmt = $pdo->query("SELECT class_id, class_name FROM classes");
            $courses = $courseStmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Prepare update statement for classes
            $updateCourseStmt = $pdo->prepare("UPDATE classes SET slug_title = :slug_title WHERE class_id = :class_id");
            
            foreach ($courses as $course) {
                $courseId = $course['class_id'];
                $courseName = $course['class_name'];
                
                $slugifiedName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $courseName), '-'));
                $newSlugTitle = str_replace('keyword', $slugifiedName, $template);
                
                $updateCourseStmt->bindValue(':slug_title', $newSlugTitle);
                $updateCourseStmt->bindValue(':class_id', $courseId);
                $updateCourseStmt->execute();
            }
        }

        $pdo->commit();

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Primary template set and applied globally."]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Database error.", "error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. slug_id is required."]);
}
?>
