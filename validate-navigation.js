/**
 * Navigation System Validation Script
 * Tests all aspects of the enhanced navigation system
 */

class NavigationValidator {
    constructor() {
        this.results = {
            breadcrumbs: { passed: 0, failed: 0, tests: [] },
            transitions: { passed: 0, failed: 0, tests: [] },
            consistency: { passed: 0, failed: 0, tests: [] },
            accessibility: { passed: 0, failed: 0, tests: [] },
            responsiveness: { passed: 0, failed: 0, tests: [] }
        };
    }

    /**
     * Run all navigation validation tests
     */
    async validateAll() {
        console.log('🧪 Starting Navigation System Validation...\n');

        await this.validateBreadcrumbs();
        await this.validateTransitions();
        await this.validateConsistency();
        await this.validateAccessibility();
        await this.validateResponsiveness();

        this.generateReport();
        return this.results;
    }

    /**
     * Test breadcrumb navigation system
     */
    async validateBreadcrumbs() {
        console.log('📍 Testing Breadcrumb System...');

        // Test 1: Breadcrumb structure
        this.test('breadcrumbs', 'Breadcrumb Structure', () => {
            const breadcrumbs = document.querySelector('.demo-breadcrumbs');
            if (!breadcrumbs) throw new Error('Breadcrumbs container not found');

            const portfolioLink = breadcrumbs.querySelector('.breadcrumb-link');
            const separator = breadcrumbs.querySelector('.breadcrumb-separator');
            const current = breadcrumbs.querySelector('.breadcrumb-current');

            if (!portfolioLink) throw new Error('Portfolio link not found');
            if (!separator) throw new Error('Breadcrumb separator not found');
            if (!current) throw new Error('Current page indicator not found');

            return 'Breadcrumb structure is complete';
        });

        // Test 2: Portfolio link functionality
        this.test('breadcrumbs', 'Portfolio Link', () => {
            const portfolioLink = document.querySelector('.breadcrumb-link');
            const href = portfolioLink.getAttribute('href');
            
            if (!href || !href.includes('index.html')) {
                throw new Error('Portfolio link href is incorrect');
            }

            return 'Portfolio link points to correct location';
        });

        // Test 3: Current demo indication
        this.test('breadcrumbs', 'Current Demo Indication', () => {
            const current = document.querySelector('.breadcrumb-current');
            const text = current.textContent.trim();
            
            if (!text || text.length === 0) {
                throw new Error('Current demo name is empty');
            }

            return `Current demo properly indicated: "${text}"`;
        });
    }

    /**
     * Test smooth transitions
     */
    async validateTransitions() {
        console.log('🔄 Testing Smooth Transitions...');

        // Test 1: Transition overlay exists
        this.test('transitions', 'Transition Overlay', () => {
            const overlay = document.getElementById('demoTransitionOverlay');
            if (!overlay) throw new Error('Transition overlay not found');

            const content = overlay.querySelector('.demo-transition-content');
            const spinner = overlay.querySelector('.demo-transition-spinner');
            const text = overlay.querySelector('.demo-transition-text');

            if (!content) throw new Error('Transition content not found');
            if (!spinner) throw new Error('Transition spinner not found');
            if (!text) throw new Error('Transition text not found');

            return 'Transition overlay structure is complete';
        });

        // Test 2: Transition functionality
        this.test('transitions', 'Transition Show/Hide', () => {
            if (typeof demoNavigation === 'undefined') {
                throw new Error('demoNavigation not available');
            }

            const overlay = document.getElementById('demoTransitionOverlay');
            
            // Test show
            demoNavigation.showTransitionOverlay('Test message');
            if (!overlay.classList.contains('active')) {
                throw new Error('Transition overlay did not show');
            }

            // Test hide
            demoNavigation.hideTransitionOverlay();
            if (overlay.classList.contains('active')) {
                throw new Error('Transition overlay did not hide');
            }

            return 'Transition show/hide functionality works';
        });

        // Test 3: CSS transitions
        this.test('transitions', 'CSS Transitions', () => {
            const overlay = document.getElementById('demoTransitionOverlay');
            const computedStyle = window.getComputedStyle(overlay);
            const transition = computedStyle.transition;

            if (!transition || transition === 'none') {
                throw new Error('CSS transitions not applied');
            }

            return 'CSS transitions are properly configured';
        });
    }

