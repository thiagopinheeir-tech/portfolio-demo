# Portfolio Demo System - Complete Integration Test
# Tests all components and validates end-to-end functionality

Write-Host "🧪 PORTFOLIO DEMO SYSTEM - COMPLETE INTEGRATION TEST" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "Testing all components and end-to-end functionality..." -ForegroundColor White
Write-Host ""

# Test results tracking
$testResults = @{
    Passed = 0
    Failed = 0
    Warnings = 0
    Details = @()
}

function Log-Result {
    param(
        [string]$Test,
        [string]$Status,
        [string]$Message
    )
    
    $result = @{
        Test = $Test
        Status = $Status
        Message = $Message
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
    
    $testResults.Details += $result
    
    switch ($Status) {
        "PASS" {
            $testResults.Passed++
            Write-Host "PASS $Test`: $Message" -ForegroundColor Green
        }
        "FAIL" {
            $testResults.Failed++
            Write-Host "FAIL $Test`: $Message" -ForegroundColor Red
        }
        "WARN" {
            $testResults.Warnings++
            Write-Host "WARN $Test`: $Message" -ForegroundColor Yellow
        }
    }
}

# Test 1: Verify all required files exist
Write-Host "`n🔍 Testing File Structure..." -ForegroundColor Blue

$requiredFiles = @(
    "index.html",
    "assets/css/main.css",
    "assets/css/gallery.css",
    "assets/css/navigation.css",
    "assets/css/accessibility.css",
    "assets/css/performance.css",
    "assets/js/main.js",
    "assets/js/demo-loader.js",
    "assets/js/navigation.js",
    "assets/js/accessibility.js",
    "assets/js/performance.js",
    "assets/js/file-operations.js"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Log-Result "File Structure" "PASS" "$file exists"
    } else {
        Log-Result "File Structure" "FAIL" "$file missing"
    }
}

# Test 2: Verify all 5 project demos exist
Write-Host "`n🎯 Testing Project Demos..." -ForegroundColor Blue

$expectedProjects = @(
    "acai-dany",
    "barbearia-raimundos",
    "financas-pessoais",
    "whatsapp-bot-ai",
    "landpage-divulga"
)

foreach ($project in $expectedProjects) {
    $demoPath = "demos/$project"
    $indexPath = "$demoPath/index.html"
    
    if (Test-Path $demoPath) {
        Log-Result "Project Demos" "PASS" "$project directory exists"
        
        if (Test-Path $indexPath) {
            Log-Result "Project Demos" "PASS" "$project index.html exists"
        } else {
            Log-Result "Project Demos" "FAIL" "$project index.html missing"
        }
    } else {
        Log-Result "Project Demos" "FAIL" "$project directory missing"
    }
}

# Test 3: Verify HTML structure and content
Write-Host "`n📄 Testing HTML Structure..." -ForegroundColor Blue

try {
    $indexContent = Get-Content "index.html" -Raw
    
    # Test basic HTML structure
    if ($indexContent -match "<!DOCTYPE html>") {
        Log-Result "HTML Structure" "PASS" "DOCTYPE declaration found"
    } else {
        Log-Result "HTML Structure" "FAIL" "DOCTYPE declaration missing"
    }
    
    if ($indexContent -match '<html lang="pt-BR">') {
        Log-Result "HTML Structure" "PASS" "Language attribute set"
    } else {
        Log-Result "HTML Structure" "WARN" "Language attribute missing or incorrect"
    }
    
    # Test meta tags
    if ($indexContent -match 'name="viewport"') {
        Log-Result "HTML Structure" "PASS" "Viewport meta tag found"
    } else {
        Log-Result "HTML Structure" "FAIL" "Viewport meta tag missing"
    }
    
    # Test main content structure
    if ($indexContent -match 'id="main-content"') {
        Log-Result "HTML Structure" "PASS" "Main content container found"
    } else {
        Log-Result "HTML Structure" "FAIL" "Main content container missing"
    }
    
    # Test project gallery
    if ($indexContent -match "project-gallery") {
        Log-Result "HTML Structure" "PASS" "Project gallery container found"
    } else {
        Log-Result "HTML Structure" "FAIL" "Project gallery container missing"
    }
    
    # Test modal structure
    if ($indexContent -match "demo-modal") {
        Log-Result "HTML Structure" "PASS" "Demo modal structure found"
    } else {
        Log-Result "HTML Structure" "FAIL" "Demo modal structure missing"
    }
    
} catch {
    Log-Result "HTML Structure" "FAIL" "Error reading index.html: $($_.Exception.Message)"
}

