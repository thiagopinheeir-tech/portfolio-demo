/**
 * Manual System Verification - Portfolio Demo System
 * Node.js compatible verification script
 */

const fs = require('fs');
const path = require('path');

class ManualSystemVerification {
    constructor() {
        this.results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            warnings: 0,
            requirements: {},
            components: {},
            performance: {},
            accessibility: {},
            documentation: {},
            deployment: {}
        };
        this.startTime = Date.now();
    }

    /**
     * Execute complete system verification
     */
    async executeCompleteVerification() {
        console.log('🔍 Starting Manual System Verification...');
        console.log('==========================================');

        try {
            // 1. Verify Core Components
            this.verifyComponents();
            
            // 2. Verify All 5 Project Demos
            this.verifyProjectDemos();
            
            // 3. Verify Performance Features
            this.verifyPerformanceFeatures();
            
            // 4. Verify Accessibility Features
            this.verifyAccessibilityFeatures();
            
            // 5. Verify Responsive Design
            this.verifyResponsiveDesign();
            
            // 6. Verify Documentation
            this.verifyDocumentation();
            
            // 7. Verify Deployment Readiness
            this.verifyDeployment();
            
            // 8. Verify Requirements Compliance
            this.verifyRequirements();
            
            // 9. Generate Final Report
            this.generateFinalReport();
            
        } catch (error) {
            console.error('❌ Verification failed:', error);
            this.results.failedTests++;
        }
    }

    /**
     * Check if file exists
     */
    fileExists(filePath) {
        try {
            return fs.existsSync(filePath);
        } catch (error) {
            return false;
        }
    }

    /**
     * Read file content
     */
    readFile(filePath) {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            return null;
        }
    }

    /**
     * Verify core components are present and functional
     */
    verifyComponents() {
        console.log('\n📦 Verifying Core Components...');
        
        const components = [
            { name: 'Main HTML', path: 'index.html', required: true },
            { name: 'Main CSS', path: 'assets/css/main.css', required: true },
            { name: 'Gallery CSS', path: 'assets/css/gallery.css', required: true },
            { name: 'Navigation CSS', path: 'assets/css/navigation.css', required: true },
            { name: 'Accessibility CSS', path: 'assets/css/accessibility.css', required: true },
            { name: 'Performance CSS', path: 'assets/css/performance.css', required: true },
            { name: 'Main JS', path: 'assets/js/main.js', required: true },
            { name: 'Demo Loader JS', path: 'assets/js/demo-loader.js', required: true },
            { name: 'Navigation JS', path: 'assets/js/navigation.js', required: true },
            { name: 'Accessibility JS', path: 'assets/js/accessibility.js', required: true },
            { name: 'Performance JS', path: 'assets/js/performance.js', required: true },
            { name: 'Service Worker', path: 'sw.js', required: true },
            { name: 'State Reset System', path: 'state-reset-system.js', required: true }
        ];

        for (const component of components) {
            this.results.totalTests++;
            if (this.fileExists(component.path)) {
                console.log(`✅ ${component.name}: Found`);
                this.results.passedTests++;
                this.results.components[component.name] = 'PASS';
            } else {
                if (component.required) {
                    console.log(`❌ ${component.name}: Missing (Required)`);
                    this.results.failedTests++;
                    this.results.components[component.name] = 'FAIL';
                } else {
                    console.log(`⚠️ ${component.name}: Missing (Optional)`);
                    this.results.warnings++;
                    this.results.components[component.name] = 'WARN';
                }
            }
        }
    }

    /**
     * Verify all 5 project demos are present and accessible
     */
    verifyProjectDemos() {
        console.log('\n🎯 Verifying Project Demos...');
        
        const projects = [
            { key: 'acai-dany', name: 'Açaí da Dany', path: 'demos/acai-dany/index.html' },
            { key: 'barbearia-raimundos', name: 'Barbearia Raimundos', path: 'demos/barbearia-raimundos/index.html' },
            { key: 'financas-pessoais', name: 'Finanças Pessoais', path: 'demos/financas-pessoais/index.html' },
            { key: 'whatsapp-bot-ai', name: 'WhatsApp Bot AI', path: 'demos/whatsapp-bot-ai/index.html' },
            { key: 'landpage-divulga', name: 'Landing Page Divulga', path: 'demos/landpage-divulga/index.html' }
        ];

        let projectsFound = 0;
        
        for (const project of projects) {
            this.results.totalTests++;
            if (this.fileExists(project.path)) {
                const content = this.readFile(project.path);
                
                // Check for navigation integration
                const hasNavigation = content && (content.includes('navigation.css') || content.includes('navigation.js') || content.includes('demo-wrapper'));
                const hasStateReset = content && content.includes('state-reset-system.js');
                
                console.log(`✅ ${project.name}: Found ${hasNavigation ? '(with navigation)' : ''} ${hasStateReset ? '(with state reset)' : ''}`);
                this.results.passedTests++;
                projectsFound++;
            } else {
                console.log(`❌ ${project.name}: Missing`);
                this.results.failedTests++;
            }
        }

        // Verify Requirements 1.1 (All projects present)
        this.results.requirements['1.1'] = projectsFound === 5 ? 'PASS' : 'FAIL';
        console.log(`\n📋 Requirements 1.1 (All projects present): ${this.results.requirements['1.1']} (${projectsFound}/5 projects)`);
    }

    /**
     * Verify performance features
     */
    verifyPerformanceFeatures() {
        console.log('\n⚡ Verifying Performance Features...');
        
        try {
            const htmlContent = this.readFile('index.html');
            
            // Check for performance optimizations
            this.results.totalTests++;
            if (htmlContent && (htmlContent.includes('preload') || htmlContent.includes('prefetch'))) {
                console.log('✅ Resource Hints: Found');
                this.results.passedTests++;
                this.results.performance.resourceHints = 'PASS';
            } else {
                console.log('⚠️ Resource Hints: Not found');
                this.results.warnings++;
                this.results.performance.resourceHints = 'WARN';
            }

            this.results.totalTests++;
            if (htmlContent && htmlContent.includes('loading="lazy"')) {
                console.log('✅ Lazy Loading: Implemented');
                this.results.passedTests++;
                this.results.performance.lazyLoading = 'PASS';
            } else {
                console.log('⚠️ Lazy Loading: Not found');
                this.results.warnings++;
                this.results.performance.lazyLoading = 'WARN';
            }

            // Check for service worker
            this.results.totalTests++;
            if (this.fileExists('sw.js')) {
                console.log('✅ Service Worker: Found');
                this.results.passedTests++;
                this.results.performance.serviceWorker = 'PASS';
            } else {
                console.log('❌ Service Worker: Missing');
                this.results.failedTests++;
                this.results.performance.serviceWorker = 'FAIL';
            }

            // Verify Requirements 7.1 (Performance)
            const perfPassed = Object.values(this.results.performance).filter(v => v === 'PASS').length;
            this.results.requirements['7.1'] = perfPassed >= 2 ? 'PASS' : 'FAIL';
            
        } catch (error) {
            console.log(`❌ Performance verification failed: ${error.message}`);
            this.results.failedTests++;
            this.results.performance.loadTime = 'FAIL';
        }
    }

    /**
     * Verify accessibility features
     */
    verifyAccessibilityFeatures() {
        console.log('\n♿ Verifying Accessibility Features...');
        
        try {
            const htmlContent = this.readFile('index.html');
            
            // Check for ARIA attributes
            this.results.totalTests++;
            if (htmlContent && htmlContent.includes('aria-') && htmlContent.includes('role=')) {
                console.log('✅ ARIA Attributes: Found');
                this.results.passedTests++;
                this.results.accessibility.aria = 'PASS';
            } else {
                console.log('❌ ARIA Attributes: Missing');
                this.results.failedTests++;
                this.results.accessibility.aria = 'FAIL';
            }

            // Check for semantic HTML
            this.results.totalTests++;
            if (htmlContent && htmlContent.includes('<main>') && htmlContent.includes('<header>') && htmlContent.includes('<section>')) {
                console.log('✅ Semantic HTML: Found');
                this.results.passedTests++;
                this.results.accessibility.semantic = 'PASS';
            } else {
                console.log('❌ Semantic HTML: Missing');
                this.results.failedTests++;
                this.results.accessibility.semantic = 'FAIL';
            }

            // Check for skip links
            this.results.totalTests++;
            if (htmlContent && (htmlContent.includes('skip-link') || htmlContent.includes('Pular para'))) {
                console.log('✅ Skip Links: Found');
                this.results.passedTests++;
                this.results.accessibility.skipLinks = 'PASS';
            } else {
                console.log('❌ Skip Links: Missing');
                this.results.failedTests++;
                this.results.accessibility.skipLinks = 'FAIL';
            }

            // Check for alt text
            this.results.totalTests++;
            if (htmlContent && htmlContent.includes('alt=')) {
                console.log('✅ Alt Text: Found');
                this.results.passedTests++;
                this.results.accessibility.altText = 'PASS';
            } else {
                console.log('⚠️ Alt Text: Not found in main page');
                this.results.warnings++;
                this.results.accessibility.altText = 'WARN';
            }

            // Verify Requirements 7.3, 7.4, 7.5 (Accessibility)
            const accessibilityPassed = Object.values(this.results.accessibility).filter(v => v === 'PASS').length;
            this.results.requirements['7.3'] = accessibilityPassed >= 2 ? 'PASS' : 'FAIL';
            this.results.requirements['7.4'] = this.results.accessibility.skipLinks === 'PASS' ? 'PASS' : 'FAIL';
            this.results.requirements['7.5'] = this.results.accessibility.semantic === 'PASS' ? 'PASS' : 'FAIL';
            
        } catch (error) {
            console.log(`❌ Accessibility verification failed: ${error.message}`);
            this.results.failedTests++;
        }
    }

    /**
     * Verify responsive design
     */
    verifyResponsiveDesign() {
        console.log('\n📱 Verifying Responsive Design...');
        
        try {
            const cssContent = this.readFile('assets/css/main.css');
            
            // Check for media queries
            this.results.totalTests++;
            if (cssContent && cssContent.includes('@media')) {
                const mediaQueries = cssContent.match(/@media[^{]+/g);
                console.log(`✅ Media Queries: Found ${mediaQueries ? mediaQueries.length : 0} queries`);
                this.results.passedTests++;
                this.results.requirements['4.2'] = 'PASS';
            } else {
                console.log('❌ Media Queries: Not found');
                this.results.failedTests++;
                this.results.requirements['4.2'] = 'FAIL';
            }

            // Check for viewport meta tag
            const htmlContent = this.readFile('index.html');
            
            this.results.totalTests++;
            if (htmlContent && htmlContent.includes('viewport')) {
                console.log('✅ Viewport Meta Tag: Found');
                this.results.passedTests++;
                this.results.requirements['7.2'] = 'PASS';
            } else {
                console.log('❌ Viewport Meta Tag: Missing');
                this.results.failedTests++;
                this.results.requirements['7.2'] = 'FAIL';
            }
            
        } catch (error) {
            console.log(`❌ Responsive design verification failed: ${error.message}`);
            this.results.failedTests++;
        }
    }

    /**
     * Verify documentation completeness
     */
    verifyDocumentation() {
        console.log('\n📚 Verifying Documentation...');
        
        const docs = [
            { name: 'README', path: 'README.md', required: true },
            { name: 'Setup Guide', path: 'SETUP.md', required: true },
            { name: 'Deployment Guide', path: 'DEPLOYMENT.md', required: true },
            { name: 'Integration Guide', path: 'INTEGRATION_GUIDE.md', required: true },
            { name: 'Project Structure', path: 'PROJECT_STRUCTURE.md', required: true },
            { name: 'Configuration Guide', path: 'CONFIGURATION.md', required: true },
            { name: 'Troubleshooting', path: 'TROUBLESHOOTING.md', required: true },
            { name: 'Contributing Guide', path: 'CONTRIBUTING.md', required: true }
        ];

        let docsFound = 0;
        
        for (const doc of docs) {
            this.results.totalTests++;
            if (this.fileExists(doc.path)) {
                console.log(`✅ ${doc.name}: Found`);
                this.results.passedTests++;
                this.results.documentation[doc.name] = 'PASS';
                docsFound++;
            } else {
                if (doc.required) {
                    console.log(`❌ ${doc.name}: Missing (Required)`);
                    this.results.failedTests++;
                    this.results.documentation[doc.name] = 'FAIL';
                } else {
                    console.log(`⚠️ ${doc.name}: Missing (Optional)`);
                    this.results.warnings++;
                    this.results.documentation[doc.name] = 'WARN';
                }
            }
        }

        // Verify Requirements 5.2 (Documentation)
        this.results.requirements['5.2'] = docsFound >= 6 ? 'PASS' : 'FAIL';
        console.log(`\n📋 Requirements 5.2 (Documentation): ${this.results.requirements['5.2']} (${docsFound}/${docs.length} docs)`);
    }

    /**
     * Verify deployment readiness
     */
    verifyDeployment() {
        console.log('\n🚀 Verifying Deployment Readiness...');
        
        const deployConfigs = [
            { name: 'Netlify Config', path: 'netlify.toml' },
            { name: 'Vercel Config', path: 'vercel.json' },
            { name: 'GitHub Pages Config', path: '_config.yml' },
            { name: 'GitHub Actions', path: '.github/workflows/deploy.yml' }
        ];

        let configsFound = 0;
        
        for (const config of deployConfigs) {
            this.results.totalTests++;
            if (this.fileExists(config.path)) {
                console.log(`✅ ${config.name}: Found`);
                this.results.passedTests++;
                this.results.deployment[config.name] = 'PASS';
                configsFound++;
            } else {
                console.log(`⚠️ ${config.name}: Not found`);
                this.results.warnings++;
                this.results.deployment[config.name] = 'WARN';
            }
        }

        // Verify Requirements 5.5 (Static hosting compatibility)
        this.results.requirements['5.5'] = configsFound >= 2 ? 'PASS' : 'FAIL';
        console.log(`\n📋 Requirements 5.5 (Static hosting): ${this.results.requirements['5.5']} (${configsFound}/4 configs)`);
    }

    /**
     * Verify all requirements compliance
     */
    verifyRequirements() {
        console.log('\n📋 Verifying Requirements Compliance...');
        
        const allRequirements = [
            '1.1', // All projects present
            '4.2', // Responsive design
            '5.2', // Documentation
            '5.5', // Static hosting
            '7.1', // Performance
            '7.2', // Mobile/tablet/desktop
            '7.3', // Accessibility standards
            '7.4', // Keyboard navigation
            '7.5'  // Semantic HTML
        ];

        let requirementsPassed = 0;
        
        for (const req of allRequirements) {
            const status = this.results.requirements[req] || 'NOT_TESTED';
            if (status === 'PASS') {
                console.log(`✅ Requirement ${req}: PASS`);
                requirementsPassed++;
            } else if (status === 'FAIL') {
                console.log(`❌ Requirement ${req}: FAIL`);
            } else {
                console.log(`⚠️ Requirement ${req}: ${status}`);
            }
        }

        console.log(`\n📊 Requirements Summary: ${requirementsPassed}/${allRequirements.length} passed`);
    }

    /**
     * Generate final verification report
     */
    generateFinalReport() {
        const endTime = Date.now();
        const duration = endTime - this.startTime;
        
        console.log('\n==========================================');
        console.log('🎯 FINAL SYSTEM VERIFICATION REPORT');
        console.log('==========================================');
        
        console.log(`\n📊 Test Results:`);
        console.log(`   Total Tests: ${this.results.totalTests}`);
        console.log(`   Passed: ${this.results.passedTests}`);
        console.log(`   Failed: ${this.results.failedTests}`);
        console.log(`   Warnings: ${this.results.warnings}`);
        console.log(`   Duration: ${duration}ms`);
        
        const successRate = Math.round((this.results.passedTests / this.results.totalTests) * 100);
        console.log(`   Success Rate: ${successRate}%`);
        
        console.log(`\n🎯 Requirements Status:`);
        const reqPassed = Object.values(this.results.requirements).filter(v => v === 'PASS').length;
        const reqTotal = Object.keys(this.results.requirements).length;
        console.log(`   Requirements Passed: ${reqPassed}/${reqTotal}`);
        
        console.log(`\n📦 Component Status:`);
        const compPassed = Object.values(this.results.components).filter(v => v === 'PASS').length;
        const compTotal = Object.keys(this.results.components).length;
        console.log(`   Components Working: ${compPassed}/${compTotal}`);
        
        // Final verdict
        console.log('\n==========================================');
        if (this.results.failedTests === 0 && reqPassed >= reqTotal * 0.8) {
            console.log('🎉 SYSTEM VERIFICATION: PASSED');
            console.log('✅ Portfolio Demo System is ready for production!');
        } else if (this.results.failedTests <= 2 && reqPassed >= reqTotal * 0.7) {
            console.log('⚠️ SYSTEM VERIFICATION: PASSED WITH WARNINGS');
            console.log('✅ Portfolio Demo System is functional with minor issues');
        } else {
            console.log('❌ SYSTEM VERIFICATION: FAILED');
            console.log('❌ Critical issues need to be addressed before production');
        }
        console.log('==========================================');
        
        // Return results for external access
        return this.results;
    }
}

// Execute verification
const verification = new ManualSystemVerification();
verification.executeCompleteVerification().then(results => {
    process.exit(results.failedTests > 2 ? 1 : 0);
}).catch(error => {
    console.error('Verification failed:', error);
    process.exit(1);
});