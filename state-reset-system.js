// Portfolio Demo State Reset System
// Ensures all demo states reset to initial values on page refresh/reload
// Implements Requirements 3.2 and 3.4 - No data persistence between sessions

class StateResetSystem {
    constructor() {
        this.demoStates = new Map();
        this.resetCallbacks = new Map();
        this.initializeSystem();
    }

    initializeSystem() {
        // Bind to page lifecycle events
        this.bindPageEvents();
        
        // Clear any potential storage
        this.clearAllStorage();
        
        // Initialize demo state tracking
        this.initializeDemoTracking();
        
        console.log('🔄 State Reset System initialized successfully');
    }

    bindPageEvents() {
        // Reset on page load
        window.addEventListener('load', () => {
            this.performFullReset();
        });

        // Reset on page refresh/reload
        window.addEventListener('beforeunload', () => {
            this.clearAllStorage();
        });

        // Reset on visibility change (tab switch back)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.performStateValidation();
            }
        });

        // Reset on focus (window focus back)
        window.addEventListener('focus', () => {
            this.performStateValidation();
        });
    }

    clearAllStorage() {
        try {
            // Clear localStorage
            if (typeof localStorage !== 'undefined') {
                localStorage.clear();
            }
            
            // Clear sessionStorage
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.clear();
            }
            
            // Clear any cookies (demo-related only)
            this.clearDemoCookies();
            
            console.log('🧹 All storage cleared for demo reset');
        } catch (error) {
            console.warn('Storage clearing failed:', error);
        }
    }

    clearDemoCookies() {
        // Get all cookies
        const cookies = document.cookie.split(';');
        
        // Clear demo-related cookies
        cookies.forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            // Only clear demo-related cookies
            if (name.includes('demo') || name.includes('portfolio') || 
                name.includes('acai') || name.includes('barbearia') || 
                name.includes('financas') || name.includes('whatsapp') || 
                name.includes('ttech')) {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            }
        });
    }

    initializeDemoTracking() {
        // Register state reset for each demo
        this.registerDemo('acai-dany', this.resetAcaiDemo.bind(this));
        this.registerDemo('barbearia-raimundos', this.resetBarbeariaDemo.bind(this));
        this.registerDemo('financas-pessoais', this.resetFinancasDemo.bind(this));
        this.registerDemo('whatsapp-bot-ai', this.resetWhatsAppDemo.bind(this));
        this.registerDemo('landpage-divulga', this.resetLandingPageDemo.bind(this));
    }

    registerDemo(demoName, resetCallback) {
        this.resetCallbacks.set(demoName, resetCallback);
        this.demoStates.set(demoName, {
            initialized: false,
            lastReset: Date.now(),
            resetCount: 0
        });
    }

    performFullReset() {
        console.log('🔄 Performing full state reset...');
        
        // Reset all registered demos
        this.resetCallbacks.forEach((callback, demoName) => {
            try {
                callback();
                this.demoStates.get(demoName).lastReset = Date.now();
                this.demoStates.get(demoName).resetCount++;
                console.log(`✅ ${demoName} state reset completed`);
            } catch (error) {
                console.warn(`❌ Failed to reset ${demoName}:`, error);
            }
        });

        // Reset global form states
        this.resetAllForms();
        
        // Reset global UI states
        this.resetGlobalUIState();
        
        console.log('🎯 Full state reset completed');
    }

    performStateValidation() {
        // Validate that no persistent data exists
        const hasStorage = this.checkForPersistentData();
        if (hasStorage) {
            console.warn('⚠️ Persistent data detected, performing cleanup...');
            this.clearAllStorage();
            this.performFullReset();
        }
    }

    checkForPersistentData() {
        try {
            // Check localStorage
            if (typeof localStorage !== 'undefined' && localStorage.length > 0) {
                return true;
            }
            
            // Check sessionStorage
            if (typeof sessionStorage !== 'undefined' && sessionStorage.length > 0) {
                return true;
            }
            
            // Check for demo cookies
            const cookies = document.cookie.split(';');
            const demoCookies = cookies.filter(cookie => {
                const name = cookie.split('=')[0].trim();
                return name.includes('demo') || name.includes('portfolio') || 
                       name.includes('acai') || name.includes('barbearia') || 
                       name.includes('financas') || name.includes('whatsapp') || 
                       name.includes('ttech');
            });
            
            return demoCookies.length > 0;
        } catch (error) {
            console.warn('Error checking persistent data:', error);
            return false;
        }
    }

    resetAllForms() {
        // Reset all forms on the page
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            try {
                form.reset();
                
                // Clear any custom form states
                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = input.defaultChecked;
                    } else {
                        input.value = input.defaultValue || '';
                    }
                    
                    // Remove validation classes
                    input.classList.remove('error', 'valid', 'invalid', 'touched');
                });
            } catch (error) {
                console.warn('Form reset failed:', error);
            }
        });
        
        console.log('📝 All forms reset to initial state');
    }

    resetGlobalUIState() {
        // Remove any modal overlays
        const modals = document.querySelectorAll('.demo-modal-overlay, .modal-overlay, .overlay');
        modals.forEach(modal => modal.remove());
        
        // Remove notifications
        const notifications = document.querySelectorAll(
            '.notification, .acai-notification, .barbearia-notification, ' +
            '.financas-notification, .whatsapp-notification, .ttech-notification'
        );
        notifications.forEach(notification => notification.remove());
        
        // Reset scroll position
        window.scrollTo(0, 0);
        
        // Clear any active states
        const activeElements = document.querySelectorAll('.active, .selected, .current');
        activeElements.forEach(element => {
            element.classList.remove('active', 'selected', 'current');
        });
        
        console.log('🎨 Global UI state reset completed');
    }

    // Demo-specific reset functions
    resetAcaiDemo() {
        // Reset Açaí da Dany demo state
        if (window.acaiMockData) {
            window.acaiMockData.cart = [];
            window.acaiMockData.cartTotal = 0;
            window.acaiMockData.customerData = {
                name: '',
                phone: '',
                address: '',
                deliveryMethod: 'delivery'
            };
            
            // Reset any UI elements
            const cartElements = document.querySelectorAll('[data-cart-count], .cart-total, .cart-items');
            cartElements.forEach(element => {
                if (element.hasAttribute('data-cart-count')) {
                    element.textContent = '0';
                } else if (element.classList.contains('cart-total')) {
                    element.textContent = 'R$ 0,00';
                } else if (element.classList.contains('cart-items')) {
                    element.innerHTML = '';
                }
            });
        }
        
        // Clear window references
        delete window.mockMenuItems;
        delete window.mockToppings;
    }

    resetBarbeariaDemo() {
        // Reset Barbearia Raimundos demo state
        if (window.barbeariaMockData) {
            window.barbeariaMockData.currentBooking = {
                service: null,
                barber: null,
                date: null,
                time: null,
                customer: {
                    name: '',
                    phone: '',
                    email: ''
                },
                notes: ''
            };
            
            // Reset barber availability
            window.barbeariaMockData.barbers.forEach(barber => {
                barber.available = true;
            });
            
            // Reset time slots
            window.barbeariaMockData.timeSlots = window.barbeariaMockData.generateTimeSlots();
        }
        
        // Clear window references
        delete window.mockServices;
        delete window.mockBarbers;
        delete window.mockTimeSlots;
        
        // Reset date inputs
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            input.value = '';
        });
    }

    resetFinancasDemo() {
        // Reset Finanças Pessoais demo state
        if (window.financasDemo) {
            // Reset form values to defaults
            const amountInput = document.getElementById('amount');
            const rateInput = document.getElementById('rate');
            const monthsInput = document.getElementById('months');
            
            if (amountInput) amountInput.value = '10000';
            if (rateInput) rateInput.value = '2.5';
            if (monthsInput) monthsInput.value = '12';
            
            // Hide results
            const resultsElement = document.getElementById('results');
            if (resultsElement) {
                resultsElement.classList.remove('show');
            }
            
            // Clear result values
            const resultElements = ['monthlyPayment', 'totalPayment', 'totalInterest', 'selectedCompany'];
            resultElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = '';
            });
        }
        
        // Clear window references
        delete window.financasMockData;
    }

    resetWhatsAppDemo() {
        // Reset WhatsApp Bot AI demo state
        if (window.whatsappMockData) {
            // Reset current conversation to first one
            if (typeof selectConversation === 'function') {
                const firstConversation = document.querySelector('.conversation-item');
                if (firstConversation) {
                    selectConversation('cliente1', firstConversation);
                }
            }
            
            // Clear message input
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.value = '';
                messageInput.disabled = false;
            }
            
            // Enable send button
            const sendButton = document.getElementById('sendButton');
            if (sendButton) {
                sendButton.disabled = false;
            }
            
            // Hide typing indicator
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
        }
        
        // Clear window references
        delete window.whatsappBotAPI;
    }

    resetLandingPageDemo() {
        // Reset TTECH Landing Page demo state
        if (window.ttechDemo) {
            // Clear any CRM data
            if (window.mockCRM) {
                window.mockCRM.leads = [];
                window.mockCRM.totalLeads = 0;
            }
            
            // Reset analytics
            if (window.ttechDemo.analytics) {
                window.ttechDemo.analytics.pageViews = 1247;
                window.ttechDemo.analytics.uniqueVisitors = 892;
            }
        }
        
        // Clear window references
        delete window.mockCRM;
    }

    // Public API
    resetDemo(demoName) {
        const callback = this.resetCallbacks.get(demoName);
        if (callback) {
            callback();
            console.log(`🔄 ${demoName} manually reset`);
        } else {
            console.warn(`❌ No reset callback found for ${demoName}`);
        }
    }

    getResetStats() {
        const stats = {};
        this.demoStates.forEach((state, demoName) => {
            stats[demoName] = {
                lastReset: new Date(state.lastReset).toLocaleString(),
                resetCount: state.resetCount
            };
        });
        return stats;
    }

    // Force reset all demos
    forceReset() {
        this.clearAllStorage();
        this.performFullReset();
        console.log('🚨 Force reset completed');
    }
}

// Initialize the state reset system
let stateResetSystem;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        stateResetSystem = new StateResetSystem();
        window.stateResetSystem = stateResetSystem;
    });
} else {
    stateResetSystem = new StateResetSystem();
    window.stateResetSystem = stateResetSystem;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StateResetSystem;
}

// Global reset function for manual use
window.resetAllDemoStates = function() {
    if (window.stateResetSystem) {
        window.stateResetSystem.forceReset();
    } else {
        console.warn('State reset system not initialized');
    }
};

console.log('🔄 State Reset System loaded and ready');