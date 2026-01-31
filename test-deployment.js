/**
 * Deployment Testing Script
 * Tests static hosting compatibility and configuration
 */

class DeploymentTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        console.log(`${prefix} [${timestamp}] ${message}`);
    }

    async runTest(name, testFn) {
        try {
            this.log(`Running test: ${name}`);
            const result = await testFn();
            if (result) {
                this.results.passed++;
                this.results.tests.push({ name, status: 'passed', message: result });
                this.log(`Test passed: ${name}`, 'success');
            } else {
                this.results.failed++;
                this.results.tests.push({ name, status: 'failed', message: 'Test returned false' });
                this.log(`Test failed: ${name}`, 'error');
            }
        } catch (error) {
            this.results.failed++;
            this.results.tests.push({ name, status: 'failed', message: error.message });
            this.log(`Test failed: ${name} - ${error.message}`, 'error');
        }
    }

    async testFileExists(filePath) {
        try {
            const response = await fetch(filePath, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    async testConfigurationFiles() {
        await this.runTest('Netlify configuration exists', async () => {
            return await this.testFileExists('./netlify.toml');
        });

        await this.runTest('Vercel configuration exists', async () => {
            return await this.testFileExists('./vercel.json');
        });

        await this.runTest('GitHub Pages configuration exists', async () => {
            return await this.testFileExists('./.github/workflows/deploy.yml');
        });

        await this.runTest('Jekyll configuration exists', async () => {
            return await this.testFileExists('./_config.yml');
        });
    }

    async testStaticAssets() {
        const assets = [
            './assets/css/main.css',
            './assets/css/gallery.css',
            './assets/js/main.js',
            './assets/js/demo-loader.js',
            './index.html'
        ];

        for (const asset of assets) {
            await this.runTest(`Asset exists: ${asset}`, async () => {
                return await this.testFileExists(asset);
            });
        }
    }

    async testDemoDirectories() {
        const demos = [
            'acai-dany',
            'barbearia-raimundos',
            'financas-pessoais',
            'whatsapp-bot-ai',
            'landpage-divulga'
        ];

        for (const demo of demos) {
            await this.runTest(`Demo directory exists: ${demo}`, async () => {
                return await this.testFileExists(`./demos/${demo}/index.html`);
            });
        }
    }

    async testSecurityHeaders() {
        await this.runTest('Security headers configuration', async () => {
            // Test if configuration files contain security headers
            try {
                const netlifyResponse = await fetch('./netlify.toml');
                const netlifyConfig = await netlifyResponse.text();
                
                const hasSecurityHeaders = [
                    'X-Frame-Options',
                    'X-Content-Type-Options',
                    'X-XSS-Protection',
                    'Referrer-Policy'
                ].every(header => netlifyConfig.includes(header));

                return hasSecurityHeaders;
            } catch (error) {
                return false;
            }
        });
    }

    async testPerformanceOptimizations() {
        await this.runTest('Cache control headers configured', async () => {
            try {
                const netlifyResponse = await fetch('./netlify.toml');
                const netlifyConfig = await netlifyResponse.text();
                return netlifyConfig.includes('Cache-Control');
            } catch (error) {
                return false;
            }
        });

        await this.runTest('Asset compression configured', async () => {
            try {
                const netlifyResponse = await fetch('./netlify.toml');
                const netlifyConfig = await netlifyResponse.text();
                return netlifyConfig.includes('compress = true');
            } catch (error) {
                return false;
            }
        });
    }

    async testResponsiveness() {
        await this.runTest('Responsive design meta tag', async () => {
            try {
                const response = await fetch('./index.html');
                const html = await response.text();
                return html.includes('viewport') && html.includes('width=device-width');
            } catch (error) {
                return false;
            }
        });
    }

    async testAccessibility() {
        await this.runTest('Semantic HTML structure', async () => {
            try {
                const response = await fetch('./index.html');
                const html = await response.text();
                const semanticTags = ['header', 'main', 'nav', 'section', 'article', 'footer'];
                return semanticTags.some(tag => html.includes(`<${tag}`));
            } catch (error) {
                return false;
            }
        });

        await this.runTest('Alt text for images', async () => {
            try {
                const response = await fetch('./index.html');
                const html = await response.text();
                const imgTags = html.match(/<img[^>]*>/g) || [];
                return imgTags.every(img => img.includes('alt='));
            } catch (error) {
                return false;
            }
        });
    }

    async testServiceWorker() {
        await this.runTest('Service Worker exists', async () => {
            return await this.testFileExists('./sw.js');
        });

        await this.runTest('Service Worker registration', async () => {
            try {
                const response = await fetch('./index.html');
                const html = await response.text();
                return html.includes('serviceWorker') || html.includes('sw.js');
            } catch (error) {
                return false;
            }
        });
    }

    async testDeploymentDocumentation() {
        await this.runTest('Deployment guide exists', async () => {
            return await this.testFileExists('./DEPLOYMENT.md');
        });

        await this.runTest('README contains hosting information', async () => {
            try {
                const response = await fetch('./README.md');
                const readme = await response.text();
                return readme.includes('GitHub Pages') && 
                       readme.includes('Netlify') && 
                       readme.includes('Vercel');
            } catch (error) {
                return false;
            }
        });
    }

    generateReport() {
        const total = this.results.passed + this.results.failed;
        const percentage = total > 0 ? Math.round((this.results.passed / total) * 100) : 0;

        console.log('\n' + '='.repeat(60));
        console.log('📊 DEPLOYMENT TESTING REPORT');
        console.log('='.repeat(60));
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${this.results.passed} ✅`);
        console.log(`Failed: ${this.results.failed} ❌`);
        console.log(`Success Rate: ${percentage}%`);
        console.log('='.repeat(60));

        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'failed')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.message}`);
                });
        }

        if (percentage >= 90) {
            console.log('\n🎉 Excellent! Your deployment configuration is ready!');
        } else if (percentage >= 75) {
            console.log('\n⚠️  Good, but some improvements needed.');
        } else {
            console.log('\n🔧 Several issues need to be addressed before deployment.');
        }

        return {
            success: percentage >= 90,
            percentage,
            details: this.results
        };
    }

    async runAllTests() {
        this.log('Starting deployment compatibility tests...', 'info');
        
        await this.testConfigurationFiles();
        await this.testStaticAssets();
        await this.testDemoDirectories();
        await this.testSecurityHeaders();
        await this.testPerformanceOptimizations();
        await this.testResponsiveness();
        await this.testAccessibility();
        await this.testServiceWorker();
        await this.testDeploymentDocumentation();

        return this.generateReport();
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeploymentTester;
}

// Auto-run if called directly
if (typeof window !== 'undefined') {
    // Browser environment
    window.DeploymentTester = DeploymentTester;
    
    // Auto-run tests when page loads
    document.addEventListener('DOMContentLoaded', async () => {
        const tester = new DeploymentTester();
        await tester.runAllTests();
    });
} else if (typeof require !== 'undefined' && require.main === module) {
    // Node.js environment
    const tester = new DeploymentTester();
    tester.runAllTests().then(result => {
        process.exit(result.success ? 0 : 1);
    });
}