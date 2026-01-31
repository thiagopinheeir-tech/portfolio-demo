/**
 * Portfolio Demo System - Integration Validation
 * Validates that all integration components are working correctly
 */

// Validation results
const validationResults = {
    embedScript: false,
    embedCSS: false,
    performanceScript: false,
    projectConfig: false,
    minimalEmbed: false,
    integrationGuide: false,
    examples: false,
    errors: []
};

/**
 * Validate embed script functionality
 */
function validateEmbedScript() {
    try {
        // Check if PortfolioEmbed class exists
        if (typeof PortfolioEmbed === 'undefined') {
            validationResults.errors.push('PortfolioEmbed class not found');
            return false;
        }
        
        // Test basic instantiation
        const testContainer = document.createElement('div');
        testContainer.id = 'test-embed';
        document.body.appendChild(testContainer);
        
        const embed = new PortfolioEmbed({
            container: testContainer,
            mode: 'grid',
            limit: 2,
            baseUrl: './'
        });
        
        // Check if container was populated
        if (testContainer.children.length === 0) {
            validationResults.errors.push('Embed container not populated');
            return false;
        }
        
        // Cleanup
        document.body.removeChild(testContainer);
        
        validationResults.embedScript = true;
        return true;
        
    } catch (error) {
        validationResults.errors.push(`Embed script error: ${error.message}`);
        return false;
    }
}

/**
 * Validate CSS loading
 */
function validateEmbedCSS() {
    try {
        // Check if embed CSS classes are available
        const testElement = document.createElement('div');
        testElement.className = 'portfolio-embed';
        document.body.appendChild(testElement);
        
        const styles = window.getComputedStyle(testElement);
        const fontFamily = styles.fontFamily;
        
        document.body.removeChild(testElement);
        
        // Basic check - if font-family is set, CSS is likely loaded
        if (fontFamily && fontFamily !== 'Times') {
            validationResults.embedCSS = true;
            return true;
        }
        
        validationResults.errors.push('Embed CSS not properly loaded');
        return false;
        
    } catch (error) {
        validationResults.errors.push(`CSS validation error: ${error.message}`);
        return false;
    }
}

/**
 * Validate performance monitoring
 */
function validatePerformanceScript() {
    try {
        // Check if performance monitor exists
        if (typeof performanceMonitor === 'undefined' && typeof PerformanceMonitor === 'undefined') {
            validationResults.errors.push('Performance monitor not found');
            return false;
        }
        
        // Check if performance API is available
        if (typeof performance === 'undefined') {
            validationResults.errors.push('Performance API not available');
            return false;
        }
        
        validationResults.performanceScript = true;
        return true;
        
    } catch (error) {
        validationResults.errors.push(`Performance script error: ${error.message}`);
        return false;
    }
}

/**
 * Validate project configuration
 */
async function validateProjectConfig() {
    try {
        // Check if global projectConfig exists
        if (typeof projectConfig !== 'undefined') {
            const projects = Object.keys(projectConfig);
            if (projects.length >= 5) {
                validationResults.projectConfig = true;
                return true;
            }
        }
        
        // Try to load external config
        try {
            const response = await fetch('./assets/js/project-config.json');
            if (response.ok) {
                const config = await response.json();
                const projects = Object.keys(config);
                if (projects.length >= 5) {
                    validationResults.projectConfig = true;
                    return true;
                }
            }
        } catch (fetchError) {
            // External config not available, that's okay
        }
        
        validationResults.errors.push('Project configuration not found or incomplete');
        return false;
        
    } catch (error) {
        validationResults.errors.push(`Project config error: ${error.message}`);
        return false;
    }
}

/**
 * Validate minimal embed
 */
function validateMinimalEmbed() {
    try {
        // Check if MinimalPortfolioEmbed exists
        if (typeof MinimalPortfolioEmbed === 'undefined') {
            validationResults.errors.push('MinimalPortfolioEmbed not found');
            return false;
        }
        
        validationResults.minimalEmbed = true;
        return true;
        
    } catch (error) {
        validationResults.errors.push(`Minimal embed error: ${error.message}`);
        return false;
    }
}

/**
 * Validate file existence
 */
async function validateFileExistence() {
    const files = [
        'INTEGRATION_GUIDE.md',
        'examples/basic-integration.html',
        'examples/landing-page-integration.html'
    ];
    
    let allExist = true;
    
    for (const file of files) {
        try {
            const response = await fetch(file, { method: 'HEAD' });
            if (!response.ok) {
                validationResults.errors.push(`File not found: ${file}`);
                allExist = false;
            }
        } catch (error) {
            validationResults.errors.push(`Cannot access file: ${file}`);
            allExist = false;
        }
    }
    
    validationResults.integrationGuide = allExist;
    validationResults.examples = allExist;
    
    return allExist;
}

/**
 * Run all validations
 */
async function runValidation() {
    console.log('🔍 Starting Portfolio Integration Validation...\n');
    
    // Run validations
    console.log('📝 Validating embed script...');
    validateEmbedScript();
    
    console.log('🎨 Validating CSS...');
    validateEmbedCSS();
    
    console.log('⚡ Validating performance monitoring...');
    validatePerformanceScript();
    
    console.log('📋 Validating project configuration...');
    await validateProjectConfig();
    
    console.log('📦 Validating minimal embed...');
    validateMinimalEmbed();
    
    console.log('📁 Validating file existence...');
    await validateFileExistence();
    
    // Display results
    console.log('\n' + '='.repeat(50));
    console.log('📊 VALIDATION RESULTS');
    console.log('='.repeat(50));
    
    const results = [
        { name: 'Embed Script', status: validationResults.embedScript },
        { name: 'Embed CSS', status: validationResults.embedCSS },
        { name: 'Performance Script', status: validationResults.performanceScript },
        { name: 'Project Configuration', status: validationResults.projectConfig },
        { name: 'Minimal Embed', status: validationResults.minimalEmbed },
        { name: 'Integration Guide', status: validationResults.integrationGuide },
        { name: 'Examples', status: validationResults.examples }
    ];
    
    results.forEach(result => {
        const status = result.status ? '✅ PASS' : '❌ FAIL';
        console.log(`${result.name.padEnd(25)} ${status}`);
    });
    
    const passCount = results.filter(r => r.status).length;
    const totalCount = results.length;
    
    console.log('\n' + '-'.repeat(50));
    console.log(`📈 Overall Score: ${passCount}/${totalCount} (${Math.round(passCount/totalCount*100)}%)`);
    
    if (validationResults.errors.length > 0) {
        console.log('\n❌ ERRORS FOUND:');
        validationResults.errors.forEach((error, index) => {
            console.log(`${index + 1}. ${error}`);
        });
    }
    
    if (passCount === totalCount) {
        console.log('\n🎉 All validations passed! Integration is ready for production.');
    } else {
        console.log('\n⚠️  Some validations failed. Please check the errors above.');
    }
    
    return validationResults;
}

/**
 * Auto-run validation when script loads
 */
if (typeof window !== 'undefined') {
    // Browser environment
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runValidation, 1000); // Wait for other scripts to load
    });
} else if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { runValidation, validationResults };
}

// Export for manual testing
window.validateIntegration = runValidation;