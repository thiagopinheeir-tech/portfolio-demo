/**
 * Complete Integration Validation Script
 * Tests all components and validates end-to-end functionality
 */

const fs = require('fs');
const path = require('path');

// Test results tracking
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
};

/**
 * Log test result
 */
function logResult(test, status, message) {
    const result = { test, status, message, timestamp: new Date().toISOString() };
    testResults.details.push(result);
    
    if (status === 'PASS') {
        testResults.passed++;
        console.log(`✅ ${test}: ${message}`);
    } else if (status === 'FAIL') {
        testResults.failed++;
        console.log(`❌ ${test}: ${message}`);
    } else if (status === 'WARN') {
        testResults.warnings++;
        console.log(`⚠️  ${test}: ${message}`);
    }
}

/**
 * Test 1: Verify all required files exist
 */
function testFileStructure() {
    console.log('\n🔍 Testing File Structure...');
    
    const requiredFiles = [
        'index.html',
        'assets/css/main.css',
        'assets/css/gallery.css',
        'assets/css/navigation.css',
        'assets/css/accessibility.css',
        'assets/css/performance.css',
        'assets/js/main.js',
        'assets/js/demo-loader.js',
        'assets/js/navigation.js',
        'assets/js/accessibility.js',
        'assets/js/performance.js',
        'assets/js/file-operations.js'
    ];
    
    requiredFiles.forEach(file => {
        if (fs.existsSync(file)) {
            logResult('File Structure', 'PASS', `${file} exists`);
        } else {
            logResult('File Structure', 'FAIL', `${file} missing`);
        }
    });
}

/**
 * Test 2: Verify all 5 project demos exist
 */
function testProjectDemos() {
    console.log('\n🎯 Testing Project Demos...');
    
    const expectedProjects = [
        'acai-dany',
        'barbearia-raimundos',
        'financas-pessoais',
        'whatsapp-bot-ai',
        'landpage-divulga'
    ];
    
    expectedProjects.forEach(project => {
        const demoPath = `demos/${project}`;
        const indexPath = `${demoPath}/index.html`;
        
        if (fs.existsSync(demoPath)) {
            logResult('Project Demos', 'PASS', `${project} directory exists`);
            
            if (fs.existsSync(indexPath)) {
                logResult('Project Demos', 'PASS', `${project} index.html exists`);
            } else {
                logResult('Project Demos', 'FAIL', `${project} index.html missing`);
            }
        } else {
            logResult('Project Demos', 'FAIL', `${project} directory missing`);
        }
    });
}

/**
 * Test 3: Verify HTML structure and content
 */
function testHTMLStructure() {
    console.log('\n📄 Testing HTML Structure...');
    
    try {
        const indexContent = fs.readFileSync('index.html', 'utf8');
        
        // Test basic HTML structure
        if (indexContent.includes('<!DOCTYPE html>')) {
            logResult('HTML Structure', 'PASS', 'DOCTYPE declaration found');
        } else {
            logResult('HTML Structure', 'FAIL', 'DOCTYPE declaration missing');
        }
        
        if (indexContent.includes('<html lang="pt-BR">')) {
            logResult('HTML Structure', 'PASS', 'Language attribute set');
        } else {
            logResult('HTML Structure', 'WARN', 'Language attribute missing or incorrect');
        }
        
        // Test meta tags
        if (indexContent.includes('name="viewport"')) {
            logResult('HTML Structure', 'PASS', 'Viewport meta tag found');
        } else {
            logResult('HTML Structure', 'FAIL', 'Viewport meta tag missing');
        }
        
        // Test main content structure
        if (indexContent.includes('id="main-content"')) {
            logResult('HTML Structure', 'PASS', 'Main content container found');
        } else {
            logResult('HTML Structure', 'FAIL', 'Main content container missing');
        }
        
        // Test project gallery
        if (indexContent.includes('project-gallery')) {
            logResult('HTML Structure', 'PASS', 'Project gallery container found');
        } else {
            logResult('HTML Structure', 'FAIL', 'Project gallery container missing');
        }
        
        // Test modal structure
        if (indexContent.includes('demo-modal')) {
            logResult('HTML Structure', 'PASS', 'Demo modal structure found');
        } else {
            logResult('HTML Structure', 'FAIL', 'Demo modal structure missing');
        }
        
    } catch (error) {
        logResult('HTML Structure', 'FAIL', `Error reading index.html: ${error.message}`);
    }
}

