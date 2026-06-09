<?php
require_once 'backend/config/database.php';

$hash = password_hash('eb@eb2k25...', PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO admins (full_name, email, password, role) VALUES ('Extrabits', 'Extrabits', :password, 'super_admin')");
$stmt->bindParam(':password', $hash);
if ($stmt->execute()) {
    echo "Admin created successfully!";
} else {
    echo "Failed to create admin.";
}
