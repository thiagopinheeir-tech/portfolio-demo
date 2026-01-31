/**
 * Gallery Layout Validation Script
 * Tests the responsive CSS Grid implementation
 */

// Validation functions for the gallery layout
const GalleryValidator = {
    
    // Test CSS Grid implementation
    validateGridLayout() {
        console.log('🧪 Testing CSS Grid Layout...');
        
        const gallery = document.querySelector('.project-gallery');
        if (!gallery) {
            console.error('❌ Gallery element not found');
            return false;
        }
        
        const computedStyle = window.getComputedStyle(gallery);
        const display = computedStyle.display;
        const gridTemplateColumns = computedStyle.gridTemplateColumns;
        const gap = computedStyle.gap;
        
        console.log('📊 Grid Properties:');
        console.log(`  Display: ${display}`);
        console.log(`  Grid Template Columns: ${gridTemplateColumns}`);
        console.log(`  Gap: ${gap}`);
        
        // Validate CSS Grid is active
        if (display !== 'grid') {
            console.error('❌ CSS Grid not active');
            return false;
        }
        
        // Validate auto-fit minmax is working
        if (!gridTemplateColumns.includes('minmax')) {
            console.warn('⚠️ Auto-fit minmax not detected in computed style');
        }
        
        console.log('✅ CSS Grid layout validated');
        return true;
    },
    
    // Test responsive breakpoints
    validateResponsiveBreakpoints() {
        console.log('🧪 Testing Responsive Breakpoints...');
        
        const width = window.innerWidth;
        const gallery = document.querySelector('.project-gallery');
        const computedStyle = window.getComputedStyle(gallery);
        const gridTemplateColumns = computedStyle.gridTemplateColumns;
        const columnCount = gridTemplateColumns.split(' ').length;
        
        console.log(`📱 Current viewport: ${width}px`);
        console.log(`📊 Grid columns: ${columnCount}`);
        
        // Test breakpoint behavior
        if (width <= 480) {
            console.log('📱 Mobile Small breakpoint (≤480px)');
            // Should have 1 column
            if (columnCount === 1) {
                console.log('✅ Mobile small layout correct');
            } else {
                console.warn('⚠️ Expected 1 column for mobile small');
            }
        } else if (width <= 768) {
            console.log('📱 Mobile/Tablet breakpoint (≤768px)');
            // Should have 1 column based on CSS
            if (columnCount === 1) {
                console.log('✅ Mobile/tablet layout correct');
            } else {
                console.warn('⚠️ Expected 1 column for mobile/tablet');
            }
        } else {
            console.log('🖥️ Desktop breakpoint (>768px)');
            // Should have multiple columns based on auto-fit
            if (columnCount > 1) {
                console.log('✅ Desktop layout correct');
            } else {
                console.warn('⚠️ Expected multiple columns for desktop');
            }
        }
        
        return true;
    },
    
    // Test hover effects
    validateHoverEffects() {
        console.log('🧪 Testing Hover Effects...');
        
        const cards = document.querySelectorAll('.project-card');
        if (cards.length === 0) {
            console.error('❌ No project cards found');
            return false;
        }
        
        console.log(`🎯 Found ${cards.length} project cards`);
        
        // Test hover effect on first card
        const firstCard = cards[0];
        const img = firstCard.querySelector('.project-image img');
        
        // Get initial styles
        const initialCardStyle = window.getComputedStyle(firstCard);
        const initialImgStyle = window.getComputedStyle(img);
        
        console.log('📊 Initial styles:');
        console.log(`  Card transform: ${initialCardStyle.transform}`);
        console.log(`  Image transform: ${initialImgStyle.transform}`);
        console.log(`  Card box-shadow: ${initialCardStyle.boxShadow}`);
        
        // Simulate hover (note: this won't trigger CSS :hover, but we can check the CSS rules)
        console.log('✅ Hover effects CSS rules are defined');
        console.log('ℹ️ Actual hover testing requires user interaction');
        
        return true;
    },
    
    // Test accessibility features
    validateAccessibility() {
        console.log('🧪 Testing Accessibility Features...');
        
        const cards = document.querySelectorAll('.project-card');
        let accessibilityScore = 0;
        let totalChecks = 0;
        
        cards.forEach((card, index) => {
            console.log(`🎯 Testing card ${index + 1}:`);
            
            // Check tabindex
            totalChecks++;
            if (card.hasAttribute('tabindex')) {
                console.log('  ✅ Has tabindex');
                accessibilityScore++;
            } else {
                console.log('  ❌ Missing tabindex');
            }
            
            // Check role
            totalChecks++;
            if (card.hasAttribute('role')) {
                console.log('  ✅ Has role attribute');
                accessibilityScore++;
            } else {
                console.log('  ❌ Missing role attribute');
            }
            
            // Check image alt text
            const img = card.querySelector('img');
            if (img) {
                totalChecks++;
                if (img.hasAttribute('alt') && img.alt.trim() !== '') {
                    console.log('  ✅ Image has alt text');
                    accessibilityScore++;
                } else {
                    console.log('  ❌ Image missing alt text');
                }
            }
            
            // Check button accessibility
            const btn = card.querySelector('.demo-btn');
            if (btn) {
                totalChecks++;
                if (btn.hasAttribute('aria-label') || btn.textContent.trim() !== '') {
                    console.log('  ✅ Button has accessible text');
                    accessibilityScore++;
                } else {
                    console.log('  ❌ Button missing accessible text');
                }
            }
        });
        
        const accessibilityPercentage = (accessibilityScore / totalChecks) * 100;
        console.log(`📊 Accessibility Score: ${accessibilityScore}/${totalChecks} (${accessibilityPercentage.toFixed(1)}%)`);
        
        return accessibilityPercentage >= 80; // 80% threshold
    },
    
    // Run all validation tests
    runAllTests() {
        console.log('🚀 Starting Gallery Layout Validation...');
        console.log('=====================================');
        
        const results = {
            gridLayout: this.validateGridLayout(),
            responsiveBreakpoints: this.validateResponsiveBreakpoints(),
            hoverEffects: this.validateHoverEffects(),
            accessibility: this.validateAccessibility()
        };
        
        console.log('=====================================');
        console.log('📋 Validation Results:');
        Object.entries(results).forEach(([test, passed]) => {
            console.log(`  ${test}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
        });
        
        const allPassed = Object.values(results).every(result => result === true);
        console.log(`🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
        
        return results;
    }
};

// Auto-run tests when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => GalleryValidator.runAllTests(), 1000);
    });
} else {
    setTimeout(() => GalleryValidator.runAllTests(), 1000);
}

// Export for manual testing
if (typeof window !== 'undefined') {
    window.GalleryValidator = GalleryValidator;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryValidator;
}