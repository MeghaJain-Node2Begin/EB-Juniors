const sharp = require('sharp');

async function processImages() {
  const images = [
    { src: 'C:\\Users\\megha\\.gemini\\antigravity-ide\\brain\\c64b672c-b0a7-4843-92d2-761dcb299fa2\\practical_learning_wide_1780559075898.png', dest: 'public/practical_learning_widescreen.webp' },
    { src: 'C:\\Users\\megha\\.gemini\\antigravity-ide\\brain\\c64b672c-b0a7-4843-92d2-761dcb299fa2\\beginner_friendly_wide_1780559090168.png', dest: 'public/beginner_friendly_widescreen.webp' },
    { src: 'C:\\Users\\megha\\.gemini\\antigravity-ide\\brain\\c64b672c-b0a7-4843-92d2-761dcb299fa2\\expert_guidance_wide_1780559104693.png', dest: 'public/expert_guidance_widescreen.webp' },
    { src: 'C:\\Users\\megha\\.gemini\\antigravity-ide\\brain\\c64b672c-b0a7-4843-92d2-761dcb299fa2\\modern_labs_wide_1780559118970.png', dest: 'public/modern_labs_widescreen.webp' }
  ];

  for (let img of images) {
    try {
      await sharp(img.src)
        .extract({ width: 1024, height: 576, left: 0, top: 224 })
        .webp({ quality: 95 })
        .toFile(img.dest);
      console.log(`Cropped and saved: ${img.dest}`);
    } catch(e) {
      console.error(`Failed on ${img.src}:`, e.message);
    }
  }
}

processImages();
