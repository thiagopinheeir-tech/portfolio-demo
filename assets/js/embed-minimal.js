/**
 * Portfolio Demo System - Minimal Embed
 * Lightweight version for maximum performance with minimal features
 */

(function() {
    'use strict';
    
    // Minimal project configuration
    const DEFAULT_PROJECTS = {
        "acai-dany": {
            name: "Açaí da Dany",
            description: "Sistema de cardápio direto para WhatsApp",
            preview: "assets/images/project-previews/acai-dany.svg",
            demoPath: "./demos/acai-dany/"
        },
        "barbearia-raimundos": {
            name: "Barbearia Raimundos", 
            description: "Sistema de agendamento para barbearia",
            preview: "assets/images/project-previews/barbearia-raimundos.svg",
            demoPath: "./demos/barbearia-raimundos/"
        },
        "financas-pessoais": {
            name: "Finanças Pessoais",
            description: "Sistema de controle financeiro",
            preview: "assets/images/project-previews/financas-pessoais.svg",
            demoPath: "./demos/financas-pessoais/"
        },
        "whatsapp-bot-ai": {
            name: "WhatsApp Bot AI",
            description: "Bot inteligente para WhatsApp",
            preview: "assets/images/project-previews/whatsapp-bot-ai.svg",
            demoPath: "./demos/whatsapp-bot-ai/"
        },
        "landpage-divulga": {
            name: "Landing Page Divulga",
            description: "Landing page promocional",
            preview: "assets/images/project-previews/landpage-divulga.svg",
            demoPath: "./demos/landpage-divulga/"
        }
    };
    
    /**
     * Minimal Portfolio Embed
     */
    function MinimalPortfolioEmbed(options) {
        this.container = typeof options.container === 'string' 
            ? document.querySelector(options.container)
            : options.container;
            
        this.baseUrl = options.baseUrl || '';
        this.limit = options.limit || 0;
        this.projects = options.projects || Object.keys(DEFAULT_PROJECTS);
        this.openMode = options.openMode || 'newTab';
        
        if (!this.container) {
            console.error('Container not found');
            return;
        }
        
        this.render();
        this.setupEvents();
    }
    
    MinimalPortfolioEmbed.prototype.render = function() {
        const projectsToShow = this.getProjectsToShow();
        
        this.container.className = 'portfolio-minimal';
        this.container.innerHTML = projectsToShow.map(([key, project]) => 
            `<div class="project-card" data-project="${key}">
                <img src="${this.baseUrl}${project.preview}" alt="${project.name}" loading="lazy">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button>Ver Demo</button>
            </div>`
        ).join('');
    };
    
    MinimalPortfolioEmbed.prototype.getProjectsToShow = function() {
        let projects = Object.entries(DEFAULT_PROJECTS);
        
        if (this.projects.length > 0) {
            projects = projects.filter(([key]) => this.projects.includes(key));
        }
        
        if (this.limit > 0) {
            projects = projects.slice(0, this.limit);
        }
        
        return projects;
    };
    
    MinimalPortfolioEmbed.prototype.setupEvents = function() {
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('[data-project]');
            if (card) {
                const projectKey = card.dataset.project;
                const project = DEFAULT_PROJECTS[projectKey];
                
                if (project) {
                    const url = this.baseUrl + project.demoPath + 'index.html';
                    
                    if (this.openMode === 'newTab') {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });
    };
    
    // Auto-initialization
    document.addEventListener('DOMContentLoaded', function() {
        const elements = document.querySelectorAll('[data-portfolio-minimal]');
        
        elements.forEach(element => {
            new MinimalPortfolioEmbed({
                container: element,
                baseUrl: element.dataset.baseUrl || '',
                limit: parseInt(element.dataset.limit) || 0,
                projects: element.dataset.projects ? element.dataset.projects.split(',') : [],
                openMode: element.dataset.openMode || 'newTab'
            });
        });
    });
    
    // Export
    window.MinimalPortfolioEmbed = MinimalPortfolioEmbed;
    
})();

// Minimal CSS injection
(function() {
    const css = `
        .portfolio-minimal {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            font-family: system-ui, -apple-system, sans-serif;
        }
        
        .portfolio-minimal .project-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .portfolio-minimal .project-card:hover {
            transform: translateY(-4px);
        }
        
        .portfolio-minimal img {
            width: 100%;
            height: 160px;
            object-fit: cover;
            border-radius: 6px;
            margin-bottom: 1rem;
        }
        
        .portfolio-minimal h3 {
            margin: 0 0 0.5rem;
            font-size: 1.25rem;
            color: #1f2937;
        }
        
        .portfolio-minimal p {
            margin: 0 0 1rem;
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.4;
        }
        
        .portfolio-minimal button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.2s ease;
        }
        
        .portfolio-minimal button:hover {
            background: #1d4ed8;
        }
        
        @media (max-width: 768px) {
            .portfolio-minimal {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .portfolio-minimal .project-card {
                padding: 1rem;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();