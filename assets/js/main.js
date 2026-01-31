/**
 * Portfolio Demo System - Main JavaScript
 * Handles project configuration, gallery generation, and core functionality
 */

// Project Configuration
const projectConfig = {
    "acai-dany": {
        name: "Açaí da Dany",
        description: "Sistema de cardápio direto para WhatsApp com interface intuitiva e responsiva",
        sourcePath: "../acai da dany/",
        demoPath: "./demos/acai-dany/",
        entryPoint: "index.html",
        preview: "assets/images/project-previews/acai-dany.svg",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: ["Cardápio Digital", "Integração WhatsApp", "Responsive Design"]
    },
    "barbearia-raimundos": {
        name: "Barbearia Raimundos",
        description: "Sistema de agendamento para barbearia com interface moderna",
        sourcePath: "../Barbearia raimundos/",
        demoPath: "./demos/barbearia-raimundos/",
        entryPoint: "index.html",
        preview: "assets/images/project-previews/barbearia-raimundos.svg",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: ["Agendamento Online", "Interface Moderna", "Gestão de Horários"]
    },
    "financas-pessoais": {
        name: "Finanças Pessoais",
        description: "Sistema de controle financeiro com calculadora de empréstimos",
        sourcePath: "../financas pessoais/",
        demoPath: "./demos/financas-pessoais/",
        entryPoint: "index.html",
        preview: "assets/images/project-previews/financas-pessoais.svg",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: ["Calculadora de Empréstimos", "Controle Financeiro", "Relatórios"]
    },
    "whatsapp-bot-ai": {
        name: "WhatsApp Bot AI",
        description: "Bot inteligente para WhatsApp com interface de chat interativa",
        sourcePath: "../Whatsapp bot. AI/",
        demoPath: "./demos/whatsapp-bot-ai/",
        entryPoint: "index.html",
        preview: "assets/images/project-previews/whatsapp-bot-ai.svg",
        technologies: ["HTML", "CSS", "JavaScript", "AI"],
        features: ["Chat Bot", "Inteligência Artificial", "Interface WhatsApp"]
    },
    "landpage-divulga": {
        name: "Landing Page Divulga",
        description: "Landing page promocional com design moderno e conversão otimizada",
        sourcePath: "../landpage divulga/",
        demoPath: "./demos/landpage-divulga/",
        entryPoint: "index.html",
        preview: "assets/images/project-previews/landpage-divulga.svg",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: ["Landing Page", "Design Moderno", "Conversão Otimizada"]
    }
};

// Demo State Management
const demoState = {
    currentDemo: null,
    isModalOpen: false,
    isFullscreen: false,
    loadingState: 'idle', // 'idle', 'loading', 'loaded', 'error'
    projects: projectConfig
};

// DOM Elements
let elements = {};

/**
 * Initialize the portfolio system
 */
function initPortfolio() {
    // Cache DOM elements
    cacheElements();
    
    // Generate project gallery
    generateProjectGallery();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup accessibility features
    setupAccessibility();
    
    // Initialize file operations system
    initFileOperations();
    
    // Hide loading state
    hideLoadingState();
    
    console.log('Portfolio Demo System initialized successfully');
}

/**
 * Initialize file operations system
 */
function initFileOperations() {
    // Check if file operations are available
    if (typeof fileOperations !== 'undefined') {
        console.log('File operations system available');
        
        // Validate source projects integrity on startup
        setTimeout(() => {
            validateAllSourceProjects().then(results => {
                console.log('Source project validation completed:', results);
                
                // Check for any integrity issues
                const issues = results.filter(r => !r.isIntact);
                if (issues.length > 0) {
                    console.warn('Source integrity issues detected:', issues);
                }
            }).catch(error => {
                console.error('Source validation failed:', error);
            });
        }, 2000);
    } else {
        console.warn('File operations system not available');
    }
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements = {
        projectGallery: document.getElementById('projectGallery'),
        loadingState: document.getElementById('loadingState'),
        demoModal: document.getElementById('demoModal'),
        demoTitle: document.getElementById('demoTitle'),
        demoFrame: document.getElementById('demoFrame'),
        closeDemoBtn: document.getElementById('closeDemoBtn'),
        fullscreenBtn: document.getElementById('fullscreenBtn'),
        externalLink: document.getElementById('externalLink')
    };
}

