<?php
require 'backend/config/database.php';
$stmt = $pdo->prepare("UPDATE courses SET full_description = CONCAT(full_description, '\"></span></li></ul></div>') WHERE slug_title LIKE 'demo-cours%'");
$stmt->execute();
echo "Updated successfully.";
