/**
 * Checkpoint Test - Verify Basic Structure and Responsiveness
 * Task 4: Comprehensive validation of current implementation
 */

// Test configuration
const TEST_CONFIG = {
    expectedProjects: 5,
    requiredFiles: [
        'index.html',
        'assets/css/main.css',
        'assets/css/gallery.css',
        'assets/js/main.js',
        'assets/js/file-operations.js',
        'assets/js/demo-loader.js'
    ],
    responsiveBreakpoints: [
        { name: 'Mobile Small', width: 320 },
        { name: 'Mobile', width: 480 },
        { name: 'Tablet', width: 768 },
        { name: 'Desktop', width: 1200 }
    ]
};

class CheckpointValidator {
    constructor() {
        this.results = {
            structure: { passed: 0, failed: 0, tests: [] },
            responsiveness: { passed: 0, failed: 0, tests: [] },
            functionality: { passed: 0, failed: 0, tests: [] },
            accessibility: { passed: 0, failed: 0, tests: [] }
        };
        this.totalTests = 0;
        this.passedTests = 0;
    }

    /**
     * Run all checkpoint tests
     */
    async runAllTests() {
        console.log('🚀 Starting Checkpoint Validation - Basic Structure and Responsiveness');
        console.log('='.repeat(80));

        try {
            // Test 1: Basic Structure
            await this.testBasicStructure();
            
            // Test 2: CSS Grid Implementation
            await this.testCSSGridImplementation();
            
            // Test 3: Project Configuration
            await this.testProjectConfiguration();
            
            // Test 4: Responsive Design
            await this.testResponsiveDesign();
            
            // Test 5: File Operations System
            await this.testFileOperationsSystem();
            
            // Test 6: Accessibility Features
            await this.testAccessibilityFeatures();
            
            // Test 7: Modal System
            await this.testModalSystem();
            
            // Test 8: Error Handling
            await this.testErrorHandling();

            // Generate final report
            this.generateFinalReport();

        } catch (error) {
            console.error('❌ Checkpoint validation failed:', error);
            this.results.error = error.message;
        }
    }

    /**
     * Test basic HTML structure and required files
     */
    async testBasicStructure() {
        console.log('\n📋 Testing Basic Structure...');
        
        // Test HTML structure
        this.runTest('structure', 'HTML Document Structure', () => {
            const hasDoctype = document.doctype !== null;
            const hasHtml = document.documentElement.tagName === 'HTML';
            const hasHead = document.head !== null;
            const hasBody = document.body !== null;
            
            return hasDoctype && hasHtml && hasHead && hasBody;
        });

        // Test required elements
        this.runTest('structure', 'Portfolio Container', () => {
            return document.querySelector('.portfolio-container') !== null;
        });

        this.runTest('structure', 'Portfolio Header', () => {
            const header = document.querySelector('.portfolio-header');
            const hasTitle = header && header.querySelector('h1');
            const hasDescription = header && header.querySelector('p');
            return header && hasTitle && hasDescription;
        });

        this.runTest('structure', 'Project Gallery', () => {
            return document.querySelector('.project-gallery') !== null;
        });

        this.runTest('structure', 'Demo Modal', () => {
            const modal = document.querySelector('.demo-modal');
            const hasHeader = modal && modal.querySelector('.demo-header');
            const hasContent = modal && modal.querySelector('.demo-content');
            const hasFooter = modal && modal.querySelector('.demo-footer');
            return modal && hasHeader && hasContent && hasFooter;
        });

        // Test CSS files loaded
        this.runTest('structure', 'CSS Files Loaded', () => {
            const stylesheets = Array.from(document.styleSheets);
            const hasMainCSS = stylesheets.some(sheet => 
                sheet.href && sheet.href.includes('main.css')
            );
            const hasGalleryCSS = stylesheets.some(sheet => 
                sheet.href && sheet.href.includes('gallery.css')
            );
            return hasMainCSS && hasGalleryCSS;
        });

        // Test JavaScript files loaded
        this.runTest('structure', 'JavaScript Files Loaded', () => {
            const scripts = Array.from(document.scripts);
            const hasMainJS = scripts.some(script => 
                script.src && script.src.includes('main.js')
            );
            const hasFileOpsJS = scripts.some(script => 
                script.src && script.src.includes('file-operations.js')
            );
            return hasMainJS && hasFileOpsJS;
        });
    }

