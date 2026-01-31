/**
 * Simple Navigation Validation
 * Browser-based validation that can run without Node.js
 */

function validateNavigationImplementation() {
    console.log('🧪 Validating Navigation System Implementation...\n');

    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    function test(name, testFn) {
        try {
            const result = testFn();
            results.tests.push({ name, status: 'PASS', message: result });
            results.passed++;
            console.log(`✅ ${name}: ${result}`);
        } catch (error) {
            results.tests.push({ name, status: 'FAIL', message: error.message });
            results.failed++;
            console.log(`❌ ${name}: ${error.message}`);
        }
    }

    // Test 1: Check if navigation CSS is loaded
    test('Navigation CSS Loaded', () => {
        const stylesheets = Array.from(document.styleSheets);
        const navCSS = stylesheets.find(sheet => 
            sheet.href && sheet.href.includes('navigation.css')
        );
        
        if (!navCSS) {
            throw new Error('Navigation CSS not loaded');
        }

        return 'Navigation CSS is loaded';
    });

    // Test 2: Check if navigation JavaScript is available
    test('Navigation JavaScript Available', () => {
        if (typeof DemoNavigation === 'undefined') {
            throw new Error('DemoNavigation class not available');
        }

        if (typeof demoNavigation === 'undefined') {
            throw new Error('demoNavigation instance not available');
        }

        return 'Navigation JavaScript is available';
    });

    // Test 3: Check if navigation can be created
    test('Navigation Creation', () => {
        if (typeof demoNavigation === 'undefined') {
            throw new Error('demoNavigation not available');
        }

        // Try to create navigation
        const nav = demoNavigation.createEnhancedNavigation('test-demo', 'Test Demo');
        
        if (!nav || !nav.classList.contains('demo-nav')) {
            throw new Error('Navigation creation failed');
        }

        return 'Navigation can be created successfully';
    });

    // Test 4: Check navigation structure
    test('Navigation Structure', () => {
        const nav = document.querySelector('.demo-nav');
        if (!nav) {
            throw new Error('Navigation element not found');
        }

        const left = nav.querySelector('.demo-nav-left');
        const center = nav.querySelector('.demo-nav-center');
        const right = nav.querySelector('.demo-nav-right');

        if (!left || !center || !right) {
            throw new Error('Navigation structure incomplete');
        }

        return 'Navigation structure is complete';
    });

    // Test 5: Check breadcrumbs
    test('Breadcrumbs System', () => {
        const breadcrumbs = document.querySelector('.demo-breadcrumbs');
        if (!breadcrumbs) {
            throw new Error('Breadcrumbs not found');
        }

        const portfolioLink = breadcrumbs.querySelector('.breadcrumb-link');
        const current = breadcrumbs.querySelector('.breadcrumb-current');

        if (!portfolioLink || !current) {
            throw new Error('Breadcrumb elements missing');
        }

        return 'Breadcrumbs system is working';
    });

    // Test 6: Check demo menu
    test('Demo Menu System', () => {
        const menuToggle = document.querySelector('.demo-menu-toggle');
        const menuDropdown = document.querySelector('.demo-menu-dropdown');

        if (!menuToggle || !menuDropdown) {
            throw new Error('Demo menu elements not found');
        }

        const menuItems = menuDropdown.querySelectorAll('.demo-menu-item');
        if (menuItems.length === 0) {
            throw new Error('No demo menu items found');
        }

        return `Demo menu has ${menuItems.length} items`;
    });

    // Test 7: Check transition overlay
    test('Transition System', () => {
        const overlay = document.getElementById('demoTransitionOverlay');
        if (!overlay) {
            throw new Error('Transition overlay not found');
        }

        const spinner = overlay.querySelector('.demo-transition-spinner');
        const text = overlay.querySelector('.demo-transition-text');

        if (!spinner || !text) {
            throw new Error('Transition overlay elements missing');
        }

        return 'Transition system is available';
    });

    // Test 8: Check responsive design
    test('Responsive Design', () => {
        const nav = document.querySelector('.demo-nav');
        if (!nav) {
            throw new Error('Navigation not found');
        }

        const computedStyle = window.getComputedStyle(nav);
        const display = computedStyle.display;

        if (display !== 'flex') {
            throw new Error('Navigation does not use flexbox');
        }

        return 'Responsive design is implemented';
    });

    // Test 9: Check accessibility
    test('Accessibility Features', () => {
        const menuToggle = document.querySelector('.demo-menu-toggle');
        if (!menuToggle) {
            throw new Error('Menu toggle not found');
        }

        const ariaLabel = menuToggle.getAttribute('aria-label');
        const ariaExpanded = menuToggle.getAttribute('aria-expanded');

        if (!ariaLabel) {
            throw new Error('Menu toggle missing aria-label');
        }

        if (ariaExpanded === null) {
            throw new Error('Menu toggle missing aria-expanded');
        }

        return 'Accessibility features are implemented';
    });

    // Generate report
    console.log('\n📊 Navigation Validation Report');
    console.log('==============================');
    
    const total = results.passed + results.failed;
    const successRate = total > 0 ? Math.round((results.passed / total) * 100) : 0;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${results.passed}`);
    console.log(`Failed: ${results.failed}`);
    console.log(`Success Rate: ${successRate}%`);

    if (successRate >= 90) {
        console.log('\n🎉 Navigation system is working excellently!');
    } else if (successRate >= 75) {
        console.log('\n✅ Navigation system is working well with minor issues.');
    } else if (successRate >= 50) {
        console.log('\n⚠️ Navigation system needs improvement.');
    } else {
        console.log('\n❌ Navigation system has significant issues.');
    }

    // Show detailed results
    console.log('\nDetailed Results:');
    results.tests.forEach(test => {
        const icon = test.status === 'PASS' ? '✅' : '❌';
        console.log(`  ${icon} ${test.name}: ${test.message}`);
    });

    return results;
}

// Auto-run validation when page loads
if (typeof window !== 'undefined') {
    window.validateNavigationImplementation = validateNavigationImplementation;
    
    // Run validation after everything loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            validateNavigationImplementation();
        }, 2000);
    });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateNavigationImplementation };
}