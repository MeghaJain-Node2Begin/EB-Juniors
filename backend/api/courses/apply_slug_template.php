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

if (!empty($data->template)) {
    try {
        $template = $data->template;
        
        // Fetch all courses
        $stmt = $pdo->query("SELECT course_id, course_name FROM courses");
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $updatedCount = 0;
        
        // Prepare update statement
        $updateStmt = $pdo->prepare("UPDATE courses SET slug_title = :slug_title WHERE course_id = :course_id");
        
        foreach ($courses as $course) {
            $courseId = $course['course_id'];
            $courseName = $course['course_name'];
            
            // Slugify the course name (lowercase, replace non-alphanumeric with hyphen)
            $slugifiedName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $courseName), '-'));
            
            // Replace 'keyword' in the template with the slugified name
            $newSlugTitle = str_replace('keyword', $slugifiedName, $template);
            
            // Execute update
            $updateStmt->bindValue(':slug_title', $newSlugTitle);
            $updateStmt->bindValue(':course_id', $courseId);
            $updateStmt->execute();
            
            $updatedCount++;
        }
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Successfully updated {$updatedCount} courses with the new slug template."
        ]);

    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode([
            "success" => false,
            "message" => "Database error.",
            "error" => $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Template string is required."
    ]);
}
?>
