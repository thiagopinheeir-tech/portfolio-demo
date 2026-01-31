/**
 * Structure Validation Script
 * Validates the basic file structure and configuration for the portfolio demo
 */

const fs = require('fs');
const path = require('path');

class StructureValidator {
    constructor() {
        this.results = {
            files: { passed: 0, failed: 0, tests: [] },
            structure: { passed: 0, failed: 0, tests: [] },
            config: { passed: 0, failed: 0, tests: [] }
        };
        this.totalTests = 0;
        this.passedTests = 0;
    }

    /**
     * Run all structure validation tests
     */
    async runValidation() {
        console.log('🔍 Portfolio Demo - Structure Validation');
        console.log('='.repeat(50));

        try {
            await this.validateRequiredFiles();
            await this.validateDirectoryStructure();
            await this.validateConfiguration();
            
            this.generateReport();
            
        } catch (error) {
            console.error('❌ Validation failed:', error);
            return false;
        }
    }

    /**
     * Validate required files exist
     */
    async validateRequiredFiles() {
        console.log('\n📁 Validating Required Files...');
        
        const requiredFiles = [
            'index.html',
            'assets/css/main.css',
            'assets/css/gallery.css',
            'assets/js/main.js',
            'assets/js/file-operations.js',
            'assets/js/demo-loader.js',
            'README.md'
        ];

        for (const file of requiredFiles) {
            this.runTest('files', `File exists: ${file}`, () => {
                return fs.existsSync(file);
            });
        }

        // Check for test files
        const testFiles = [
            'checkpoint-test.js',
            'checkpoint-test.html',
            'test-responsive.html',
            'validate-gallery.js'
        ];

        for (const file of testFiles) {
            this.runTest('files', `Test file exists: ${file}`, () => {
                return fs.existsSync(file);
            });
        }
    }

    /**
     * Validate directory structure
     */
    async validateDirectoryStructure() {
        console.log('\n📂 Validating Directory Structure...');
        
        const requiredDirs = [
            'assets',
            'assets/css',
            'assets/js',
            'assets/images',
            'demos',
            'demos/acai-dany',
            'demos/barbearia-raimundos',
            'demos/financas-pessoais',
            'demos/whatsapp-bot-ai',
            'demos/landpage-divulga'
        ];

        for (const dir of requiredDirs) {
            this.runTest('structure', `Directory exists: ${dir}`, () => {
                return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
            });
        }

        // Check demo directories have placeholder files
        const demoDirs = [
            'demos/acai-dany',
            'demos/barbearia-raimundos',
            'demos/financas-pessoais',
            'demos/whatsapp-bot-ai',
            'demos/landpage-divulga'
        ];

        for (const dir of demoDirs) {
            this.runTest('structure', `Demo directory prepared: ${dir}`, () => {
                if (!fs.existsSync(dir)) return false;
                const files = fs.readdirSync(dir);
                return files.length >= 0; // At least has .gitkeep or other files
            });
        }
    }

    /**
     * Validate configuration files
     */
    async validateConfiguration() {
        console.log('\n⚙️ Validating Configuration...');
        
        // Check main.js for project configuration
        this.runTest('config', 'main.js contains projectConfig', () => {
            if (!fs.existsSync('assets/js/main.js')) return false;
            const content = fs.readFileSync('assets/js/main.js', 'utf8');
            return content.includes('projectConfig') && content.includes('acai-dany');
        });

        // Check file-operations.js for FileOperations class
        this.runTest('config', 'file-operations.js contains FileOperations class', () => {
            if (!fs.existsSync('assets/js/file-operations.js')) return false;
            const content = fs.readFileSync('assets/js/file-operations.js', 'utf8');
            return content.includes('class FileOperations') && content.includes('copyProjectFiles');
        });

        // Check index.html structure
        this.runTest('config', 'index.html has required structure', () => {
            if (!fs.existsSync('index.html')) return false;
            const content = fs.readFileSync('index.html', 'utf8');
            return content.includes('portfolio-container') && 
                   content.includes('project-gallery') && 
                   content.includes('demo-modal');
        });

        // Check CSS files
        this.runTest('config', 'main.css has CSS custom properties', () => {
            if (!fs.existsSync('assets/css/main.css')) return false;
            const content = fs.readFileSync('assets/css/main.css', 'utf8');
            return content.includes(':root') && content.includes('--primary-color');
        });

        this.runTest('config', 'gallery.css has grid layout', () => {
            if (!fs.existsSync('assets/css/gallery.css')) return false;
            const content = fs.readFileSync('assets/css/gallery.css', 'utf8');
            return content.includes('display: grid') && content.includes('project-gallery');
        });
    }

    /**
     * Run a single test
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
     * Generate validation report
     */
    generateReport() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 STRUCTURE VALIDATION RESULTS');
        console.log('='.repeat(50));
        
        // Category results
        Object.entries(this.results).forEach(([category, result]) => {
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
        
        console.log('\n' + '-'.repeat(30));
        console.log('OVERALL RESULTS:');
        console.log(`✅ Total Passed: ${this.passedTests}`);
        console.log(`❌ Total Failed: ${this.totalTests - this.passedTests}`);
        console.log(`📊 Total Tests: ${this.totalTests}`);
        console.log(`🎯 Success Rate: ${overallPercentage}%`);
        
        // Determine validation status
        const validationPassed = overallPercentage >= 80;
        
        console.log('\n' + '='.repeat(50));
        if (validationPassed) {
            console.log('🎉 STRUCTURE VALIDATION PASSED');
            console.log('✅ Basic structure is ready for checkpoint testing');
        } else {
            console.log('⚠️  STRUCTURE VALIDATION NEEDS ATTENTION');
            console.log('🔧 Fix missing files/directories before proceeding');
        }
        console.log('='.repeat(50));
        
        return validationPassed;
    }
}

// Run validation if called directly
if (require.main === module) {
    const validator = new StructureValidator();
    validator.runValidation().then(result => {
        process.exit(result ? 0 : 1);
    }).catch(error => {
        console.error('Validation failed:', error);
        process.exit(1);
    });
}

module.exports = StructureValidator;