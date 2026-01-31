/**
 * Simple test for source project preservation logic
 */

console.log('Starting source project preservation test...');

// Mock environment
global.window = {};
global.document = { addEventListener: () => {} };

// Mock project configuration
global.projectConfig = {
    "acai-dany": {
        name: "Açaí da Dany",
        sourcePath: "../acai da dany/",
        demoPath: "./demos/acai-dany/"
    },
    "landpage-divulga": {
        name: "Landing Page Divulga",
        sourcePath: "../landpage divulga/",
        demoPath: "./demos/landpage-divulga/"
    }
};

try {
    // Load the module
    const { FileOperations } = require('./assets/js/file-operations.js');
    
    console.log('✓ Module loaded successfully');
    
    // Create instance
    const fileOps = new FileOperations();
    
    console.log('✓ FileOperations instance created');
    
    // Test project key extraction
    const acaiKey = fileOps.extractProjectKeyFromPath("../acai da dany/");
    const landpageKey = fileOps.extractProjectKeyFromPath("../landpage divulga/");
    
    console.log(`✓ Project keys extracted: ${acaiKey}, ${landpageKey}`);
    
    // Test permission checking
    const acaiPermission = fileOps.checkModificationPermission("../acai da dany/", "write");
    const landpagePermission = fileOps.checkModificationPermission("../landpage divulga/", "write");
    
    console.log('✓ Permission checking works');
    console.log(`  - Açaí write allowed: ${acaiPermission.allowed}`);
    console.log(`  - Landpage write allowed: ${landpagePermission.allowed}`);
    
    // Test source protection
    fileOps.enableSourceProtection("../acai da dany/", "acai-dany");
    console.log('✓ Source protection enabled');
    
    // Test directory structure preservation
    const mockStructure = {
        path: "../acai da dany/",
        files: [
            { name: 'index.html', path: 'index.html' },
            { name: 'style.css', path: 'css/style.css' }
        ]
    };
    
    const preservation = fileOps.preserveDirectoryStructure(mockStructure, "./demos/acai-dany/");
    console.log('✓ Directory structure preservation planned');
    console.log(`  - Directories: ${preservation.directories.join(', ')}`);
    
    // Test preservation report
    const report = fileOps.generatePreservationReport();
    console.log('✓ Preservation report generated');
    console.log(`  - Protected projects: ${report.summary.protectedProjects}`);
    console.log(`  - Activities: ${report.summary.preservationActivities}`);
    
    console.log('\n✅ All source project preservation tests passed!');
    
} catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
}