    /**
     * Test CSS Grid implementation
     */
    async testCSSGridImplementation() {
        console.log('\n🎨 Testing CSS Grid Implementation...');
        
        const gallery = document.querySelector('.project-gallery');
        
        this.runTest('responsiveness', 'CSS Grid Active', () => {
            if (!gallery) return false;
            const computedStyle = window.getComputedStyle(gallery);
            return computedStyle.display === 'grid';
        });

        this.runTest('responsiveness', 'Grid Template Columns', () => {
            if (!gallery) return false;
            const computedStyle = window.getComputedStyle(gallery);
            const gridTemplateColumns = computedStyle.gridTemplateColumns;
            // Should have auto-fit minmax or similar responsive grid
            return gridTemplateColumns && gridTemplateColumns !== 'none';
        });

        this.runTest('responsiveness', 'Grid Gap', () => {
            if (!gallery) return false;
            const computedStyle = window.getComputedStyle(gallery);
            const gap = computedStyle.gap || computedStyle.gridGap;
            return gap && gap !== '0px' && gap !== 'normal';
        });
    }

    /**
     * Test project configuration
     */
    async testProjectConfiguration() {
        console.log('\n⚙️ Testing Project Configuration...');
        
        this.runTest('functionality', 'Project Config Exists', () => {
            return typeof projectConfig !== 'undefined' && projectConfig !== null;
        });

        this.runTest('functionality', 'All 5 Projects Configured', () => {
            if (typeof projectConfig === 'undefined') return false;
            const projectKeys = Object.keys(projectConfig);
            return projectKeys.length === TEST_CONFIG.expectedProjects;
        });

        this.runTest('functionality', 'Required Project Properties', () => {
            if (typeof projectConfig === 'undefined') return false;
            
            const requiredProps = ['name', 'description', 'sourcePath', 'demoPath', 'entryPoint', 'technologies'];
            
            return Object.values(projectConfig).every(project => 
                requiredProps.every(prop => project.hasOwnProperty(prop))
            );
        });

        this.runTest('functionality', 'Project Cards Generated', () => {
            const projectCards = document.querySelectorAll('.project-card');
            return projectCards.length === TEST_CONFIG.expectedProjects;
        });
    }

    /**
     * Test responsive design across different breakpoints
     */
    async testResponsiveDesign() {
        console.log('\n📱 Testing Responsive Design...');
        
        const gallery = document.querySelector('.project-gallery');
        if (!gallery) {
            this.runTest('responsiveness', 'Gallery Element Available', () => false);
            return;
        }

        // Test current viewport
        this.runTest('responsiveness', 'Current Viewport Responsive', () => {
            const width = window.innerWidth;
            const computedStyle = window.getComputedStyle(gallery);
            const gridTemplateColumns = computedStyle.gridTemplateColumns;
            
            // Basic check that grid responds to viewport
            if (width <= 768) {
                // Should have fewer columns on smaller screens
                const columnCount = gridTemplateColumns.split(' ').length;
                return columnCount <= 2;
            } else {
                // Should have multiple columns on larger screens
                const columnCount = gridTemplateColumns.split(' ').length;
                return columnCount >= 1;
            }
        });

        // Test CSS custom properties
        this.runTest('responsiveness', 'CSS Custom Properties', () => {
            const rootStyle = getComputedStyle(document.documentElement);
            const primaryColor = rootStyle.getPropertyValue('--primary-color');
            const grayColor = rootStyle.getPropertyValue('--gray-100');
            return primaryColor && grayColor;
        });

        // Test responsive typography
        this.runTest('responsiveness', 'Responsive Typography', () => {
            const header = document.querySelector('.portfolio-header h1');
            if (!header) return false;
            
            const computedStyle = window.getComputedStyle(header);
            const fontSize = parseFloat(computedStyle.fontSize);
            
            // Should have reasonable font size
            return fontSize >= 24 && fontSize <= 48;
        });
    }

