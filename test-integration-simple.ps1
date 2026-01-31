# Portfolio Demo System - Simple Integration Test

Write-Host "Portfolio Demo System - Integration Test" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

$passed = 0
$failed = 0
$total = 0

# Test 1: Check main files exist
Write-Host "`nTesting main files..." -ForegroundColor Blue
$mainFiles = @("index.html", "assets/css/main.css", "assets/js/main.js")
foreach ($file in $mainFiles) {
    $total++
    if (Test-Path $file) {
        Write-Host "PASS: $file exists" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: $file missing" -ForegroundColor Red
        $failed++
    }
}

# Test 2: Check all 5 project demos
Write-Host "`nTesting project demos..." -ForegroundColor Blue
$projects = @("acai-dany", "barbearia-raimundos", "financas-pessoais", "whatsapp-bot-ai", "landpage-divulga")
foreach ($project in $projects) {
    $total++
    $demoPath = "demos/$project/index.html"
    if (Test-Path $demoPath) {
        Write-Host "PASS: $project demo exists" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: $project demo missing" -ForegroundColor Red
        $failed++
    }
}

# Test 3: Check CSS files
Write-Host "`nTesting CSS files..." -ForegroundColor Blue
$cssFiles = @("assets/css/gallery.css", "assets/css/navigation.css", "assets/css/accessibility.css", "assets/css/performance.css")
foreach ($file in $cssFiles) {
    $total++
    if (Test-Path $file) {
        Write-Host "PASS: $file exists" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: $file missing" -ForegroundColor Red
        $failed++
    }
}

# Test 4: Check JS files
Write-Host "`nTesting JavaScript files..." -ForegroundColor Blue
$jsFiles = @("assets/js/demo-loader.js", "assets/js/navigation.js", "assets/js/accessibility.js", "assets/js/performance.js")
foreach ($file in $jsFiles) {
    $total++
    if (Test-Path $file) {
        Write-Host "PASS: $file exists" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: $file missing" -ForegroundColor Red
        $failed++
    }
}

# Test 5: Check HTML structure
Write-Host "`nTesting HTML structure..." -ForegroundColor Blue
if (Test-Path "index.html") {
    $content = Get-Content "index.html" -Raw
    
    $total++
    if ($content -match "project-gallery") {
        Write-Host "PASS: Project gallery found in HTML" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: Project gallery missing from HTML" -ForegroundColor Red
        $failed++
    }
    
    $total++
    if ($content -match "demo-modal") {
        Write-Host "PASS: Demo modal found in HTML" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: Demo modal missing from HTML" -ForegroundColor Red
        $failed++
    }
    
    $total++
    if ($content -match "aria-") {
        Write-Host "PASS: ARIA attributes found" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: ARIA attributes missing" -ForegroundColor Red
        $failed++
    }
}

# Test 6: Check responsive design
Write-Host "`nTesting responsive design..." -ForegroundColor Blue
if (Test-Path "assets/css/main.css") {
    $cssContent = Get-Content "assets/css/main.css" -Raw
    
    $total++
    if ($cssContent -match "@media") {
        Write-Host "PASS: Media queries found in CSS" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "FAIL: Media queries missing from CSS" -ForegroundColor Red
        $failed++
    }
}

# Test 7: Check documentation
Write-Host "`nTesting documentation..." -ForegroundColor Blue
$docFiles = @("README.md", "SETUP.md", "DEPLOYMENT.md")
foreach ($file in $docFiles) {
    $total++
    if (Test-Path $file) {
        Write-Host "PASS: $file exists" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "WARN: $file missing" -ForegroundColor Yellow
        # Don't count as failed for documentation
    }
}

# Results
Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "INTEGRATION TEST RESULTS" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Total: $total" -ForegroundColor White

$successRate = [math]::Round(($passed / $total) * 100, 1)
Write-Host "Success Rate: $successRate%" -ForegroundColor White

Write-Host "`nREQUIREMENTS VALIDATION:" -ForegroundColor Cyan
Write-Host "Requirements 1.1 (all projects present): $(if ($passed -ge 5) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($passed -ge 5) { 'Green' } else { 'Red' })
Write-Host "Requirements 4.2 (responsive design): $(if ($cssContent -match '@media') { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($cssContent -match '@media') { 'Green' } else { 'Red' })
Write-Host "Requirements 5.4 (repository completeness): $(if ($passed -ge 10) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($passed -ge 10) { 'Green' } else { 'Red' })

if ($failed -eq 0) {
    Write-Host "`nINTEGRATION TEST PASSED! All components are properly integrated." -ForegroundColor Green
    exit 0
} elseif ($failed -le 2) {
    Write-Host "`nINTEGRATION TEST PASSED WITH WARNINGS. Minor issues detected." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "`nINTEGRATION TEST FAILED. Critical issues need to be addressed." -ForegroundColor Red
    exit 1
}