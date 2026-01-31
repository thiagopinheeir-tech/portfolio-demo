# Portfolio Demo System - Deployment Validation Script
# Tests static hosting compatibility and configuration

param(
    [string]$Platform = "all",
    [switch]$Verbose = $false,
    [switch]$SkipNetworkTests = $false
)

Write-Host "Portfolio Demo System - Deployment Validation" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

$script:TestResults = @{
    Passed = 0
    Failed = 0
    Tests = @()
}

function Write-TestResult {
    param(
        [string]$TestName,
        [bool]$Success,
        [string]$Message = ""
    )
    
    if ($Success) {
        Write-Host "PASS $TestName" -ForegroundColor Green
        $script:TestResults.Passed++
        $script:TestResults.Tests += @{
            Name = $TestName
            Status = "Passed"
            Message = $Message
        }
    } else {
        Write-Host "FAIL $TestName" -ForegroundColor Red
        if ($Message) {
            Write-Host "   $Message" -ForegroundColor Yellow
        }
        $script:TestResults.Failed++
        $script:TestResults.Tests += @{
            Name = $TestName
            Status = "Failed"
            Message = $Message
        }
    }
}

function Test-FileExists {
    param([string]$FilePath)
    return Test-Path $FilePath
}

function Test-ConfigurationFiles {
    Write-Host "`nTesting Configuration Files..." -ForegroundColor Yellow
    
    # Netlify configuration
    $netlifyExists = Test-FileExists "netlify.toml"
    Write-TestResult "Netlify configuration (netlify.toml)" $netlifyExists
    
    if ($netlifyExists) {
        $netlifyContent = Get-Content "netlify.toml" -Raw
        $hasSecurityHeaders = $netlifyContent -match "X-Frame-Options" -and 
                             $netlifyContent -match "X-Content-Type-Options" -and
                             $netlifyContent -match "X-XSS-Protection"
        Write-TestResult "Netlify security headers configured" $hasSecurityHeaders
        
        $hasCacheControl = $netlifyContent -match "Cache-Control"
        Write-TestResult "Netlify cache control configured" $hasCacheControl
    }
    
    # Vercel configuration
    $vercelExists = Test-FileExists "vercel.json"
    Write-TestResult "Vercel configuration (vercel.json)" $vercelExists
    
    if ($vercelExists) {
        try {
            $vercelContent = Get-Content "vercel.json" -Raw | ConvertFrom-Json
            $hasRoutes = ($vercelContent.routes -ne $null) -and ($vercelContent.routes.Count -gt 0)
            Write-TestResult "Vercel routes configured" $hasRoutes
            
            $hasHeaders = ($vercelContent.headers -ne $null) -and ($vercelContent.headers.Count -gt 0)
            Write-TestResult "Vercel headers configured" $hasHeaders
        } catch {
            Write-TestResult "Vercel JSON validation" $false "Invalid JSON format: $($_.Exception.Message)"
        }
    }
    
    # GitHub Pages configuration
    $githubWorkflowExists = Test-FileExists ".github/workflows/deploy.yml"
    Write-TestResult "GitHub Actions workflow" $githubWorkflowExists
    
    $jekyllConfigExists = Test-FileExists "_config.yml"
    Write-TestResult "Jekyll configuration (_config.yml)" $jekyllConfigExists
}

function Test-StaticAssets {
    Write-Host "`nTesting Static Assets..." -ForegroundColor Yellow
    
    $requiredAssets = @(
        "index.html",
        "assets/css/main.css",
        "assets/css/gallery.css",
        "assets/js/main.js",
        "assets/js/demo-loader.js"
    )
    
    foreach ($asset in $requiredAssets) {
        $exists = Test-FileExists $asset
        Write-TestResult "Asset exists: $asset" $exists
    }
    
    # Test HTML structure
    if (Test-FileExists "index.html") {
        $htmlContent = Get-Content "index.html" -Raw
        
        $hasViewport = $htmlContent -match 'viewport.*width=device-width'
        Write-TestResult "Responsive viewport meta tag" $hasViewport
        
        $hasSemanticHTML = $htmlContent -match '<(header|main|nav|section|article|footer)'
        Write-TestResult "Semantic HTML structure" $hasSemanticHTML
        
        $hasAltText = -not ($htmlContent -match '<img(?![^>]*alt=)')
        Write-TestResult "Images have alt text" $hasAltText
    }
}