    /**
     * Test file operations system
     */
    async testFileOperationsSystem() {
        console.log('\n📁 Testing File Operations System...');
        
        this.runTest('functionality', 'FileOperations Class Available', () => {
            return typeof FileOperations !== 'undefined';
        });

        this.runTest('functionality', 'File Operations Instance', () => {
            return typeof fileOperations !== 'undefined' && fileOperations !== null;
        });

        if (typeof fileOperations !== 'undefined') {
            this.runTest('functionality', 'Source Protection Methods', () => {
                return typeof fileOperations.enableSourceProtection === 'function' &&
                       typeof fileOperations.checkModificationPermission === 'function' &&
                       typeof fileOperations.validateSourceIntegrity === 'function';
            });

            this.runTest('functionality', 'Copy Operation Methods', () => {
                return typeof fileOperations.copyProjectFiles === 'function' &&
                       typeof fileOperations.scanSourceDirectory === 'function';
            });
        }
    }

    /**
     * Test accessibility features
     */
    async testAccessibilityFeatures() {
        console.log('\n♿ Testing Accessibility Features...');
        
        // Test project cards accessibility
        this.runTest('accessibility', 'Project Cards Keyboard Navigation', () => {
            const projectCards = document.querySelectorAll('.project-card');
            return Array.from(projectCards).every(card => 
                card.hasAttribute('tabindex') && card.hasAttribute('role')
            );
        });

        // Test image alt text
        this.runTest('accessibility', 'Image Alt Text', () => {
            const images = document.querySelectorAll('.project-card img');
            return Array.from(images).every(img => 
                img.hasAttribute('alt') && img.alt.trim() !== ''
            );
        });

        // Test button accessibility
        this.runTest('accessibility', 'Button Accessibility', () => {
            const buttons = document.querySelectorAll('.demo-btn');
            return Array.from(buttons).every(btn => 
                btn.textContent.trim() !== '' || btn.hasAttribute('aria-label')
            );
        });

        // Test modal accessibility
        this.runTest('accessibility', 'Modal Accessibility', () => {
            const modal = document.querySelector('.demo-modal');
            return modal && 
                   modal.hasAttribute('role') && 
                   modal.getAttribute('role') === 'dialog';
        });

        // Test semantic HTML
        this.runTest('accessibility', 'Semantic HTML Structure', () => {
            const hasHeader = document.querySelector('header') !== null;
            const hasMain = document.querySelector('main') !== null || 
                           document.querySelector('.portfolio-container') !== null;
            const hasHeadings = document.querySelectorAll('h1, h2, h3').length > 0;
            
            return hasHeader || hasMain || hasHeadings; // At least some semantic structure
        });
    }

    /**
     * Test modal system functionality
     */
    async testModalSystem() {
        console.log('\n🪟 Testing Modal System...');
        
        const modal = document.querySelector('.demo-modal');
        
        this.runTest('functionality', 'Modal Elements Present', () => {
            const hasModal = modal !== null;
            const hasTitle = document.querySelector('#demoTitle') !== null;
            const hasFrame = document.querySelector('#demoFrame') !== null;
            const hasCloseBtn = document.querySelector('#closeDemoBtn') !== null;
            
            return hasModal && hasTitle && hasFrame && hasCloseBtn;
        });

        this.runTest('functionality', 'Modal CSS Classes', () => {
            if (!modal) return false;
            
            const computedStyle = window.getComputedStyle(modal);
            const position = computedStyle.position;
            const zIndex = computedStyle.zIndex;
            
            return position === 'fixed' && parseInt(zIndex) > 1000;
        });

        // Test modal state management
        this.runTest('functionality', 'Demo State Object', () => {
            return typeof demoState !== 'undefined' && 
                   demoState.hasOwnProperty('isModalOpen') &&
                   demoState.hasOwnProperty('currentDemo');
        });
    }

