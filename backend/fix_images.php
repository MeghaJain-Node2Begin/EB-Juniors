<?php
require_once __DIR__ . '/config/database.php';

try {
    // Set event_image to empty string for events
    $pdo->exec("UPDATE events SET event_image = ''");
    
    // Set thumbnail_image to empty string for blogs
    $pdo->exec("UPDATE blogs SET thumbnail_image = ''");

    echo "Images successfully set to empty to trigger fallbacks!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
