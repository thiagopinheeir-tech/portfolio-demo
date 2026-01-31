// State Reset System Validation Script
// This script validates that the state reset functionality works correctly

const fs = require('fs');
const path = require('path');

class StateResetValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.successes = [];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        
        switch (type) {
            case 'error':
                this.errors.push(logMessage);
                console.error(`❌ ${message}`);
                break;
            case 'warning':
                this.warnings.push(logMessage);
                console.warn(`⚠️ ${message}`);
                break;
            case 'success':
                this.successes.push(logMessage);
                console.log(`✅ ${message}`);
                break;
            default:
                console.log(`ℹ️ ${message}`);
        }
    }

    validateFileExists(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                this.log(`File exists: ${filePath}`, 'success');
                return true;
            } else {
                this.log(`File missing: ${filePath}`, 'error');
                return false;
            }
        } catch (error) {
            this.log(`Error checking file ${filePath}: ${error.message}`, 'error');
            return false;
        }
    }

    validateStateResetSystemFile() {
        this.log('Validating state reset system file...', 'info');
        
        const stateResetPath = path.join(__dirname, 'state-reset-system.js');
        if (!this.validateFileExists(stateResetPath)) {
            return false;
        }

        try {
            const content = fs.readFileSync(stateResetPath, 'utf8');
            
            // Check for required classes and functions
            const requiredElements = [
                'class StateResetSystem',
                'clearAllStorage',
                'performFullReset',
                'resetAllForms',
                'registerDemo',
                'window.stateResetSystem',
                'window.resetAllDemoStates'
            ];

            let allFound = true;
            requiredElements.forEach(element => {
                if (content.includes(element)) {
                    this.log(`Found required element: ${element}`, 'success');
                } else {
                    this.log(`Missing required element: ${element}`, 'error');
                    allFound = false;
                }
            });

            return allFound;
        } catch (error) {
            this.log(`Error reading state reset system file: ${error.message}`, 'error');
            return false;
        }
    }

    validateDemoIntegration() {
        this.log('Validating demo integration...', 'info');
        
        const demos = [
            'acai-dany',
            'barbearia-raimundos',
            'financas-pessoais',
            'whatsapp-bot-ai',
            'landpage-divulga'
        ];

        let allIntegrated = true;

        demos.forEach(demo => {
            const demoPath = path.join(__dirname, 'demos', demo);
            const indexPath = path.join(demoPath, 'index.html');
            
            if (this.validateFileExists(indexPath)) {
                try {
                    const content = fs.readFileSync(indexPath, 'utf8');
                    
                    if (content.includes('state-reset-system.js')) {
                        this.log(`${demo}: State reset system integrated`, 'success');
                    } else {
                        this.log(`${demo}: State reset system NOT integrated`, 'error');
                        allIntegrated = false;
                    }
                } catch (error) {
                    this.log(`${demo}: Error reading index.html: ${error.message}`, 'error');
                    allIntegrated = false;
                }
            } else {
                allIntegrated = false;
            }
        });

        return allIntegrated;
    }

    validateMockDataIntegration() {
        this.log('Validating mock data integration...', 'info');
        
        const mockDataFiles = [
            { demo: 'acai-dany', file: 'mock-data.js' },
            { demo: 'barbearia-raimundos', file: 'mock-data.js' },
            { demo: 'financas-pessoais', file: 'script.js' },
            { demo: 'whatsapp-bot-ai', file: 'script.js' },
            { demo: 'landpage-divulga', file: 'script.js' }
        ];

        let allIntegrated = true;

        mockDataFiles.forEach(({ demo, file }) => {
            const filePath = path.join(__dirname, 'demos', demo, file);
            
            if (this.validateFileExists(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    
                    const hasResetFunction = content.includes('resetDemoState') || 
                                           content.includes('resetWhatsAppDemoState');
                    const hasRegistration = content.includes('stateResetSystem.registerDemo') ||
                                          content.includes('window.stateResetSystem');
                    
                    if (hasResetFunction && hasRegistration) {
                        this.log(`${demo}: Mock data integration complete`, 'success');
                    } else {
                        if (!hasResetFunction) {
                            this.log(`${demo}: Missing reset function`, 'warning');
                        }
                        if (!hasRegistration) {
                            this.log(`${demo}: Missing state system registration`, 'warning');
                        }
                        allIntegrated = false;
                    }
                } catch (error) {
                    this.log(`${demo}: Error reading ${file}: ${error.message}`, 'error');
                    allIntegrated = false;
                }
            } else {
                allIntegrated = false;
            }
        });

        return allIntegrated;
    }

    validateNoStorageUsage() {
        this.log('Validating no persistent storage usage...', 'info');
        
        const demoScripts = [
            'demos/acai-dany/mock-data.js',
            'demos/barbearia-raimundos/mock-data.js',
            'demos/financas-pessoais/script.js',
            'demos/whatsapp-bot-ai/script.js',
            'demos/landpage-divulga/script.js'
        ];

        let noPersistentStorage = true;

        demoScripts.forEach(scriptPath => {
            const fullPath = path.join(__dirname, scriptPath);
            
            if (fs.existsSync(fullPath)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    
                    // Check for storage usage (excluding state reset system)
                    const storagePatterns = [
                        /localStorage\.setItem/g,
                        /sessionStorage\.setItem/g,
                        /document\.cookie\s*=/g
                    ];

                    storagePatterns.forEach(pattern => {
                        const matches = content.match(pattern);
                        if (matches) {
                            this.log(`${scriptPath}: Found potential storage usage: ${matches.length} occurrences`, 'warning');
                            noPersistentStorage = false;
                        }
                    });

                    if (!content.match(/localStorage\.setItem|sessionStorage\.setItem|document\.cookie\s*=/)) {
                        this.log(`${scriptPath}: No persistent storage usage detected`, 'success');
                    }
                } catch (error) {
                    this.log(`Error reading ${scriptPath}: ${error.message}`, 'error');
                }
            }
        });

        return noPersistentStorage;
    }

    validateTestFile() {
        this.log('Validating test file...', 'info');
        
        const testPath = path.join(__dirname, 'test-state-reset.html');
        return this.validateFileExists(testPath);
    }

    generateReport() {
        this.log('Generating validation report...', 'info');
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                errors: this.errors.length,
                warnings: this.warnings.length,
                successes: this.successes.length
            },
            details: {
                errors: this.errors,
                warnings: this.warnings,
                successes: this.successes
            }
        };

        const reportPath = path.join(__dirname, 'state-reset-validation-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        this.log(`Validation report saved to: ${reportPath}`, 'success');
        
        return report;
    }

    async runValidation() {
        console.log('🔄 Starting State Reset System Validation...\n');
        
        // Run all validations
        const results = {
            stateResetSystem: this.validateStateResetSystemFile(),
            demoIntegration: this.validateDemoIntegration(),
            mockDataIntegration: this.validateMockDataIntegration(),
            noStorageUsage: this.validateNoStorageUsage(),
            testFile: this.validateTestFile()
        };

        // Generate report
        const report = this.generateReport();
        
        // Print summary
        console.log('\n📊 VALIDATION SUMMARY');
        console.log('====================');
        console.log(`✅ Successes: ${report.summary.successes}`);
        console.log(`⚠️ Warnings: ${report.summary.warnings}`);
        console.log(`❌ Errors: ${report.summary.errors}`);
        
        console.log('\n🎯 VALIDATION RESULTS');
        console.log('=====================');
        Object.entries(results).forEach(([test, passed]) => {
            const status = passed ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} ${test}`);
        });

        const overallSuccess = Object.values(results).every(result => result === true);
        
        console.log('\n🏁 OVERALL RESULT');
        console.log('=================');
        if (overallSuccess) {
            console.log('✅ ALL VALIDATIONS PASSED');
            console.log('🎉 State reset system is properly implemented!');
        } else {
            console.log('❌ SOME VALIDATIONS FAILED');
            console.log('🔧 Please review the errors and warnings above.');
        }

        return {
            success: overallSuccess,
            report: report,
            results: results
        };
    }
}

// Run validation if this script is executed directly
if (require.main === module) {
    const validator = new StateResetValidator();
    validator.runValidation().then(result => {
        process.exit(result.success ? 0 : 1);
    }).catch(error => {
        console.error('❌ Validation failed with error:', error);
        process.exit(1);
    });
}

module.exports = StateResetValidator;