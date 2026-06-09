<?php
// backend/config/image_helper.php

function convertObjectImagesToWebp($data) {
    if (!is_object($data)) return;
    
    // Look for any property that looks like an image field
    $imageFields = ['image', 'thumbnail_image', 'event_image', 'featured_image', 'profile_image', 'cover_image', 'slider_image', 'logo', 'favicon'];
    
    foreach ($imageFields as $field) {
        if (isset($data->$field) && is_string($data->$field) && !empty($data->$field)) {
            $data->$field = convertToWebpIfNeeded($data->$field);
        }
    }
}

function convertToWebpIfNeeded($imagePathString) {
    if (empty($imagePathString)) return $imagePathString;

    $parsedUrl = parse_url($imagePathString, PHP_URL_PATH);
    if (!$parsedUrl) return $imagePathString;
    
    $ext = strtolower(pathinfo($parsedUrl, PATHINFO_EXTENSION));
    if ($ext === 'webp' || $ext === 'svg' || empty($ext)) {
        return $imagePathString;
    }
    
    // Supported extensions for conversion
    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
        return $imagePathString; // ignore unknown
    }

    // Determine absolute path on server
    $documentRoot = realpath(__DIR__ . '/..'); // backend directory
    $localPath = '';
    
    // Handle URLs or absolute paths
    if (strpos($imagePathString, 'http') === 0 || strpos($imagePathString, '/') === 0) {
        if (strpos($parsedUrl, '/backend/') !== false) {
            $relativePath = explode('/backend/', $parsedUrl)[1]; // uploads/courses/img.jpg
            $localPath = $documentRoot . '/' . ltrim($relativePath, '/');
        } else {
            // Maybe it's just /uploads/... or /Extrabits-Junior/...
            if (strpos($parsedUrl, '/uploads/') !== false) {
                $relativePath = substr($parsedUrl, strpos($parsedUrl, '/uploads/') + 1); // uploads/courses/img.jpg
                $localPath = $documentRoot . '/' . $relativePath;
            }
        }
    } else {
        // Just filename, like "img.jpg". Without folder, we can't reliably find it from this generic hook
        // However, most components now store full URLs from upload.php.
        // We will try to scan uploads subfolders if it's just a basename.
        $folders = ['classes', 'courses', 'events', 'blogs', 'testimonials', 'gallery', 'general'];
        foreach ($folders as $folder) {
            $testPath = $documentRoot . '/uploads/' . $folder . '/' . $imagePathString;
            if (file_exists($testPath)) {
                $localPath = $testPath;
                break;
            }
        }
    }
    
    if ($localPath && file_exists($localPath)) {
        // Convert to WebP
        $source_image = @imagecreatefromstring(file_get_contents($localPath));
        if ($source_image !== false) {
            imagepalettetotruecolor($source_image);
            imagealphablending($source_image, false);
            imagesavealpha($source_image, true);
            
            $newLocalPath = preg_replace('/\.[a-zA-Z0-9]+$/', '.webp', $localPath);
            if (imagewebp($source_image, $newLocalPath, 80)) {
                imagedestroy($source_image);
                // Delete original
                @unlink($localPath);
                
                // Return new string format
                return preg_replace('/\.[a-zA-Z0-9]+$/', '.webp', $imagePathString);
            }
            imagedestroy($source_image);
        }
    }

    return $imagePathString;
}
