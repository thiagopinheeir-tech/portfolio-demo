/**
 * Navigation Implementation Test
 * Tests the navigation system implementation without requiring a server
 */

// Mock DOM environment for testing
function createMockDOM() {
    // Create a basic DOM structure for testing
    const mockBody = {
        innerHTML: '',
        style: {},
        appendChild: function(element) {
            this.children = this.children || [];
            this.children.push(element);
            return element;
        },
        insertBefore: function(newElement, referenceElement) {
            this.children = this.children || [];
            this.children.unshift(newElement);
            return newElement;
        },
        querySelector: function(selector) {
            return this.children && this.children.find(child => 
                child.className && child.className.includes(selector.replace('.', ''))
            );
        },
        querySelectorAll: function(selector) {
            return this.children ? this.children.filter(child => 
                child.className && child.className.includes(selector.replace('.', ''))
            ) : [];
        }
    };

    const mockDocument = {
        body: mockBody,
        createElement: function(tagName) {
            return {
                tagName: tagName.toUpperCase(),
                className: '',
                innerHTML: '',
                style: {},
                setAttribute: function(name, value) {
                    this[name] = value;
                },
                getAttribute: function(name) {
                    return this[name];
                },
                classList: {
                    add: function(className) {
                        this.classes = this.classes || [];
                        this.classes.push(className);
                    },
                    remove: function(className) {
                        this.classes = this.classes || [];
                        this.classes = this.classes.filter(c => c !== className);
                    },
                    contains: function(className) {
                        this.classes = this.classes || [];
                        return this.classes.includes(className);
                    },
                    toggle: function(className, force) {
                        if (force !== undefined) {
                            if (force) this.add(className);
                            else this.remove(className);
                        } else {
                            if (this.contains(className)) this.remove(className);
                            else this.add(className);
                        }
                    }
                },
                addEventListener: function(event, handler) {
                    this.eventListeners = this.eventListeners || {};
                    this.eventListeners[event] = this.eventListeners[event] || [];
                    this.eventListeners[event].push(handler);
                },
                querySelector: function(selector) {
                    return null; // Simplified for testing
                },
                querySelectorAll: function(selector) {
                    return []; // Simplified for testing
                }
            };
        },
        querySelector: function(selector) {
            if (selector === '.demo-wrapper') {
                return { dataset: { demo: 'test-demo' } };
            }
            return mockBody.querySelector(selector);
        },
        querySelectorAll: function(selector) {
            return mockBody.querySelectorAll(selector);
        },
        getElementById: function(id) {
            return this.createElement('div');
        },
        addEventListener: function(event, handler) {
            // Mock event listener
        }
    };

    const mockWindow = {
        location: { pathname: '/demos/test-demo/index.html' },
        innerWidth: 1024,
        addEventListener: function(event, handler) {
            // Mock event listener
        }
    };

    return { document: mockDocument, window: mockWindow };
}