function Test-DemoDirectories {
    Write-Host "`nTesting Demo Directories..." -ForegroundColor Yellow
    
    $requiredDemos = @(
        "acai-dany",
        "barbearia-raimundos", 
        "financas-pessoais",
        "whatsapp-bot-ai",
        "landpage-divulga"
    )
    
    foreach ($demo in $requiredDemos) {
        $demoPath = "demos/$demo"
        $demoExists = Test-FileExists $demoPath
        Write-TestResult "Demo directory: $demo" $demoExists
        
        if ($demoExists) {
            $indexExists = Test-FileExists "$demoPath/index.html"
            Write-TestResult "Demo index.html: $demo" $indexExists
        }
    }
}

function Test-ServiceWorker {
    Write-Host "`nTesting Service Worker..." -ForegroundColor Yellow
    
    $swExists = Test-FileExists "sw.js"
    Write-TestResult "Service Worker file (sw.js)" $swExists
    
    if ($swExists -and (Test-FileExists "index.html")) {
        $htmlContent = Get-Content "index.html" -Raw
        $swRegistered = $htmlContent -match "serviceWorker|sw\.js"
        Write-TestResult "Service Worker registration" $swRegistered
    }
}

function Test-Documentation {
    Write-Host "`nTesting Documentation..." -ForegroundColor Yellow
    
    $deploymentGuideExists = Test-FileExists "DEPLOYMENT.md"
    Write-TestResult "Deployment guide (DEPLOYMENT.md)" $deploymentGuideExists
    
    $readmeExists = Test-FileExists "README.md"
    Write-TestResult "README file" $readmeExists
    
    if ($readmeExists) {
        $readmeContent = Get-Content "README.md" -Raw
        $hasHostingInfo = $readmeContent -match "GitHub Pages" -and 
                         $readmeContent -match "Netlify" -and 
                         $readmeContent -match "Vercel"
        Write-TestResult "README contains hosting information" $hasHostingInfo
    }
}

function Test-NetworkConnectivity {
    if ($SkipNetworkTests) {
        Write-Host "`nSkipping Network Tests (--SkipNetworkTests flag)" -ForegroundColor Yellow
        return
    }
    
    Write-Host "`nTesting Network Connectivity..." -ForegroundColor Yellow
    
    $platforms = @(
        @{ Name = "GitHub"; Url = "https://github.com" },
        @{ Name = "Netlify"; Url = "https://netlify.com" },
        @{ Name = "Vercel"; Url = "https://vercel.com" }
    )
    
    foreach ($platform in $platforms) {
        try {
            $response = Invoke-WebRequest -Uri $platform.Url -Method Head -TimeoutSec 10 -UseBasicParsing
            $success = $response.StatusCode -eq 200
            Write-TestResult "$($platform.Name) connectivity" $success
        } catch {
            Write-TestResult "$($platform.Name) connectivity" $false $_.Exception.Message
        }
    }
}

function Test-PlatformSpecific {
    param([string]$Platform)
    
    Write-Host "`nTesting Platform-Specific Configuration: $Platform" -ForegroundColor Yellow
    
    switch ($Platform.ToLower()) {
        "github" {
            $workflowExists = Test-FileExists ".github/workflows/deploy.yml"
            Write-TestResult "GitHub Actions workflow configured" $workflowExists
            
            if ($workflowExists) {
                $workflowContent = Get-Content ".github/workflows/deploy.yml" -Raw
                $hasPagesDeploy = $workflowContent -match "actions/deploy-pages"
                Write-TestResult "GitHub Pages deployment action" $hasPagesDeploy
            }
        }
        "netlify" {
            $configExists = Test-FileExists "netlify.toml"
            Write-TestResult "Netlify configuration file" $configExists
            
            if ($configExists) {
                $configContent = Get-Content "netlify.toml" -Raw
                $hasRedirects = $configContent -match "\[\[redirects\]\]"
                Write-TestResult "Netlify redirects configured" $hasRedirects
            }
        }
        "vercel" {
            $configExists = Test-FileExists "vercel.json"
            Write-TestResult "Vercel configuration file" $configExists
            
            if ($configExists) {
                try {
                    $configContent = Get-Content "vercel.json" -Raw | ConvertFrom-Json
                    $hasStaticBuild = $configContent.builds | Where-Object { $_.use -eq "@vercel/static" }
                    Write-TestResult "Vercel static build configured" ($hasStaticBuild -ne $null)
                } catch {
                    Write-TestResult "Vercel configuration validation" $false "Invalid JSON"
                }
            }
        }
    }
}

