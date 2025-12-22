# Quick Start Script for Windows PowerShell
# Run this script to start the development server

Write-Host "🚀 Starting IT Portfolio Development Server..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Set execution policy for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Start the development server
Write-Host "✨ Starting Next.js development server..." -ForegroundColor Green
Write-Host ""
Write-Host "🌐 The application will be available at:" -ForegroundColor Cyan
Write-Host "   Spanish (default): http://localhost:3000" -ForegroundColor White
Write-Host "   English:          http://localhost:3000/en" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev
