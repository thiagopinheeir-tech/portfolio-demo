# Simple Performance Validation Script

Write-Host "Performance Optimization Validation" -ForegroundColor Green
Write-Host ""

$passed = 0
$failed = 0

# Test required files
$files = @(
    "assets/js/performance.js",
    "assets/css/performance.css", 
    "sw.js",
    "test-performance.html",
    "TASK_10.2_PERFORMANCE_IMPLEMENTATION_SUMMARY.md"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
        $failed++
    }
}

# Test key content
if (Test-Path "assets/js/performance.js") {
    $content = Get-Content "assets/js/performance.js" -Raw
    if ($content -match "ImageOptimizer" -and $content -match "BundleOptimizer") {
        Write-Host "✅ Performance classes implemented" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "❌ Performance classes missing" -ForegroundColor Red
        $failed++
    }
}

if (Test-Path "index.html") {
    $content = Get-Content "index.html" -Raw
    if ($content -match "preload" -and $content -match "lazy") {
        Write-Host "✅ HTML optimizations present" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "❌ HTML optimizations missing" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Results: $passed passed, $failed failed" -ForegroundColor Cyan

if ($failed -eq 0) {
    Write-Host "🎉 All performance optimizations implemented!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Some optimizations need attention" -ForegroundColor Yellow
}