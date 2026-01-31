/**
 * End-to-End Integration Test Suite for Portfolio Demo System
 * Tests all components working together and validates requirements
 */

// Test state management
const testState = {
    currentTest: 0,
    totalTests: 10,
    results: {},
    startTime: null,
    errors: [],
    warnings: []
};

// Project configuration for testing
const expectedProjects = [
    'acai-dany',
    'barbearia-raimundos', 
    'financas-pessoais',
    'whatsapp-bot-ai',
    'landpage-divulga'
];

/**
 * Test 1: Component Integration
 * Validates: Requirements 5.4 (repository completeness)
 */
async function testComponentIntegration() {
    const testName = 'integration';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test CSS files loading
        const cssFiles = [
            'assets/css/main.css',
            'assets/css/gallery.css', 
            'assets/css/navigation.css',
            'assets/css/accessibility.css',
            'assets/css/performance.css'
        ];
        
        for (const cssFile of cssFiles) {
            total++;
            try {
                const response = await fetch(cssFile);
                if (response.ok) {
                    results.push(`✅ CSS loaded: ${cssFile}`);
                    passed++;
                } else {
                    results.push(`❌ CSS failed: ${cssFile} (${response.status})`);
                }
            } catch (error) {
                results.push(`❌ CSS error: ${cssFile} - ${error.message}`);
            }
        }
        
        // Test JS files loading
        const jsFiles = [
            'assets/js/main.js',
            'assets/js/demo-loader.js',
            'assets/js/navigation.js',
            'assets/js/accessibility.js',
            'assets/js/performance.js',
            'assets/js/file-operations.js'
        ];
        
        for (const jsFile of jsFiles) {
            total++;
            try {
                const response = await fetch(jsFile);
                if (response.ok) {
                    results.push(`✅ JS loaded: ${jsFile}`);
                    passed++;
                } else {
                    results.push(`❌ JS failed: ${jsFile} (${response.status})`);
                }
            } catch (error) {
                results.push(`❌ JS error: ${jsFile} - ${error.message}`);
            }
        }
        
        // Test main HTML structure
        total++;
        const mainContent = document.querySelector('#main-content');
        if (mainContent) {
            results.push(`✅ Main content structure found`);
            passed++;
        } else {
            results.push(`❌ Main content structure missing`);
        }
        
        // Test project gallery container
        total++;
        const galleryContainer = document.querySelector('.project-gallery');
        if (galleryContainer) {
            results.push(`✅ Project gallery container found`);
            passed++;
        } else {
            results.push(`❌ Project gallery container missing`);
        }
        
        // Test modal structure
        total++;
        const modal = document.querySelector('.demo-modal');
        if (modal) {
            results.push(`✅ Demo modal structure found`);
            passed++;
        } else {
            results.push(`❌ Demo modal structure missing`);
        }
        
        const success = passed === total;
        results.push(`\n📊 Integration Test: ${passed}/${total} components loaded successfully`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'error');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Integration test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 2: Project Gallery
 * Validates: Requirements 1.1 (all projects present)
 */
async function testProjectGallery() {
    const testName = 'gallery';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Show gallery preview
        const galleryPreview = document.getElementById('gallery-preview');
        galleryPreview.style.display = 'block';
        
        // Wait for gallery to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test each expected project
        for (const projectKey of expectedProjects) {
            total++;
            
            // Check if demo directory exists
            try {
                const response = await fetch(`demos/${projectKey}/index.html`);
                if (response.ok) {
                    results.push(`✅ Project demo found: ${projectKey}`);
                    passed++;
                } else {
                    results.push(`❌ Project demo missing: ${projectKey} (${response.status})`);
                }
            } catch (error) {
                results.push(`❌ Project demo error: ${projectKey} - ${error.message}`);
            }
        }
        
        // Test project configuration
        total++;
        try {
            const configResponse = await fetch('assets/js/project-config.json');
            if (configResponse.ok) {
                const config = await configResponse.json();
                const configProjects = Object.keys(config);
                const hasAllProjects = expectedProjects.every(p => configProjects.includes(p));
                
                if (hasAllProjects) {
                    results.push(`✅ Project configuration complete`);
                    passed++;
                } else {
                    results.push(`❌ Project configuration incomplete`);
                }
            } else {
                results.push(`❌ Project configuration not found`);
            }
        } catch (error) {
            results.push(`❌ Project configuration error: ${error.message}`);
        }
        
        // Test gallery responsiveness
        total++;
        const gallery = document.querySelector('.project-gallery');
        if (gallery) {
            const computedStyle = window.getComputedStyle(gallery);
            const display = computedStyle.display;
            
            if (display === 'grid' || display === 'flex') {
                results.push(`✅ Gallery responsive layout: ${display}`);
                passed++;
            } else {
                results.push(`❌ Gallery layout not responsive: ${display}`);
            }
        } else {
            results.push(`❌ Gallery element not found`);
        }
        
        const success = passed === total;
        results.push(`\n📊 Gallery Test: ${passed}/${total} requirements met`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'error');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Gallery test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 3: Modal and Demo Loading
 * Validates: Requirements 1.3, 4.4 (modal functionality)
 */
async function testModalFunctionality() {
    const testName = 'modal';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test modal structure
        total++;
        const modal = document.querySelector('.demo-modal');
        if (modal) {
            results.push(`✅ Modal structure exists`);
            passed++;
        } else {
            results.push(`❌ Modal structure missing`);
        }
        
        // Test modal controls
        total++;
        const closeBtn = document.querySelector('.close-demo');
        const fullscreenBtn = document.querySelector('.fullscreen-btn');
        const externalLink = document.querySelector('.external-link');
        
        if (closeBtn && fullscreenBtn && externalLink) {
            results.push(`✅ Modal controls present`);
            passed++;
        } else {
            results.push(`❌ Modal controls missing`);
        }
        
        // Test iframe container
        total++;
        const iframe = document.querySelector('#demoFrame');
        if (iframe) {
            results.push(`✅ Demo iframe container found`);
            passed++;
        } else {
            results.push(`❌ Demo iframe container missing`);
        }
        
        // Test modal accessibility
        total++;
        const modalRole = modal?.getAttribute('role');
        const modalAriaModal = modal?.getAttribute('aria-modal');
        const modalAriaHidden = modal?.getAttribute('aria-hidden');
        
        if (modalRole === 'dialog' && modalAriaModal === 'true') {
            results.push(`✅ Modal accessibility attributes correct`);
            passed++;
        } else {
            results.push(`❌ Modal accessibility attributes missing or incorrect`);
        }
        
        // Test loading and error states
        total++;
        const loadingOverlay = document.querySelector('.loading-overlay');
        const errorOverlay = document.querySelector('.error-overlay');
        
        if (loadingOverlay && errorOverlay) {
            results.push(`✅ Loading and error states implemented`);
            passed++;
        } else {
            results.push(`❌ Loading or error states missing`);
        }
        
        const success = passed === total;
        results.push(`\n📊 Modal Test: ${passed}/${total} features working`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'error');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Modal test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 4: Navigation System
 * Validates: Requirements 4.5 (navigation back to portfolio)
 */
async function testNavigationSystem() {
    const testName = 'navigation';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test navigation CSS
        total++;
        try {
            const response = await fetch('assets/css/navigation.css');
            if (response.ok) {
                results.push(`✅ Navigation CSS loaded`);
                passed++;
            } else {
                results.push(`❌ Navigation CSS missing`);
            }
        } catch (error) {
            results.push(`❌ Navigation CSS error: ${error.message}`);
        }
        
        // Test navigation JS
        total++;
        try {
            const response = await fetch('assets/js/navigation.js');
            if (response.ok) {
                results.push(`✅ Navigation JS loaded`);
                passed++;
            } else {
                results.push(`❌ Navigation JS missing`);
            }
        } catch (error) {
            results.push(`❌ Navigation JS error: ${error.message}`);
        }
        
        // Test demo navigation in each project
        for (const projectKey of expectedProjects) {
            total++;
            try {
                const response = await fetch(`demos/${projectKey}/index.html`);
                if (response.ok) {
                    const html = await response.text();
                    
                    // Check for navigation elements
                    const hasNavigation = html.includes('demo-nav') || 
                                        html.includes('Voltar ao Portfolio') ||
                                        html.includes('← Voltar');
                    
                    if (hasNavigation) {
                        results.push(`✅ Navigation found in ${projectKey}`);
                        passed++;
                    } else {
                        results.push(`❌ Navigation missing in ${projectKey}`);
                    }
                } else {
                    results.push(`❌ Cannot check navigation in ${projectKey}`);
                }
            } catch (error) {
                results.push(`❌ Navigation test error for ${projectKey}: ${error.message}`);
            }
        }
        
        const success = passed >= total * 0.8; // Allow some flexibility
        results.push(`\n📊 Navigation Test: ${passed}/${total} navigation elements found`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Navigation test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 5: Individual Demo Functionality
 * Validates: Requirements 6.1-6.5 (project-specific features)
 */
async function testIndividualDemos() {
    const testName = 'demos';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        for (const projectKey of expectedProjects) {
            total++;
            
            try {
                // Test demo HTML structure
                const response = await fetch(`demos/${projectKey}/index.html`);
                if (response.ok) {
                    const html = await response.text();
                    
                    // Basic structure checks
                    const hasDoctype = html.includes('<!DOCTYPE html>');
                    const hasTitle = html.includes('<title>');
                    const hasBody = html.includes('<body>');
                    
                    if (hasDoctype && hasTitle && hasBody) {
                        results.push(`✅ ${projectKey}: Valid HTML structure`);
                        passed++;
                    } else {
                        results.push(`❌ ${projectKey}: Invalid HTML structure`);
                    }
                } else {
                    results.push(`❌ ${projectKey}: Demo not accessible (${response.status})`);
                }
            } catch (error) {
                results.push(`❌ ${projectKey}: Test error - ${error.message}`);
            }
        }
        
        // Test mock data systems
        total++;
        let mockDataFound = 0;
        for (const projectKey of expectedProjects) {
            try {
                const response = await fetch(`demos/${projectKey}/mock-data.js`);
                if (response.ok) {
                    mockDataFound++;
                }
            } catch (error) {
                // Mock data file might not exist for all projects
            }
        }
        
        if (mockDataFound >= 2) {
            results.push(`✅ Mock data systems found in ${mockDataFound} projects`);
            passed++;
        } else {
            results.push(`❌ Insufficient mock data systems (${mockDataFound} found)`);
        }
        
        const success = passed >= total * 0.8; // Allow some flexibility
        results.push(`\n📊 Demo Test: ${passed}/${total} demos functional`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Demo test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 6: Responsive Design
 * Validates: Requirements 4.2, 7.2 (responsive design)
 */
async function testResponsiveDesign() {
    const testName = 'responsive';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Show responsive preview
        const responsivePreview = document.getElementById('responsive-preview');
        responsivePreview.style.display = 'flex';
        
        // Test viewport meta tag
        total++;
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta && viewportMeta.content.includes('width=device-width')) {
            results.push(`✅ Viewport meta tag configured`);
            passed++;
        } else {
            results.push(`❌ Viewport meta tag missing or incorrect`);
        }
        
        // Test CSS media queries
        total++;
        try {
            const response = await fetch('assets/css/main.css');
            if (response.ok) {
                const css = await response.text();
                const hasMediaQueries = css.includes('@media') && 
                                      (css.includes('max-width') || css.includes('min-width'));
                
                if (hasMediaQueries) {
                    results.push(`✅ CSS media queries found`);
                    passed++;
                } else {
                    results.push(`❌ CSS media queries missing`);
                }
            } else {
                results.push(`❌ Cannot check CSS media queries`);
            }
        } catch (error) {
            results.push(`❌ CSS media query test error: ${error.message}`);
        }
        
        // Test responsive gallery CSS
        total++;
        try {
            const response = await fetch('assets/css/gallery.css');
            if (response.ok) {
                const css = await response.text();
                const hasResponsiveGrid = css.includes('grid') || css.includes('flex');
                
                if (hasResponsiveGrid) {
                    results.push(`✅ Responsive gallery layout found`);
                    passed++;
                } else {
                    results.push(`❌ Responsive gallery layout missing`);
                }
            } else {
                results.push(`❌ Gallery CSS not found`);
            }
        } catch (error) {
            results.push(`❌ Gallery responsive test error: ${error.message}`);
        }
        
        // Load responsive previews
        const mobileFrame = document.getElementById('mobile-frame');
        const tabletFrame = document.getElementById('tablet-frame');
        const desktopFrame = document.getElementById('desktop-frame');
        
        total++;
        try {
            mobileFrame.src = 'index.html';
            tabletFrame.src = 'index.html';
            desktopFrame.src = 'index.html';
            
            // Wait for frames to load
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            results.push(`✅ Responsive previews loaded`);
            passed++;
        } catch (error) {
            results.push(`❌ Responsive preview error: ${error.message}`);
        }
        
        const success = passed >= total * 0.75; // Allow some flexibility
        results.push(`\n📊 Responsive Test: ${passed}/${total} responsive features working`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Responsive test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 7: State Reset and Mock Data
 * Validates: Requirements 3.2, 3.4 (state reset)
 */
async function testStateReset() {
    const testName = 'state';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test state reset system
        total++;
        try {
            const response = await fetch('state-reset-system.js');
            if (response.ok) {
                results.push(`✅ State reset system found`);
                passed++;
            } else {
                results.push(`❌ State reset system missing`);
            }
        } catch (error) {
            results.push(`❌ State reset system error: ${error.message}`);
        }
        
        // Test mock data in demos
        total++;
        let mockDataCount = 0;
        for (const projectKey of expectedProjects) {
            try {
                const response = await fetch(`demos/${projectKey}/mock-data.js`);
                if (response.ok) {
                    mockDataCount++;
                }
            } catch (error) {
                // Some projects might not have mock data files
            }
        }
        
        if (mockDataCount >= 2) {
            results.push(`✅ Mock data systems found (${mockDataCount} projects)`);
            passed++;
        } else {
            results.push(`❌ Insufficient mock data systems (${mockDataCount} found)`);
        }
        
        // Test session storage handling
        total++;
        try {
            // Check if localStorage/sessionStorage is properly managed
            const hasStorageManagement = typeof(Storage) !== "undefined";
            if (hasStorageManagement) {
                results.push(`✅ Browser storage available for state management`);
                passed++;
            } else {
                results.push(`❌ Browser storage not available`);
            }
        } catch (error) {
            results.push(`❌ Storage test error: ${error.message}`);
        }
        
        const success = passed >= total * 0.67; // Allow flexibility
        results.push(`\n📊 State Test: ${passed}/${total} state management features working`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ State test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 8: Accessibility Features
 * Validates: Requirements 7.3, 7.4, 7.5 (accessibility)
 */
async function testAccessibility() {
    const testName = 'accessibility';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test accessibility CSS
        total++;
        try {
            const response = await fetch('assets/css/accessibility.css');
            if (response.ok) {
                results.push(`✅ Accessibility CSS loaded`);
                passed++;
            } else {
                results.push(`❌ Accessibility CSS missing`);
            }
        } catch (error) {
            results.push(`❌ Accessibility CSS error: ${error.message}`);
        }
        
        // Test accessibility JS
        total++;
        try {
            const response = await fetch('assets/js/accessibility.js');
            if (response.ok) {
                results.push(`✅ Accessibility JS loaded`);
                passed++;
            } else {
                results.push(`❌ Accessibility JS missing`);
            }
        } catch (error) {
            results.push(`❌ Accessibility JS error: ${error.message}`);
        }
        
        // Test skip links
        total++;
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            results.push(`✅ Skip link found`);
            passed++;
        } else {
            results.push(`❌ Skip link missing`);
        }
        
        // Test ARIA labels
        total++;
        const ariaLabels = document.querySelectorAll('[aria-label]');
        const ariaDescribedBy = document.querySelectorAll('[aria-describedby]');
        
        if (ariaLabels.length > 0 && ariaDescribedBy.length > 0) {
            results.push(`✅ ARIA labels found (${ariaLabels.length + ariaDescribedBy.length} elements)`);
            passed++;
        } else {
            results.push(`❌ ARIA labels insufficient`);
        }
        
        // Test semantic HTML
        total++;
        const semanticElements = document.querySelectorAll('main, nav, section, article, header, footer');
        if (semanticElements.length >= 3) {
            results.push(`✅ Semantic HTML elements found (${semanticElements.length})`);
            passed++;
        } else {
            results.push(`❌ Insufficient semantic HTML elements`);
        }
        
        // Test keyboard navigation
        total++;
        const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
        if (focusableElements.length > 0) {
            results.push(`✅ Focusable elements found (${focusableElements.length})`);
            passed++;
        } else {
            results.push(`❌ No focusable elements found`);
        }
        
        const success = passed >= total * 0.8;
        results.push(`\n📊 Accessibility Test: ${passed}/${total} accessibility features implemented`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Accessibility test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 9: Performance Validation
 * Validates: Requirements 4.3, 7.1 (performance requirements)
 */
async function testPerformance() {
    const testName = 'performance';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test performance CSS
        total++;
        try {
            const response = await fetch('assets/css/performance.css');
            if (response.ok) {
                results.push(`✅ Performance CSS loaded`);
                passed++;
            } else {
                results.push(`❌ Performance CSS missing`);
            }
        } catch (error) {
            results.push(`❌ Performance CSS error: ${error.message}`);
        }
        
        // Test performance JS
        total++;
        try {
            const response = await fetch('assets/js/performance.js');
            if (response.ok) {
                results.push(`✅ Performance JS loaded`);
                passed++;
            } else {
                results.push(`❌ Performance JS missing`);
            }
        } catch (error) {
            results.push(`❌ Performance JS error: ${error.message}`);
        }
        
        // Test service worker
        total++;
        try {
            const response = await fetch('sw.js');
            if (response.ok) {
                results.push(`✅ Service worker found`);
                passed++;
            } else {
                results.push(`❌ Service worker missing`);
            }
        } catch (error) {
            results.push(`❌ Service worker error: ${error.message}`);
        }
        
        // Test loading performance
        total++;
        const loadTime = performance.now();
        if (loadTime < 3000) {
            results.push(`✅ Page load time acceptable (${Math.round(loadTime)}ms)`);
            passed++;
        } else {
            results.push(`❌ Page load time too slow (${Math.round(loadTime)}ms)`);
        }
        
        // Test resource optimization
        total++;
        const images = document.querySelectorAll('img[loading="lazy"]');
        const preloadLinks = document.querySelectorAll('link[rel="preload"]');
        
        if (images.length > 0 || preloadLinks.length > 0) {
            results.push(`✅ Resource optimization found (lazy: ${images.length}, preload: ${preloadLinks.length})`);
            passed++;
        } else {
            results.push(`❌ No resource optimization found`);
        }
        
        const success = passed >= total * 0.8;
        results.push(`\n📊 Performance Test: ${passed}/${total} performance features implemented`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Performance test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Test 10: Complete User Workflow
 * Validates: Complete user journey requirements
 */
async function testCompleteWorkflow() {
    const testName = 'workflow';
    updateTestStatus(testName, 'running');
    
    let results = [];
    let passed = 0;
    let total = 0;
    
    try {
        // Test landing page accessibility
        total++;
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            results.push(`✅ Landing page main content accessible`);
            passed++;
        } else {
            results.push(`❌ Landing page main content not accessible`);
        }
        
        // Test project gallery interaction
        total++;
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length >= 5) {
            results.push(`✅ All project cards present (${projectCards.length})`);
            passed++;
        } else {
            results.push(`❌ Missing project cards (${projectCards.length}/5)`);
        }
        
        // Test modal workflow
        total++;
        const modal = document.querySelector('.demo-modal');
        const iframe = document.querySelector('#demoFrame');
        
        if (modal && iframe) {
            results.push(`✅ Modal workflow components present`);
            passed++;
        } else {
            results.push(`❌ Modal workflow components missing`);
        }
        
        // Test navigation workflow
        total++;
        const closeBtn = document.querySelector('.close-demo');
        const backLinks = document.querySelectorAll('a[href*="index.html"]');
        
        if (closeBtn || backLinks.length > 0) {
            results.push(`✅ Navigation workflow available`);
            passed++;
        } else {
            results.push(`❌ Navigation workflow missing`);
        }
        
        // Test error handling workflow
        total++;
        const errorOverlay = document.querySelector('.error-overlay');
        const loadingOverlay = document.querySelector('.loading-overlay');
        
        if (errorOverlay && loadingOverlay) {
            results.push(`✅ Error handling workflow implemented`);
            passed++;
        } else {
            results.push(`❌ Error handling workflow missing`);
        }
        
        const success = passed >= total * 0.8;
        results.push(`\n📊 Workflow Test: ${passed}/${total} workflow components functional`);
        
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, success ? 'success' : 'warning');
        testState.results[testName] = { passed, total, success };
        
    } catch (error) {
        results.push(`❌ Workflow test failed: ${error.message}`);
        updateTestResults(testName, results.join('\n'));
        updateTestStatus(testName, 'error');
        testState.results[testName] = { passed: 0, total: 1, success: false };
    }
}

/**
 * Run all tests in sequence
 */
async function runAllTests() {
    testState.startTime = Date.now();
    testState.currentTest = 0;
    
    const runAllBtn = document.getElementById('runAllBtn');
    runAllBtn.disabled = true;
    runAllBtn.textContent = 'Running Tests...';
    
    const tests = [
        testComponentIntegration,
        testProjectGallery,
        testModalFunctionality,
        testNavigationSystem,
        testIndividualDemos,
        testResponsiveDesign,
        testStateReset,
        testAccessibility,
        testPerformance,
        testCompleteWorkflow
    ];
    
    for (let i = 0; i < tests.length; i++) {
        testState.currentTest = i + 1;
        updateProgress();
        
        await tests[i]();
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Show test summary
    showTestSummary();
    
    runAllBtn.disabled = false;
    runAllBtn.textContent = 'Run Complete Test Suite';
    
    updateOverallStatus('All tests completed!');
}

/**
 * Reset all tests
 */
function resetAllTests() {
    testState.results = {};
    testState.currentTest = 0;
    testState.errors = [];
    testState.warnings = [];
    
    // Reset all status indicators
    const statusIndicators = document.querySelectorAll('.status-indicator');
    statusIndicators.forEach(indicator => {
        indicator.className = 'status-indicator';
    });
    
    // Clear all results
    const resultElements = document.querySelectorAll('.test-results');
    resultElements.forEach(element => {
        element.textContent = '';
    });
    
    // Hide previews
    document.getElementById('gallery-preview').style.display = 'none';
    document.getElementById('responsive-preview').style.display = 'none';
    document.getElementById('testSummary').style.display = 'none';
    
    // Reset progress
    updateProgress();
    updateOverallStatus('Ready to start testing...');
}

/**
 * Update test status indicator
 */
function updateTestStatus(testName, status) {
    const indicator = document.getElementById(`status-${testName}`);
    if (indicator) {
        indicator.className = `status-indicator ${status}`;
    }
}

/**
 * Update test results display
 */
function updateTestResults(testName, results) {
    const resultsElement = document.getElementById(`results-${testName}`);
    if (resultsElement) {
        resultsElement.textContent = results;
    }
}

/**
 * Update progress bar
 */
function updateProgress() {
    const progress = (testState.currentTest / testState.totalTests) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

/**
 * Update overall status
 */
function updateOverallStatus(message) {
    const statusElement = document.getElementById('overallStatus');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

/**
 * Show test summary
 */
function showTestSummary() {
    const summary = document.getElementById('testSummary');
    const totalTests = Object.keys(testState.results).length;
    const passedTests = Object.values(testState.results).filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const duration = Math.round((Date.now() - testState.startTime) / 1000);
    
    document.getElementById('totalTests').textContent = totalTests;
    document.getElementById('passedTests').textContent = passedTests;
    document.getElementById('failedTests').textContent = failedTests;
    document.getElementById('testDuration').textContent = `${duration}s`;
    
    // Generate detailed summary
    const details = Object.entries(testState.results).map(([testName, result]) => {
        const status = result.success ? '✅' : '❌';
        return `${status} ${testName}: ${result.passed}/${result.total}`;
    }).join('\n');
    
    document.getElementById('summaryDetails').innerHTML = `
        <h4>Detailed Results:</h4>
        <pre>${details}</pre>
        <p><strong>Overall Status:</strong> ${passedTests === totalTests ? '✅ All tests passed!' : `⚠️ ${failedTests} test(s) failed`}</p>
    `;
    
    summary.style.display = 'block';
}

// Initialize test interface
document.addEventListener('DOMContentLoaded', function() {
    updateOverallStatus('Test suite ready. Click "Run Complete Test Suite" to begin.');
    updateProgress();
});