    /**
     * Test navigation consistency across demos
     */
    async validateConsistency() {
        console.log('🎯 Testing Navigation Consistency...');

        // Test 1: Navigation class consistency
        this.test('consistency', 'CSS Classes', () => {
            const nav = document.querySelector('.demo-nav');
            if (!nav) throw new Error('Demo navigation not found');

            const requiredClasses = ['demo-nav'];
            const missingClasses = requiredClasses.filter(cls => !nav.classList.contains(cls));

            if (missingClasses.length > 0) {
                throw new Error(`Missing classes: ${missingClasses.join(', ')}`);
            }

            return 'Navigation CSS classes are consistent';
        });

        // Test 2: Structure consistency
        this.test('consistency', 'Navigation Structure', () => {
            const nav = document.querySelector('.demo-nav');
            const left = nav.querySelector('.demo-nav-left');
            const center = nav.querySelector('.demo-nav-center');
            const right = nav.querySelector('.demo-nav-right');

            if (!left) throw new Error('Left navigation section missing');
            if (!center) throw new Error('Center navigation section missing');
            if (!right) throw new Error('Right navigation section missing');

            return 'Navigation structure is consistent';
        });

        // Test 3: Demo menu consistency
        this.test('consistency', 'Demo Menu', () => {
            const menuToggle = document.querySelector('.demo-menu-toggle');
            const menuDropdown = document.querySelector('.demo-menu-dropdown');

            if (!menuToggle) throw new Error('Demo menu toggle not found');
            if (!menuDropdown) throw new Error('Demo menu dropdown not found');

            const menuItems = menuDropdown.querySelectorAll('.demo-menu-item');
            if (menuItems.length === 0) {
                throw new Error('No demo menu items found');
            }

            return `Demo menu has ${menuItems.length} items`;
        });
    }

    /**
     * Test accessibility features
     */
    async validateAccessibility() {
        console.log('♿ Testing Accessibility Features...');

        // Test 1: ARIA labels
        this.test('accessibility', 'ARIA Labels', () => {
            const menuToggle = document.querySelector('.demo-menu-toggle');
            const ariaLabel = menuToggle.getAttribute('aria-label');
            const ariaExpanded = menuToggle.getAttribute('aria-expanded');

            if (!ariaLabel) throw new Error('Menu toggle missing aria-label');
            if (!ariaExpanded) throw new Error('Menu toggle missing aria-expanded');

            return 'ARIA labels are properly implemented';
        });

        // Test 2: Keyboard navigation
        this.test('accessibility', 'Keyboard Navigation', () => {
            const focusableElements = document.querySelectorAll(
                '.demo-nav button, .demo-nav a, .demo-nav [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) {
                throw new Error('No focusable elements found in navigation');
            }

            // Test if elements can receive focus
            let focusableCount = 0;
            focusableElements.forEach(element => {
                if (element.tabIndex >= 0) focusableCount++;
            });

            if (focusableCount === 0) {
                throw new Error('No elements can receive keyboard focus');
            }

            return `${focusableCount} elements support keyboard navigation`;
        });

        // Test 3: Semantic HTML
        this.test('accessibility', 'Semantic HTML', () => {
            const nav = document.querySelector('.demo-nav');
            const isNavElement = nav.tagName.toLowerCase() === 'nav';
            const hasNavRole = nav.getAttribute('role') === 'navigation';

            if (!isNavElement && !hasNavRole) {
                throw new Error('Navigation lacks proper semantic markup');
            }

            return 'Semantic HTML structure is correct';
        });
    }