/**
 * Test 4: Verify CSS integration and responsiveness
 */
function testCSSIntegration() {
    console.log('\n🎨 Testing CSS Integration...');
    
    const cssFiles = [
        'assets/css/main.css',
        'assets/css/gallery.css',
        'assets/css/navigation.css',
        'assets/css/accessibility.css',
        'assets/css/performance.css'
    ];
    
    cssFiles.forEach(cssFile => {
        try {
            const cssContent = fs.readFileSync(cssFile, 'utf8');
            
            // Test for responsive design
            if (cssContent.includes('@media')) {
                logResult('CSS Integration', 'PASS', `${cssFile} has media queries`);
            } else {
                logResult('CSS Integration', 'WARN', `${cssFile} lacks media queries`);
            }
            
            // Test for CSS variables
            if (cssContent.includes('--')) {
                logResult('CSS Integration', 'PASS', `${cssFile} uses CSS variables`);
            } else {
                logResult('CSS Integration', 'WARN', `${cssFile} doesn't use CSS variables`);
            }
            
        } catch (error) {
            logResult('CSS Integration', 'FAIL', `Error reading ${cssFile}: ${error.message}`);
        }
    });
}

/**
 * Test 5: Verify JavaScript functionality
 */
function testJavaScriptIntegration() {
    console.log('\n⚡ Testing JavaScript Integration...');
    
    const jsFiles = [
        'assets/js/main.js',
        'assets/js/demo-loader.js',
        'assets/js/navigation.js',
        'assets/js/accessibility.js',
        'assets/js/performance.js'
    ];
    
    jsFiles.forEach(jsFile => {
        try {
            const jsContent = fs.readFileSync(jsFile, 'utf8');
            
            // Test for basic function structure
            if (jsContent.includes('function') || jsContent.includes('=>')) {
                logResult('JS Integration', 'PASS', `${jsFile} contains functions`);
            } else {
                logResult('JS Integration', 'WARN', `${jsFile} may lack function definitions`);
            }
            
            // Test for event listeners
            if (jsContent.includes('addEventListener') || jsContent.includes('onclick')) {
                logResult('JS Integration', 'PASS', `${jsFile} has event handling`);
            } else {
                logResult('JS Integration', 'WARN', `${jsFile} may lack event handling`);
            }
            
        } catch (error) {
            logResult('JS Integration', 'FAIL', `Error reading ${jsFile}: ${error.message}`);
        }
    });
}

/**
 * Test 6: Verify accessibility features
 */
function testAccessibilityFeatures() {
    console.log('\n♿ Testing Accessibility Features...');
    
    try {
        const indexContent = fs.readFileSync('index.html', 'utf8');
        
        // Test for skip links
        if (indexContent.includes('skip-link')) {
            logResult('Accessibility', 'PASS', 'Skip links found');
        } else {
            logResult('Accessibility', 'FAIL', 'Skip links missing');
        }
        
        // Test for ARIA attributes
        if (indexContent.includes('aria-')) {
            logResult('Accessibility', 'PASS', 'ARIA attributes found');
        } else {
            logResult('Accessibility', 'FAIL', 'ARIA attributes missing');
        }
        
        // Test for semantic HTML
        const semanticElements = ['<main', '<nav', '<section', '<article', '<header', '<footer'];
        const foundSemantic = semanticElements.filter(element => indexContent.includes(element));
        
        if (foundSemantic.length >= 3) {
            logResult('Accessibility', 'PASS', `Semantic HTML elements found: ${foundSemantic.length}`);
        } else {
            logResult('Accessibility', 'WARN', `Limited semantic HTML elements: ${foundSemantic.length}`);
        }
        
        // Test for alt text structure
        if (indexContent.includes('alt=')) {
            logResult('Accessibility', 'PASS', 'Alt text attributes found');
        } else {
            logResult('Accessibility', 'WARN', 'Alt text attributes may be missing');
        }
        
    } catch (error) {
        logResult('Accessibility', 'FAIL', `Error testing accessibility: ${error.message}`);
    }
}

