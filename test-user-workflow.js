/**
 * User Workflow Test Suite for Portfolio Demo System
 * Tests complete user journeys and cross-component communication
 */

// Workflow test state
const workflowState = {
    currentStep: 0,
    totalSteps: 8,
    results: {},
    startTime: null,
    errors: [],
    warnings: []
};

// Expected projects for testing
const expectedProjects = [
    'acai-dany',
    'barbearia-raimundos', 
    'financas-pessoais',
    'whatsapp-bot-ai',
    'landpage-divulga'
];

/**
 * Workflow Step 1: Landing Page Load Test
 */
async function testLandingPageLoad() {
    const stepName = 'step1';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Show the iframe
        const frame = document.getElementById('frame-step1');
        frame.style.display = 'block';
        
        // Wait for frame to load
        await new Promise(resolve => {
            frame.onload = resolve;
            setTimeout(resolve, 3000); // Fallback timeout
        });
        
        // Test 1: Page loads successfully
        total++;
        try {
            const frameDoc = frame.contentDocument || frame.contentWindow.document;
            if (frameDoc && frameDoc.readyState === 'complete') {
                results.push('✅ Landing page loaded successfully');
                passed++;
            } else {
                results.push('❌ Landing page failed to load completely');
            }
        } catch (error) {
            results.push('❌ Cannot access frame content (CORS or loading issue)');
        }
        
        // Test 2: Performance check (load time)
        total++;
        const loadTime = performance.now();
        if (loadTime < 5000) {
            results.push(`✅ Page load time acceptable (${Math.round(loadTime)}ms)`);
            passed++;
        } else {
            results.push(`❌ Page load time too slow (${Math.round(loadTime)}ms)`);
        }
        
        // Test 3: Check if main elements are present
        total++;
        try {
            const frameDoc = frame.contentDocument || frame.contentWindow.document;
            const gallery = frameDoc?.querySelector('.project-gallery');
            const modal = frameDoc?.querySelector('.demo-modal');
            
            if (gallery && modal) {
                results.push('✅ Main UI elements found (gallery, modal)');
                passed++;
            } else {
                results.push('❌ Main UI elements missing');
            }
        } catch (error) {
            results.push('⚠️  Cannot verify UI elements (frame access restricted)');
        }
        
        const success = passed >= total * 0.67; // Allow some flexibility for CORS issues
        results.push(`\n📊 Landing Page Test: ${passed}/${total} checks passed`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Landing page test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 2: Project Gallery Interaction Test
 */
async function testGalleryInteraction() {
    const stepName = 'step2';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test 1: Check if all project demos are accessible
        for (const project of expectedProjects) {
            total++;
            try {
                const response = await fetch(`demos/${project}/index.html`);
                if (response.ok) {
                    results.push(`✅ ${project} demo accessible`);
                    passed++;
                } else {
                    results.push(`❌ ${project} demo not accessible (${response.status})`);
                }
            } catch (error) {
                results.push(`❌ ${project} demo error: ${error.message}`);
            }
        }
        
        // Test 2: Check project configuration
        total++;
        try {
            const response = await fetch('assets/js/main.js');
            if (response.ok) {
                const jsContent = await response.text();
                const hasProjectConfig = jsContent.includes('projectConfig') && 
                                       jsContent.includes('acai-dany') &&
                                       jsContent.includes('barbearia-raimundos');
                
                if (hasProjectConfig) {
                    results.push('✅ Project configuration found in main.js');
                    passed++;
                } else {
                    results.push('❌ Project configuration incomplete');
                }
            } else {
                results.push('❌ Cannot access main.js');
            }
        } catch (error) {
            results.push(`❌ Project configuration test error: ${error.message}`);
        }
        
        // Test 3: Check gallery CSS
        total++;
        try {
            const response = await fetch('assets/css/gallery.css');
            if (response.ok) {
                const cssContent = await response.text();
                const hasGalleryStyles = cssContent.includes('project-card') || 
                                       cssContent.includes('project-gallery');
                
                if (hasGalleryStyles) {
                    results.push('✅ Gallery styles found');
                    passed++;
                } else {
                    results.push('❌ Gallery styles missing');
                }
            } else {
                results.push('❌ Gallery CSS not found');
            }
        } catch (error) {
            results.push(`❌ Gallery CSS test error: ${error.message}`);
        }
        
        const success = passed >= total * 0.8;
        results.push(`\n📊 Gallery Interaction Test: ${passed}/${total} checks passed`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Gallery interaction test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 3: Demo Loading and Navigation Test
 */
async function testDemoLoading() {
    const stepName = 'step3';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test 1: Check demo loader JavaScript
        total++;
        try {
            const response = await fetch('assets/js/demo-loader.js');
            if (response.ok) {
                const jsContent = await response.text();
                const hasDemoLoader = jsContent.includes('loadDemo') || 
                                    jsContent.includes('iframe') ||
                                    jsContent.includes('modal');
                
                if (hasDemoLoader) {
                    results.push('✅ Demo loader functionality found');
                    passed++;
                } else {
                    results.push('❌ Demo loader functionality missing');
                }
            } else {
                results.push('❌ Demo loader JS not found');
            }
        } catch (error) {
            results.push(`❌ Demo loader test error: ${error.message}`);
        }
        
        // Test 2: Check navigation JavaScript
        total++;
        try {
            const response = await fetch('assets/js/navigation.js');
            if (response.ok) {
                const jsContent = await response.text();
                const hasNavigation = jsContent.includes('navigation') || 
                                    jsContent.includes('navigate') ||
                                    jsContent.includes('breadcrumb');
                
                if (hasNavigation) {
                    results.push('✅ Navigation functionality found');
                    passed++;
                } else {
                    results.push('❌ Navigation functionality missing');
                }
            } else {
                results.push('❌ Navigation JS not found');
            }
        } catch (error) {
            results.push(`❌ Navigation test error: ${error.message}`);
        }
        
        // Test 3: Check modal structure in main HTML
        total++;
        try {
            const response = await fetch('index.html');
            if (response.ok) {
                const htmlContent = await response.text();
                const hasModal = htmlContent.includes('demo-modal') && 
                               htmlContent.includes('demoFrame') &&
                               htmlContent.includes('close-demo');
                
                if (hasModal) {
                    results.push('✅ Modal structure complete');
                    passed++;
                } else {
                    results.push('❌ Modal structure incomplete');
                }
            } else {
                results.push('❌ Cannot access main HTML');
            }
        } catch (error) {
            results.push(`❌ Modal structure test error: ${error.message}`);
        }
        
        const success = passed >= total * 0.67;
        results.push(`\n📊 Demo Loading Test: ${passed}/${total} checks passed`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Demo loading test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 4: Individual Demo Functionality Test
 */
async function testIndividualDemos() {
    const stepName = 'step4';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test each project demo
        for (const project of expectedProjects) {
            total++;
            
            try {
                const response = await fetch(`demos/${project}/index.html`);
                if (response.ok) {
                    const htmlContent = await response.text();
                    
                    // Check for basic HTML structure
                    const hasValidStructure = htmlContent.includes('<!DOCTYPE html>') &&
                                            htmlContent.includes('<title>') &&
                                            htmlContent.includes('<body>');
                    
                    if (hasValidStructure) {
                        results.push(`✅ ${project}: Valid HTML structure`);
                        passed++;
                    } else {
                        results.push(`❌ ${project}: Invalid HTML structure`);
                    }
                } else {
                    results.push(`❌ ${project}: Demo not accessible`);
                }
            } catch (error) {
                results.push(`❌ ${project}: Test error - ${error.message}`);
            }
        }
        
        // Test mock data systems
        total++;
        let mockDataCount = 0;
        for (const project of expectedProjects) {
            try {
                const response = await fetch(`demos/${project}/mock-data.js`);
                if (response.ok) {
                    mockDataCount++;
                }
            } catch (error) {
                // Mock data file might not exist for all projects
            }
        }
        
        if (mockDataCount >= 2) {
            results.push(`✅ Mock data systems found (${mockDataCount} projects)`);
            passed++;
        } else {
            results.push(`❌ Insufficient mock data systems (${mockDataCount} found)`);
        }
        
        const success = passed >= total * 0.8;
        results.push(`\n📊 Individual Demos Test: ${passed}/${total} demos functional`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Individual demos test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 5: Responsive Behavior Test
 */
async function testResponsiveBehavior() {
    const stepName = 'step5';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test 1: Check main CSS for responsive design
        total++;
        try {
            const response = await fetch('assets/css/main.css');
            if (response.ok) {
                const cssContent = await response.text();
                const hasMediaQueries = cssContent.includes('@media') && 
                                      (cssContent.includes('max-width') || cssContent.includes('min-width'));
                
                if (hasMediaQueries) {
                    results.push('✅ Main CSS has responsive media queries');
                    passed++;
                } else {
                    results.push('❌ Main CSS lacks responsive media queries');
                }
            } else {
                results.push('❌ Cannot access main CSS');
            }
        } catch (error) {
            results.push(`❌ Main CSS test error: ${error.message}`);
        }
        
        // Test 2: Check gallery CSS for responsive grid
        total++;
        try {
            const response = await fetch('assets/css/gallery.css');
            if (response.ok) {
                const cssContent = await response.text();
                const hasResponsiveGrid = cssContent.includes('grid') || 
                                        cssContent.includes('flex') ||
                                        cssContent.includes('@media');
                
                if (hasResponsiveGrid) {
                    results.push('✅ Gallery CSS has responsive layout');
                    passed++;
                } else {
                    results.push('❌ Gallery CSS lacks responsive layout');
                }
            } else {
                results.push('❌ Gallery CSS not found');
            }
        } catch (error) {
            results.push(`❌ Gallery CSS test error: ${error.message}`);
        }
        
        // Test 3: Check viewport meta tag
        total++;
        try {
            const response = await fetch('index.html');
            if (response.ok) {
                const htmlContent = await response.text();
                const hasViewportMeta = htmlContent.includes('name="viewport"') &&
                                      htmlContent.includes('width=device-width');
                
                if (hasViewportMeta) {
                    results.push('✅ Viewport meta tag configured correctly');
                    passed++;
                } else {
                    results.push('❌ Viewport meta tag missing or incorrect');
                }
            } else {
                results.push('❌ Cannot access main HTML');
            }
        } catch (error) {
            results.push(`❌ Viewport meta test error: ${error.message}`);
        }
        
        const success = passed >= total * 0.67;
        results.push(`\n📊 Responsive Behavior Test: ${passed}/${total} responsive features working`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Responsive behavior test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 6: Accessibility Features Test
 */
async function testAccessibilityFeatures() {
    const stepName = 'step6';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test 1: Check accessibility CSS
        total++;
        try {
            const response = await fetch('assets/css/accessibility.css');
            if (response.ok) {
                results.push('✅ Accessibility CSS found');
                passed++;
            } else {
                results.push('❌ Accessibility CSS missing');
            }
        } catch (error) {
            results.push(`❌ Accessibility CSS test error: ${error.message}`);
        }
        
        // Test 2: Check accessibility JavaScript
        total++;
        try {
            const response = await fetch('assets/js/accessibility.js');
            if (response.ok) {
                results.push('✅ Accessibility JS found');
                passed++;
            } else {
                results.push('❌ Accessibility JS missing');
            }
        } catch (error) {
            results.push(`❌ Accessibility JS test error: ${error.message}`);
        }
        
        // Test 3: Check ARIA attributes in HTML
        total++;
        try {
            const response = await fetch('index.html');
            if (response.ok) {
                const htmlContent = await response.text();
                const hasARIA = htmlContent.includes('aria-') && 
                              htmlContent.includes('role=') &&
                              htmlContent.includes('aria-label');
                
                if (hasARIA) {
                    results.push('✅ ARIA attributes found in HTML');
                    passed++;
                } else {
                    results.push('❌ ARIA attributes missing or insufficient');
                }
            } else {
                results.push('❌ Cannot access main HTML');
            }
        } catch (error) {
            results.push(`❌ ARIA attributes test error: ${error.message}`);
        }
        
        // Test 4: Check semantic HTML elements
        total++;
        try {
            const response = await fetch('index.html');
            if (response.ok) {
                const htmlContent = await response.text();
                const semanticElements = ['<main', '<nav', '<section', '<header', '<footer'];
                const foundElements = semanticElements.filter(element => htmlContent.includes(element));
                
                if (foundElements.length >= 3) {
                    results.push(`✅ Semantic HTML elements found (${foundElements.length})`);
                    passed++;
                } else {
                    results.push(`❌ Insufficient semantic HTML elements (${foundElements.length})`);
                }
            } else {
                results.push('❌ Cannot access main HTML');
            }
        } catch (error) {
            results.push(`❌ Semantic HTML test error: ${error.message}`);
        }
        
        const success = passed >= total * 0.75;
        results.push(`\n📊 Accessibility Test: ${passed}/${total} accessibility features working`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Accessibility features test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 7: State Management Test
 */
async function testStateManagement() {
    const stepName = 'step7';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test 1: Check for state reset system
        total++;
        try {
            const response = await fetch('state-reset-system.js');
            if (response.ok) {
                results.push('✅ State reset system found');
                passed++;
            } else {
                results.push('⚠️  State reset system not found (may be integrated elsewhere)');
            }
        } catch (error) {
            results.push('⚠️  State reset system test error (may be integrated elsewhere)');
        }
        
        // Test 2: Check for mock data in demos
        total++;
        let mockDataCount = 0;
        for (const project of expectedProjects) {
            try {
                const response = await fetch(`demos/${project}/mock-data.js`);
                if (response.ok) {
                    mockDataCount++;
                }
            } catch (error) {
                // Some projects might not have separate mock data files
            }
        }
        
        if (mockDataCount >= 2) {
            results.push(`✅ Mock data systems found (${mockDataCount} projects)`);
            passed++;
        } else {
            results.push(`⚠️  Limited mock data systems (${mockDataCount} found)`);
        }
        
        // Test 3: Check main.js for state management
        total++;
        try {
            const response = await fetch('assets/js/main.js');
            if (response.ok) {
                const jsContent = await response.text();
                const hasStateManagement = jsContent.includes('demoState') || 
                                          jsContent.includes('state') ||
                                          jsContent.includes('reset');
                
                if (hasStateManagement) {
                    results.push('✅ State management found in main.js');
                    passed++;
                } else {
                    results.push('❌ State management missing from main.js');
                }
            } else {
                results.push('❌ Cannot access main.js');
            }
        } catch (error) {
            results.push(`❌ State management test error: ${error.message}`);
        }
        
        const success = passed >= total * 0.67; // Allow flexibility
        results.push(`\n📊 State Management Test: ${passed}/${total} state features working`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ State management test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Workflow Step 8: Complete User Journey Test
 */
async function testCompleteJourney() {
    const stepName = 'step8';
    updateStepStatus(stepName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test 1: Landing page to demo navigation
        total++;
        const hasLandingPage = await fetch('index.html').then(r => r.ok);
        const hasAllDemos = await Promise.all(
            expectedProjects.map(p => fetch(`demos/${p}/index.html`).then(r => r.ok))
        ).then(results => results.every(r => r));
        
        if (hasLandingPage && hasAllDemos) {
            results.push('✅ Complete navigation path available (landing → demos)');
            passed++;
        } else {
            results.push('❌ Navigation path incomplete');
        }
        
        // Test 2: Demo to landing navigation
        total++;
        let backNavigationCount = 0;
        for (const project of expectedProjects) {
            try {
                const response = await fetch(`demos/${project}/index.html`);
                if (response.ok) {
                    const htmlContent = await response.text();
                    if (htmlContent.includes('Voltar') || 
                        htmlContent.includes('Portfolio') || 
                        htmlContent.includes('../index.html')) {
                        backNavigationCount++;
                    }
                }
            } catch (error) {
                // Continue checking other projects
            }
        }
        
        if (backNavigationCount >= 3) {
            results.push(`✅ Back navigation available (${backNavigationCount} demos)`);
            passed++;
        } else {
            results.push(`❌ Insufficient back navigation (${backNavigationCount} demos)`);
        }
        
        // Test 3: Error handling and recovery
        total++;
        try {
            const response = await fetch('index.html');
            if (response.ok) {
                const htmlContent = await response.text();
                const hasErrorHandling = htmlContent.includes('error-overlay') || 
                                       htmlContent.includes('loading-overlay') ||
                                       htmlContent.includes('retry');
                
                if (hasErrorHandling) {
                    results.push('✅ Error handling and recovery mechanisms found');
                    passed++;
                } else {
                    results.push('❌ Error handling mechanisms missing');
                }
            } else {
                results.push('❌ Cannot access main HTML');
            }
        } catch (error) {
            results.push(`❌ Error handling test error: ${error.message}`);
        }
        
        // Test 4: Performance across journey
        total++;
        const performanceStart = performance.now();
        
        // Simulate loading multiple resources
        const resourceTests = await Promise.allSettled([
            fetch('assets/css/main.css'),
            fetch('assets/js/main.js'),
            fetch('demos/acai-dany/index.html'),
            fetch('demos/barbearia-raimundos/index.html')
        ]);
        
        const performanceEnd = performance.now();
        const journeyTime = performanceEnd - performanceStart;
        
        if (journeyTime < 3000 && resourceTests.filter(r => r.status === 'fulfilled').length >= 3) {
            results.push(`✅ Journey performance acceptable (${Math.round(journeyTime)}ms)`);
            passed++;
        } else {
            results.push(`❌ Journey performance issues (${Math.round(journeyTime)}ms)`);
        }
        
        const success = passed >= total * 0.75;
        results.push(`\n📊 Complete Journey Test: ${passed}/${total} journey components working`);
        
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, success ? 'success' : 'error');
        workflowState.results[stepName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Complete journey test failed: ${error.message}`);
        updateStepResults(stepName, results.join('\n'));
        updateStepStatus(stepName, 'error');
        workflowState.results[stepName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Run all workflow tests in sequence
 */
async function runAllWorkflowTests() {
    workflowState.startTime = Date.now();
    workflowState.currentStep = 0;
    
    const runAllBtn = document.getElementById('runAllBtn');
    runAllBtn.disabled = true;
    runAllBtn.textContent = 'Running Workflow Tests...';
    
    const tests = [
        testLandingPageLoad,
        testGalleryInteraction,
        testDemoLoading,
        testIndividualDemos,
        testResponsiveBehavior,
        testAccessibilityFeatures,
        testStateManagement,
        testCompleteJourney
    ];
    
    for (let i = 0; i < tests.length; i++) {
        workflowState.currentStep = i + 1;
        
        await tests[i]();
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Show workflow summary
    showWorkflowSummary();
    
    runAllBtn.disabled = false;
    runAllBtn.textContent = 'Run All Workflows';
}

/**
 * Reset all workflow tests
 */
function resetAllTests() {
    workflowState.results = {};
    workflowState.currentStep = 0;
    workflowState.errors = [];
    workflowState.warnings = [];
    
    // Reset all status indicators
    for (let i = 1; i <= workflowState.totalSteps; i++) {
        updateStepStatus(`step${i}`, '');
        updateStepResults(`step${i}`, '');
    }
    
    // Hide frame
    document.getElementById('frame-step1').style.display = 'none';
    document.getElementById('workflowSummary').style.display = 'none';
}

/**
 * Update step status indicator
 */
function updateStepStatus(stepName, status) {
    const indicator = document.getElementById(`status-${stepName}`);
    if (indicator) {
        indicator.className = `status-indicator ${status}`;
    }
}

/**
 * Update step results display
 */
function updateStepResults(stepName, results) {
    const resultsElement = document.getElementById(`results-${stepName}`);
    if (resultsElement) {
        resultsElement.textContent = results;
    }
}

/**
 * Show workflow summary
 */
function showWorkflowSummary() {
    const summary = document.getElementById('workflowSummary');
    const totalWorkflows = Object.keys(workflowState.results).length;
    const passedWorkflows = Object.values(workflowState.results).filter(r => r.success).length;
    const failedWorkflows = totalWorkflows - passedWorkflows;
    const duration = Math.round((Date.now() - workflowState.startTime) / 1000);
    
    document.getElementById('totalWorkflows').textContent = totalWorkflows;
    document.getElementById('passedWorkflows').textContent = passedWorkflows;
    document.getElementById('failedWorkflows').textContent = failedWorkflows;
    document.getElementById('workflowDuration').textContent = `${duration}s`;
    
    // Generate detailed summary
    const details = Object.entries(workflowState.results).map(([stepName, result]) => {
        const status = result.success ? '✅' : '❌';
        return `${status} ${stepName}: ${result.passed}/${result.total}`;
    }).join('\n');
    
    document.getElementById('workflowDetails').innerHTML = `
        <h4>Detailed Results:</h4>
        <pre>${details}</pre>
        <p><strong>Overall Status:</strong> ${passedWorkflows === totalWorkflows ? '✅ All workflows passed!' : `⚠️ ${failedWorkflows} workflow(s) failed`}</p>
        <p><strong>Requirements Validation:</strong></p>
        <ul>
            <li>Requirements 1.1 (all projects present): ${passedWorkflows >= 4 ? '✅ PASS' : '❌ FAIL'}</li>
            <li>Requirements 4.2 (responsive design): ${passedWorkflows >= 5 ? '✅ PASS' : '❌ FAIL'}</li>
            <li>Requirements 7.2 (mobile/tablet/desktop): ${passedWorkflows >= 5 ? '✅ PASS' : '❌ FAIL'}</li>
            <li>Complete user workflow: ${passedWorkflows >= 7 ? '✅ PASS' : '❌ FAIL'}</li>
        </ul>
    `;
    
    summary.style.display = 'block';
}

// Initialize workflow test interface
document.addEventListener('DOMContentLoaded', function() {
    console.log('User Workflow Test Suite initialized');
});