// Test the navigation system
function testNavigationSystem() {
    console.log('🧪 Testing Navigation System Implementation...\n');

    const tests = [];
    let passed = 0;
    let failed = 0;

    function test(name, testFn) {
        try {
            const result = testFn();
            tests.push({ name, status: 'PASS', message: result });
            passed++;
            console.log(`✅ ${name}: ${result}`);
        } catch (error) {
            tests.push({ name, status: 'FAIL', message: error.message });
            failed++;
            console.log(`❌ ${name}: ${error.message}`);
        }
    }

    // Test 1: Navigation CSS file exists and is valid
    test('Navigation CSS File', () => {
        const fs = require('fs');
        const path = require('path');
        
        const cssPath = path.join(__dirname, 'assets', 'css', 'navigation.css');
        if (!fs.existsSync(cssPath)) {
            throw new Error('Navigation CSS file not found');
        }

        const cssContent = fs.readFileSync(cssPath, 'utf8');
        if (cssContent.length === 0) {
            throw new Error('Navigation CSS file is empty');
        }

        // Check for key CSS classes
        const requiredClasses = ['.demo-nav', '.demo-breadcrumbs', '.demo-menu-dropdown', '.demo-transition-overlay'];
        const missingClasses = requiredClasses.filter(cls => !cssContent.includes(cls));
        
        if (missingClasses.length > 0) {
            throw new Error(`Missing CSS classes: ${missingClasses.join(', ')}`);
        }

        return `CSS file exists with ${cssContent.split('\n').length} lines`;
    });

    // Test 2: Navigation JavaScript file exists and is valid
    test('Navigation JavaScript File', () => {
        const fs = require('fs');
        const path = require('path');
        
        const jsPath = path.join(__dirname, 'assets', 'js', 'navigation.js');
        if (!fs.existsSync(jsPath)) {
            throw new Error('Navigation JavaScript file not found');
        }

        const jsContent = fs.readFileSync(jsPath, 'utf8');
        if (jsContent.length === 0) {
            throw new Error('Navigation JavaScript file is empty');
        }

        // Check for key JavaScript components
        const requiredComponents = ['DemoNavigation', 'createEnhancedNavigation', 'navigateToDemo', 'showTransitionOverlay'];
        const missingComponents = requiredComponents.filter(comp => !jsContent.includes(comp));
        
        if (missingComponents.length > 0) {
            throw new Error(`Missing JavaScript components: ${missingComponents.join(', ')}`);
        }

        return `JavaScript file exists with ${jsContent.split('\n').length} lines`;
    });

    // Test 3: Demo files have been updated with navigation
    test('Demo Files Updated', () => {
        const fs = require('fs');
        const path = require('path');
        
        const demoFolders = ['acai-dany', 'barbearia-raimundos', 'financas-pessoais', 'whatsapp-bot-ai', 'landpage-divulga'];
        let updatedDemos = 0;

        demoFolders.forEach(demo => {
            const demoPath = path.join(__dirname, 'demos', demo, 'index.html');
            if (fs.existsSync(demoPath)) {
                const content = fs.readFileSync(demoPath, 'utf8');
                if (content.includes('data-demo=') && content.includes('navigation.css') && content.includes('navigation.js')) {
                    updatedDemos++;
                }
            }
        });

        if (updatedDemos === 0) {
            throw new Error('No demo files have been updated with navigation');
        }

        return `${updatedDemos}/${demoFolders.length} demo files updated with navigation`;
    });

    // Test 4: Main portfolio includes navigation CSS
    test('Portfolio Navigation CSS', () => {
        const fs = require('fs');
        const path = require('path');
        
        const indexPath = path.join(__dirname, 'index.html');
        if (!fs.existsSync(indexPath)) {
            throw new Error('Portfolio index.html not found');
        }

        const content = fs.readFileSync(indexPath, 'utf8');
        if (!content.includes('navigation.css')) {
            throw new Error('Portfolio index.html does not include navigation.css');
        }

        if (!content.includes('navigation.js')) {
            throw new Error('Portfolio index.html does not include navigation.js');
        }

        return 'Portfolio includes navigation CSS and JavaScript';
    });

    // Test 5: Navigation HTML structure
    test('Navigation HTML Structure', () => {
        const fs = require('fs');
        const jsContent = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'navigation.js'), 'utf8');
        
        // Check if the HTML structure includes required elements
        const requiredElements = ['demo-nav-left', 'demo-nav-center', 'demo-nav-right', 'demo-breadcrumbs', 'demo-menu-dropdown'];
        const missingElements = requiredElements.filter(element => !jsContent.includes(element));
        
        if (missingElements.length > 0) {
            throw new Error(`Missing HTML elements: ${missingElements.join(', ')}`);
        }

        return 'Navigation HTML structure is complete';
    });

    // Test 6: Responsive design implementation
    test('Responsive Design', () => {
        const fs = require('fs');
        const cssContent = fs.readFileSync(path.join(__dirname, 'assets', 'css', 'navigation.css'), 'utf8');
        
        // Check for media queries
        const mediaQueries = cssContent.match(/@media[^{]+\{/g);
        if (!mediaQueries || mediaQueries.length === 0) {
            throw new Error('No responsive media queries found');
        }

        // Check for mobile-specific styles
        if (!cssContent.includes('max-width: 768px') && !cssContent.includes('max-width: 480px')) {
            throw new Error('Mobile responsive styles not found');
        }

        return `Responsive design implemented with ${mediaQueries.length} media queries`;
    });

    // Test 7: Accessibility features
    test('Accessibility Features', () => {
        const fs = require('fs');
        const jsContent = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'navigation.js'), 'utf8');
        
        // Check for accessibility attributes
        const accessibilityFeatures = ['aria-label', 'aria-expanded', 'aria-current', 'tabindex'];
        const foundFeatures = accessibilityFeatures.filter(feature => jsContent.includes(feature));
        
        if (foundFeatures.length === 0) {
            throw new Error('No accessibility features found');
        }

        return `${foundFeatures.length}/${accessibilityFeatures.length} accessibility features implemented`;
    });

    // Test 8: Transition system
    test('Transition System', () => {
        const fs = require('fs');
        const jsContent = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'navigation.js'), 'utf8');
        const cssContent = fs.readFileSync(path.join(__dirname, 'assets', 'css', 'navigation.css'), 'utf8');
        
        // Check for transition-related code
        if (!jsContent.includes('showTransitionOverlay') || !jsContent.includes('hideTransitionOverlay')) {
            throw new Error('Transition overlay functions not found');
        }

        if (!cssContent.includes('demo-transition-overlay') || !cssContent.includes('transition:')) {
            throw new Error('Transition CSS not found');
        }

        return 'Transition system is implemented';
    });

    // Generate report
    console.log('\n📊 Navigation Implementation Test Report');
    console.log('=======================================');
    
    const total = passed + failed;
    const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${successRate}%`);

    if (successRate >= 90) {
        console.log('\n🎉 Navigation system implementation is excellent!');
    } else if (successRate >= 75) {
        console.log('\n✅ Navigation system implementation is good with minor issues.');
    } else if (successRate >= 50) {
        console.log('\n⚠️ Navigation system implementation needs improvement.');
    } else {
        console.log('\n❌ Navigation system implementation has significant issues.');
    }

    return { total, passed, failed, successRate, tests };
}

// Run tests if this file is executed directly
if (require.main === module) {
    try {
        testNavigationSystem();
    } catch (error) {
        console.error('Test execution failed:', error.message);
    }
}

module.exports = { testNavigationSystem };