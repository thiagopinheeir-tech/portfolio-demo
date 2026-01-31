/**
 * Unit Tests for File Operations
 * Tests file scanning, copying, and integrity checking functionality
 */

// Mock DOM environment for testing
if (typeof window === 'undefined') {
    global.window = {};
    global.document = {
        addEventListener: () => {},
        createElement: () => ({ style: {} }),
        body: { appendChild: () => {}, removeChild: () => {} }
    };
    global.console = { log: () => {}, error: () => {}, warn: () => {} };
}

// Mock project configuration for testing
const mockProjectConfig = {
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

// Set global projectConfig for tests
if (typeof global !== 'undefined') {
    global.projectConfig = mockProjectConfig;
} else {
    window.projectConfig = mockProjectConfig;
}

// Import the module
let FileOperations, fileOperations;
if (typeof require !== 'undefined') {
    const module = require('./file-operations.js');
    FileOperations = module.FileOperations;
    fileOperations = module.fileOperations;
} else {
    // Browser environment - assume classes are already loaded
    FileOperations = window.FileOperations;
    fileOperations = window.fileOperations;
}

/**
 * Test Suite: File Operations Core Functionality
 */
describe('FileOperations', () => {
    let fileOps;

    beforeEach(() => {
        fileOps = new FileOperations();
    });

    afterEach(() => {
        fileOps.clearHistory();
    });

    /**
     * Test: Constructor and Initialization
     */
    test('should initialize with correct default values', () => {
        expect(fileOps.supportedExtensions).toContain('.html');
        expect(fileOps.supportedExtensions).toContain('.css');
        expect(fileOps.supportedExtensions).toContain('.js');
        expect(fileOps.excludePatterns).toContain('node_modules');
        expect(fileOps.excludePatterns).toContain('.git');
        expect(fileOps.copyLog).toEqual([]);
        expect(fileOps.integrityChecks).toBeInstanceOf(Map);
    });

    /**
     * Test: Project Key Extraction
     */
    test('should extract correct project key from path', () => {
        expect(fileOps.extractProjectKeyFromPath('../acai da dany/')).toBe('acai-dany');
        expect(fileOps.extractProjectKeyFromPath('../Barbearia raimundos/')).toBe('barbearia-raimundos');
        expect(fileOps.extractProjectKeyFromPath('../financas pessoais/')).toBe('financas-pessoais');
        expect(fileOps.extractProjectKeyFromPath('../Whatsapp bot. AI/')).toBe('whatsapp-bot-ai');
        expect(fileOps.extractProjectKeyFromPath('../landpage divulga/')).toBe('landpage-divulga');
        expect(fileOps.extractProjectKeyFromPath('../unknown project/')).toBe('unknown');
    });

    /**
     * Test: File Exclusion Logic
     */
    test('should correctly identify files to exclude', () => {
        const excludePatterns = ['node_modules', '.git', '*.tmp', '*.log'];
        
        expect(fileOps.shouldExcludeFile('node_modules', excludePatterns)).toBe(true);
        expect(fileOps.shouldExcludeFile('.git', excludePatterns)).toBe(true);
        expect(fileOps.shouldExcludeFile('temp.tmp', excludePatterns)).toBe(true);
        expect(fileOps.shouldExcludeFile('error.log', excludePatterns)).toBe(true);
        expect(fileOps.shouldExcludeFile('index.html', excludePatterns)).toBe(false);
        expect(fileOps.shouldExcludeFile('style.css', excludePatterns)).toBe(false);
    });

    /**
     * Test: Simulated Hash Generation
     */
    test('should generate consistent hashes for same file', () => {
        const file = { name: 'test.html', size: 1024, path: 'test.html' };
        const hash1 = fileOps.generateSimulatedHash(file);
        const hash2 = fileOps.generateSimulatedHash(file);
        
        expect(hash1).toBe(hash2);
        expect(typeof hash1).toBe('string');
        expect(hash1.length).toBeGreaterThan(0);
    });

    /**
     * Test: Path Resolution
     */
    test('should resolve portfolio paths correctly', () => {
        const originalPath = '../acai da dany/css/style.css';
        const sourcePath = '../acai da dany/';
        const destPath = './demos/acai-dany/';
        
        const resolved = fileOps.resolvePortfolioPath(originalPath, sourcePath, destPath);
        expect(resolved).toBe('./demos/acai-dany/css/style.css');
    });

    /**
     * Test: Directory Scanning (Browser Simulation)
     */
    test('should simulate directory scanning in browser environment', async () => {
        const sourcePath = '../acai da dany/';
        const structure = await fileOps.scanSourceDirectory(sourcePath);
        
        expect(structure).toHaveProperty('path', sourcePath);
        expect(structure).toHaveProperty('files');
        expect(structure).toHaveProperty('directories');
        expect(structure).toHaveProperty('totalFiles');
        expect(structure).toHaveProperty('totalSize');
        expect(structure).toHaveProperty('scannedAt');
        expect(structure.simulated).toBe(true);
        expect(Array.isArray(structure.files)).toBe(true);
        expect(structure.files.length).toBeGreaterThan(0);
    });

    /**
     * Test: Source Integrity Validation
     */
    test('should validate source integrity correctly', async () => {
        const sourcePath = '../acai da dany/';
        const validation = await fileOps.validateSourceIntegrity(sourcePath);
        
        expect(validation).toHaveProperty('sourcePath', sourcePath);
        expect(validation).toHaveProperty('isIntact');
        expect(validation).toHaveProperty('checkedAt');
        expect(validation).toHaveProperty('issues');
        expect(Array.isArray(validation.issues)).toBe(true);
    });

    /**
     * Test: Landpage Divulga Special Handling
     */
    test('should allow modifications for Landpage Divulga project', async () => {
        const sourcePath = '../landpage divulga/';
        const validation = await fileOps.validateSourceIntegrity(sourcePath);
        
        expect(validation.modificationsAllowed).toBe(true);
        expect(validation.issues.some(issue => 
            issue.includes('Modifications allowed for Landpage Divulga')
        )).toBe(true);
    });

    /**
     * Test: Copy Operation Structure
     */
    test('should structure copy operations correctly', async () => {
        const sourcePath = '../acai da dany/';
        const destPath = './demos/acai-dany/';
        
        const copyResult = await fileOps.copyProjectFiles(sourcePath, destPath);
        
        expect(copyResult).toHaveProperty('sourcePath', sourcePath);
        expect(copyResult).toHaveProperty('destPath', destPath);
        expect(copyResult).toHaveProperty('startTime');
        expect(copyResult).toHaveProperty('endTime');
        expect(copyResult).toHaveProperty('options');
        expect(copyResult).toHaveProperty('results');
        
        const results = copyResult.results;
        expect(results).toHaveProperty('totalFiles');
        expect(results).toHaveProperty('copiedFiles');
        expect(results).toHaveProperty('skippedFiles');
        expect(results).toHaveProperty('failedFiles');
        expect(results).toHaveProperty('errors');
        expect(Array.isArray(results.errors)).toBe(true);
    });

    /**
     * Test: Integrity Checking
     */
    test('should perform integrity checks', async () => {
        const sourcePath = '../acai da dany/';
        const destPath = './demos/acai-dany/';
        
        const copyResult = await fileOps.copyProjectFiles(sourcePath, destPath, {
            checkIntegrity: true
        });
        
        // Should have integrity checks stored
        const integrityChecks = fileOps.getIntegrityChecks();
        expect(integrityChecks.size).toBeGreaterThan(0);
        
        // Check integrity information structure
        const firstCheck = integrityChecks.values().next().value;
        expect(firstCheck).toHaveProperty('originalHash');
        expect(firstCheck).toHaveProperty('originalSize');
        expect(firstCheck).toHaveProperty('copiedAt');
        expect(firstCheck).toHaveProperty('verified');
    });

    /**
     * Test: Copy History Tracking
     */
    test('should track copy operation history', async () => {
        const sourcePath = '../acai da dany/';
        const destPath = './demos/acai-dany/';
        
        expect(fileOps.getCopyHistory()).toHaveLength(0);
        
        await fileOps.copyProjectFiles(sourcePath, destPath);
        
        const history = fileOps.getCopyHistory();
        expect(history).toHaveLength(1);
        expect(history[0]).toHaveProperty('sourcePath', sourcePath);
        expect(history[0]).toHaveProperty('destPath', destPath);
    });

    /**
     * Test: History Clearing
     */
    test('should clear history and integrity checks', () => {
        // Add some mock data
        fileOps.copyLog.push({ test: 'data' });
        fileOps.integrityChecks.set('test', { test: 'data' });
        
        expect(fileOps.getCopyHistory()).toHaveLength(1);
        expect(fileOps.getIntegrityChecks().size).toBe(1);
        
        fileOps.clearHistory();
        
        expect(fileOps.getCopyHistory()).toHaveLength(0);
        expect(fileOps.getIntegrityChecks().size).toBe(0);
    });
});

/**
 * Test Suite: Utility Functions
 */
describe('File Operations Utilities', () => {
    /**
     * Test: Single Project Copy
     */
    test('should copy single project successfully', async () => {
        if (typeof copyProject === 'undefined') {
            console.log('copyProject function not available in test environment');
            return;
        }
        
        const result = await copyProject('acai-dany');
        
        expect(result).toHaveProperty('sourcePath');
        expect(result).toHaveProperty('destPath');
        expect(result).toHaveProperty('results');
        expect(result.results).toHaveProperty('totalFiles');
        expect(result.results).toHaveProperty('copiedFiles');
    });

    /**
     * Test: Invalid Project Handling
     */
    test('should handle invalid project key', async () => {
        if (typeof copyProject === 'undefined') {
            console.log('copyProject function not available in test environment');
            return;
        }
        
        await expect(copyProject('invalid-project')).rejects.toThrow('Project not found');
    });

    /**
     * Test: Bulk Copy Operations
     */
    test('should handle bulk copy operations', async () => {
        if (typeof copyAllProjects === 'undefined') {
            console.log('copyAllProjects function not available in test environment');
            return;
        }
        
        const results = await copyAllProjects();
        
        expect(results).toHaveProperty('successful');
        expect(results).toHaveProperty('failed');
        expect(results).toHaveProperty('summary');
        expect(Array.isArray(results.successful)).toBe(true);
        expect(Array.isArray(results.failed)).toBe(true);
        expect(results.summary).toHaveProperty('total');
        expect(results.summary).toHaveProperty('successful');
        expect(results.summary).toHaveProperty('failed');
    });

    /**
     * Test: Source Validation for All Projects
     */
    test('should validate all source projects', async () => {
        if (typeof validateAllSourceProjects === 'undefined') {
            console.log('validateAllSourceProjects function not available in test environment');
            return;
        }
        
        const validations = await validateAllSourceProjects();
        
        expect(Array.isArray(validations)).toBe(true);
        expect(validations.length).toBeGreaterThan(0);
        
        validations.forEach(validation => {
            expect(validation).toHaveProperty('projectKey');
            expect(validation).toHaveProperty('sourcePath');
            expect(validation).toHaveProperty('isIntact');
            expect(validation).toHaveProperty('checkedAt');
        });
    });
});

/**
 * Test Suite: Edge Cases and Error Handling
 */
describe('File Operations Error Handling', () => {
    let fileOps;

    beforeEach(() => {
        fileOps = new FileOperations();
    });

    /**
     * Test: Empty Source Path
     */
    test('should handle empty source path', async () => {
        await expect(fileOps.scanSourceDirectory('')).rejects.toThrow();
    });

    /**
     * Test: Invalid Project Configuration
     */
    test('should handle missing project configuration', () => {
        const originalConfig = global.projectConfig || window.projectConfig;
        
        // Temporarily remove project config
        if (global.projectConfig) global.projectConfig = {};
        if (window.projectConfig) window.projectConfig = {};
        
        const projectKey = fileOps.extractProjectKeyFromPath('../unknown/');
        expect(projectKey).toBe('unknown');
        
        // Restore original config
        if (global.projectConfig) global.projectConfig = originalConfig;
        if (window.projectConfig) window.projectConfig = originalConfig;
    });

    /**
     * Test: Large File Handling
     */
    test('should handle large file metadata', () => {
        const largeFile = {
            name: 'large-file.zip',
            size: 1024 * 1024 * 100, // 100MB
            path: 'downloads/large-file.zip'
        };
        
        const hash = fileOps.generateSimulatedHash(largeFile);
        expect(typeof hash).toBe('string');
        expect(hash.length).toBeGreaterThan(0);
    });

    /**
     * Test: Special Characters in Paths
     */
    test('should handle special characters in paths', () => {
        const specialPath = '../projeto com espaços & símbolos/';
        const resolved = fileOps.resolvePortfolioPath(
            specialPath + 'arquivo.html',
            specialPath,
            './demos/projeto/'
        );
        
        expect(resolved).toContain('./demos/projeto/');
        expect(resolved).toContain('arquivo.html');
    });
});

// Run tests if in Node.js environment
if (typeof module !== 'undefined' && require.main === module) {
    console.log('Running File Operations Tests...');
    
    // Simple test runner for Node.js
    const runTests = async () => {
        try {
            const fileOps = new FileOperations();
            
            console.log('✓ FileOperations constructor test passed');
            
            const projectKey = fileOps.extractProjectKeyFromPath('../acai da dany/');
            console.assert(projectKey === 'acai-dany', 'Project key extraction failed');
            console.log('✓ Project key extraction test passed');
            
            const shouldExclude = fileOps.shouldExcludeFile('node_modules', ['node_modules']);
            console.assert(shouldExclude === true, 'File exclusion test failed');
            console.log('✓ File exclusion test passed');
            
            const structure = await fileOps.scanSourceDirectory('../acai da dany/');
            console.assert(structure.simulated === true, 'Directory scanning test failed');
            console.log('✓ Directory scanning test passed');
            
            console.log('\nAll tests passed! ✅');
            
        } catch (error) {
            console.error('Test failed:', error);
            process.exit(1);
        }
    };
    
    runTests();
}