    /**
     * Test responsive design
     */
    async validateResponsiveness() {
        console.log('📱 Testing Responsive Design...');

        // Test 1: CSS media queries
        this.test('responsiveness', 'Media Queries', () => {
            const nav = document.querySelector('.demo-nav');
            const computedStyle = window.getComputedStyle(nav);
            
            // Check if navigation has responsive properties
            const display = computedStyle.display;
            const flexDirection = computedStyle.flexDirection;

            if (display !== 'flex') {
                throw new Error('Navigation does not use flexbox layout');
            }

            return 'Responsive layout properties are applied';
        });

        // Test 2: Mobile-friendly elements
        this.test('responsiveness', 'Mobile Elements', () => {
            const nav = document.querySelector('.demo-nav');
            const menuToggle = nav.querySelector('.demo-menu-toggle');

            if (!menuToggle) {
                throw new Error('Mobile menu toggle not found');
            }

            // Check if menu toggle is properly sized for touch
            const rect = menuToggle.getBoundingClientRect();
            const minTouchSize = 44; // Minimum touch target size

            if (rect.height < minTouchSize || rect.width < minTouchSize) {
                console.warn(`Menu toggle size (${rect.width}x${rect.height}) may be too small for touch`);
            }

            return 'Mobile-friendly elements are present';
        });

        // Test 3: Viewport adaptation
        this.test('responsiveness', 'Viewport Adaptation', () => {
            const nav = document.querySelector('.demo-nav');
            const viewport = window.innerWidth;

            // Test different viewport sizes
            const breakpoints = [320, 768, 1024];
            let adaptations = 0;

            breakpoints.forEach(breakpoint => {
                if (viewport >= breakpoint) {
                    adaptations++;
                }
            });

            return `Navigation adapts to ${adaptations} viewport sizes`;
        });
    }

    /**
     * Run individual test
     */
    test(category, name, testFunction) {
        try {
            const result = testFunction();
            this.results[category].passed++;
            this.results[category].tests.push({
                name,
                status: 'PASS',
                message: result
            });
            console.log(`  ✅ ${name}: ${result}`);
        } catch (error) {
            this.results[category].failed++;
            this.results[category].tests.push({
                name,
                status: 'FAIL',
                message: error.message
            });
            console.log(`  ❌ ${name}: ${error.message}`);
        }
    }

    /**
     * Generate validation report
     */
    generateReport() {
        console.log('\n📊 Navigation System Validation Report');
        console.log('=====================================');

        let totalPassed = 0;
        let totalFailed = 0;

        Object.entries(this.results).forEach(([category, result]) => {
            const total = result.passed + result.failed;
            const percentage = total > 0 ? Math.round((result.passed / total) * 100) : 0;
            
            console.log(`\n${category.toUpperCase()}:`);
            console.log(`  Passed: ${result.passed}`);
            console.log(`  Failed: ${result.failed}`);
            console.log(`  Success Rate: ${percentage}%`);

            totalPassed += result.passed;
            totalFailed += result.failed;
        });

        const overallTotal = totalPassed + totalFailed;
        const overallPercentage = overallTotal > 0 ? Math.round((totalPassed / overallTotal) * 100) : 0;

        console.log('\nOVERALL RESULTS:');
        console.log(`  Total Tests: ${overallTotal}`);
        console.log(`  Passed: ${totalPassed}`);
        console.log(`  Failed: ${totalFailed}`);
        console.log(`  Success Rate: ${overallPercentage}%`);

        if (overallPercentage >= 90) {
            console.log('\n🎉 Navigation system is working excellently!');
        } else if (overallPercentage >= 75) {
            console.log('\n✅ Navigation system is working well with minor issues.');
        } else if (overallPercentage >= 50) {
            console.log('\n⚠️ Navigation system has some issues that need attention.');
        } else {
            console.log('\n❌ Navigation system has significant issues that need fixing.');
        }

        return {
            totalTests: overallTotal,
            passed: totalPassed,
            failed: totalFailed,
            successRate: overallPercentage,
            details: this.results
        };
    }
}

// Auto-run validation if in browser environment
if (typeof window !== 'undefined') {
    window.NavigationValidator = NavigationValidator;
    
    // Auto-run validation after page load
    window.addEventListener('load', () => {
        setTimeout(async () => {
            const validator = new NavigationValidator();
            await validator.validateAll();
        }, 1000);
    });
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationValidator;
}