<?php
require 'backend/config/database.php';

$stmt = $pdo->query("SELECT course_id, full_description FROM courses");
$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($courses as $c) {
    $html = $c['full_description'];
    
    if (empty($html)) continue;
    
    // Suppress warnings for malformed HTML
    libxml_use_internal_errors(true);
    
    $doc = new DOMDocument();
    // Load HTML with UTF-8 encoding wrapper
    $doc->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    
    // Save HTML, this will auto-close tags
    $fixed_html = $doc->saveHTML();
    
    // Remove the XML declaration added by the wrapper
    $fixed_html = str_replace('<?xml encoding="UTF-8">', '', $fixed_html);
    
    $updateStmt = $pdo->prepare("UPDATE courses SET full_description = :desc WHERE course_id = :id");
    $updateStmt->execute(['desc' => trim($fixed_html), 'id' => $c['course_id']]);
    
    echo "Fixed course ID " . $c['course_id'] . "\n";
}

echo "All demo courses fixed.";
