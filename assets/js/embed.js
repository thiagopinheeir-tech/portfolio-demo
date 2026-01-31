/**
 * Portfolio Demo System - Embeddable Components
 * Provides lightweight embeddable components for external landing page integration
 */

/**
 * Portfolio Embed Class
 * Creates embeddable portfolio components with minimal performance impact
 */
class PortfolioEmbed {
    constructor(options = {}) {
        this.options = {
            // Container element or selector
            container: options.container || '#portfolio-embed',
            
            // Display mode: 'gallery', 'carousel', 'grid', 'list'
            mode: options.mode || 'gallery',
            
            // Number of projects to show (0 = all)
            limit: options.limit || 0,
            
            // Projects to include (empty = all)
            projects: options.projects || [],
            
            // Theme: 'light', 'dark', 'auto'
            theme: options.theme || 'light',
            
            // Lazy loading
            lazyLoad: options.lazyLoad !== false,
            
            // Performance optimizations
            preloadImages: options.preloadImages !== false,
            deferNonCritical: options.deferNonCritical !== false,
            
            // Integration options
            baseUrl: options.baseUrl || '',
            openMode: options.openMode || 'modal', // 'modal', 'newTab', 'iframe'
            
            // Callbacks
            onProjectClick: options.onProjectClick || null,
            onLoad: options.onLoad || null,
            onError: options.onError || null
        };
        
        this.container = null;
        this.projects = {};
        this.isLoaded = false;
        this.loadStartTime = performance.now();
        
        this.init();
    }

    /**
     * Initialize the embed component
     */
    async init() {
        try {
            // Find container
            this.container = typeof this.options.container === 'string' 
                ? document.querySelector(this.options.container)
                : this.options.container;
                
            if (!this.container) {
                throw new Error(`Container not found: ${this.options.container}`);
            }
            
            // Load project configuration
            await this.loadProjectConfig();
            
            // Apply theme
            this.applyTheme();
            
            // Render component
            this.render();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Performance optimizations
            if (this.options.deferNonCritical) {
                this.deferNonCriticalOperations();
            }
            
            this.isLoaded = true;
            const loadTime = performance.now() - this.loadStartTime;
            
            console.log(`Portfolio embed loaded in ${loadTime.toFixed(2)}ms`);
            
            if (this.options.onLoad) {
                this.options.onLoad(this, { loadTime });
            }
            
        } catch (error) {
            console.error('Portfolio embed initialization failed:', error);
            this.showError(error.message);
            
            if (this.options.onError) {
                this.options.onError(error);
            }
        }
    }

    /**
     * Load project configuration
     */
    async loadProjectConfig() {
        // Try to get from global scope first
        if (typeof projectConfig !== 'undefined') {
            this.projects = projectConfig;
            return;
        }
        
        // Try to load from external file
        try {
            const response = await fetch(`${this.options.baseUrl}/assets/js/project-config.json`);
            if (response.ok) {
                this.projects = await response.json();
                return;
            }
        } catch (error) {
            console.warn('Could not load external project config:', error);
        }
        
        // Fallback to embedded configuration
        this.projects = this.getEmbeddedProjectConfig();
    }

    /**
     * Get embedded project configuration
     */
    getEmbeddedProjectConfig() {
        return {
            "acai-dany": {
                name: "Açaí da Dany",
                description: "Sistema de cardápio direto para WhatsApp",
                preview: "assets/images/project-previews/acai-dany.svg",
                technologies: ["HTML", "CSS", "JavaScript"],
                demoPath: "./demos/acai-dany/"
            },
            "barbearia-raimundos": {
                name: "Barbearia Raimundos",
                description: "Sistema de agendamento para barbearia",
                preview: "assets/images/project-previews/barbearia-raimundos.svg",
                technologies: ["HTML", "CSS", "JavaScript"],
                demoPath: "./demos/barbearia-raimundos/"
            },
            "financas-pessoais": {
                name: "Finanças Pessoais",
                description: "Sistema de controle financeiro",
                preview: "assets/images/project-previews/financas-pessoais.svg",
                technologies: ["HTML", "CSS", "JavaScript"],
                demoPath: "./demos/financas-pessoais/"
            },
            "whatsapp-bot-ai": {
                name: "WhatsApp Bot AI",
                description: "Bot inteligente para WhatsApp",
                preview: "assets/images/project-previews/whatsapp-bot-ai.svg",
                technologies: ["HTML", "CSS", "JavaScript", "AI"],
                demoPath: "./demos/whatsapp-bot-ai/"
            },
            "landpage-divulga": {
                name: "Landing Page Divulga",
                description: "Landing page promocional",
                preview: "assets/images/project-previews/landpage-divulga.svg",
                technologies: ["HTML", "CSS", "JavaScript"],
                demoPath: "./demos/landpage-divulga/"
            }
        };
    }

