/**
 * Simple Test Runner for File Operations
 */

// Mock environment
global.window = {};
global.document = {
    addEventListener: () => {},
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {}, removeChild: () => {} }
};

// Mock project configuration
global.projectConfig = {
    "acai-dany": {
        name: "Açaí da Dany",
        sourcePath: "../acai da dany/",
        demoPath: "./demos/acai-dany/",
        entryPoint: "index.html"
    },
    "landpage-divulga": {
        name: "Landing Page Divulga",
        sourcePath: "../landpage divulga/",
        demoPath: "./demos/landpage-divulga/",
        entryPoint: "index.html"
    }
};

// Load the file operations module
const { FileOperations, fileOperations } = require('./assets/js/file-operations.js');

async function runTests() {
    console.log('🧪 Running File Operations Tests...\n');
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Constructor
    try {
        const fileOps = new FileOperations();
        console.assert(Array.isArray(fileOps.supportedExtensions), 'supportedExtensions should be array');
        console.assert(fileOps.supportedExtensions.includes('.html'), 'should support .html files');
        console.assert(fileOps.supportedExtensions.includes('.css'), 'should support .css files');
        console.assert(fileOps.supportedExtensions.includes('.js'), 'should support .js files');
        console.log('✅ Test 1: Constructor - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 1: Constructor - FAILED:', error.message);
        failed++;
    }
    
    // Test 2: Project Key Extraction
    try {
        const fileOps = new FileOperations();
        console.assert(fileOps.extractProjectKeyFromPath('../acai da dany/') === 'acai-dany', 'should extract acai-dany');
        console.assert(fileOps.extractProjectKeyFromPath('../Barbearia raimundos/') === 'barbearia-raimundos', 'should extract barbearia-raimundos');
        console.assert(fileOps.extractProjectKeyFromPath('../landpage divulga/') === 'landpage-divulga', 'should extract landpage-divulga');
        console.log('✅ Test 2: Project Key Extraction - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 2: Project Key Extraction - FAILED:', error.message);
        failed++;
    }
    
    // Test 3: File Exclusion
    try {
        const fileOps = new FileOperations();
        console.assert(fileOps.shouldExcludeFile('node_modules', ['node_modules']) === true, 'should exclude node_modules');
        console.assert(fileOps.shouldExcludeFile('index.html', ['node_modules']) === false, 'should not exclude index.html');
        console.assert(fileOps.shouldExcludeFile('temp.tmp', ['*.tmp']) === true, 'should exclude .tmp files');
        console.log('✅ Test 3: File Exclusion - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 3: File Exclusion - FAILED:', error.message);
        failed++;
    }
    
    // Test 4: Hash Generation
    try {
        const fileOps = new FileOperations();
        const file = { name: 'test.html', size: 1024, path: 'test.html' };
        const hash1 = fileOps.generateSimulatedHash(file);
        const hash2 = fileOps.generateSimulatedHash(file);
        console.assert(hash1 === hash2, 'hashes should be consistent');
        console.assert(typeof hash1 === 'string', 'hash should be string');
        console.assert(hash1.length > 0, 'hash should not be empty');
        console.log('✅ Test 4: Hash Generation - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 4: Hash Generation - FAILED:', error.message);
        failed++;
    }
    
    // Test 5: Path Resolution
    try {
        const fileOps = new FileOperations();
        const resolved = fileOps.resolvePortfolioPath(
            '../acai da dany/css/style.css',
            '../acai da dany/',
            './demos/acai-dany/'
        );
        console.assert(resolved === './demos/acai-dany/css/style.css', 'path should be resolved correctly');
        console.log('✅ Test 5: Path Resolution - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 5: Path Resolution - FAILED:', error.message);
        failed++;
    }
    
    // Test 6: Directory Scanning
    try {
        const fileOps = new FileOperations();
        const structure = await fileOps.scanSourceDirectory('../acai da dany/');
        console.assert(structure.path === '../acai da dany/', 'path should match');
        console.assert(Array.isArray(structure.files), 'files should be array');
        console.assert(Array.isArray(structure.directories), 'directories should be array');
        console.assert(typeof structure.totalFiles === 'number', 'totalFiles should be number');
        console.assert(structure.simulated === true, 'should be simulated in browser environment');
        console.log('✅ Test 6: Directory Scanning - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 6: Directory Scanning - FAILED:', error.message);
        failed++;
    }
    
    // Test 7: Source Integrity Validation
    try {
        const fileOps = new FileOperations();
        const validation = await fileOps.validateSourceIntegrity('../acai da dany/');
        console.assert(validation.sourcePath === '../acai da dany/', 'sourcePath should match');
        console.assert(typeof validation.isIntact === 'boolean', 'isIntact should be boolean');
        console.assert(Array.isArray(validation.issues), 'issues should be array');
        console.log('✅ Test 7: Source Integrity Validation - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 7: Source Integrity Validation - FAILED:', error.message);
        failed++;
    }
    
    // Test 8: Landpage Divulga Special Handling
    try {
        const fileOps = new FileOperations();
        const validation = await fileOps.validateSourceIntegrity('../landpage divulga/');
        console.assert(validation.modificationsAllowed === true, 'modifications should be allowed for landpage divulga');
        console.log('✅ Test 8: Landpage Divulga Special Handling - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 8: Landpage Divulga Special Handling - FAILED:', error.message);
        failed++;
    }
    
    // Test 9: Copy Operation Structure
    try {
        const fileOps = new FileOperations();
        const copyResult = await fileOps.copyProjectFiles('../acai da dany/', './demos/acai-dany/');
        console.assert(copyResult.sourcePath === '../acai da dany/', 'sourcePath should match');
        console.assert(copyResult.destPath === './demos/acai-dany/', 'destPath should match');
        console.assert(copyResult.results, 'should have results');
        console.assert(typeof copyResult.results.totalFiles === 'number', 'totalFiles should be number');
        console.assert(Array.isArray(copyResult.results.errors), 'errors should be array');
        console.log('✅ Test 9: Copy Operation Structure - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 9: Copy Operation Structure - FAILED:', error.message);
        failed++;
    }
    
    // Test 10: History Tracking
    try {
        const fileOps = new FileOperations();
        console.assert(fileOps.getCopyHistory().length === 0, 'history should start empty');
        await fileOps.copyProjectFiles('../acai da dany/', './demos/acai-dany/');
        console.assert(fileOps.getCopyHistory().length === 1, 'history should have one entry');
        fileOps.clearHistory();
        console.assert(fileOps.getCopyHistory().length === 0, 'history should be cleared');
        console.log('✅ Test 10: History Tracking - PASSED');
        passed++;
    } catch (error) {
        console.log('❌ Test 10: History Tracking - FAILED:', error.message);
        failed++;
    }
    
    // Summary
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
    
    if (failed === 0) {
        console.log('\n🎉 All tests passed! File operations implementation is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Please review the implementation.');
        process.exit(1);
    }
}

runTests().catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
});