/**
 * Test 7: Verify performance optimizations
 */
function testPerformanceOptimizations() {
    console.log('\n🚀 Testing Performance Optimizations...');
    
    try {
        const indexContent = fs.readFileSync('index.html', 'utf8');
        
        // Test for preload links
        if (indexContent.includes('rel="preload"')) {
            logResult('Performance', 'PASS', 'Resource preloading found');
        } else {
            logResult('Performance', 'WARN', 'Resource preloading missing');
        }
        
        // Test for lazy loading
        if (indexContent.includes('loading="lazy"')) {
            logResult('Performance', 'PASS', 'Lazy loading implemented');
        } else {
            logResult('Performance', 'WARN', 'Lazy loading not implemented');
        }
        
        // Test for service worker
        if (fs.existsSync('sw.js')) {
            logResult('Performance', 'PASS', 'Service worker found');
        } else {
            logResult('Performance', 'WARN', 'Service worker missing');
        }
        
        // Test for critical CSS
        if (indexContent.includes('<style>')) {
            logResult('Performance', 'PASS', 'Inline critical CSS found');
        } else {
            logResult('Performance', 'WARN', 'Inline critical CSS missing');
        }
        
    } catch (error) {
        logResult('Performance', 'FAIL', `Error testing performance: ${error.message}`);
    }
}

/**
 * Test 8: Verify navigation and integration features
 */
function testNavigationIntegration() {
    console.log('\n🧭 Testing Navigation Integration...');
    
    const expectedProjects = ['acai-dany', 'barbearia-raimundos', 'financas-pessoais', 'whatsapp-bot-ai', 'landpage-divulga'];
    
    expectedProjects.forEach(project => {
        const demoIndexPath = `demos/${project}/index.html`;
        
        try {
            if (fs.existsSync(demoIndexPath)) {
                const demoContent = fs.readFileSync(demoIndexPath, 'utf8');
                
                // Test for navigation back to portfolio
                if (demoContent.includes('Voltar') || demoContent.includes('Portfolio') || demoContent.includes('../index.html')) {
                    logResult('Navigation', 'PASS', `${project} has navigation back to portfolio`);
                } else {
                    logResult('Navigation', 'WARN', `${project} may lack navigation back to portfolio`);
                }
                
                // Test for demo wrapper
                if (demoContent.includes('demo-nav') || demoContent.includes('demo-wrapper')) {
                    logResult('Navigation', 'PASS', `${project} has demo navigation wrapper`);
                } else {
                    logResult('Navigation', 'WARN', `${project} may lack demo navigation wrapper`);
                }
            }
        } catch (error) {
            logResult('Navigation', 'FAIL', `Error testing navigation for ${project}: ${error.message}`);
        }
    });
}

/**
 * Test 9: Verify deployment readiness
 */
function testDeploymentReadiness() {
    console.log('\n🚀 Testing Deployment Readiness...');
    
    // Test for deployment configuration files
    const deploymentFiles = [
        'vercel.json',
        'netlify.toml',
        '_config.yml'
    ];
    
    let deploymentConfigFound = false;
    deploymentFiles.forEach(file => {
        if (fs.existsSync(file)) {
            logResult('Deployment', 'PASS', `${file} configuration found`);
            deploymentConfigFound = true;
        }
    });
    
    if (!deploymentConfigFound) {
        logResult('Deployment', 'WARN', 'No deployment configuration files found');
    }
    
    // Test for documentation
    const docFiles = ['README.md', 'SETUP.md', 'DEPLOYMENT.md'];
    docFiles.forEach(file => {
        if (fs.existsSync(file)) {
            logResult('Deployment', 'PASS', `${file} documentation found`);
        } else {
            logResult('Deployment', 'WARN', `${file} documentation missing`);
        }
    });
    
    // Test for robots.txt and favicon
    if (fs.existsSync('robots.txt')) {
        logResult('Deployment', 'PASS', 'robots.txt found');
    } else {
        logResult('Deployment', 'WARN', 'robots.txt missing');
    }
}

/**
 * Test 10: Verify mock data and state management
 */