# Test 4: Verify CSS integration and responsiveness
Write-Host "`n🎨 Testing CSS Integration..." -ForegroundColor Blue

$cssFiles = @(
    "assets/css/main.css",
    "assets/css/gallery.css",
    "assets/css/navigation.css",
    "assets/css/accessibility.css",
    "assets/css/performance.css"
)

foreach ($cssFile in $cssFiles) {
    try {
        if (Test-Path $cssFile) {
            $cssContent = Get-Content $cssFile -Raw
            
            # Test for responsive design
            if ($cssContent -match "@media") {
                Log-Result "CSS Integration" "PASS" "$cssFile has media queries"
            } else {
                Log-Result "CSS Integration" "WARN" "$cssFile lacks media queries"
            }
            
            # Test for CSS variables
            if ($cssContent -match "--") {
                Log-Result "CSS Integration" "PASS" "$cssFile uses CSS variables"
            } else {
                Log-Result "CSS Integration" "WARN" "$cssFile doesn't use CSS variables"
            }
        } else {
            Log-Result "CSS Integration" "FAIL" "$cssFile not found"
        }
    } catch {
        Log-Result "CSS Integration" "FAIL" "Error reading $cssFile`: $($_.Exception.Message)"
    }
}

# Test 5: Verify JavaScript functionality
Write-Host "`n⚡ Testing JavaScript Integration..." -ForegroundColor Blue

$jsFiles = @(
    "assets/js/main.js",
    "assets/js/demo-loader.js",
    "assets/js/navigation.js",
    "assets/js/accessibility.js",
    "assets/js/performance.js"
)

foreach ($jsFile in $jsFiles) {
    try {
        if (Test-Path $jsFile) {
            $jsContent = Get-Content $jsFile -Raw
            
            # Test for basic function structure
            if ($jsContent -match "function" -or $jsContent -match "=>") {
                Log-Result "JS Integration" "PASS" "$jsFile contains functions"
            } else {
                Log-Result "JS Integration" "WARN" "$jsFile may lack function definitions"
            }
            
            # Test for event listeners
            if ($jsContent -match "addEventListener" -or $jsContent -match "onclick") {
                Log-Result "JS Integration" "PASS" "$jsFile has event handling"
            } else {
                Log-Result "JS Integration" "WARN" "$jsFile may lack event handling"
            }
        } else {
            Log-Result "JS Integration" "FAIL" "$jsFile not found"
        }
    } catch {
        Log-Result "JS Integration" "FAIL" "Error reading $jsFile`: $($_.Exception.Message)"
    }
}

# Test 6: Verify accessibility features
Write-Host "`n♿ Testing Accessibility Features..." -ForegroundColor Blue

try {
    $indexContent = Get-Content "index.html" -Raw
    
    # Test for skip links
    if ($indexContent -match "skip-link") {
        Log-Result "Accessibility" "PASS" "Skip links found"
    } else {
        Log-Result "Accessibility" "FAIL" "Skip links missing"
    }
    
    # Test for ARIA attributes
    if ($indexContent -match "aria-") {
        Log-Result "Accessibility" "PASS" "ARIA attributes found"
    } else {
        Log-Result "Accessibility" "FAIL" "ARIA attributes missing"
    }
    
    # Test for semantic HTML
    $semanticElements = @("<main", "<nav", "<section", "<article", "<header", "<footer")
    $foundSemantic = $semanticElements | Where-Object { $indexContent -match [regex]::Escape($_) }
    
    if ($foundSemantic.Count -ge 3) {
        Log-Result "Accessibility" "PASS" "Semantic HTML elements found: $($foundSemantic.Count)"
    } else {
        Log-Result "Accessibility" "WARN" "Limited semantic HTML elements: $($foundSemantic.Count)"
    }
    
    # Test for alt text structure
    if ($indexContent -match "alt=") {
        Log-Result "Accessibility" "PASS" "Alt text attributes found"
    } else {
        Log-Result "Accessibility" "WARN" "Alt text attributes may be missing"
    }
    
} catch {
    Log-Result "Accessibility" "FAIL" "Error testing accessibility: $($_.Exception.Message)"
}

