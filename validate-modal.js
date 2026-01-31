/**
 * Modal Functionality Validation Script
 * Validates that task 5.1 requirements are fully implemented
 */

const fs = require('fs');
const path = require('path');

class ModalValidator {
    constructor() {
        this.results = [];
        this.basePath = __dirname;
    }

    log(test, passed, details = '') {
        this.results.push({ test, passed, details });
        const status = passed ? '✅ PASS' : '❌ FAIL';
        console.log(`${status}: ${test}${details ? ' - ' + details : ''}`);
    }

    // Validate HTML structure
    validateHTMLStructure() {
        console.log('\n🔍 Validating HTML Structure...');
        
        try {
            const indexPath = path.join(this.basePath, 'index.html');
            const htmlContent = fs.readFileSync(indexPath, 'utf8');
            
            // Check for modal overlay structure
            this.log('Demo modal element exists', htmlContent.includes('class="demo-modal"'));
            this.log('Demo modal has ID', htmlContent.includes('id="demoModal"'));
            this.log('Demo container exists', htmlContent.includes('class="demo-container"'));
            
            // Check for modal header
            this.log('Demo header exists', htmlContent.includes('class="demo-header"'));
            this.log('Demo title element exists', htmlContent.includes('id="demoTitle"'));
            this.log('Close button exists', htmlContent.includes('class="close-demo"'));
            this.log('Close button has ID', htmlContent.includes('id="closeDemoBtn"'));
            
            // Check for modal content
            this.log('Demo content exists', htmlContent.includes('class="demo-content"'));
            this.log('Iframe element exists', htmlContent.includes('id="demoFrame"'));
            this.log('Iframe has proper attributes', 
                htmlContent.includes('frameborder="0"') && htmlContent.includes('title="Demo do projeto"'));
            
            // Check for modal footer
            this.log('Demo footer exists', htmlContent.includes('class="demo-footer"'));
            this.log('Fullscreen button exists', htmlContent.includes('class="fullscreen-btn"'));
            this.log('Fullscreen button has ID', htmlContent.includes('id="fullscreenBtn"'));
            this.log('External link exists', htmlContent.includes('class="external-link"'));
            this.log('External link has ID', htmlContent.includes('id="externalLink"'));
            
            // Check for accessibility attributes
            this.log('Close button has aria-label', htmlContent.includes('aria-label="Fechar demo"'));
            this.log('External link opens in new tab', htmlContent.includes('target="_blank"'));
            
        } catch (error) {
            this.log('HTML file readable', false, error.message);
        }
    }

    // Validate CSS styles
    validateCSSStyles() {
        console.log('\n🎨 Validating CSS Styles...');
        
        try {
            const cssPath = path.join(this.basePath, 'assets/css/gallery.css');
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            
            // Check modal overlay styles
            this.log('Modal overlay styles exist', cssContent.includes('.demo-modal'));
            this.log('Modal positioning fixed', cssContent.includes('position: fixed'));
            this.log('Modal covers full viewport', 
                cssContent.includes('top: 0') && 
                cssContent.includes('left: 0') && 
                cssContent.includes('right: 0') && 
                cssContent.includes('bottom: 0'));
            this.log('Modal has backdrop', cssContent.includes('background: rgba(0, 0, 0, 0.8)'));
            this.log('Modal has z-index', cssContent.includes('z-index: var(--z-modal)'));
            
            // Check modal container styles
            this.log('Modal container styles exist', cssContent.includes('.demo-container'));
            this.log('Modal container responsive', cssContent.includes('max-width: 1200px'));
            this.log('Modal container max-height', cssContent.includes('max-height: 90vh'));
            this.log('Modal container flex layout', cssContent.includes('display: flex'));
            this.log('Modal container flex-direction', cssContent.includes('flex-direction: column'));
            
            // Check responsive design
            this.log('Mobile responsive styles exist', cssContent.includes('@media (max-width: 768px)'));
            this.log('Small mobile styles exist', cssContent.includes('@media (max-width: 480px)'));
            
            // Check transitions and animations
            this.log('Modal has transitions', cssContent.includes('transition: all var(--transition-normal)'));
            this.log('Modal active state', cssContent.includes('.demo-modal.active'));
            this.log('Modal visibility control', 
                cssContent.includes('opacity: 0') && 
                cssContent.includes('visibility: hidden'));
            
            // Check button styles
            this.log('Close button styles exist', cssContent.includes('.close-demo'));
            this.log('Fullscreen button styles exist', cssContent.includes('.fullscreen-btn'));
            this.log('External link styles exist', cssContent.includes('.external-link'));
            
        } catch (error) {
            this.log('CSS file readable', false, error.message);
        }
    }