    /**
     * Apply theme to the component
     */
    applyTheme() {
        const theme = this.options.theme === 'auto' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : this.options.theme;
            
        this.container.setAttribute('data-theme', theme);
        this.container.classList.add('portfolio-embed', `portfolio-embed--${this.options.mode}`);
    }

    /**
     * Render the component
     */
    render() {
        const projectsToShow = this.getProjectsToShow();
        
        switch (this.options.mode) {
            case 'carousel':
                this.renderCarousel(projectsToShow);
                break;
            case 'grid':
                this.renderGrid(projectsToShow);
                break;
            case 'list':
                this.renderList(projectsToShow);
                break;
            default:
                this.renderGallery(projectsToShow);
        }
    }

    /**
     * Get projects to show based on options
     */
    getProjectsToShow() {
        let projects = Object.entries(this.projects);
        
        // Filter by specified projects
        if (this.options.projects.length > 0) {
            projects = projects.filter(([key]) => this.options.projects.includes(key));
        }
        
        // Apply limit
        if (this.options.limit > 0) {
            projects = projects.slice(0, this.options.limit);
        }
        
        return projects;
    }

    /**
     * Render gallery mode
     */
    renderGallery(projects) {
        this.container.innerHTML = `
            <div class="portfolio-embed__header">
                <h2 class="portfolio-embed__title">Projetos Realizados</h2>
                <p class="portfolio-embed__subtitle">Demonstrações interativas dos sistemas desenvolvidos</p>
            </div>
            <div class="portfolio-embed__grid">
                ${projects.map(([key, project]) => this.createProjectCard(key, project)).join('')}
            </div>
        `;
    }

    /**
     * Render carousel mode
     */
    renderCarousel(projects) {
        this.container.innerHTML = `
            <div class="portfolio-embed__header">
                <h2 class="portfolio-embed__title">Projetos Realizados</h2>
                <div class="portfolio-embed__controls">
                    <button class="portfolio-embed__nav portfolio-embed__nav--prev" aria-label="Projeto anterior">‹</button>
                    <button class="portfolio-embed__nav portfolio-embed__nav--next" aria-label="Próximo projeto">›</button>
                </div>
            </div>
            <div class="portfolio-embed__carousel">
                <div class="portfolio-embed__carousel-track">
                    ${projects.map(([key, project]) => this.createProjectCard(key, project, 'carousel')).join('')}
                </div>
            </div>
            <div class="portfolio-embed__indicators">
                ${projects.map((_, index) => `
                    <button class="portfolio-embed__indicator ${index === 0 ? 'active' : ''}" 
                            data-index="${index}" aria-label="Ir para projeto ${index + 1}"></button>
                `).join('')}
            </div>
        `;
        
        this.setupCarousel();
    }

    /**
     * Render grid mode
     */
    renderGrid(projects) {
        this.container.innerHTML = `
            <div class="portfolio-embed__grid portfolio-embed__grid--compact">
                ${projects.map(([key, project]) => this.createProjectCard(key, project, 'compact')).join('')}
            </div>
        `;
    }

    /**
     * Render list mode
     */
    renderList(projects) {
        this.container.innerHTML = `
            <div class="portfolio-embed__list">
                ${projects.map(([key, project]) => this.createProjectListItem(key, project)).join('')}
            </div>
        `;
    }

    /**
     * Create project card HTML
     */
    createProjectCard(key, project, variant = 'default') {
        const imageUrl = this.options.baseUrl + project.preview;
        const techTags = project.technologies.slice(0, 3).map(tech => 
            `<span class="portfolio-embed__tech" role="listitem">${tech}</span>`
        ).join('');
        
        return `
            <div class="portfolio-embed__card portfolio-embed__card--${variant}" 
                 data-project="${key}" 
                 tabindex="0" 
                 role="button" 
                 aria-label="Ver demo do ${project.name}"
                 aria-describedby="desc-${key}">
                <div class="portfolio-embed__image">
                    ${this.options.lazyLoad ? 
                        `<img data-src="${imageUrl}" alt="Captura de tela do ${project.name}" class="lazy-load">` :
                        `<img src="${imageUrl}" alt="Captura de tela do ${project.name}">`
                    }
                </div>
                <div class="portfolio-embed__content">
                    <h3 class="portfolio-embed__name">${project.name}</h3>
                    <p class="portfolio-embed__description" id="desc-${key}">${project.description}</p>
                    <div class="portfolio-embed__technologies" role="list" aria-label="Tecnologias utilizadas">${techTags}</div>
                    <button class="portfolio-embed__button" aria-label="Abrir demo do ${project.name}">Ver Demo</button>
                </div>
            </div>
        `;
    }

