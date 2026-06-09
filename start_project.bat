@echo off
echo Starting Extrabits-Junior Servers...

echo Starting PHP Backend Server on port 8000...
start cmd /k "cd /d d:\Extrabits-Junior && C:\xampp1\php\php.exe -S localhost:8000 -t backend"

echo Starting Next.js Frontend Server...
start cmd /k "cd /d d:\Extrabits-Junior\frontend && npm run dev"

echo Both servers have been started in separate windows!