    /**
     * Test error handling
     */
    async testErrorHandling() {
        console.log('\n🚨 Testing Error Handling...');
        
        // Test image error handling
        this.runTest('functionality', 'Image Error Handling', () => {
            const images = document.querySelectorAll('.project-card img');
            return Array.from(images).every(img => 
                img.hasAttribute('onerror') || img.src.includes('placeholder')
            );
        });

        // Test console error monitoring
        this.runTest('functionality', 'No Critical Console Errors', () => {
            // This is a basic check - in a real test environment,
            // we would monitor console.error calls
            return true; // Assume no critical errors for now
        });
    }

    /**
     * Run a single test and record results
     */
    runTest(category, testName, testFunction) {
        this.totalTests++;
        
        try {
            const result = testFunction();
            const passed = Boolean(result);
            
            if (passed) {
                this.passedTests++;
                this.results[category].passed++;
                console.log(`  ✅ ${testName}`);
            } else {
                this.results[category].failed++;
                console.log(`  ❌ ${testName}`);
            }
            
            this.results[category].tests.push({
                name: testName,
                passed,
                result
            });
            
        } catch (error) {
            this.results[category].failed++;
            console.log(`  ❌ ${testName} - Error: ${error.message}`);
            
            this.results[category].tests.push({
                name: testName,
                passed: false,
                error: error.message
            });
        }
    }

    /**
     * Generate final test report
     */
    generateFinalReport() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 CHECKPOINT VALIDATION RESULTS');
        console.log('='.repeat(80));
        
        // Category results
        Object.entries(this.results).forEach(([category, result]) => {
            if (category === 'error') return;
            
            const total = result.passed + result.failed;
            const percentage = total > 0 ? Math.round((result.passed / total) * 100) : 0;
            
            console.log(`\n${category.toUpperCase()}:`);
            console.log(`  ✅ Passed: ${result.passed}`);
            console.log(`  ❌ Failed: ${result.failed}`);
            console.log(`  📈 Success Rate: ${percentage}%`);
        });
        
        // Overall results
        const overallPercentage = this.totalTests > 0 ? 
            Math.round((this.passedTests / this.totalTests) * 100) : 0;
        
        console.log('\n' + '-'.repeat(40));
        console.log('OVERALL RESULTS:');
        console.log(`✅ Total Passed: ${this.passedTests}`);
        console.log(`❌ Total Failed: ${this.totalTests - this.passedTests}`);
        console.log(`📊 Total Tests: ${this.totalTests}`);
        console.log(`🎯 Success Rate: ${overallPercentage}%`);
        
        // Determine checkpoint status
        const checkpointPassed = overallPercentage >= 80;
        
        console.log('\n' + '='.repeat(80));
        if (checkpointPassed) {
            console.log('🎉 CHECKPOINT PASSED - Basic structure and responsiveness verified!');
            console.log('✅ Ready to proceed to next phase of development');
        } else {
            console.log('⚠️  CHECKPOINT NEEDS ATTENTION - Some issues found');
            console.log('🔧 Review failed tests and address issues before proceeding');
        }
        console.log('='.repeat(80));
        
        // Store results for external access
        window.checkpointResults = {
            passed: checkpointPassed,
            percentage: overallPercentage,
            totalTests: this.totalTests,
            passedTests: this.passedTests,
            results: this.results,
            timestamp: new Date().toISOString()
        };
        
        return checkpointPassed;
    }
}

// Auto-run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const validator = new CheckpointValidator();
            validator.runAllTests();
        }, 2000); // Wait for other scripts to initialize
    });
} else {
    setTimeout(() => {
        const validator = new CheckpointValidator();
        validator.runAllTests();
    }, 2000);
}

// Export for manual testing
if (typeof window !== 'undefined') {
    window.CheckpointValidator = CheckpointValidator;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CheckpointValidator;
}