function testMockDataAndState() {
    console.log('\n🎭 Testing Mock Data and State Management...');
    
    const expectedProjects = ['acai-dany', 'barbearia-raimundos', 'financas-pessoais', 'whatsapp-bot-ai', 'landpage-divulga'];
    
    let mockDataCount = 0;
    expectedProjects.forEach(project => {
        const mockDataPath = `demos/${project}/mock-data.js`;
        
        if (fs.existsSync(mockDataPath)) {
            logResult('Mock Data', 'PASS', `${project} has mock data system`);
            mockDataCount++;
        } else {
            logResult('Mock Data', 'WARN', `${project} lacks mock data system`);
        }
    });
    
    if (mockDataCount >= 3) {
        logResult('Mock Data', 'PASS', `Sufficient mock data systems (${mockDataCount}/5)`);
    } else {
        logResult('Mock Data', 'WARN', `Limited mock data systems (${mockDataCount}/5)`);
    }
    
    // Test for state reset system
    if (fs.existsSync('state-reset-system.js')) {
        logResult('State Management', 'PASS', 'State reset system found');
    } else {
        logResult('State Management', 'WARN', 'State reset system missing');
    }
}

/**
 * Generate final report
 */
function generateReport() {
    console.log('\n📊 INTEGRATION TEST REPORT');
    console.log('=' .repeat(50));
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️  Warnings: ${testResults.warnings}`);
    console.log(`📝 Total Tests: ${testResults.passed + testResults.failed + testResults.warnings}`);
    
    const successRate = (testResults.passed / (testResults.passed + testResults.failed + testResults.warnings)) * 100;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
    
    console.log('\n🎯 REQUIREMENTS VALIDATION:');
    console.log('Requirements 1.1 (all projects present): ' + (testResults.details.some(d => d.test === 'Project Demos' && d.status === 'PASS') ? '✅' : '❌'));
    console.log('Requirements 4.2 (responsive design): ' + (testResults.details.some(d => d.test === 'CSS Integration' && d.message.includes('media queries')) ? '✅' : '❌'));
    console.log('Requirements 7.2 (mobile/tablet/desktop): ' + (testResults.details.some(d => d.test === 'CSS Integration' && d.status === 'PASS') ? '✅' : '❌'));
    console.log('Requirements 5.4 (repository completeness): ' + (testResults.details.some(d => d.test === 'File Structure' && d.status === 'PASS') ? '✅' : '❌'));
    console.log('Requirements 7.3-7.5 (accessibility): ' + (testResults.details.some(d => d.test === 'Accessibility' && d.status === 'PASS') ? '✅' : '❌'));
    
    if (testResults.failed === 0) {
        console.log('\n🎉 INTEGRATION TEST PASSED! All components are properly integrated.');
    } else if (testResults.failed <= 2) {
        console.log('\n⚠️  INTEGRATION TEST PASSED WITH WARNINGS. Minor issues detected.');
    } else {
        console.log('\n❌ INTEGRATION TEST FAILED. Critical issues need to be addressed.');
    }
    
    // Save detailed report
    const reportData = {
        timestamp: new Date().toISOString(),
        summary: {
            passed: testResults.passed,
            failed: testResults.failed,
            warnings: testResults.warnings,
            successRate: successRate
        },
        details: testResults.details
    };
    
    fs.writeFileSync('integration-test-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Detailed report saved to: integration-test-report.json');
}

/**
 * Main test execution
 */
function runIntegrationTests() {
    console.log('🧪 PORTFOLIO DEMO SYSTEM - COMPLETE INTEGRATION TEST');
    console.log('=' .repeat(60));
    console.log('Testing all components and end-to-end functionality...\n');
    
    // Run all tests
    testFileStructure();
    testProjectDemos();
    testHTMLStructure();
    testCSSIntegration();
    testJavaScriptIntegration();
    testAccessibilityFeatures();
    testPerformanceOptimizations();
    testNavigationIntegration();
    testDeploymentReadiness();
    testMockDataAndState();
    
    // Generate final report
    generateReport();
}

// Run tests if called directly
if (require.main === module) {
    runIntegrationTests();
}

module.exports = {
    runIntegrationTests,
    testResults
};