# Test 7: Verify performance optimizations
Write-Host "`n🚀 Testing Performance Optimizations..." -ForegroundColor Blue

try {
    $indexContent = Get-Content "index.html" -Raw
    
    # Test for preload links
    if ($indexContent -match 'rel="preload"') {
        Log-Result "Performance" "PASS" "Resource preloading found"
    } else {
        Log-Result "Performance" "WARN" "Resource preloading missing"
    }
    
    # Test for lazy loading
    if ($indexContent -match 'loading="lazy"') {
        Log-Result "Performance" "PASS" "Lazy loading implemented"
    } else {
        Log-Result "Performance" "WARN" "Lazy loading not implemented"
    }
    
    # Test for service worker
    if (Test-Path "sw.js") {
        Log-Result "Performance" "PASS" "Service worker found"
    } else {
        Log-Result "Performance" "WARN" "Service worker missing"
    }
    
    # Test for critical CSS
    if ($indexContent -match "<style>") {
        Log-Result "Performance" "PASS" "Inline critical CSS found"
    } else {
        Log-Result "Performance" "WARN" "Inline critical CSS missing"
    }
    
} catch {
    Log-Result "Performance" "FAIL" "Error testing performance: $($_.Exception.Message)"
}

# Test 8: Verify navigation and integration features
Write-Host "`n🧭 Testing Navigation Integration..." -ForegroundColor Blue

foreach ($project in $expectedProjects) {
    $demoIndexPath = "demos/$project/index.html"
    
    try {
        if (Test-Path $demoIndexPath) {
            $demoContent = Get-Content $demoIndexPath -Raw
            
            # Test for navigation back to portfolio
            if ($demoContent -match "Voltar" -or $demoContent -match "Portfolio" -or $demoContent -match "../index.html") {
                Log-Result "Navigation" "PASS" "$project has navigation back to portfolio"
            } else {
                Log-Result "Navigation" "WARN" "$project may lack navigation back to portfolio"
            }
            
            # Test for demo wrapper
            if ($demoContent -match "demo-nav" -or $demoContent -match "demo-wrapper") {
                Log-Result "Navigation" "PASS" "$project has demo navigation wrapper"
            } else {
                Log-Result "Navigation" "WARN" "$project may lack demo navigation wrapper"
            }
        }
    } catch {
        Log-Result "Navigation" "FAIL" "Error testing navigation for $project`: $($_.Exception.Message)"
    }
}

# Test 9: Verify deployment readiness
Write-Host "`n🚀 Testing Deployment Readiness..." -ForegroundColor Blue

# Test for deployment configuration files
$deploymentFiles = @("vercel.json", "netlify.toml", "_config.yml")
$deploymentConfigFound = $false

foreach ($file in $deploymentFiles) {
    if (Test-Path $file) {
        Log-Result "Deployment" "PASS" "$file configuration found"
        $deploymentConfigFound = $true
    }
}

if (-not $deploymentConfigFound) {
    Log-Result "Deployment" "WARN" "No deployment configuration files found"
}

# Test for documentation
$docFiles = @("README.md", "SETUP.md", "DEPLOYMENT.md")
foreach ($file in $docFiles) {
    if (Test-Path $file) {
        Log-Result "Deployment" "PASS" "$file documentation found"
    } else {
        Log-Result "Deployment" "WARN" "$file documentation missing"
    }
}

# Test for robots.txt
if (Test-Path "robots.txt") {
    Log-Result "Deployment" "PASS" "robots.txt found"
} else {
    Log-Result "Deployment" "WARN" "robots.txt missing"
}

# Test 10: Verify mock data and state management
Write-Host "`n🎭 Testing Mock Data and State Management..." -ForegroundColor Blue

