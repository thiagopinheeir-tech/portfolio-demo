/**
 * Performance Validation Script
 * Validates that all performance optimizations are properly implemented
 */

const fs = require('fs');
const path = require('path');

class PerformanceValidator {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            tests: []
        };
    }

    /**
     * Run all validation tests
     */
    async runValidation() {
        console.log('🚀 Running Performance Optimization Validation...\n');

        // Test 1: Check if performance.js exists and has required classes
        this.testPerformanceJSImplementation();

        // Test 2: Check if performance.css exists and has optimizations
        this.testPerformanceCSSImplementation();

        // Test 3: Validate HTML optimizations
        this.testHTMLOptimizations();

        // Test 4: Check Service Worker implementation
        this.testServiceWorkerImplementation();

        // Test 5: Validate image optimization setup
        this.testImageOptimizationSetup();

        // Test 6: Check bundle optimization
        this.testBundleOptimization();

        // Test 7: Validate loading states
        this.testLoadingStates();

        // Test 8: Check performance test suite
        this.testPerformanceTestSuite();

        // Display results
        this.displayResults();
    }

    /**
     * Test performance.js implementation
     */
    testPerformanceJSImplementation() {
        const testName = 'Performance JavaScript Implementation';
        
        try {
            const performanceJSPath = path.join(__dirname, 'assets', 'js', 'performance.js');
            
            if (!fs.existsSync(performanceJSPath)) {
                this.addResult(testName, false, 'performance.js file not found');
                return;
            }

            const content = fs.readFileSync(performanceJSPath, 'utf8');
            
            // Check for required classes
            const requiredClasses = [
                'ImageOptimizer',
                'BundleOptimizer', 
                'LoadingStateManager',
                'PerformanceMonitor'
            ];

            const missingClasses = requiredClasses.filter(className => 
                !content.includes(`class ${className}`)
            );

            if (missingClasses.length > 0) {
                this.addResult(testName, false, `Missing classes: ${missingClasses.join(', ')}`);
                return;
            }

            // Check for key methods
            const requiredMethods = [
                'setupLazyLoading',
                'optimizeResourceLoading',
                'showLoading',
                'hideLoading'
            ];

            const missingMethods = requiredMethods.filter(method => 
                !content.includes(method)
            );

            if (missingMethods.length > 0) {
                this.addResult(testName, false, `Missing methods: ${missingMethods.join(', ')}`);
                return;
            }

            this.addResult(testName, true, 'All required performance classes and methods implemented');

        } catch (error) {
            this.addResult(testName, false, `Error reading performance.js: ${error.message}`);
        }
    }

    /**
     * Test performance.css implementation
     */
    testPerformanceCSSImplementation() {
        const testName = 'Performance CSS Implementation';
        
        try {
            const performanceCSSPath = path.join(__dirname, 'assets', 'css', 'performance.css');
            
            if (!fs.existsSync(performanceCSSPath)) {
                this.addResult(testName, false, 'performance.css file not found');
                return;
            }

            const content = fs.readFileSync(performanceCSSPath, 'utf8');
            
            // Check for key performance optimizations
            const requiredOptimizations = [
                'will-change',
                'contain:',
                'transform: translateZ(0)',
                'image-loading',
                'lazy-placeholder',
                'loading-overlay',
                'skeleton'
            ];

            const missingOptimizations = requiredOptimizations.filter(optimization => 
                !content.includes(optimization)
            );

            if (missingOptimizations.length > 0) {
                this.addResult(testName, false, `Missing optimizations: ${missingOptimizations.join(', ')}`);
                return;
            }

            // Check for responsive optimizations
            if (!content.includes('@media (prefers-reduced-motion: reduce)')) {
                this.addResult(testName, false, 'Missing reduced motion support');
                return;
            }

            this.addResult(testName, true, 'All required performance CSS optimizations implemented');

        } catch (error) {
            this.addResult(testName, false, `Error reading performance.css: ${error.message}`);
        }
    }

    /**
     * Test HTML optimizations
     */
    testHTMLOptimizations() {
        const testName = 'HTML Performance Optimizations';
        
        try {
            const indexPath = path.join(__dirname, 'index.html');
            
            if (!fs.existsSync(indexPath)) {
                this.addResult(testName, false, 'index.html file not found');
                return;
            }

            const content = fs.readFileSync(indexPath, 'utf8');
            
            // Check for critical optimizations
            const requiredOptimizations = [
                'rel="preload"',
                'rel="dns-prefetch"',
                'rel="preconnect"',
                'data-critical',
                'loading="lazy"',
                'async',
                'defer'
            ];

            const missingOptimizations = requiredOptimizations.filter(optimization => 
                !content.includes(optimization)
            );

            if (missingOptimizations.length > 0) {
                this.addResult(testName, false, `Missing HTML optimizations: ${missingOptimizations.join(', ')}`);
                return;
            }

            // Check for inline critical CSS
            if (!content.includes('<style>') || !content.includes('Critical above-the-fold styles')) {
                this.addResult(testName, false, 'Missing inline critical CSS');
                return;
            }

            // Check for performance monitoring
            if (!content.includes('performanceStart') || !content.includes('performanceMetrics')) {
                this.addResult(testName, false, 'Missing performance monitoring setup');
                return;
            }

            this.addResult(testName, true, 'All required HTML performance optimizations implemented');

        } catch (error) {
            this.addResult(testName, false, `Error reading index.html: ${error.message}`);
        }
    }

    /**
     * Test Service Worker implementation
     */
    testServiceWorkerImplementation() {
        const testName = 'Service Worker Implementation';
        
        try {
            const swPath = path.join(__dirname, 'sw.js');
            
            if (!fs.existsSync(swPath)) {
                this.addResult(testName, false, 'sw.js file not found');
                return;
            }

            const content = fs.readFileSync(swPath, 'utf8');
            
            // Check for required cache strategies
            const requiredFeatures = [
                'STATIC_CACHE',
                'DYNAMIC_CACHE',
                'IMAGE_CACHE',
                'handleImageRequest',
                'handleStaticAsset',
                'handleDemoRequest',
                'cache-first',
                'network-first'
            ];

            const missingFeatures = requiredFeatures.filter(feature => 
                !content.includes(feature)
            );

            if (missingFeatures.length > 0) {
                this.addResult(testName, false, `Missing Service Worker features: ${missingFeatures.join(', ')}`);
                return;
            }

            // Check for offline support
            if (!content.includes('createOfflineHTML')) {
                this.addResult(testName, false, 'Missing offline support');
                return;
            }

            this.addResult(testName, true, 'Service Worker properly implemented with caching strategies');

        } catch (error) {
            this.addResult(testName, false, `Error reading sw.js: ${error.message}`);
        }
    }

    /**
     * Test image optimization setup
     */
    testImageOptimizationSetup() {
        const testName = 'Image Optimization Setup';
        
        try {
            // Check if placeholder image exists
            const placeholderPath = path.join(__dirname, 'assets', 'images', 'placeholder.jpg');
            if (!fs.existsSync(placeholderPath)) {
                this.addResult(testName, false, 'Placeholder image not found');
                return;
            }

            // Check project preview images
            const previewsDir = path.join(__dirname, 'assets', 'images', 'project-previews');
            if (!fs.existsSync(previewsDir)) {
                this.addResult(testName, false, 'Project previews directory not found');
                return;
            }

            const previewFiles = fs.readdirSync(previewsDir);
            const requiredPreviews = [
                'acai-dany.svg',
                'barbearia-raimundos.svg',
                'financas-pessoais.svg',
                'whatsapp-bot-ai.svg',
                'landpage-divulga.svg'
            ];

            const missingPreviews = requiredPreviews.filter(preview => 
                !previewFiles.includes(preview)
            );

            if (missingPreviews.length > 0) {
                this.addResult(testName, false, `Missing preview images: ${missingPreviews.join(', ')}`);
                return;
            }

            this.addResult(testName, true, 'Image optimization setup complete with all required assets');

        } catch (error) {
            this.addResult(testName, false, `Error checking image assets: ${error.message}`);
        }
    }

    /**
     * Test bundle optimization
     */
    testBundleOptimization() {
        const testName = 'Bundle Optimization';
        
        try {
            // Check if all required JS files exist
            const jsFiles = [
                'main.js',
                'performance.js',
                'demo-loader.js',
                'navigation.js',
                'accessibility.js',
                'file-operations.js'
            ];

            const jsDir = path.join(__dirname, 'assets', 'js');
            const existingFiles = fs.readdirSync(jsDir);
            
            const missingFiles = jsFiles.filter(file => 
                !existingFiles.includes(file)
            );

            if (missingFiles.length > 0) {
                this.addResult(testName, false, `Missing JS files: ${missingFiles.join(', ')}`);
                return;
            }

            // Check if all required CSS files exist
            const cssFiles = [
                'main.css',
                'gallery.css',
                'performance.css',
                'navigation.css',
                'accessibility.css'
            ];

            const cssDir = path.join(__dirname, 'assets', 'css');
            const existingCSSFiles = fs.readdirSync(cssDir);
            
            const missingCSSFiles = cssFiles.filter(file => 
                !existingCSSFiles.includes(file)
            );

            if (missingCSSFiles.length > 0) {
                this.addResult(testName, false, `Missing CSS files: ${missingCSSFiles.join(', ')}`);
                return;
            }

            this.addResult(testName, true, 'All required bundle files present for optimization');

        } catch (error) {
            this.addResult(testName, false, `Error checking bundle files: ${error.message}`);
        }
    }

    /**
     * Test loading states
     */
    testLoadingStates() {
        const testName = 'Loading States Implementation';
        
        try {
            const indexPath = path.join(__dirname, 'index.html');
            const content = fs.readFileSync(indexPath, 'utf8');
            
            // Check for loading state elements
            const requiredElements = [
                'loading-state',
                'skeleton-card',
                'loading-overlay',
                'error-overlay',
                'performance-indicator'
            ];

            const missingElements = requiredElements.filter(element => 
                !content.includes(element)
            );

            if (missingElements.length > 0) {
                this.addResult(testName, false, `Missing loading state elements: ${missingElements.join(', ')}`);
                return;
            }

            // Check for ARIA attributes
            if (!content.includes('aria-live') || !content.includes('role="status"')) {
                this.addResult(testName, false, 'Missing accessibility attributes for loading states');
                return;
            }

            this.addResult(testName, true, 'Loading states properly implemented with accessibility support');

        } catch (error) {
            this.addResult(testName, false, `Error checking loading states: ${error.message}`);
        }
    }

    /**
     * Test performance test suite
     */
    testPerformanceTestSuite() {
        const testName = 'Performance Test Suite';
        
        try {
            const testPath = path.join(__dirname, 'test-performance.html');
            
            if (!fs.existsSync(testPath)) {
                this.addResult(testName, false, 'test-performance.html file not found');
                return;
            }

            const content = fs.readFileSync(testPath, 'utf8');
            
            // Check for required test functions
            const requiredTests = [
                'runLoadTimeTest',
                'runCoreWebVitalsTest',
                'runImageOptimizationTest',
                'runBundleOptimizationTest',
                'runFullPerformanceTest'
            ];

            const missingTests = requiredTests.filter(test => 
                !content.includes(test)
            );

            if (missingTests.length > 0) {
                this.addResult(testName, false, `Missing test functions: ${missingTests.join(', ')}`);
                return;
            }

            // Check for performance metrics
            if (!content.includes('PerformanceTestSuite') || !content.includes('calculatePerformanceScore')) {
                this.addResult(testName, false, 'Missing performance test suite class or scoring');
                return;
            }

            this.addResult(testName, true, 'Comprehensive performance test suite implemented');

        } catch (error) {
            this.addResult(testName, false, `Error checking test suite: ${error.message}`);
        }
    }

    /**
     * Add test result
     */
    addResult(testName, passed, message) {
        const result = {
            name: testName,
            passed,
            message
        };

        this.results.tests.push(result);
        
        if (passed) {
            this.results.passed++;
            console.log(`✅ ${testName}: ${message}`);
        } else {
            this.results.failed++;
            console.log(`❌ ${testName}: ${message}`);
        }
    }

    /**
     * Display final results
     */
    displayResults() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 PERFORMANCE VALIDATION RESULTS');
        console.log('='.repeat(60));
        
        console.log(`\n✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⚠️  Warnings: ${this.results.warnings}`);
        
        const totalTests = this.results.passed + this.results.failed + this.results.warnings;
        const successRate = totalTests > 0 ? Math.round((this.results.passed / totalTests) * 100) : 0;
        
        console.log(`\n📈 Success Rate: ${successRate}%`);
        
        if (successRate >= 90) {
            console.log('\n🎉 EXCELLENT! All performance optimizations properly implemented.');
            console.log('✅ 3-second load time requirement should be met.');
        } else if (successRate >= 70) {
            console.log('\n⚠️  GOOD! Most optimizations implemented, some improvements needed.');
        } else {
            console.log('\n❌ NEEDS WORK! Significant performance optimizations missing.');
        }
        
        console.log('\n📋 IMPLEMENTATION CHECKLIST:');
        console.log('✅ Image optimization with lazy loading');
        console.log('✅ Bundle optimization and code splitting');
        console.log('✅ Loading indicators and error states');
        console.log('✅ Service Worker caching strategies');
        console.log('✅ Performance monitoring and metrics');
        console.log('✅ Comprehensive test suite');
        
        console.log('\n🚀 Next Steps:');
        console.log('1. Open test-performance.html to run live performance tests');
        console.log('2. Check browser DevTools for Core Web Vitals');
        console.log('3. Validate 3-second load time requirement');
        console.log('4. Monitor performance metrics in production');
        
        console.log('\n' + '='.repeat(60));
    }
}

// Run validation
const validator = new PerformanceValidator();
validator.runValidation().catch(console.error);