    /**
     * Create project list item HTML
     */
    createProjectListItem(key, project) {
        const imageUrl = this.options.baseUrl + project.preview;
        
        return `
            <div class="portfolio-embed__list-item" 
                 data-project="${key}" 
                 tabindex="0" 
                 role="button" 
                 aria-label="Ver demo do ${project.name}">
                <div class="portfolio-embed__list-image">
                    ${this.options.lazyLoad ? 
                        `<img data-src="${imageUrl}" alt="${project.name}" class="lazy-load">` :
                        `<img src="${imageUrl}" alt="${project.name}">`
                    }
                </div>
                <div class="portfolio-embed__list-content">
                    <h3 class="portfolio-embed__list-name">${project.name}</h3>
                    <p class="portfolio-embed__list-description">${project.description}</p>
                    <div class="portfolio-embed__list-technologies">
                        ${project.technologies.map(tech => `<span class="portfolio-embed__tech">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="portfolio-embed__list-action">
                    <button class="portfolio-embed__button portfolio-embed__button--small">Ver Demo</button>
                </div>
            </div>
        `;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Project clicks
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('[data-project]');
            if (card) {
                const projectKey = card.dataset.project;
                this.handleProjectClick(projectKey, e);
            }
        });

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            const card = e.target.closest('[data-project]');
            if (card && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const projectKey = card.dataset.project;
                this.handleProjectClick(projectKey, e);
            }
            
            // Arrow key navigation between cards
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.handleArrowNavigation(e);
            }
        });

        // Lazy loading
        if (this.options.lazyLoad) {
            this.setupLazyLoading();
        }
        
        // Add live region for announcements
        this.setupLiveRegion();
    }

    /**
     * Handle project click
     */
    handleProjectClick(projectKey, event) {
        const project = this.projects[projectKey];
        if (!project) return;

        // Custom callback
        if (this.options.onProjectClick) {
            const result = this.options.onProjectClick(projectKey, project, event);
            if (result === false) return; // Allow callback to prevent default action
        }

        // Default actions based on open mode
        switch (this.options.openMode) {
            case 'newTab':
                window.open(`${this.options.baseUrl}${project.demoPath}index.html`, '_blank');
                break;
            case 'iframe':
                this.openInIframe(projectKey, project);
                break;
            default:
                this.openInModal(projectKey, project);
        }
    }

    /**
     * Open project in modal
     */
    openInModal(projectKey, project) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('portfolio-embed-modal');
        if (!modal) {
            modal = this.createModal();
            document.body.appendChild(modal);
        }

        // Update modal content
        const title = modal.querySelector('.portfolio-embed-modal__title');
        const iframe = modal.querySelector('.portfolio-embed-modal__iframe');
        
        title.textContent = project.name;
        iframe.src = `${this.options.baseUrl}${project.demoPath}index.html`;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        const closeBtn = modal.querySelector('.portfolio-embed-modal__close');
        closeBtn.focus();
    }

    /**
     * Create modal HTML
     */
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'portfolio-embed-modal';
        modal.className = 'portfolio-embed-modal';
        modal.innerHTML = `
            <div class="portfolio-embed-modal__backdrop"></div>
            <div class="portfolio-embed-modal__container">
                <div class="portfolio-embed-modal__header">
                    <h2 class="portfolio-embed-modal__title"></h2>
                    <button class="portfolio-embed-modal__close" aria-label="Fechar">&times;</button>
                </div>
                <div class="portfolio-embed-modal__content">
                    <iframe class="portfolio-embed-modal__iframe" frameborder="0"></iframe>
                </div>
            </div>
        `;

        // Setup modal event listeners
        const closeBtn = modal.querySelector('.portfolio-embed-modal__close');
        const backdrop = modal.querySelector('.portfolio-embed-modal__backdrop');

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modal.querySelector('.portfolio-embed-modal__iframe').src = '';
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        return modal;
    }

    /**
     * Setup carousel functionality
     */
    setupCarousel() {
        const track = this.container.querySelector('.portfolio-embed__carousel-track');
        const prevBtn = this.container.querySelector('.portfolio-embed__nav--prev');
        const nextBtn = this.container.querySelector('.portfolio-embed__nav--next');
        const indicators = this.container.querySelectorAll('.portfolio-embed__indicator');
        
        let currentIndex = 0;
        const totalItems = indicators.length;
        
        const updateCarousel = (index) => {
            currentIndex = index;
            const translateX = -index * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Update navigation buttons
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === totalItems - 1;
        };
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                updateCarousel(currentIndex - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
                updateCarousel(currentIndex + 1);
            }
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
            });
        });
        
        // Initialize
        updateCarousel(0);
    }

    /**
     * Setup lazy loading
     */
    setupLazyLoading() {
        const lazyImages = this.container.querySelectorAll('.lazy-load');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
            });
        }
    }

    /**
     * Defer non-critical operations
     */
    deferNonCriticalOperations() {
        // Use requestIdleCallback if available
        const defer = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
        
        defer(() => {
            // Preload images
            if (this.options.preloadImages) {
                this.preloadImages();
            }
            
            // Setup analytics or other non-critical features
            this.setupAnalytics();
        });
    }

    /**
     * Preload images for better performance
     */
    preloadImages() {
        Object.values(this.projects).forEach(project => {
            const img = new Image();
            img.src = this.options.baseUrl + project.preview;
        });
    }

    /**
     * Setup analytics (placeholder)
     */
    setupAnalytics() {
        // Placeholder for analytics integration
        console.log('Analytics setup deferred');
    }

    /**
     * Show error message
     */
    showError(message) {
        this.container.innerHTML = `
            <div class="portfolio-embed__error">
                <div class="portfolio-embed__error-icon">⚠️</div>
                <h3 class="portfolio-embed__error-title">Erro ao Carregar Portfolio</h3>
                <p class="portfolio-embed__error-message">${message}</p>
                <button class="portfolio-embed__error-retry" onclick="location.reload()">Tentar Novamente</button>
            </div>
        `;
    }

    /**
     * Update component with new options
     */
    update(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.render();
        this.setupEventListeners();
    }

    /**
     * Setup live region for announcements
     */
    setupLiveRegion() {
        if (!this.container.querySelector('.portfolio-embed__live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.className = 'portfolio-embed__live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            this.container.appendChild(liveRegion);
        }
    }

    /**
     * Announce to screen readers
     */
    announceToScreenReader(message) {
        const liveRegion = this.container.querySelector('.portfolio-embed__live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * Handle arrow key navigation between cards
     */
    handleArrowNavigation(e) {
        const focusedCard = document.activeElement;
        if (!focusedCard || !focusedCard.classList.contains('portfolio-embed__card')) return;

        const cards = Array.from(this.container.querySelectorAll('.portfolio-embed__card'));
        const currentIndex = cards.indexOf(focusedCard);
        
        if (currentIndex === -1) return;

        let nextIndex;
        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        } else if (e.key === 'ArrowRight') {
            nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        }

        if (nextIndex !== undefined) {
            e.preventDefault();
            cards[nextIndex].focus();
            
            const projectName = cards[nextIndex].querySelector('.portfolio-embed__name')?.textContent || `Projeto ${nextIndex + 1}`;
            this.announceToScreenReader(`Navegando para ${projectName}`);
        }
    }

    /**
     * Destroy the component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
            this.container.classList.remove('portfolio-embed');
        }
        
        // Remove modal if it exists
        const modal = document.getElementById('portfolio-embed-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Auto-initialization
document.addEventListener('DOMContentLoaded', () => {
    // Auto-initialize elements with data-portfolio-embed attribute
    const embedElements = document.querySelectorAll('[data-portfolio-embed]');
    
    embedElements.forEach(element => {
        const options = {
            container: element,
            mode: element.dataset.mode || 'gallery',
            limit: parseInt(element.dataset.limit) || 0,
            projects: element.dataset.projects ? element.dataset.projects.split(',') : [],
            theme: element.dataset.theme || 'light',
            openMode: element.dataset.openMode || 'modal',
            baseUrl: element.dataset.baseUrl || ''
        };
        
        new PortfolioEmbed(options);
    });
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.PortfolioEmbed = PortfolioEmbed;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioEmbed };
}