function Show-Summary {
    $total = $script:TestResults.Passed + $script:TestResults.Failed
    $percentage = if ($total -gt 0) { [math]::Round(($script:TestResults.Passed / $total) * 100, 1) } else { 0 }
    
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "DEPLOYMENT VALIDATION SUMMARY" -ForegroundColor Cyan
    Write-Host "=" * 60 -ForegroundColor Gray
    Write-Host "Total Tests: $total" -ForegroundColor White
    Write-Host "Passed: $($script:TestResults.Passed) PASS" -ForegroundColor Green
    Write-Host "Failed: $($script:TestResults.Failed) FAIL" -ForegroundColor Red
    Write-Host "Success Rate: $percentage%" -ForegroundColor $(if ($percentage -ge 90) { "Green" } elseif ($percentage -ge 75) { "Yellow" } else { "Red" })
    Write-Host "=" * 60 -ForegroundColor Gray
    
    if ($script:TestResults.Failed -gt 0) {
        Write-Host "`nFAILED TESTS:" -ForegroundColor Red
        $script:TestResults.Tests | Where-Object { $_.Status -eq "Failed" } | ForEach-Object {
            Write-Host "  • $($_.Name)" -ForegroundColor Red
            if ($_.Message) {
                Write-Host "    $($_.Message)" -ForegroundColor Yellow
            }
        }
    }
    
    Write-Host "`nRECOMMENDATIONS:" -ForegroundColor Cyan
    if ($percentage -ge 90) {
        Write-Host "Excellent! Your deployment configuration is ready for production!" -ForegroundColor Green
        Write-Host "   You can proceed with deployment to any supported platform." -ForegroundColor Green
    } elseif ($percentage -ge 75) {
        Write-Host "Good progress, but some improvements are needed:" -ForegroundColor Yellow
        Write-Host "   • Review failed tests above" -ForegroundColor Yellow
        Write-Host "   • Check configuration files" -ForegroundColor Yellow
        Write-Host "   • Test locally before deploying" -ForegroundColor Yellow
    } else {
        Write-Host "Several issues need to be addressed before deployment:" -ForegroundColor Red
        Write-Host "   • Fix critical configuration issues" -ForegroundColor Red
        Write-Host "   • Ensure all required files exist" -ForegroundColor Red
        Write-Host "   • Review the DEPLOYMENT.md guide" -ForegroundColor Red
    }
    
    Write-Host "`nNext Steps:" -ForegroundColor Cyan
    Write-Host "   1. Review DEPLOYMENT.md for detailed instructions" -ForegroundColor White
    Write-Host "   2. Test deployment on your chosen platform" -ForegroundColor White
    Write-Host "   3. Run this script again after fixes" -ForegroundColor White
    Write-Host "   4. Monitor deployment logs for issues" -ForegroundColor White
}

# Main execution
try {
    # Run tests based on platform
    if ($Platform -eq "all" -or $Platform -eq "") {
        Test-ConfigurationFiles
        Test-StaticAssets
        Test-DemoDirectories
        Test-ServiceWorker
        Test-Documentation
        Test-NetworkConnectivity
    } else {
        Test-PlatformSpecific $Platform
        Test-StaticAssets
        Test-Documentation
    }
    
    Show-Summary
    
    # Exit with appropriate code
    if ($script:TestResults.Failed -eq 0) {
        exit 0
    } else {
        exit 1
    }
    
} catch {
    Write-Host "`nUnexpected error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host $_.ScriptStackTrace -ForegroundColor Yellow
    exit 2
}

# Usage examples:
# .\validate-deployment.ps1                    # Test all platforms
# .\validate-deployment.ps1 -Platform github   # Test GitHub Pages only
# .\validate-deployment.ps1 -Platform netlify  # Test Netlify only
# .\validate-deployment.ps1 -Platform vercel   # Test Vercel only
# .\validate-deployment.ps1 -SkipNetworkTests  # Skip network connectivity tests
# .\validate-deployment.ps1 -Verbose           # Verbose output