// TTECH Landing Page JavaScript - Adapted from React to Static HTML
// Preserves original functionality with enhanced demo features

class TTechLandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupScrollEffects();
        this.logDemoInfo();
    }

    setupEventListeners() {
        // Form submission handler
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // WhatsApp button analytics (demo)
        const whatsappButton = document.querySelector('.whatsapp-float');
        if (whatsappButton) {
            whatsappButton.addEventListener('click', this.handleWhatsAppClick.bind(this));
        }

        // CTA button analytics (demo)
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', this.handleCTAClick.bind(this));
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const name = formData.get('name') || event.target.querySelector('input[type="text"]')?.value;
        const email = formData.get('email') || event.target.querySelector('input[type="email"]')?.value;
        const phone = formData.get('phone') || event.target.querySelector('input[type="tel"]')?.value;
        const message = formData.get('message') || event.target.querySelector('textarea')?.value;
        
        // Enhanced demo simulation with realistic lead scoring
        this.showFormSubmissionDemo(name, email, phone, message);
        
        // Reset form with animation
        setTimeout(() => {
            event.target.reset();
            this.showSuccessMessage('Formulário resetado para demonstração');
        }, 3000);
    }

    showFormSubmissionDemo(name, email, phone, message) {
        const leadScore = this.calculateLeadScore(name, email, phone, message);
        const leadId = 'LEAD-' + Date.now().toString().slice(-6);
        
        const demoData = {
            id: leadId,
            timestamp: new Date().toLocaleString('pt-BR'),
            name: name,
            email: email,
            phone: phone,
            message: message,
            leadScore: leadScore,
            source: 'Landing Page Demo',
            priority: leadScore > 75 ? 'Alta' : leadScore > 50 ? 'Média' : 'Baixa',
            estimatedValue: this.estimateProjectValue(message),
            followUpDate: this.calculateFollowUpDate(leadScore)
        };

        this.showLeadModal(demoData);
        
        // Log for demo purposes
        console.log('TTECH Demo - Lead Captured:', demoData);
        
        // Add to mock CRM
        this.addToMockCRM(demoData);
    }

    calculateLeadScore(name, email, phone, message) {
        let score = 30; // Base score
        
        // Name quality
        if (name && name.length > 5) score += 10;
        if (name && name.includes(' ')) score += 5; // Full name
        
        // Email quality
        if (email && email.includes('@')) score += 15;
        if (email && (email.includes('.com') || email.includes('.com.br'))) score += 5;
        
        // Phone presence
        if (phone && phone.length > 8) score += 10;
        
        // Message quality and intent
        if (message) {
            score += Math.min(20, message.length / 10); // Up to 20 points for message length
            
            // High-intent keywords
            const highIntentKeywords = ['urgente', 'preciso', 'orçamento', 'projeto', 'sistema', 'site', 'desenvolver'];
            const mediumIntentKeywords = ['interessado', 'gostaria', 'informações', 'dúvida'];
            
            highIntentKeywords.forEach(keyword => {
                if (message.toLowerCase().includes(keyword)) score += 15;
            });
            
            mediumIntentKeywords.forEach(keyword => {
                if (message.toLowerCase().includes(keyword)) score += 8;
            });
        }
        
        return Math.min(100, score);
    }

    estimateProjectValue(message) {
        if (!message) return 'R$ 2.000 - R$ 5.000';
        
        const msg = message.toLowerCase();
        
        if (msg.includes('sistema') || msg.includes('plataforma') || msg.includes('app')) {
            return 'R$ 8.000 - R$ 25.000';
        }
        
        if (msg.includes('site') || msg.includes('landing') || msg.includes('página')) {
            return 'R$ 3.000 - R$ 8.000';
        }
        
        if (msg.includes('automação') || msg.includes('bot') || msg.includes('ia')) {
            return 'R$ 5.000 - R$ 15.000';
        }
        
        return 'R$ 2.000 - R$ 8.000';
    }

    calculateFollowUpDate(leadScore) {
        const now = new Date();
        let daysToAdd = 7; // Default 7 days
        
        if (leadScore > 75) daysToAdd = 1; // High priority: 1 day
        else if (leadScore > 50) daysToAdd = 3; // Medium priority: 3 days
        
        now.setDate(now.getDate() + daysToAdd);
        return now.toLocaleDateString('pt-BR');
    }

    showLeadModal(leadData) {
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 700px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #0ea5e9; margin-bottom: 10px;">🚀 TTECH - DEMO</h2>
                        <p style="color: #666; font-size: 0.9rem;">Sistema de Captura e Análise de Leads</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                            <h3 style="color: #333; margin-bottom: 15px; font-size: 1.1rem;">📋 Dados do Lead</h3>
                            <div style="display: grid; gap: 8px; font-size: 0.9rem;">
                                <p><strong>ID:</strong> ${leadData.id}</p>
                                <p><strong>Nome:</strong> ${leadData.name}</p>
                                <p><strong>E-mail:</strong> ${leadData.email}</p>
                                <p><strong>Telefone:</strong> ${leadData.phone}</p>
                                <p><strong>Data:</strong> ${leadData.timestamp}</p>
                            </div>
                        </div>
                        
                        <div style="background: #f0f9ff; padding: 20px; border-radius: 10px;">
                            <h3 style="color: #0369a1; margin-bottom: 15px; font-size: 1.1rem;">📊 Análise Automática</h3>
                            <div style="display: grid; gap: 8px; font-size: 0.9rem;">
                                <p><strong>Lead Score:</strong> <span style="color: ${leadData.leadScore > 75 ? '#10b981' : leadData.leadScore > 50 ? '#f59e0b' : '#ef4444'}; font-weight: bold;">${leadData.leadScore}/100</span></p>
                                <p><strong>Prioridade:</strong> <span style="color: ${leadData.priority === 'Alta' ? '#ef4444' : leadData.priority === 'Média' ? '#f59e0b' : '#6b7280'}; font-weight: bold;">${leadData.priority}</span></p>
                                <p><strong>Valor Estimado:</strong> ${leadData.estimatedValue}</p>
                                <p><strong>Follow-up:</strong> ${leadData.followUpDate}</p>
                                <p><strong>Fonte:</strong> ${leadData.source}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 10px;">💬 Mensagem do Cliente:</h4>
                        <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9; font-style: italic; color: #555;">
                            "${leadData.message}"
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                        <h3 style="color: #065f46; margin-bottom: 10px; font-size: 1.1rem;">✅ Lead Processado com Sucesso!</h3>
                        <p style="color: #047857; margin-bottom: 15px;">Sistema de CRM atualizado automaticamente.</p>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <h4 style="color: #065f46; margin-bottom: 10px; font-size: 1rem;">🔧 Em um sistema real:</h4>
                            <ul style="color: #047857; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                                <li>Notificação automática para equipe de vendas</li>
                                <li>E-mail de confirmação enviado para o cliente</li>
                                <li>Agendamento automático de follow-up</li>
                                <li>Integração com CRM/WhatsApp/Slack</li>
                                <li>Análise de comportamento no site</li>
                                <li>Segmentação automática por interesse</li>
                                <li>Nutrição de leads por e-mail marketing</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #0ea5e9; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Fechar Demo
                        </button>
                        <button onclick="window.ttechDemo.showCRMDemo('${leadData.id}'); this.closest('.demo-modal-overlay').remove();" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Ver no CRM
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    addToMockCRM(leadData) {
        // Add to mock CRM database
        if (!window.mockCRM) {
            window.mockCRM = {
                leads: [],
                totalLeads: 0,
                conversionRate: 23.5,
                averageValue: 8500
            };
        }
        
        window.mockCRM.leads.unshift(leadData);
        window.mockCRM.totalLeads++;
        
        console.log('TTECH Demo - Lead adicionado ao CRM:', leadData.id);
    }

    showCRMDemo(leadId) {
        const lead = window.mockCRM?.leads.find(l => l.id === leadId);
        if (!lead) return;
        
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 800px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #0ea5e9; margin-bottom: 10px;">📊 CRM Dashboard - TTECH</h2>
                        <p style="color: #666; font-size: 0.9rem;">Gestão de Leads e Oportunidades</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold;">${window.mockCRM.totalLeads}</div>
                            <div style="font-size: 0.8rem; opacity: 0.9;">Total Leads</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold;">${window.mockCRM.conversionRate}%</div>
                            <div style="font-size: 0.8rem; opacity: 0.9;">Conversão</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold;">R$ ${window.mockCRM.averageValue.toLocaleString()}</div>
                            <div style="font-size: 0.8rem; opacity: 0.9;">Ticket Médio</div>
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px;">🎯 Lead Selecionado: ${lead.id}</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h4 style="color: #555; margin-bottom: 10px;">Informações Básicas</h4>
                                <p><strong>Nome:</strong> ${lead.name}</p>
                                <p><strong>E-mail:</strong> ${lead.email}</p>
                                <p><strong>Telefone:</strong> ${lead.phone}</p>
                                <p><strong>Data:</strong> ${lead.timestamp}</p>
                            </div>
                            <div>
                                <h4 style="color: #555; margin-bottom: 10px;">Análise e Status</h4>
                                <p><strong>Score:</strong> <span style="color: ${lead.leadScore > 75 ? '#10b981' : '#f59e0b'};">${lead.leadScore}/100</span></p>
                                <p><strong>Prioridade:</strong> ${lead.priority}</p>
                                <p><strong>Valor Est.:</strong> ${lead.estimatedValue}</p>
                                <p><strong>Follow-up:</strong> ${lead.followUpDate}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Fechar CRM
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    handleSmoothScroll(event) {
        event.preventDefault();
        const target = document.querySelector(event.target.getAttribute('href'));
        if (target) {
            const headerOffset = 130; // Account for fixed headers
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Analytics simulation
            this.trackNavigation(event.target.getAttribute('href'));
        }
    }

    handleWhatsAppClick(event) {
        // Demo analytics
        console.log('TTECH Demo - WhatsApp button clicked');
        this.showAnalyticsDemo('WhatsApp Click', 'High Intent Action');
    }

    handleCTAClick(event) {
        const buttonText = event.target.textContent.trim();
        console.log(`TTECH Demo - CTA clicked: ${buttonText}`);
        this.showAnalyticsDemo('CTA Click', buttonText);
    }

    trackNavigation(section) {
        console.log(`TTECH Demo - Navigation to: ${section}`);
    }

    showAnalyticsDemo(action, details) {
        // Simulate real-time analytics
        const analyticsData = {
            action: action,
            details: details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            referrer: document.referrer || 'Direct'
        };

        console.log('TTECH Demo - Analytics Event:', analyticsData);
    }

    setupScrollEffects() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(5, 8, 22, 0.95)';
            } else {
                header.style.background = 'rgba(5, 8, 22, 0.8)';
            }
        });

        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.service-card, .project-card, .testimonial, .pricing-card, .stat-item'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        // Counter animation for stats
        this.animateCounters();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-value');
        const speed = 200; // Animation speed

        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const count = parseInt(counter.getAttribute('data-count') || '0');
                const increment = target / speed;

                if (count < target) {
                    counter.setAttribute('data-count', Math.ceil(count + increment));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    counter.textContent = Math.ceil(count + increment) + suffix;
                    setTimeout(updateCount, 1);
                } else {
                    const suffix = counter.textContent.replace(/\d/g, '');
                    counter.textContent = target + suffix;
                }
            };

            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        updateCount();
                    }
                });
            });

            observer.observe(counter);
        });
    }

    showSuccessMessage(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4ade80, #0ea5e9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    logDemoInfo() {
        console.log(`
🚀 TTECH Landing Page Demo Loaded Successfully

📋 Demo Features:
• Fully responsive design adapted from React
• Interactive form with realistic submission simulation
• Smooth scrolling navigation
• Scroll-triggered animations
• Real-time analytics simulation
• WhatsApp integration demo
• Modern glassmorphism design system
• Advanced lead scoring system
• Mock CRM integration

🎯 Original Project Info:
• Source: React + TypeScript + Tailwind CSS
• Adapted to: Static HTML + CSS + Vanilla JS
• Preserved: All original functionality and design
• Enhanced: Demo-specific features and analytics

💡 This demo showcases the complete TTECH landing page
   with all interactive elements working as intended.
        `);
        
        // Initialize mock data system
        this.initializeMockDataSystem();
    }

    initializeMockDataSystem() {
        // Add enhanced mock data to window
        window.ttechDemo = this;
        window.mockCRM = {
            leads: [],
            totalLeads: 0,
            conversionRate: 23.5,
            averageValue: 8500,
            monthlyLeads: 47,
            qualifiedLeads: 32
        };
        
        // Register with state reset system if available
        if (window.stateResetSystem) {
            window.stateResetSystem.registerDemo('landpage-divulga', () => {
                this.resetDemoState();
            });
        }
        
        // Setup enhanced analytics
        this.setupAnalytics();
        
        console.log('🎯 TTECH Mock Data System initialized successfully!');
    }

    setupAnalytics() {
        // Mock analytics data
        this.analytics = {
            pageViews: 1247,
            uniqueVisitors: 892,
            bounceRate: 34.2,
            averageSessionTime: '3:42',
            conversionRate: 4.8,
            topSources: [
                { source: 'Google Orgânico', visitors: 456, percentage: 51.2 },
                { source: 'Facebook Ads', visitors: 234, percentage: 26.2 },
                { source: 'Instagram', visitors: 123, percentage: 13.8 },
                { source: 'Direto', visitors: 79, percentage: 8.8 }
            ],
            deviceBreakdown: {
                mobile: 58.3,
                desktop: 32.1,
                tablet: 9.6
            }
        };
        
        // Simulate real-time updates
        setInterval(() => {
            this.updateAnalytics();
        }, 30000); // Every 30 seconds
    }

    updateAnalytics() {
        if (Math.random() > 0.7) { // 30% chance
            this.analytics.pageViews += Math.floor(Math.random() * 5) + 1;
            this.analytics.uniqueVisitors += Math.floor(Math.random() * 3);
            
            console.log('TTECH Demo - Analytics updated:', {
                pageViews: this.analytics.pageViews,
                uniqueVisitors: this.analytics.uniqueVisitors
            });
        }
    }

    // Enhanced public API
    getAnalytics() {
        return this.analytics;
    }

    getCRMData() {
        return window.mockCRM;
    }

    simulateConversion() {
        const mockLead = {
            id: 'LEAD-' + Date.now().toString().slice(-6),
            name: 'Cliente Simulado',
            email: 'cliente@email.com',
            phone: '(11) 99999-9999',
            message: 'Interessado em desenvolvimento de sistema',
            leadScore: 85,
            source: 'Simulação',
            timestamp: new Date().toLocaleString('pt-BR'),
            priority: 'Alta',
            estimatedValue: 'R$ 12.000 - R$ 20.000',
            followUpDate: new Date(Date.now() + 86400000).toLocaleDateString('pt-BR')
        };
        
        this.addToMockCRM(mockLead);
        this.showLeadModal(mockLead);
    }

    // State reset functionality
    resetDemoState() {
        // Reset CRM data
        if (window.mockCRM) {
            window.mockCRM.leads = [];
            window.mockCRM.totalLeads = 0;
            window.mockCRM.conversionRate = 23.5;
            window.mockCRM.averageValue = 8500;
            window.mockCRM.monthlyLeads = 47;
            window.mockCRM.qualifiedLeads = 32;
        }
        
        // Reset analytics to initial values
        if (this.analytics) {
            this.analytics.pageViews = 1247;
            this.analytics.uniqueVisitors = 892;
            this.analytics.bounceRate = 34.2;
            this.analytics.averageSessionTime = '3:42';
            this.analytics.conversionRate = 4.8;
        }
        
        // Reset all forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.reset();
        });
        
        // Remove any modals or notifications
        document.querySelectorAll('.demo-modal-overlay').forEach(modal => modal.remove());
        
        // Reset scroll position
        window.scrollTo(0, 0);
        
        console.log('🚀 TTECH Landing Page demo state reset completed');
    }
}

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TTechLandingPage();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TTechLandingPage;
}

