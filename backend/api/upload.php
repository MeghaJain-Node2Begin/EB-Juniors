<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$target_dir = "../uploads/";

// Determine the subfolder based on the request (e.g. 'classes', 'courses')
$folder = isset($_POST['folder']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['folder']) : 'general';

$folder_path = $target_dir . $folder . "/";

if (!file_exists($folder_path)) {
    mkdir($folder_path, 0777, true);
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file uploaded or an error occurred during upload."]);
    exit();
}

$file = $_FILES['image'];
$fileName = basename($file['name']);
$imageFileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" && $imageFileType != "webp" && $imageFileType != "svg") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Sorry, only JPG, JPEG, PNG, WEBP, SVG & GIF files are allowed."]);
    exit();
}

// Generate unique filename to avoid overwriting
$uniqueId = uniqid();

// We handle SVG and WEBP normally, convert others to WEBP
$finalFileName = "";

if ($imageFileType === 'svg' || $imageFileType === 'webp') {
    $target_file = $folder_path . $uniqueId . '.' . $imageFileType;
    if (move_uploaded_file($file['tmp_name'], $target_file)) {
        $finalFileName = $uniqueId . '.' . $imageFileType;
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Sorry, there was an error uploading your file."]);
        exit();
    }
} else {
    // Check if image file is a actual image or fake image
    $check = getimagesize($file['tmp_name']);
    if($check === false) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "File is not an image."]);
        exit();
    }

    $target_file = $folder_path . $uniqueId . '.webp';
    $source_image = imagecreatefromstring(file_get_contents($file['tmp_name']));
    
    if ($source_image !== false) {
        imagepalettetotruecolor($source_image);
        imagealphablending($source_image, false);
        imagesavealpha($source_image, true);
        
        if (imagewebp($source_image, $target_file, 80)) {
            imagedestroy($source_image);
            $finalFileName = $uniqueId . '.webp';
        } else {
            imagedestroy($source_image);
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to convert image to WebP."]);
            exit();
        }
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Invalid image data."]);
        exit();
    }
}

$file_url = "/uploads/" . $folder . "/" . $finalFileName;
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "File uploaded successfully.",
    "url" => "http://localhost:8000" . $file_url
]);
?>
