const fs = require('fs');
const path = require('path');

const dirs = [
  'd:/Extrabits-Junior/frontend/src/app/admin',
  'd:/Extrabits-Junior/frontend/src/components/admin'
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      if (content.includes('emerald')) {
        content = content.replace(/emerald/g, 'teal');
        modified = true;
      }
      
      if (fullPath.includes('login') && fullPath.includes('page.tsx')) {
        // replace the hardcoded green hex colors with the logo colors
        if (content.includes('bg-[#0EB29A]')) {
          content = content.replace('bg-[#0EB29A]', 'bg-[#00d2a3]');
          modified = true;
        }
        if (content.includes('hover:bg-[#10CBB0]')) {
          content = content.replace('hover:bg-[#10CBB0]', 'hover:bg-[#00e3b2]');
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

dirs.forEach(processDir);