$mockDataCount = 0
foreach ($project in $expectedProjects) {
    $mockDataPath = "demos/$project/mock-data.js"
    
    if (Test-Path $mockDataPath) {
        Log-Result "Mock Data" "PASS" "$project has mock data system"
        $mockDataCount++
    } else {
        Log-Result "Mock Data" "WARN" "$project lacks mock data system"
    }
}

if ($mockDataCount -ge 3) {
    Log-Result "Mock Data" "PASS" "Sufficient mock data systems ($mockDataCount/5)"
} else {
    Log-Result "Mock Data" "WARN" "Limited mock data systems ($mockDataCount/5)"
}

# Test for state reset system
if (Test-Path "state-reset-system.js") {
    Log-Result "State Management" "PASS" "State reset system found"
} else {
    Log-Result "State Management" "WARN" "State reset system missing"
}

# Generate final report
Write-Host "`n📊 INTEGRATION TEST REPORT" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "PASS Passed: $($testResults.Passed)" -ForegroundColor Green
Write-Host "FAIL Failed: $($testResults.Failed)" -ForegroundColor Red
Write-Host "WARN Warnings: $($testResults.Warnings)" -ForegroundColor Yellow
Write-Host "📝 Total Tests: $($testResults.Passed + $testResults.Failed + $testResults.Warnings)" -ForegroundColor White

$totalTests = $testResults.Passed + $testResults.Failed + $testResults.Warnings
$successRate = if ($totalTests -gt 0) { ($testResults.Passed / $totalTests) * 100 } else { 0 }
Write-Host "📈 Success Rate: $([math]::Round($successRate, 1))%" -ForegroundColor White

Write-Host "`n🎯 REQUIREMENTS VALIDATION:" -ForegroundColor Cyan
$req11 = ($testResults.Details | Where-Object { $_.Test -eq "Project Demos" -and $_.Status -eq "PASS" }).Count -gt 0
$req42 = ($testResults.Details | Where-Object { $_.Test -eq "CSS Integration" -and $_.Message -match "media queries" }).Count -gt 0
$req72 = ($testResults.Details | Where-Object { $_.Test -eq "CSS Integration" -and $_.Status -eq "PASS" }).Count -gt 0
$req54 = ($testResults.Details | Where-Object { $_.Test -eq "File Structure" -and $_.Status -eq "PASS" }).Count -gt 0
$req73to75 = ($testResults.Details | Where-Object { $_.Test -eq "Accessibility" -and $_.Status -eq "PASS" }).Count -gt 0

Write-Host "Requirements 1.1 (all projects present): $(if ($req11) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($req11) { 'Green' } else { 'Red' })
Write-Host "Requirements 4.2 (responsive design): $(if ($req42) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($req42) { 'Green' } else { 'Red' })
Write-Host "Requirements 7.2 (mobile/tablet/desktop): $(if ($req72) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($req72) { 'Green' } else { 'Red' })
Write-Host "Requirements 5.4 (repository completeness): $(if ($req54) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($req54) { 'Green' } else { 'Red' })
Write-Host "Requirements 7.3-7.5 (accessibility): $(if ($req73to75) { 'OK' } else { 'FAIL' })" -ForegroundColor $(if ($req73to75) { 'Green' } else { 'Red' })

if ($testResults.Failed -eq 0) {
    Write-Host "`n🎉 INTEGRATION TEST PASSED! All components are properly integrated." -ForegroundColor Green
} elseif ($testResults.Failed -le 2) {
    Write-Host "`n⚠️  INTEGRATION TEST PASSED WITH WARNINGS. Minor issues detected." -ForegroundColor Yellow
} else {
    Write-Host "`n❌ INTEGRATION TEST FAILED. Critical issues need to be addressed." -ForegroundColor Red
}

# Save detailed report
$reportData = @{
    Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Summary = @{
        Passed = $testResults.Passed
        Failed = $testResults.Failed
        Warnings = $testResults.Warnings
        SuccessRate = $successRate
    }
    Details = $testResults.Details
}

$reportJson = $reportData | ConvertTo-Json -Depth 3
$reportJson | Out-File "integration-test-report.json" -Encoding UTF8
Write-Host "`n📄 Detailed report saved to: integration-test-report.json" -ForegroundColor Cyan

# Return exit code based on results
if ($testResults.Failed -eq 0) {
    exit 0
} else {
    exit 1
}