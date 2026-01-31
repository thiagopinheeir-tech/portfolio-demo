/**
 * Portfolio Demo System - Enhanced Navigation
 * Handles breadcrumbs, smooth transitions, and demo navigation
 */

class DemoNavigation {
    constructor() {
        this.currentDemo = null;
        this.isTransitioning = false;
        this.menuOpen = false;
        this.transitionDuration = 400;
        
        this.init();
    }

    /**
     * Initialize navigation system
     */
    init() {
        this.createTransitionOverlay();
        this.setupEventListeners();
        this.detectCurrentDemo();
        
        console.log('Demo Navigation System initialized');
    }

    /**
     * Detect current demo from URL or context
     */
    detectCurrentDemo() {
        const path = window.location.pathname;
        const demoMatch = path.match(/\/demos\/([^\/]+)\//);
        
        if (demoMatch) {
            this.currentDemo = demoMatch[1];
        }
        
        // Also check for data attributes or other indicators
        const demoWrapper = document.querySelector('.demo-wrapper');
        if (demoWrapper && demoWrapper.dataset.demo) {
            this.currentDemo = demoWrapper.dataset.demo;
        }
    }

    /**
     * Create enhanced navigation for demos
     */
    createEnhancedNavigation(demoKey, demoName) {
        const existingNav = document.querySelector('.demo-nav');
        if (existingNav) {
            existingNav.remove();
        }

        const nav = document.createElement('nav');
        nav.className = 'demo-nav';
        nav.innerHTML = this.generateNavigationHTML(demoKey, demoName);

        // Insert at the beginning of body
        document.body.insertBefore(nav, document.body.firstChild);

        // Add padding to body to account for fixed navigation
        document.body.style.paddingTop = '60px';

        // Setup navigation event listeners
        this.setupNavigationEvents(nav);

        return nav;
    }

    /**
     * Generate navigation HTML
     */
    generateNavigationHTML(demoKey, demoName) {
        const projectInfo = this.getProjectInfo(demoKey);
        
        return `
            <div class="demo-nav-left">
                <div class="demo-breadcrumbs">
                    <div class="breadcrumb-item">
                        <a href="../../index.html" class="breadcrumb-link" data-transition="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                            Portfolio
                        </a>
                    </div>
                    <span class="breadcrumb-separator">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,18 15,12 9,6"/>
                        </svg>
                    </span>
                    <div class="breadcrumb-item">
                        <span class="breadcrumb-current">${demoName || projectInfo.name}</span>
                    </div>
                </div>
            </div>
            
            <div class="demo-nav-center">
                <h1 class="demo-title">
                    ${this.getProjectIcon(demoKey)}
                    ${demoName || projectInfo.name}
                </h1>
            </div>
            
            <div class="demo-nav-right">
                <div class="demo-nav-menu">
                    <button class="demo-menu-toggle" aria-label="Abrir menu de demos" aria-expanded="false">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 1v6m0 6v6"/>
                        </svg>
                        Outros Demos
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"/>
                        </svg>
                    </button>
                    <div class="demo-menu-dropdown">
                        <div class="demo-menu-header">
                            <h3 class="demo-menu-title">Demonstrações Disponíveis</h3>
                            <p class="demo-menu-subtitle">Explore outros projetos do portfolio</p>
                        </div>
                        <div class="demo-menu-list">
                            ${this.generateDemoMenuItems(demoKey)}
                        </div>
                    </div>
                </div>
                <span class="demo-label">DEMO</span>
            </div>
        `;
    }

    /**
     * Generate demo menu items
     */
    generateDemoMenuItems(currentDemoKey) {
        const projects = this.getAllProjects();
        
        return Object.entries(projects).map(([key, project]) => {
            const isCurrent = key === currentDemoKey;
            const className = isCurrent ? 'demo-menu-item current' : 'demo-menu-item';
            
            return `
                <button class="${className}" 
                        data-demo="${key}" 
                        ${isCurrent ? 'aria-current="page"' : ''}
                        onclick="demoNavigation.navigateToDemo('${key}')">
                    <span class="demo-menu-item-name">${project.name}</span>
                    <span class="demo-menu-item-desc">${project.description}</span>
                </button>
            `;
        }).join('');
    }

    /**
     * Setup navigation event listeners
     */
    setupNavigationEvents(nav) {
        // Menu toggle
        const menuToggle = nav.querySelector('.demo-menu-toggle');
        const menuDropdown = nav.querySelector('.demo-menu-dropdown');
        
        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle breadcrumb navigation with transitions
        const breadcrumbLinks = nav.querySelectorAll('[data-transition="true"]');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateWithTransition(link.href, 'Voltando ao Portfolio...');
            });
        });

        // Scroll effect
        this.setupScrollEffect(nav);
    }

    /**
     * Setup scroll effect for navigation
     */
    setupScrollEffect(nav) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    /**
     * Toggle demo menu
     */
    toggleMenu() {
        const menuToggle = document.querySelector('.demo-menu-toggle');
        const menuDropdown = document.querySelector('.demo-menu-dropdown');
        
        if (!menuToggle || !menuDropdown) return;
        
        this.menuOpen = !this.menuOpen;
        
        menuDropdown.classList.toggle('active', this.menuOpen);
        menuToggle.setAttribute('aria-expanded', this.menuOpen.toString());
        
        if (this.menuOpen) {
            // Focus first menu item
            const firstItem = menuDropdown.querySelector('.demo-menu-item');
            if (firstItem) {
                setTimeout(() => firstItem.focus(), 100);
            }
        }
    }

    /**
     * Close demo menu
     */
    closeMenu() {
        const menuToggle = document.querySelector('.demo-menu-toggle');
        const menuDropdown = document.querySelector('.demo-menu-dropdown');
        
        if (!menuToggle || !menuDropdown) return;
        
        this.menuOpen = false;
        menuDropdown.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * Navigate to another demo with smooth transition
     */
    async navigateToDemo(demoKey) {
        if (this.isTransitioning || demoKey === this.currentDemo) return;
        
        const project = this.getProjectInfo(demoKey);
        if (!project) {
            console.error(`Project not found: ${demoKey}`);
            return;
        }
        
        this.closeMenu();
        
        const demoUrl = `../../demos/${demoKey}/index.html`;
        await this.navigateWithTransition(demoUrl, `Carregando ${project.name}...`);
    }

    /**
     * Navigate with smooth transition
     */
    async navigateWithTransition(url, message = 'Carregando...') {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Show transition overlay
        this.showTransitionOverlay(message);
        
        // Wait for transition animation
        await this.delay(this.transitionDuration);
        
        // Navigate to new page
        window.location.href = url;
    }

    /**
     * Show transition overlay
     */
    showTransitionOverlay(message) {
        const overlay = document.getElementById('demoTransitionOverlay');
        if (!overlay) return;
        
        const textElement = overlay.querySelector('.demo-transition-text');
        if (textElement) {
            textElement.textContent = message;
        }
        
        overlay.classList.add('active');
    }

    /**
     * Hide transition overlay
     */
    hideTransitionOverlay() {
        const overlay = document.getElementById('demoTransitionOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        this.isTransitioning = false;
    }

    /**
     * Create transition overlay
     */
    createTransitionOverlay() {
        if (document.getElementById('demoTransitionOverlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'demoTransitionOverlay';
        overlay.className = 'demo-transition-overlay';
        overlay.innerHTML = `
            <div class="demo-transition-content">
                <div class="demo-transition-spinner"></div>
                <div class="demo-transition-text">Carregando...</div>
                <div class="demo-transition-subtext">Preparando demonstração</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Handle page load completion
        window.addEventListener('load', () => {
            this.hideTransitionOverlay();
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuOpen) {
                this.closeMenu();
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.hideTransitionOverlay();
        });
    }

    /**
     * Get project information
     */
    getProjectInfo(demoKey) {
        const projects = this.getAllProjects();
        return projects[demoKey] || null;
    }

    /**
     * Get project icon
     */
    getProjectIcon(demoKey) {
        const icons = {
            'acai-dany': '🍧',
            'barbearia-raimundos': '✂️',
            'financas-pessoais': '💰',
            'whatsapp-bot-ai': '🤖',
            'landpage-divulga': '🚀'
        };
        
        return icons[demoKey] || '📱';
    }

    /**
     * Get all projects configuration
     */
    getAllProjects() {
        // Try to get from global projectConfig first
        if (typeof projectConfig !== 'undefined') {
            return projectConfig;
        }
        
        // Fallback configuration
        return {
            "acai-dany": {
                name: "Açaí da Dany",
                description: "Sistema de cardápio direto para WhatsApp"
            },
            "barbearia-raimundos": {
                name: "Barbearia Raimundos",
                description: "Sistema de agendamento para barbearia"
            },
            "financas-pessoais": {
                name: "Finanças Pessoais",
                description: "Sistema de controle financeiro"
            },
            "whatsapp-bot-ai": {
                name: "WhatsApp Bot AI",
                description: "Bot inteligente para WhatsApp"
            },
            "landpage-divulga": {
                name: "Landing Page Divulga",
                description: "Landing page promocional"
            }
        };
    }

    /**
     * Utility: Delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Initialize navigation for current demo
     */
    initializeForDemo(demoKey, demoName) {
        this.currentDemo = demoKey;
        this.createEnhancedNavigation(demoKey, demoName);
        
        // Hide transition overlay if it's showing
        setTimeout(() => {
            this.hideTransitionOverlay();
        }, 500);
    }

    /**
     * Update navigation for dynamic content
     */
    updateNavigation(demoKey, demoName) {
        const titleElement = document.querySelector('.demo-title');
        const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
        
        if (titleElement) {
            titleElement.innerHTML = `${this.getProjectIcon(demoKey)} ${demoName}`;
        }
        
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = demoName;
        }
        
        // Update menu items
        const menuList = document.querySelector('.demo-menu-list');
        if (menuList) {
            menuList.innerHTML = this.generateDemoMenuItems(demoKey);
        }
    }
}

// Create global navigation instance
const demoNavigation = new DemoNavigation();

// Auto-initialize navigation for demos
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in a demo page
    const demoWrapper = document.querySelector('.demo-wrapper');
    if (demoWrapper) {
        // Try to detect demo from URL or data attributes
        const path = window.location.pathname;
        const demoMatch = path.match(/\/demos\/([^\/]+)\//);
        
        if (demoMatch) {
            const demoKey = demoMatch[1];
            const projectInfo = demoNavigation.getProjectInfo(demoKey);
            
            if (projectInfo) {
                demoNavigation.initializeForDemo(demoKey, projectInfo.name);
            }
        }
    }
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.demoNavigation = demoNavigation;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DemoNavigation, demoNavigation };
}