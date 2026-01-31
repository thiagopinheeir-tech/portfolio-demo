/**
 * Portfolio Demo System - Demo Loader
 * Handles demo loading, iframe management, and demo-specific functionality
 */

/**
 * Demo Loader Class
 * Manages the loading and interaction with individual project demos
 */
class DemoLoader {
    constructor() {
        this.loadingTimeout = 10000; // 10 seconds timeout
        this.retryAttempts = 3;
        this.currentRetry = 0;
        this.loadingTimer = null;
    }

    /**
     * Load a demo with error handling and retry logic
     */
    async loadDemo(projectKey, targetFrame) {
        const project = projectConfig[projectKey];
        if (!project) {
            throw new Error(`Project configuration not found: ${projectKey}`);
        }

        this.currentRetry = 0;
        return this.attemptLoad(project, targetFrame);
    }

    /**
     * Attempt to load demo with retry logic
     */
    async attemptLoad(project, targetFrame) {
        return new Promise((resolve, reject) => {
            const demoUrl = project.demoPath + project.entryPoint;
            
            // Clear any existing timer
            if (this.loadingTimer) {
                clearTimeout(this.loadingTimer);
            }

            // Set loading timeout
            this.loadingTimer = setTimeout(() => {
                this.handleLoadTimeout(project, targetFrame, resolve, reject);
            }, this.loadingTimeout);

            // Setup iframe event handlers
            const onLoad = () => {
                clearTimeout(this.loadingTimer);
                targetFrame.removeEventListener('load', onLoad);
                targetFrame.removeEventListener('error', onError);
                
                // Verify the demo loaded correctly
                this.verifyDemoLoad(targetFrame, project)
                    .then(() => {
                        console.log(`Demo loaded successfully: ${project.name}`);
                        resolve(project);
                    })
                    .catch(error => {
                        console.error(`Demo verification failed: ${project.name}`, error);
                        reject(error);
                    });
            };

            const onError = (error) => {
                clearTimeout(this.loadingTimer);
                targetFrame.removeEventListener('load', onLoad);
                targetFrame.removeEventListener('error', onError);
                
                console.error(`Demo load error: ${project.name}`, error);
                this.handleLoadError(project, targetFrame, resolve, reject);
            };

            // Attach event listeners
            targetFrame.addEventListener('load', onLoad);
            targetFrame.addEventListener('error', onError);

            // Start loading
            console.log(`Loading demo: ${project.name} from ${demoUrl}`);
            targetFrame.src = demoUrl;
        });
    }

    /**
     * Handle load timeout
     */
    handleLoadTimeout(project, targetFrame, resolve, reject) {
        console.warn(`Demo load timeout: ${project.name}`);
        
        if (this.currentRetry < this.retryAttempts) {
            this.currentRetry++;
            console.log(`Retrying demo load (${this.currentRetry}/${this.retryAttempts}): ${project.name}`);
            
            // Clear the iframe and retry
            targetFrame.src = '';
            setTimeout(() => {
                this.attemptLoad(project, targetFrame).then(resolve).catch(reject);
            }, 1000);
        } else {
            reject(new Error(`Demo load timeout after ${this.retryAttempts} attempts: ${project.name}`));
        }
    }

    /**
     * Handle load error
     */
    handleLoadError(project, targetFrame, resolve, reject) {
        if (this.currentRetry < this.retryAttempts) {
            this.currentRetry++;
            console.log(`Retrying demo load after error (${this.currentRetry}/${this.retryAttempts}): ${project.name}`);
            
            setTimeout(() => {
                this.attemptLoad(project, targetFrame).then(resolve).catch(reject);
            }, 2000);
        } else {
            reject(new Error(`Demo load failed after ${this.retryAttempts} attempts: ${project.name}`));
        }
    }

