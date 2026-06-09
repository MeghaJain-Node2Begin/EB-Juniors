<?php
$files = glob('C:\\Users\\megha\\.gemini\\antigravity-ide\\brain\\a1c7f9e0-5da3-4d7f-be99-a8e4fefce131\\scratch\\media__*.png');
rsort($files); // Get latest
$img = imagecreatefrompng($files[0]);

// Find a non-white pixel
$w = imagesx($img);
$h = imagesy($img);

for ($y = 0; $y < $h; $y++) {
    for ($x = 0; $x < $w; $x++) {
        $rgb = imagecolorat($img, $x, $y);
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;
        
        // Skip white background
        if ($r < 250 || $g < 250 || $b < 250) {
            printf("#%02x%02x%02x", $r, $g, $b);
            exit;
        }
    }
}