    // Validate JavaScript functionality
    validateJavaScriptFunctionality() {
        console.log('\n⚙️ Validating JavaScript Functionality...');
        
        try {
            // Check main.js
            const mainJsPath = path.join(this.basePath, 'assets/js/main.js');
            const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
            
            this.log('Modal open function exists', mainJsContent.includes('function openDemoModal'));
            this.log('Modal close function exists', mainJsContent.includes('function closeDemoModal'));
            this.log('Fullscreen toggle function exists', mainJsContent.includes('function toggleFullscreen'));
            this.log('Modal backdrop click handler exists', mainJsContent.includes('handleModalBackdropClick'));
            this.log('Escape key handler exists', mainJsContent.includes('handleEscapeKey'));
            this.log('Demo state management exists', mainJsContent.includes('demoState'));
            this.log('Focus trap functionality exists', mainJsContent.includes('trapFocus'));
            this.log('Return focus functionality exists', mainJsContent.includes('returnFocus'));
            
            // Check demo-loader.js
            const demoLoaderPath = path.join(this.basePath, 'assets/js/demo-loader.js');
            const demoLoaderContent = fs.readFileSync(demoLoaderPath, 'utf8');
            
            this.log('Demo loader class exists', demoLoaderContent.includes('class DemoLoader'));
            this.log('Load demo method exists', demoLoaderContent.includes('loadDemo'));
            this.log('Error handling exists', demoLoaderContent.includes('handleLoadError'));
            this.log('Timeout handling exists', demoLoaderContent.includes('handleLoadTimeout'));
            this.log('Retry logic exists', demoLoaderContent.includes('retryAttempts'));
            this.log('Demo verification exists', demoLoaderContent.includes('verifyDemoLoad'));
            this.log('Navigation injection exists', demoLoaderContent.includes('injectDemoNavigation'));
            
        } catch (error) {
            this.log('JavaScript files readable', false, error.message);
        }
    }

    // Validate responsive sizing
    validateResponsiveSizing() {
        console.log('\n📱 Validating Responsive Sizing...');
        
        try {
            const cssPath = path.join(this.basePath, 'assets/css/gallery.css');
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            
            // Check mobile breakpoints
            this.log('Tablet breakpoint exists', cssContent.includes('@media (max-width: 768px)'));
            this.log('Mobile breakpoint exists', cssContent.includes('@media (max-width: 480px)'));
            
            // Check responsive modal adjustments
            const mobileSection = cssContent.split('@media (max-width: 768px)')[1];
            if (mobileSection) {
                this.log('Mobile modal padding adjusted', mobileSection.includes('.demo-modal'));
                this.log('Mobile container height adjusted', mobileSection.includes('max-height: 95vh'));
                this.log('Mobile footer layout adjusted', mobileSection.includes('flex-direction: column'));
            } else {
                this.log('Mobile responsive section exists', false);
            }
            
        } catch (error) {
            this.log('Responsive validation failed', false, error.message);
        }
    }

    // Validate fullscreen and external link options
    validateModalOptions() {
        console.log('\n🔗 Validating Modal Options...');
        
        try {
            const mainJsPath = path.join(this.basePath, 'assets/js/main.js');
            const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
            
            // Check fullscreen functionality
            this.log('Fullscreen API usage', mainJsContent.includes('requestFullscreen'));
            this.log('Exit fullscreen functionality', mainJsContent.includes('exitFullscreen'));
            this.log('Fullscreen state tracking', mainJsContent.includes('isFullscreen'));
            this.log('Fullscreen button text update', mainJsContent.includes('Sair da Tela Cheia'));
            
            // Check external link functionality
            this.log('External link href update', mainJsContent.includes('externalLink.href'));
            this.log('External link target blank', mainJsContent.includes('target="_blank"'));
            
        } catch (error) {
            this.log('Modal options validation failed', false, error.message);
        }
    }

    // Validate accessibility features
    validateAccessibility() {
        console.log('\n♿ Validating Accessibility Features...');
        
        try {
            const indexPath = path.join(this.basePath, 'index.html');
            const htmlContent = fs.readFileSync(indexPath, 'utf8');
            
            const mainJsPath = path.join(this.basePath, 'assets/js/main.js');
            const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
            
            // Check ARIA attributes
            this.log('Modal has role dialog', htmlContent.includes('role="dialog"') || mainJsContent.includes('role", "dialog'));
            this.log('Modal has aria-modal', htmlContent.includes('aria-modal="true"') || mainJsContent.includes('aria-modal", "true'));
            this.log('Close button has aria-label', htmlContent.includes('aria-label="Fechar demo"'));
            
            // Check focus management
            this.log('Focus trap implementation', mainJsContent.includes('trapFocus'));
            this.log('Focus return implementation', mainJsContent.includes('returnFocus'));
            this.log('Keyboard navigation support', mainJsContent.includes('handleKeyboardNavigation'));
            this.log('Escape key support', mainJsContent.includes('Escape'));
            
            // Check semantic HTML
            this.log('Iframe has title attribute', htmlContent.includes('title="Demo do projeto"'));
            this.log('Buttons have proper labels', htmlContent.includes('aria-label'));
            
        } catch (error) {
            this.log('Accessibility validation failed', false, error.message);
        }
    }

    // Run all validations
    validate() {
        console.log('🚀 Starting Modal Implementation Validation for Task 5.1\n');
        
        this.validateHTMLStructure();
        this.validateCSSStyles();
        this.validateJavaScriptFunctionality();
        this.validateResponsiveSizing();
        this.validateModalOptions();
        this.validateAccessibility();
        
        // Summary
        const passed = this.results.filter(r => r.passed).length;
        const total = this.results.length;
        const percentage = Math.round((passed / total) * 100);
        
        console.log('\n📊 VALIDATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${total - passed}`);
        console.log(`Success Rate: ${percentage}%`);
        
        if (percentage >= 90) {
            console.log('\n🎉 Task 5.1 Implementation: EXCELLENT');
            console.log('Modal overlay and demo container are fully implemented!');
        } else if (percentage >= 75) {
            console.log('\n✅ Task 5.1 Implementation: GOOD');
            console.log('Modal functionality is mostly complete with minor issues.');
        } else {
            console.log('\n⚠️ Task 5.1 Implementation: NEEDS WORK');
            console.log('Several modal requirements are missing or incomplete.');
        }
        
        return { passed, total, percentage };
    }
}

// Run validation if called directly
if (require.main === module) {
    const validator = new ModalValidator();
    validator.validate();
}

module.exports = ModalValidator;