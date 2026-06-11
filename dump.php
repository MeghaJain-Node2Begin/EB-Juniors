<?php
require 'backend/config/database.php';
$stmt = $pdo->query("SELECT full_description FROM courses WHERE slug_title LIKE 'demo-cours%'");
$desc = $stmt->fetchColumn();
file_put_contents('demo-desc.html', $desc);
echo "Done";