// Demo System Integration
class DemoSystem {
    constructor() {
        this.currentDemo = null;
        this.isFullscreen = false;
        this.demoConfig = {
            'acai-dany': {
                name: 'Açaí da Dany',
                url: 'demos/acai-dany/index.html',
                description: 'Sistema de cardápio digital com integração WhatsApp'
            },
            'barbearia-raimundos': {
                name: 'Barbearia Raimundos',
                url: 'demos/barbearia-raimundos/index.html',
                description: 'Sistema de agendamento online para barbearia'
            },
            'financas-pessoais': {
                name: 'Finanças Pessoais',
                url: 'demos/financas-pessoais/index.html',
                description: 'Calculadora de empréstimos e controle financeiro'
            },
            'whatsapp-bot-ai': {
                name: 'WhatsApp Bot AI',
                url: 'demos/whatsapp-bot-ai/index.html',
                description: 'Chatbot inteligente com IA para atendimento'
            },
            'portfolio-gallery': {
                name: 'Portfolio Gallery',
                url: 'portfolio-gallery.html',
                description: 'Sistema completo de portfolio com galeria interativa'
            }
        };
        
        this.setupDemoSystem();
    }
    
    setupDemoSystem() {
        // Create demo modal if it doesn't exist
        if (!document.getElementById('demoModal')) {
            this.createDemoModal();
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('🎯 Demo System initialized with', Object.keys(this.demoConfig).length, 'demos');
    }
    
    createDemoModal() {
        const modalHtml = `
            <div class="demo-modal" id="demoModal">
                <div class="demo-container">
                    <div class="demo-header">
                        <h3 id="demoTitle">Demo do Projeto</h3>
                        <div class="demo-controls">
                            <button class="demo-control-btn" onclick="demoSystem.openDemoExternal()" title="Abrir em nova aba">
                                🔗
                            </button>
                            <button class="demo-control-btn" onclick="demoSystem.toggleFullscreen()" title="Tela cheia">
                                ⛶
                            </button>
                            <button class="demo-close-btn" onclick="demoSystem.closeDemo()">
                                ✕
                            </button>
                        </div>
                    </div>
                    <div class="demo-content">
                        <div class="demo-loading">
                            <div class="loading-spinner"></div>
                            <p>Carregando demo...</p>
                        </div>
                        <iframe id="demoFrame" src="" frameborder="0"></iframe>
                    </div>
                    <div class="demo-footer">
                        <div class="demo-info">
                            <span class="demo-label">🎯 DEMO INTERATIVO</span>
                            <span class="demo-description">Teste todas as funcionalidades</span>
                        </div>
                        <button class="btn-secondary" onclick="demoSystem.closeDemo()">
                            ← Voltar ao Portfolio
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    
    setupEventListeners() {
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentDemo) {
                this.closeDemo();
            }
        });
        
        // Close modal on backdrop click
        const modal = document.getElementById('demoModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeDemo();
                }
            });
        }
    }
    
    openDemo(demoKey) {
        const demo = this.demoConfig[demoKey];
        if (!demo) {
            console.error('Demo not found:', demoKey);
            return;
        }
        
        this.currentDemo = demoKey;
        const modal = document.getElementById('demoModal');
        const title = document.getElementById('demoTitle');
        const frame = document.getElementById('demoFrame');
        const loading = document.querySelector('.demo-loading');
        
        // Update modal content
        title.textContent = demo.name;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Show loading
        loading.style.display = 'block';
        frame.style.display = 'none';
        
        // Load demo
        frame.src = demo.url;
        
        // Handle iframe load
        frame.onload = () => {
            loading.style.display = 'none';
            frame.style.display = 'block';
        };
        
        // Analytics
        this.trackDemoOpen(demoKey);
        
        console.log('🎯 Demo opened:', demo.name);
    }
    
    closeDemo() {
        const modal = document.getElementById('demoModal');
        const frame = document.getElementById('demoFrame');
        
        // Hide modal
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear iframe
        frame.src = '';
        
        // Reset fullscreen
        if (this.isFullscreen) {
            modal.classList.remove('fullscreen');
            this.isFullscreen = false;
        }
        
        // Analytics
        if (this.currentDemo) {
            this.trackDemoClose(this.currentDemo);
        }
        
        this.currentDemo = null;
        
        console.log('🎯 Demo closed');
    }
    
    openDemoExternal() {
        if (!this.currentDemo) return;
        
        const demo = this.demoConfig[this.currentDemo];
        const fullUrl = new URL(demo.url, window.location.href).href;
        
        window.open(fullUrl, '_blank');
        
        // Analytics
        this.trackDemoExternal(this.currentDemo);
        
        console.log('🎯 Demo opened externally:', demo.name);
    }
    
    toggleFullscreen() {
        const modal = document.getElementById('demoModal');
        
        this.isFullscreen = !this.isFullscreen;
        
        if (this.isFullscreen) {
            modal.classList.add('fullscreen');
        } else {
            modal.classList.remove('fullscreen');
        }
        
        console.log('🎯 Demo fullscreen:', this.isFullscreen);
    }
    
    trackDemoOpen(demoKey) {
        const demo = this.demoConfig[demoKey];
        const analyticsData = {
            event: 'demo_opened',
            demo: demoKey,
            demo_name: demo.name,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        };
        
        console.log('📊 Analytics - Demo Opened:', analyticsData);
        
        // In a real system, this would send to analytics service
        if (window.gtag) {
            window.gtag('event', 'demo_opened', {
                demo_name: demo.name,
                demo_key: demoKey
            });
        }
    }
    
    trackDemoClose(demoKey) {
        const demo = this.demoConfig[demoKey];
        const analyticsData = {
            event: 'demo_closed',
            demo: demoKey,
            demo_name: demo.name,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Analytics - Demo Closed:', analyticsData);
    }
    
    trackDemoExternal(demoKey) {
        const demo = this.demoConfig[demoKey];
        const analyticsData = {
            event: 'demo_external',
            demo: demoKey,
            demo_name: demo.name,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Analytics - Demo External:', analyticsData);
    }
    
    // Public API
    getDemoConfig() {
        return this.demoConfig;
    }
    
    getCurrentDemo() {
        return this.currentDemo;
    }
    
    isModalOpen() {
        return !!this.currentDemo;
    }
}

// Global functions for HTML onclick handlers
function openDemo(demoKey) {
    if (window.demoSystem) {
        window.demoSystem.openDemo(demoKey);
    }
}

function closeDemo() {
    if (window.demoSystem) {
        window.demoSystem.closeDemo();
    }
}

function openDemoExternal() {
    if (window.demoSystem) {
        window.demoSystem.openDemoExternal();
    }
}

function toggleFullscreen() {
    if (window.demoSystem) {
        window.demoSystem.toggleFullscreen();
    }
}

// Initialize demo system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.demoSystem = new DemoSystem();
});

// Enhanced form submission with demo integration
function submitForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = event.target.querySelector('input[type="text"]')?.value || '';
    const email = event.target.querySelector('input[type="email"]')?.value || '';
    const phone = event.target.querySelector('input[type="tel"]')?.value || '';
    const message = event.target.querySelector('textarea')?.value || '';
    
    // Enhanced demo with portfolio context
    const leadData = {
        id: 'LEAD-' + Date.now().toString().slice(-6),
        timestamp: new Date().toLocaleString('pt-BR'),
        name: name,
        email: email,
        phone: phone,
        message: message,
        source: 'Portfolio Landing Page',
        page: 'Landing Page Divulga',
        referrer: document.referrer || 'Direct',
        demos_viewed: window.demoSystem ? Object.keys(window.demoSystem.getDemoConfig()).filter(key => 
            document.querySelector(`[data-demo="${key}"]`)?.classList.contains('viewed')
        ) : [],
        current_demo: window.demoSystem ? window.demoSystem.getCurrentDemo() : null
    };
    
    // Calculate enhanced lead score
    leadData.leadScore = calculateEnhancedLeadScore(leadData);
    leadData.priority = leadData.leadScore > 75 ? 'Alta' : leadData.leadScore > 50 ? 'Média' : 'Baixa';
    leadData.estimatedValue = estimateProjectValue(message);
    leadData.followUpDate = calculateFollowUpDate(leadData.leadScore);
    
    // Show enhanced lead modal
    showEnhancedLeadModal(leadData);
    
    // Reset form
    setTimeout(() => {
        event.target.reset();
        showSuccessMessage('Formulário resetado para demonstração');
    }, 3000);
    
    return false;
}

function calculateEnhancedLeadScore(leadData) {
    let score = 30; // Base score
    
    // Name quality
    if (leadData.name && leadData.name.length > 5) score += 10;
    if (leadData.name && leadData.name.includes(' ')) score += 5;
    
    // Email quality
    if (leadData.email && leadData.email.includes('@')) score += 15;
    if (leadData.email && (leadData.email.includes('.com') || leadData.email.includes('.com.br'))) score += 5;
    
    // Phone presence
    if (leadData.phone && leadData.phone.length > 8) score += 10;
    
    // Message quality
    if (leadData.message) {
        score += Math.min(20, leadData.message.length / 10);
        
        // High-intent keywords
        const highIntentKeywords = ['urgente', 'preciso', 'orçamento', 'projeto', 'sistema', 'site', 'desenvolver'];
        const mediumIntentKeywords = ['interessado', 'gostaria', 'informações', 'dúvida'];
        
        highIntentKeywords.forEach(keyword => {
            if (leadData.message.toLowerCase().includes(keyword)) score += 15;
        });
        
        mediumIntentKeywords.forEach(keyword => {
            if (leadData.message.toLowerCase().includes(keyword)) score += 8;
        });
    }
    
    // Demo engagement bonus
    if (leadData.demos_viewed && leadData.demos_viewed.length > 0) {
        score += leadData.demos_viewed.length * 5; // 5 points per demo viewed
    }
    
    if (leadData.current_demo) {
        score += 10; // Bonus for submitting form while viewing demo
    }
    
    // Source quality
    if (leadData.referrer && !leadData.referrer.includes(window.location.hostname)) {
        score += 5; // External referrer bonus
    }
    
    return Math.min(100, score);
}

function estimateProjectValue(message) {
    if (!message) return 'R$ 2.000 - R$ 5.000';
    
    const msg = message.toLowerCase();
    
    if (msg.includes('sistema') || msg.includes('plataforma') || msg.includes('app')) {
        return 'R$ 8.000 - R$ 25.000';
    }
    
    if (msg.includes('site') || msg.includes('landing') || msg.includes('página')) {
        return 'R$ 3.000 - R$ 8.000';
    }
    
    if (msg.includes('automação') || msg.includes('bot') || msg.includes('ia')) {
        return 'R$ 5.000 - R$ 15.000';
    }
    
    return 'R$ 2.000 - R$ 8.000';
}

function calculateFollowUpDate(leadScore) {
    const now = new Date();
    let daysToAdd = 7;
    
    if (leadScore > 75) daysToAdd = 1;
    else if (leadScore > 50) daysToAdd = 3;
    
    now.setDate(now.getDate() + daysToAdd);
    return now.toLocaleDateString('pt-BR');
}

function showEnhancedLeadModal(leadData) {
    const demoEngagement = leadData.demos_viewed.length > 0 ? 
        `<div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 10px;">
            <h4 style="color: #0369a1; margin-bottom: 8px;">🎯 Engajamento com Demos:</h4>
            <p style="color: #0369a1; margin: 0; font-size: 0.9rem;">
                ${leadData.demos_viewed.length > 0 ? 
                    `Visualizou ${leadData.demos_viewed.length} demo(s): ${leadData.demos_viewed.join(', ')}` : 
                    'Nenhum demo visualizado'
                }
                ${leadData.current_demo ? `<br>Formulário enviado durante visualização do demo: ${leadData.current_demo}` : ''}
            </p>
        </div>` : '';
    
    const modalHtml = `
        <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 800px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #0ea5e9; margin-bottom: 10px;">🚀 TTECH - PORTFOLIO DEMO</h2>
                    <p style="color: #666; font-size: 0.9rem;">Sistema Integrado de Captura e Análise de Leads</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                        <h3 style="color: #333; margin-bottom: 15px; font-size: 1.1rem;">📋 Dados do Lead</h3>
                        <div style="display: grid; gap: 8px; font-size: 0.9rem;">
                            <p><strong>ID:</strong> ${leadData.id}</p>
                            <p><strong>Nome:</strong> ${leadData.name}</p>
                            <p><strong>E-mail:</strong> ${leadData.email}</p>
                            <p><strong>Telefone:</strong> ${leadData.phone}</p>
                            <p><strong>Data:</strong> ${leadData.timestamp}</p>
                            <p><strong>Fonte:</strong> ${leadData.source}</p>
                        </div>
                        ${demoEngagement}
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 10px;">
                        <h3 style="color: #0369a1; margin-bottom: 15px; font-size: 1.1rem;">📊 Análise Automática</h3>
                        <div style="display: grid; gap: 8px; font-size: 0.9rem;">
                            <p><strong>Lead Score:</strong> <span style="color: ${leadData.leadScore > 75 ? '#10b981' : leadData.leadScore > 50 ? '#f59e0b' : '#ef4444'}; font-weight: bold;">${leadData.leadScore}/100</span></p>
                            <p><strong>Prioridade:</strong> <span style="color: ${leadData.priority === 'Alta' ? '#ef4444' : leadData.priority === 'Média' ? '#f59e0b' : '#6b7280'}; font-weight: bold;">${leadData.priority}</span></p>
                            <p><strong>Valor Estimado:</strong> ${leadData.estimatedValue}</p>
                            <p><strong>Follow-up:</strong> ${leadData.followUpDate}</p>
                            <p><strong>Página:</strong> ${leadData.page}</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #333; margin-bottom: 10px;">💬 Mensagem do Cliente:</h4>
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9; font-style: italic; color: #555;">
                        "${leadData.message}"
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                    <h3 style="color: #065f46; margin-bottom: 10px; font-size: 1.1rem;">✅ Lead Processado com Sucesso!</h3>
                    <p style="color: #047857; margin-bottom: 15px;">Sistema de Portfolio + CRM integrado funcionando perfeitamente.</p>
                    
                    <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; margin-top: 15px;">
                        <h4 style="color: #065f46; margin-bottom: 10px; font-size: 1rem;">🔧 Funcionalidades do Sistema Real:</h4>
                        <ul style="color: #047857; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                            <li>Tracking de engajamento com demos interativos</li>
                            <li>Lead scoring baseado em comportamento</li>
                            <li>Integração automática com CRM/WhatsApp</li>
                            <li>Notificações em tempo real para equipe</li>
                            <li>Análise de ROI por fonte de tráfego</li>
                            <li>Segmentação automática por interesse</li>
                            <li>Follow-up automatizado por e-mail/SMS</li>
                            <li>Dashboard de conversão em tempo real</li>
                        </ul>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #0ea5e9; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-right: 10px;">
                        Fechar Demo
                    </button>
                    <button onclick="window.demoSystem && window.demoSystem.openDemo('financas-pessoais'); this.closest('.demo-modal-overlay').remove();" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                        Ver Demo Financeiro
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4ade80, #0ea5e9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

console.log('🎯 Enhanced Portfolio Demo System loaded successfully!');