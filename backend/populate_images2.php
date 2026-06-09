<?php
require_once __DIR__ . '/config/database.php';

$images = [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
];

try {
    // 1. Events
    $stmt = $pdo->query("SELECT event_id FROM events");
    $events = $stmt->fetchAll();
    foreach ($events as $index => $event) {
        $img = $images[$index % count($images)];
        $pdo->prepare("UPDATE events SET event_image = ? WHERE event_id = ?")->execute([$img, $event['event_id']]);
    }

    // 2. Blogs
    $stmt = $pdo->query("SELECT blog_id FROM blogs");
    $blogs = $stmt->fetchAll();
    foreach ($blogs as $index => $blog) {
        $img = $images[($index + 1) % count($images)];
        $pdo->prepare("UPDATE blogs SET thumbnail_image = ? WHERE blog_id = ?")->execute([$img, $blog['blog_id']]);
    }

    // 3. Classes
    $stmt = $pdo->query("SELECT class_id FROM classes");
    $classes = $stmt->fetchAll();
    foreach ($classes as $index => $cls) {
        $img = $images[($index + 2) % count($images)];
        $pdo->prepare("UPDATE classes SET thumbnail_image = ? WHERE class_id = ?")->execute([$img, $cls['class_id']]);
    }

    // 4. Courses
    $stmt = $pdo->query("SELECT course_id FROM courses");
    $courses = $stmt->fetchAll();
    foreach ($courses as $index => $course) {
        $img = $images[($index + 3) % count($images)];
        $pdo->prepare("UPDATE courses SET thumbnail_image = ? WHERE course_id = ?")->execute([$img, $course['course_id']]);
    }

    echo "Images populated successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
