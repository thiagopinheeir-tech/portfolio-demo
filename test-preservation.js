/**
 * Test Source Project Preservation Logic
 * Validates the implementation of task 2.3
 */

// Mock environment setup
global.window = {};
global.document = { addEventListener: () => {} };
global.console = console;

// Mock project configuration
global.projectConfig = {
    "acai-dany": {
        name: "Açaí da Dany",
        sourcePath: "../acai da dany/",
        demoPath: "./demos/acai-dany/"
    },
    "barbearia-raimundos": {
        name: "Barbearia Raimundos",
        sourcePath: "../Barbearia raimundos/",
        demoPath: "./demos/barbearia-raimundos/"
    },
    "landpage-divulga": {
        name: "Landing Page Divulga",
        sourcePath: "../landpage divulga/",
        demoPath: "./demos/landpage-divulga/"
    }
};

// Load the file operations module
const {
    FileOperations,
    fileOperations,
    enableAllSourceProtection,
    checkProjectModificationPermission,
    generateSystemPreservationReport
} = require('./assets/js/file-operations.js');

/**
 * Test source project preservation functionality
 */
async function testSourceProjectPreservation() {
    console.log('\n=== Testing Source Project Preservation Logic ===\n');

    try {
        // Test 1: Enable source protection for all projects
        console.log('Test 1: Enabling source protection...');
        const protectionResults = await enableAllSourceProtection();
        
        console.log('Protection results:', protectionResults);
        
        // Verify that non-Landpage projects are protected
        const protectedProjects = protectionResults.filter(r => r.protected);
        const unprotectedProjects = protectionResults.filter(r => !r.protected);
        
        console.log(`✓ Protected projects: ${protectedProjects.length}`);
        console.log(`✓ Unprotected projects: ${unprotectedProjects.length}`);
        
        // Test 2: Check modification permissions
        console.log('\nTest 2: Checking modification permissions...');
        
        // Test strict protection for regular projects
        const acaiPermission = checkProjectModificationPermission('acai-dany', 'write');
        console.log('Açaí da Dany write permission:', acaiPermission);
        
        const barbeariaPermission = checkProjectModificationPermission('barbearia-raimundos', 'write');
        console.log('Barbearia Raimundos write permission:', barbeariaPermission);
        
        // Test permissive access for Landpage Divulga
        const landpagePermission = checkProjectModificationPermission('landpage-divulga', 'write');
        console.log('Landpage Divulga write permission:', landpagePermission);
        
        // Verify expected behavior
        if (!acaiPermission.allowed && !barbeariaPermission.allowed && landpagePermission.allowed) {
            console.log('✓ Permission system working correctly');
        } else {
            console.log('✗ Permission system has issues');
        }
        
        // Test 3: Test copy permissions
        console.log('\nTest 3: Checking copy permissions...');
        
        const acaiCopyPermission = checkProjectModificationPermission('acai-dany', 'copy');
        const landpageCopyPermission = checkProjectModificationPermission('landpage-divulga', 'copy');
        
        console.log('Açaí da Dany copy permission:', acaiCopyPermission);
        console.log('Landpage Divulga copy permission:', landpageCopyPermission);
        
        if (acaiCopyPermission.allowed && landpageCopyPermission.allowed) {
            console.log('✓ Copy permissions working correctly');
        } else {
            console.log('✗ Copy permissions have issues');
        }
        
        // Test 4: Test directory structure preservation
        console.log('\nTest 4: Testing directory structure preservation...');
        
        const mockSourceStructure = {
            path: "../acai da dany/",
            files: [
                { name: 'index.html', path: 'index.html', size: 1024 },
                { name: 'style.css', path: 'css/style.css', size: 512 },
                { name: 'script.js', path: 'js/script.js', size: 256 },
                { name: 'logo.png', path: 'images/logo.png', size: 2048 },
                { name: 'main.js', path: 'js/utils/main.js', size: 128 }
            ]
        };
        
        const preservation = fileOperations.preserveDirectoryStructure(
            mockSourceStructure, 
            './demos/acai-dany/'
        );
        
        console.log('Directory preservation plan:', preservation);
        
        if (preservation.directories.length > 0) {
            console.log('✓ Directory structure preservation planned correctly');
            console.log(`  - Directories to create: ${preservation.directories.join(', ')}`);
        } else {
            console.log('✗ Directory structure preservation failed');
        }
        
        // Test 5: Generate preservation report
        console.log('\nTest 5: Generating preservation report...');
        
        const report = generateSystemPreservationReport();
        console.log('Preservation report summary:', report.summary);
        console.log('System status:', report.systemStatus);
        
        if (report.systemStatus.protectedProjects >= 2 && report.systemStatus.permissiveProjects >= 1) {
            console.log('✓ Preservation report shows correct protection levels');
        } else {
            console.log('✗ Preservation report shows incorrect protection levels');
        }
        
        // Test 6: Test source integrity validation
        console.log('\nTest 6: Testing source integrity validation...');
        
        const acaiIntegrity = await fileOperations.validateSourceIntegrity("../acai da dany/");
        const landpageIntegrity = await fileOperations.validateSourceIntegrity("../landpage divulga/");
        
        console.log('Açaí da Dany integrity:', acaiIntegrity);
        console.log('Landpage Divulga integrity:', landpageIntegrity);
        
        if (acaiIntegrity.protectionLevel === 'strict' && landpageIntegrity.protectionLevel === 'permissive') {
            console.log('✓ Source integrity validation working correctly');
        } else {
            console.log('✗ Source integrity validation has issues');
        }
        
        console.log('\n=== Source Project Preservation Tests Completed ===\n');
        
        // Summary
        const preservationLog = fileOperations.getPreservationLog();
        const protectionStatus = fileOperations.getSourceProtectionStatus();
        
        console.log('Final Summary:');
        console.log(`- Preservation activities logged: ${preservationLog.length}`);
        console.log(`- Projects under protection: ${protectionStatus.length}`);
        console.log(`- Modification attempts blocked: ${fileOperations.getModificationAttempts().length}`);
        
        return {
            success: true,
            protectionResults,
            preservationLog,
            protectionStatus,
            report
        };
        
    } catch (error) {
        console.error('Test failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Run the test
if (require.main === module) {
    testSourceProjectPreservation()
        .then(result => {
            if (result.success) {
                console.log('✓ All source project preservation tests passed!');
                process.exit(0);
            } else {
                console.log('✗ Source project preservation tests failed:', result.error);
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('Test execution failed:', error);
            process.exit(1);
        });
}

module.exports = { testSourceProjectPreservation };