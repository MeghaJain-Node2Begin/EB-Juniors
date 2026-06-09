<?php
// backend/config/database.php

$host = "localhost";
$dbname = "extrabits_junior_db";
$username = "root";
$password = "root"; // Using the password we set during MariaDB setup

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    // Set PDO attributes
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => "Database Connection Failed",
        "error" => $e->getMessage()
    ]);
    exit();
}
