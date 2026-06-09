<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Handle form data instead of JSON
    $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    $phone = isset($_POST['phone']) ? $_POST['phone'] : null;

    if (!$full_name || !$email || !$password) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit();
    }

    // Check if email exists
    $check_query = "SELECT student_id FROM students WHERE email = :email";
    $check_stmt = $pdo->prepare($check_query);
    $check_stmt->bindParam(':email', $email);
    $check_stmt->execute();

    if ($check_stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        echo json_encode(["success" => false, "message" => "Email already registered."]);
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Handle profile image upload
    $profile_image = null;
    if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = '../../uploads/students/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        $file_extension = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
        $file_name = time() . '_' . bin2hex(random_bytes(8)) . '.' . $file_extension;
        $target_file = $upload_dir . $file_name;
        
        if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $target_file)) {
            $profile_image = $file_name;
        }
    }

    $query = "INSERT INTO students (full_name, email, phone, password, profile_image) VALUES (:full_name, :email, :phone, :password, :profile_image)";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':full_name', $full_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':password', $hashed_password);
    $stmt->bindParam(':profile_image', $profile_image);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Registration successful."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Unable to register student."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
