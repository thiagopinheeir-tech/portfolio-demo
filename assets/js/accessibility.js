/**
 * Portfolio Demo System - Accessibility Module
 * WCAG 2.1 AA Compliance Implementation
 */

class AccessibilityManager {
    constructor() {
        this.isKeyboardNavigation = false;
        this.focusableElements = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '[role="button"]:not([aria-disabled="true"])',
            '[role="link"]',
            '[contenteditable="true"]'
        ].join(', ');
        
        this.liveRegion = null;
        this.keyboardNavHelper = null;
        this.focusTrap = null;
        
        this.init();
    }

    /**
     * Initialize accessibility features
     */
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupLiveRegion();
        this.setupSkipLinks();
        this.setupARIAEnhancements();
        this.setupKeyboardNavHelper();
        this.setupReducedMotion();
        this.setupHighContrast();
        this.setupScreenReaderSupport();
        
        console.log('Accessibility Manager initialized');
    }

    /**
     * Setup keyboard navigation detection
     */
    setupKeyboardNavigation() {
        // Detect keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.isKeyboardNavigation = true;
                document.body.classList.add('keyboard-navigation-active');
                this.showKeyboardNavHelper();
            }
        });

        // Detect mouse navigation
        document.addEventListener('mousedown', () => {
            this.isKeyboardNavigation = false;
            document.body.classList.remove('keyboard-navigation-active');
            this.hideKeyboardNavHelper();
        });

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Skip to main content (Alt + M)
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const main = document.querySelector('main') || document.querySelector('#main-content');
            if (main) {
                main.focus();
                this.announceToScreenReader('Navegando para o conteúdo principal');
            }
        }

        // Skip to navigation (Alt + N)
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
            if (nav) {
                const firstLink = nav.querySelector('a, button');
                if (firstLink) {
                    firstLink.focus();
                    this.announceToScreenReader('Navegando para o menu de navegação');
                }
            }
        }

        // Close modal (Escape)
        if (e.key === 'Escape') {
            this.closeModal();
        }

        // Navigate projects with arrow keys
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            this.handleProjectNavigation(e);
        }
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Focus trap for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.focusTrap) {
                this.handleFocusTrap(e);
            }
        });

        // Focus restoration
        this.lastFocusedElement = null;
        
        // Store focus before modal opens
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-project]') || e.target.closest('.demo-btn')) {
                this.lastFocusedElement = e.target;
            }
        });
    }

    /**
     * Handle focus trap in modals
     */
    handleFocusTrap(e) {
        if (!this.focusTrap) return;

        const focusableElements = this.focusTrap.querySelectorAll(this.focusableElements);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Setup live region for screen reader announcements
     */
    setupLiveRegion() {
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'live-region';
        this.liveRegion.id = 'live-region';
        document.body.appendChild(this.liveRegion);
    }

    /**
     * Announce message to screen readers
     */
    announceToScreenReader(message, priority = 'polite') {
        if (!this.liveRegion) return;

        this.liveRegion.setAttribute('aria-live', priority);
        this.liveRegion.textContent = message;

        // Clear after announcement
        setTimeout(() => {
            this.liveRegion.textContent = '';
        }, 1000);
    }

    /**
     * Setup skip links
     */
    setupSkipLinks() {
        const skipLinks = document.createElement('a');
        skipLinks.href = '#main-content';
        skipLinks.className = 'skip-links';
        skipLinks.textContent = 'Pular para o conteúdo principal';
        
        skipLinks.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.querySelector('#main-content') || 
                              document.querySelector('main') || 
                              document.querySelector('.portfolio-container');
            
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                this.announceToScreenReader('Navegando para o conteúdo principal');
            }
        });

        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    /**
     * Setup ARIA enhancements
     */
    setupARIAEnhancements() {
        // Add main landmark
        const portfolioContainer = document.querySelector('.portfolio-container');
        if (portfolioContainer && !portfolioContainer.closest('main')) {
            portfolioContainer.setAttribute('role', 'main');
            portfolioContainer.id = 'main-content';
        }

        // Enhance project cards
        this.enhanceProjectCards();

        // Enhance modal
        this.enhanceModal();

        // Enhance navigation
        this.enhanceNavigation();

        // Add loading states
        this.enhanceLoadingStates();
    }

    /**
     * Enhance project cards with ARIA
     */
    enhanceProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Make cards focusable and interactive
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Ver demo do projeto ${card.querySelector('h3')?.textContent || `projeto ${index + 1}`}`);
            
            // Add keyboard interaction
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            // Add ARIA description
            const description = card.querySelector('.project-info p');
            if (description) {
                const descId = `project-desc-${index}`;
                description.id = descId;
                card.setAttribute('aria-describedby', descId);
            }

            // Add technology list semantics
            const techList = card.querySelector('.project-technologies');
            if (techList) {
                techList.setAttribute('role', 'list');
                techList.setAttribute('aria-label', 'Tecnologias utilizadas');
                
                const techItems = techList.querySelectorAll('.tech-tag');
                techItems.forEach(item => {
                    item.setAttribute('role', 'listitem');
                });
            }
        });
    }

    /**
     * Enhance modal with ARIA
     */
    enhanceModal() {
        const modal = document.querySelector('.demo-modal');
        if (!modal) return;

        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('aria-labelledby', 'demoTitle');

        const closeBtn = modal.querySelector('.close-demo');
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', 'Fechar demo');
        }

        // Setup modal events
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    /**
     * Enhance navigation with ARIA
     */
    enhanceNavigation() {
        const navElements = document.querySelectorAll('nav, [role="navigation"]');
        
        navElements.forEach(nav => {
            if (!nav.hasAttribute('aria-label')) {
                nav.setAttribute('aria-label', 'Navegação principal');
            }
        });

        // Enhance breadcrumbs if present
        const breadcrumbs = document.querySelectorAll('.breadcrumb, .demo-nav');
        breadcrumbs.forEach(breadcrumb => {
            breadcrumb.setAttribute('role', 'navigation');
            breadcrumb.setAttribute('aria-label', 'Navegação estrutural');
        });
    }

    /**
     * Enhance loading states
     */
    enhanceLoadingStates() {
        const loadingElements = document.querySelectorAll('.loading-state, .spinner');
        
        loadingElements.forEach(element => {
            element.setAttribute('role', 'status');
            element.setAttribute('aria-live', 'polite');
            element.setAttribute('aria-label', 'Carregando conteúdo');
        });
    }

    /**
     * Setup keyboard navigation helper
     */
    setupKeyboardNavHelper() {
        this.keyboardNavHelper = document.createElement('div');
        this.keyboardNavHelper.className = 'keyboard-nav-helper';
        this.keyboardNavHelper.innerHTML = `
            <div>Navegação por teclado ativa</div>
            <div style="font-size: 0.75em; margin-top: 2px;">
                Tab: Navegar • Enter/Espaço: Ativar • Esc: Fechar
            </div>
        `;
        document.body.appendChild(this.keyboardNavHelper);
    }

    /**
     * Show keyboard navigation helper
     */
    showKeyboardNavHelper() {
        if (this.keyboardNavHelper) {
            this.keyboardNavHelper.classList.add('visible');
            setTimeout(() => {
                this.hideKeyboardNavHelper();
            }, 3000);
        }
    }

    /**
     * Hide keyboard navigation helper
     */
    hideKeyboardNavHelper() {
        if (this.keyboardNavHelper) {
            this.keyboardNavHelper.classList.remove('visible');
        }
    }

    /**
     * Setup reduced motion support
     */
    setupReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            this.announceToScreenReader('Modo de movimento reduzido ativado');
        }
    }

    /**
     * Setup high contrast support
     */
    setupHighContrast() {
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
            this.announceToScreenReader('Modo de alto contraste ativado');
        }
    }

    /**
     * Setup screen reader support
     */
    setupScreenReaderSupport() {
        // Add page structure information
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
        });

        // Add landmark information
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (!section.hasAttribute('aria-label') && !section.hasAttribute('aria-labelledby')) {
                const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
                if (heading) {
                    section.setAttribute('aria-labelledby', heading.id);
                } else {
                    section.setAttribute('aria-label', `Seção ${index + 1}`);
                }
            }
        });
    }

    /**
     * Open modal with accessibility features
     */
    openModal(projectKey, projectData) {
        const modal = document.querySelector('.demo-modal');
        if (!modal) return;

        // Set focus trap
        this.focusTrap = modal;
        
        // Update ARIA attributes
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        
        // Update modal title
        const title = modal.querySelector('#demoTitle');
        if (title && projectData) {
            title.textContent = projectData.name;
        }

        // Focus management
        setTimeout(() => {
            const closeBtn = modal.querySelector('.close-demo');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 100);

        // Announce to screen reader
        this.announceToScreenReader(`Demo do ${projectData?.name || 'projeto'} aberto. Use Escape para fechar.`);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close modal with accessibility features
     */
    closeModal() {
        const modal = document.querySelector('.demo-modal');
        if (!modal || !modal.classList.contains('active')) return;

        // Remove focus trap
        this.focusTrap = null;
        
        // Update ARIA attributes
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        
        // Clear iframe
        const iframe = modal.querySelector('#demoFrame');
        if (iframe) {
            iframe.src = '';
        }

        // Restore focus
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
            this.lastFocusedElement = null;
        }

        // Restore body scroll
        document.body.style.overflow = '';

        // Announce to screen reader
        this.announceToScreenReader('Demo fechado');
    }

    /**
     * Handle project navigation with arrow keys
     */
    handleProjectNavigation(e) {
        const focusedCard = document.activeElement;
        if (!focusedCard || !focusedCard.classList.contains('project-card')) return;

        const cards = Array.from(document.querySelectorAll('.project-card'));
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
            
            const projectName = cards[nextIndex].querySelector('h3')?.textContent || `Projeto ${nextIndex + 1}`;
            this.announceToScreenReader(`Navegando para ${projectName}`);
        }
    }

    /**
     * Update loading state with accessibility
     */
    updateLoadingState(isLoading, message = '') {
        const loadingElement = document.querySelector('.loading-state');
        if (!loadingElement) return;

        if (isLoading) {
            loadingElement.setAttribute('aria-busy', 'true');
            loadingElement.setAttribute('aria-label', message || 'Carregando conteúdo');
            this.announceToScreenReader(message || 'Carregando');
        } else {
            loadingElement.setAttribute('aria-busy', 'false');
            loadingElement.removeAttribute('aria-label');
            this.announceToScreenReader('Carregamento concluído');
        }
    }

    /**
     * Add error state with accessibility
     */
    showError(message, element = null) {
        const errorElement = element || document.querySelector('.error-state') || this.createErrorElement();
        
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'assertive');
        errorElement.textContent = message;
        
        this.announceToScreenReader(`Erro: ${message}`, 'assertive');
    }

    /**
     * Create error element
     */
    createErrorElement() {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-state';
        errorElement.setAttribute('role', 'alert');
        
        const container = document.querySelector('.portfolio-container');
        if (container) {
            container.insertBefore(errorElement, container.firstChild);
        }
        
        return errorElement;
    }

    /**
     * Add success state with accessibility
     */
    showSuccess(message, element = null) {
        const successElement = element || document.querySelector('.success-state') || this.createSuccessElement();
        
        successElement.setAttribute('role', 'status');
        successElement.setAttribute('aria-live', 'polite');
        successElement.textContent = message;
        
        this.announceToScreenReader(`Sucesso: ${message}`);
    }

    /**
     * Create success element
     */
    createSuccessElement() {
        const successElement = document.createElement('div');
        successElement.className = 'success-state';
        successElement.setAttribute('role', 'status');
        
        const container = document.querySelector('.portfolio-container');
        if (container) {
            container.insertBefore(successElement, container.firstChild);
        }
        
        return successElement;
    }

    /**
     * Enhance form accessibility
     */
    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add required indicator
            if (input.hasAttribute('required')) {
                const label = form.querySelector(`label[for="${input.id}"]`);
                if (label && !label.textContent.includes('*')) {
                    label.innerHTML += ' <span aria-label="obrigatório">*</span>';
                }
                input.setAttribute('aria-required', 'true');
            }

            // Add error handling
            input.addEventListener('invalid', (e) => {
                const errorId = `${input.id}-error`;
                let errorElement = document.getElementById(errorId);
                
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.id = errorId;
                    errorElement.className = 'error-message';
                    errorElement.setAttribute('role', 'alert');
                    input.parentNode.appendChild(errorElement);
                }
                
                errorElement.textContent = input.validationMessage;
                input.setAttribute('aria-describedby', errorId);
                input.setAttribute('aria-invalid', 'true');
            });

            // Clear error on valid input
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.removeAttribute('aria-invalid');
                    const errorElement = document.getElementById(`${input.id}-error`);
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            });
        });
    }

    /**
     * Get accessibility status
     */
    getAccessibilityStatus() {
        return {
            keyboardNavigation: this.isKeyboardNavigation,
            focusTrap: !!this.focusTrap,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            highContrast: window.matchMedia('(prefers-contrast: high)').matches,
            screenReader: !!this.liveRegion
        };
    }
}

// Initialize accessibility manager
let accessibilityManager;

document.addEventListener('DOMContentLoaded', () => {
    accessibilityManager = new AccessibilityManager();
    
    // Make it globally available
    window.accessibilityManager = accessibilityManager;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AccessibilityManager };
}