    /**
     * Verify that the demo loaded correctly
     */
    async verifyDemoLoad(targetFrame, project) {
        return new Promise((resolve, reject) => {
            try {
                // Basic verification - check if iframe has content
                if (!targetFrame.contentWindow) {
                    reject(new Error('Iframe content window not accessible'));
                    return;
                }

                // Try to access the iframe document (may fail due to CORS)
                try {
                    const iframeDoc = targetFrame.contentDocument || targetFrame.contentWindow.document;
                    if (iframeDoc && iframeDoc.body) {
                        // Check if the document has meaningful content
                        const bodyContent = iframeDoc.body.innerHTML.trim();
                        if (bodyContent.length > 0) {
                            resolve();
                        } else {
                            reject(new Error('Demo loaded but appears to be empty'));
                        }
                    } else {
                        // If we can't access the document, assume it loaded (CORS restriction)
                        resolve();
                    }
                } catch (corsError) {
                    // CORS restriction - assume the demo loaded successfully
                    console.log(`CORS restriction detected for ${project.name}, assuming successful load`);
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Preload demo assets for faster loading
     */
    preloadDemo(projectKey) {
        const project = projectConfig[projectKey];
        if (!project) return;

        // Create a hidden iframe to preload the demo
        const preloadFrame = document.createElement('iframe');
        preloadFrame.style.display = 'none';
        preloadFrame.style.position = 'absolute';
        preloadFrame.style.left = '-9999px';
        preloadFrame.src = project.demoPath + project.entryPoint;
        
        document.body.appendChild(preloadFrame);

        // Remove preload frame after a delay
        setTimeout(() => {
            document.body.removeChild(preloadFrame);
        }, 5000);

        console.log(`Preloading demo: ${project.name}`);
    }

    /**
     * Get demo metadata and health status
     */
    async getDemoStatus(projectKey) {
        const project = projectConfig[projectKey];
        if (!project) {
            return { status: 'not_found', project: null };
        }

        try {
            // Try to fetch the demo HTML to check if it exists
            const response = await fetch(project.demoPath + project.entryPoint, { 
                method: 'HEAD',
                mode: 'no-cors' 
            });
            
            return {
                status: 'available',
                project: project,
                lastChecked: new Date().toISOString()
            };
        } catch (error) {
            console.warn(`Demo not available: ${project.name}`, error);
            return {
                status: 'unavailable',
                project: project,
                error: error.message,
                lastChecked: new Date().toISOString()
            };
        }
    }

    /**
     * Inject demo navigation into loaded iframe
     */
    injectDemoNavigation(targetFrame, project) {
        try {
            const iframeDoc = targetFrame.contentDocument || targetFrame.contentWindow.document;
            if (!iframeDoc) return;

            // Check if navigation already exists
            if (iframeDoc.querySelector('.demo-nav')) return;

            // Create navigation element
            const demoNav = iframeDoc.createElement('div');
            demoNav.className = 'demo-nav';
            demoNav.innerHTML = `
                <nav style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: rgba(37, 99, 235, 0.95);
                    color: white;
                    padding: 8px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 9999;
                    font-family: system-ui, -apple-system, sans-serif;
                    font-size: 14px;
                    backdrop-filter: blur(10px);
                ">
                    <a href="#" onclick="parent.closeDemoModal(); return false;" style="
                        color: white;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 4px 8px;
                        border-radius: 4px;
                        transition: background-color 0.2s;
                    " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Voltar ao Portfolio
                    </a>
                    <span style="
                        background: rgba(255, 255, 255, 0.2);
                        padding: 4px 12px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    ">DEMO</span>
                </nav>
            `;

            // Add some top padding to the body to account for the fixed navigation
            const bodyStyle = iframeDoc.body.style;
            bodyStyle.paddingTop = (parseInt(bodyStyle.paddingTop) || 0) + 50 + 'px';

            // Insert navigation at the beginning of the body
            iframeDoc.body.insertBefore(demoNav, iframeDoc.body.firstChild);

            console.log(`Demo navigation injected for: ${project.name}`);
        } catch (error) {
            // Silently fail if we can't inject navigation (CORS restrictions)
            console.log(`Could not inject navigation for ${project.name} (likely CORS restriction)`);
        }
    }

    /**
     * Clean up resources
     */
    cleanup() {
        if (this.loadingTimer) {
            clearTimeout(this.loadingTimer);
            this.loadingTimer = null;
        }
        this.currentRetry = 0;
    }
}

// Create global demo loader instance
const demoLoader = new DemoLoader();

/**
 * Enhanced demo loading function
 */
async function loadDemoWithEnhancements(projectKey) {
    const targetFrame = elements.demoFrame;
    if (!targetFrame) {
        throw new Error('Demo frame not found');
    }

    try {
        // Show loading state
        demoState.loadingState = 'loading';
        
        // Load the demo
        const project = await demoLoader.loadDemo(projectKey, targetFrame);
        
        // Inject navigation after a short delay to ensure the demo is fully loaded
        setTimeout(() => {
            demoLoader.injectDemoNavigation(targetFrame, project);
        }, 1000);
        
        demoState.loadingState = 'loaded';
        return project;
        
    } catch (error) {
        demoState.loadingState = 'error';
        console.error('Failed to load demo:', error);
        throw error;
    }
}

/**
 * Preload all demos for better performance
 */
function preloadAllDemos() {
    Object.keys(projectConfig).forEach(projectKey => {
        // Stagger preloading to avoid overwhelming the browser
        setTimeout(() => {
            demoLoader.preloadDemo(projectKey);
        }, Math.random() * 2000);
    });
}

/**
 * Check status of all demos
 */
async function checkAllDemoStatus() {
    const statusPromises = Object.keys(projectConfig).map(async projectKey => {
        const status = await demoLoader.getDemoStatus(projectKey);
        return { projectKey, ...status };
    });
    
    const results = await Promise.all(statusPromises);
    console.log('Demo status check results:', results);
    return results;
}

// Initialize demo loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Preload demos after a short delay
    setTimeout(preloadAllDemos, 2000);
    
    // Check demo status
    setTimeout(checkAllDemoStatus, 5000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    demoLoader.cleanup();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DemoLoader,
        demoLoader,
        loadDemoWithEnhancements,
        preloadAllDemos,
        checkAllDemoStatus
    };
}