/**
 * Generate project gallery cards dynamically with performance optimizations
 */
function generateProjectGallery() {
    if (!elements.projectGallery) {
        console.error('Project gallery element not found');
        return;
    }
    
    // Remove skeleton loading cards
    const skeletonCards = elements.projectGallery.querySelectorAll('.skeleton-card');
    skeletonCards.forEach(card => card.remove());
    
    // Show loading state
    if (window.loadingStateManager) {
        window.loadingStateManager.showLoading('gallery', 'Carregando projetos...');
    }
    
    // Generate cards with staggered animation
    const galleryHTML = Object.entries(projectConfig).map(([key, project], index) => {
        return createProjectCard(key, project, index);
    }).join('');
    
    elements.projectGallery.innerHTML = galleryHTML;
    
    // Setup lazy loading for project images
    if (window.imageOptimizer) {
        window.imageOptimizer.observeLazyImages();
    }
    
    // Add staggered fade-in animation
    const cards = elements.projectGallery.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Hide loading state
    setTimeout(() => {
        if (window.loadingStateManager) {
            window.loadingStateManager.hideLoading('gallery');
        }
    }, 500);
}

/**
 * Create individual project card HTML with performance optimizations
 */
function createProjectCard(projectKey, project, index = 0) {
    const technologiesHTML = project.technologies.map(tech => 
        `<span class="tech-tag" role="listitem">${tech}</span>`
    ).join('');
    
    // Determine if image should be loaded immediately (above the fold)
    const isAboveFold = index < 3;
    const imageAttributes = isAboveFold 
        ? `src="${project.preview}" data-critical="true"` 
        : `data-src="${project.preview}" loading="lazy" class="lazy-load"`;
    
    return `
        <div class="project-card fade-in" data-demo="${projectKey}" tabindex="0" role="button" aria-label="Abrir demo do ${project.name}">
            <div class="project-image">
                <img ${imageAttributes} alt="Preview do ${project.name}" onerror="this.src='assets/images/placeholder.jpg'">
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-technologies" role="list" aria-label="Tecnologias utilizadas">
                    ${technologiesHTML}
                </div>
                <button class="demo-btn" aria-label="Ver demonstração do ${project.name}">
                    <span>Ver Demo</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

/**
 * Setup event listeners for interactive elements
 */
function setupEventListeners() {
    // Project card clicks
    document.addEventListener('click', handleProjectCardClick);
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Modal controls
    if (elements.closeDemoBtn) {
        elements.closeDemoBtn.addEventListener('click', closeDemoModal);
    }
    
    if (elements.fullscreenBtn) {
        elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Modal backdrop click
    if (elements.demoModal) {
        elements.demoModal.addEventListener('click', handleModalBackdropClick);
    }
    
    // Escape key to close modal and arrow key navigation
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleModalKeyNavigation);
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
}

/**
 * Handle project card clicks
 */
function handleProjectCardClick(event) {
    const projectCard = event.target.closest('.project-card');
    if (!projectCard) return;
    
    const demoKey = projectCard.dataset.demo;
    if (demoKey && projectConfig[demoKey]) {
        openDemoModal(demoKey);
    }
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(event) {
    const projectCard = event.target.closest('.project-card');
    if (!projectCard) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const demoKey = projectCard.dataset.demo;
        if (demoKey && projectConfig[demoKey]) {
            openDemoModal(demoKey);
        }
    }
}

/**
 * Open demo modal
 */
function openDemoModal(demoKey) {
    const project = projectConfig[demoKey];
    if (!project) {
        console.error(`Project not found: ${demoKey}`);
        return;
    }
    
    // Update state
    demoState.currentDemo = demoKey;
    demoState.isModalOpen = true;
    demoState.loadingState = 'loading';
    
    // Update modal content
    if (elements.demoTitle) {
        elements.demoTitle.textContent = project.name;
    }
    
    if (elements.externalLink) {
        elements.externalLink.href = project.demoPath + project.entryPoint;
    }
    
    // Update navigation controls
    updateDemoNavigationControls();
    
    // Show modal with accessibility features
    if (elements.demoModal) {
        elements.demoModal.classList.add('active');
        elements.demoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    
    // Load demo in iframe
    loadDemoInIframe(project);
    
    // Focus management and accessibility
    trapFocus();
    
    // Announce to screen reader
    if (window.accessibilityManager) {
        window.accessibilityManager.announceToScreenReader(`Demo do ${project.name} aberto. Use Escape para fechar.`);
    }
    
    console.log(`Opened demo: ${project.name}`);
}

/**
 * Load demo in iframe with enhanced loading and error handling
 */
async function loadDemoInIframe(project) {
    if (!elements.demoFrame) return;
    
    try {
        // Show loading indicator
        showDemoLoadingState();
        
        // Track loading performance
        if (window.loadingStateManager) {
            window.loadingStateManager.showLoading('demo', `Carregando ${project.name}...`);
        }
        
        // Use the enhanced demo loader with timeout
        const loadPromise = loadDemoWithEnhancements(demoState.currentDemo);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Demo load timeout')), 10000);
        });
        
        await Promise.race([loadPromise, timeoutPromise]);
        
        // Hide loading indicator
        hideDemoLoadingState();
        
        // Hide global loading state
        if (window.loadingStateManager) {
            window.loadingStateManager.hideLoading('demo');
        }
        
        console.log(`Demo loaded successfully: ${project.name}`);
        
        // Track performance metrics
        if (window.performanceMonitor) {
            window.performanceMonitor.reportLoadComplete();
        }
        
    } catch (error) {
        // Hide loading indicator
        hideDemoLoadingState();
        
        // Hide global loading state
        if (window.loadingStateManager) {
            window.loadingStateManager.hideLoading('demo');
        }
        
        // Show error state
        showDemoErrorState(error.message);
        
        console.error(`Failed to load demo: ${project.name}`, error);
        
        // Report performance issue
        if (window.performanceMonitor) {
            window.performanceMonitor.reportPerformanceIssue('demo-load-error', 0, project.name);
        }
    }
}

/**
 * Close demo modal
 */
function closeDemoModal() {
    // Update state
    demoState.currentDemo = null;
    demoState.isModalOpen = false;
    demoState.isFullscreen = false;
    demoState.loadingState = 'idle';
    
    // Hide modal with accessibility features
    if (elements.demoModal) {
        elements.demoModal.classList.remove('active');
        elements.demoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    
    // Clear iframe
    if (elements.demoFrame) {
        elements.demoFrame.src = '';
    }
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
    // Return focus to the project card
    returnFocus();
    
    // Announce to screen reader
    if (window.accessibilityManager) {
        window.accessibilityManager.announceToScreenReader('Demo fechado');
    }
    
    console.log('Demo modal closed');
}

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
    if (!elements.demoModal) return;
    
    if (!document.fullscreenElement) {
        elements.demoModal.requestFullscreen().then(() => {
            demoState.isFullscreen = true;
            elements.fullscreenBtn.textContent = 'Sair da Tela Cheia';
        }).catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            demoState.isFullscreen = false;
            elements.fullscreenBtn.textContent = 'Tela Cheia';
        });
    }
}

/**
 * Handle modal backdrop clicks
 */
function handleModalBackdropClick(event) {
    if (event.target === elements.demoModal) {
        closeDemoModal();
    }
}

/**
 * Handle escape key press
 */
function handleEscapeKey(event) {
    if (event.key === 'Escape' && demoState.isModalOpen) {
        closeDemoModal();
    }
}

/**
 * Handle window resize
 */
function handleWindowResize() {
    // Adjust modal sizing if needed
    if (demoState.isModalOpen && elements.demoModal) {
        // Modal responsive adjustments handled by CSS
        console.log('Window resized, modal adjusted');
    }
}

/**
 * Setup accessibility features
 */
function setupAccessibility() {
    // Add ARIA labels and roles
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.setAttribute('aria-describedby', `project-desc-${index}`);
        
        // Add description ID to project description
        const description = card.querySelector('.project-info p');
        if (description) {
            description.id = `project-desc-${index}`;
        }
        
        // Add role and ARIA attributes for technology list
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
    
    // Setup focus trap for modal
    if (elements.demoModal) {
        elements.demoModal.setAttribute('role', 'dialog');
        elements.demoModal.setAttribute('aria-modal', 'true');
        elements.demoModal.setAttribute('aria-hidden', 'true');
    }
    
    // Add skip link functionality
    addSkipLinks();
    
    // Setup keyboard navigation helpers
    setupKeyboardNavigationHelpers();
}

/**
 * Trap focus within modal
 */
function trapFocus() {
    const focusableElements = elements.demoModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

/**
 * Update demo navigation controls
 */
function updateDemoNavigationControls() {
    const projectKeys = Object.keys(projectConfig);
    const currentIndex = projectKeys.indexOf(demoState.currentDemo);
    
    // Remove existing navigation controls
    const existingNav = document.getElementById('demoNavControls');
    if (existingNav) {
        existingNav.remove();
    }
    
    // Create navigation controls
    const navControls = document.createElement('div');
    navControls.id = 'demoNavControls';
    navControls.className = 'demo-nav-controls';
    
    const prevProject = currentIndex > 0 ? projectKeys[currentIndex - 1] : null;
    const nextProject = currentIndex < projectKeys.length - 1 ? projectKeys[currentIndex + 1] : null;
    
    navControls.innerHTML = `
        <button class="nav-btn prev-btn" ${!prevProject ? 'disabled' : ''} 
                onclick="navigateToDemo('${prevProject}')" 
                aria-label="Demo anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
            ${prevProject ? 'Anterior' : ''}
        </button>
        
        <span class="demo-counter">${currentIndex + 1} de ${projectKeys.length}</span>
        
        <button class="nav-btn next-btn" ${!nextProject ? 'disabled' : ''} 
                onclick="navigateToDemo('${nextProject}')" 
                aria-label="Próximo demo">
            ${nextProject ? 'Próximo' : ''}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
    `;
    
    // Insert navigation controls into demo footer
    const demoFooter = elements.demoModal.querySelector('.demo-footer');
    if (demoFooter) {
        demoFooter.insertBefore(navControls, demoFooter.firstChild);
    }
}

/**
 * Navigate to a different demo
 */
async function navigateToDemo(projectKey) {
    if (!projectKey || projectKey === demoState.currentDemo) return;
    
    // Clear current iframe
    if (elements.demoFrame) {
        elements.demoFrame.src = '';
    }
    
    // Hide any error states
    hideDemoErrorState();
    
    // Update state and UI
    demoState.currentDemo = projectKey;
    const project = projectConfig[projectKey];
    
    if (elements.demoTitle) {
        elements.demoTitle.textContent = project.name;
    }
    
    if (elements.externalLink) {
        elements.externalLink.href = project.demoPath + project.entryPoint;
    }
    
    // Update navigation controls
    updateDemoNavigationControls();
    
    // Load new demo
    await loadDemoInIframe(project);
    
    console.log(`Navigated to demo: ${project.name}`);
}

/**
 * Hide loading state
 */
function hideLoadingState() {
    if (elements.loadingState) {
        elements.loadingState.classList.add('hidden');
    }
}

/**
 * Show demo loading state
 */
function showDemoLoadingState() {
    if (!elements.demoFrame) return;
    
    // Create loading overlay if it doesn't exist
    let loadingOverlay = document.getElementById('demoLoadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'demoLoadingOverlay';
        loadingOverlay.className = 'demo-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="demo-loading-content">
                <div class="spinner"></div>
                <p>Carregando demonstração...</p>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        // Insert overlay into demo content
        const demoContent = elements.demoFrame.parentElement;
        demoContent.appendChild(loadingOverlay);
    }
    
    loadingOverlay.style.display = 'flex';
    demoState.loadingState = 'loading';
}

/**
 * Hide demo loading state
 */
function hideDemoLoadingState() {
    const loadingOverlay = document.getElementById('demoLoadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
    demoState.loadingState = 'loaded';
}

/**
 * Show demo error state
 */
function showDemoErrorState(errorMessage) {
    if (!elements.demoFrame) return;
    
    // Create error overlay if it doesn't exist
    let errorOverlay = document.getElementById('demoErrorOverlay');
    if (!errorOverlay) {
        errorOverlay = document.createElement('div');
        errorOverlay.id = 'demoErrorOverlay';
        errorOverlay.className = 'demo-error-overlay';
        
        const demoContent = elements.demoFrame.parentElement;
        demoContent.appendChild(errorOverlay);
    }
    
    errorOverlay.innerHTML = `
        <div class="demo-error-content">
            <div class="error-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            </div>
            <h3>Erro ao Carregar Demo</h3>
            <p>${errorMessage}</p>
            <div class="error-actions">
                <button class="btn btn-primary" onclick="retryDemoLoad()">Tentar Novamente</button>
                <button class="btn btn-secondary" onclick="closeDemoModal()">Fechar</button>
            </div>
        </div>
    `;
    
    errorOverlay.style.display = 'flex';
    demoState.loadingState = 'error';
}

/**
 * Hide demo error state
 */
function hideDemoErrorState() {
    const errorOverlay = document.getElementById('demoErrorOverlay');
    if (errorOverlay) {
        errorOverlay.style.display = 'none';
    }
}

/**
 * Retry demo loading
 */
async function retryDemoLoad() {
    if (!demoState.currentDemo) return;
    
    hideDemoErrorState();
    const project = projectConfig[demoState.currentDemo];
    if (project) {
        await loadDemoInIframe(project);
    }
}

/**
 * Return focus to previously focused element
 */
function returnFocus() {
    const currentDemoCard = document.querySelector(`[data-demo="${demoState.currentDemo}"]`);
    if (currentDemoCard) {
        currentDemoCard.focus();
    }
}

/**
 * Add skip links functionality
 */
function addSkipLinks() {
    // Skip links are added by the accessibility manager
    // This function ensures they work properly with the portfolio
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.addEventListener('focus', () => {
            if (window.accessibilityManager) {
                window.accessibilityManager.announceToScreenReader('Navegando para o conteúdo principal');
            }
        });
    }
}

/**
 * Setup keyboard navigation helpers
 */
function setupKeyboardNavigationHelpers() {
    // Add arrow key navigation between project cards
    document.addEventListener('keydown', (e) => {
        if (demoState.isModalOpen) return; // Skip if modal is open
        
        const focusedCard = document.activeElement;
        if (!focusedCard || !focusedCard.classList.contains('project-card')) return;
        
        const cards = Array.from(document.querySelectorAll('.project-card'));
        const currentIndex = cards.indexOf(focusedCard);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'Home') {
            nextIndex = 0;
        } else if (e.key === 'End') {
            nextIndex = cards.length - 1;
        }
        
        if (nextIndex !== undefined && nextIndex !== currentIndex) {
            e.preventDefault();
            cards[nextIndex].focus();
            
            const projectName = cards[nextIndex].querySelector('h3')?.textContent || `Projeto ${nextIndex + 1}`;
            if (window.accessibilityManager) {
                window.accessibilityManager.announceToScreenReader(`Navegando para ${projectName}`);
            }
        }
    });
}
    if (!demoState.isModalOpen) return;
    
    const projectKeys = Object.keys(projectConfig);
    const currentIndex = projectKeys.indexOf(demoState.currentDemo);
    
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            if (currentIndex > 0) {
                navigateToDemo(projectKeys[currentIndex - 1]);
            }
            break;
            
        case 'ArrowRight':
            event.preventDefault();
            if (currentIndex < projectKeys.length - 1) {
                navigateToDemo(projectKeys[currentIndex + 1]);
            }
            break;
            
        case 'Home':
            event.preventDefault();
            if (currentIndex > 0) {
                navigateToDemo(projectKeys[0]);
            }
            break;
            
        case 'End':
            event.preventDefault();
            if (currentIndex < projectKeys.length - 1) {
                navigateToDemo(projectKeys[projectKeys.length - 1]);
            }
            break;
    }
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', initPortfolio);

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projectConfig,
        demoState,
        initPortfolio,
        openDemoModal,
        closeDemoModal
    };
}