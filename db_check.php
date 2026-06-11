<?php
require 'backend/config/database.php';

$stmt = $pdo->query("SELECT class_id, class_name, slug_title FROM classes LIMIT 5");
$classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $pdo->query("SELECT * FROM class_slug");
$slugs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "Classes:\n";
print_r($classes);
echo "\nClass Slugs:\n";
print_r($slugs);
