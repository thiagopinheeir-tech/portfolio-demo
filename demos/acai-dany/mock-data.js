// Açaí da Dany - Mock Data System
// This file provides realistic mock data for the açaí menu demo

class AcaiMockData {
    constructor() {
        this.initializeMockData();
        this.setupEventListeners();
        this.injectMockFunctionality();
    }

    initializeMockData() {
        // Mock menu items with realistic açaí products
        this.menuItems = {
            acai: [
                {
                    id: 'acai-300ml',
                    name: 'Açaí Tradicional 300ml',
                    description: 'Açaí puro batido na hora com banana',
                    price: 8.50,
                    image: './assets/copo-300ml-CK2bHRpJ.jpg',
                    category: 'acai',
                    available: true,
                    toppings: ['granola', 'banana', 'morango', 'leite-condensado']
                },
                {
                    id: 'acai-500ml',
                    name: 'Açaí Tradicional 500ml',
                    description: 'Açaí puro batido na hora com banana',
                    price: 12.00,
                    image: './assets/copo-500ml-C8RVBT4u.jpg',
                    category: 'acai',
                    available: true,
                    toppings: ['granola', 'banana', 'morango', 'leite-condensado']
                },
                {
                    id: 'acai-tigela',
                    name: 'Tigela de Açaí 480ml',
                    description: 'Açaí cremoso servido em tigela com acompanhamentos',
                    price: 15.00,
                    image: './assets/tigela-480ml-CqO6sDJU.jpg',
                    category: 'acai',
                    available: true,
                    toppings: ['granola', 'banana', 'morango', 'leite-condensado', 'castanha', 'coco']
                },
                {
                    id: 'acai-pote-1l',
                    name: 'Pote de Açaí 1 Litro',
                    description: 'Açaí puro para levar para casa',
                    price: 18.00,
                    image: './assets/pote-1litro-DgtsPptL.jpg',
                    category: 'acai',
                    available: true,
                    toppings: []
                }
            ],
            mixes: [
                {
                    id: 'mix-300ml',
                    name: 'Mix de Frutas 300ml',
                    description: 'Açaí com frutas vermelhas e banana',
                    price: 10.00,
                    image: './assets/mix-300ml-D59SfZb0.jpg',
                    category: 'mix',
                    available: true,
                    toppings: ['granola', 'frutas-vermelhas', 'banana']
                },
                {
                    id: 'mix-500ml',
                    name: 'Mix de Frutas 500ml',
                    description: 'Açaí com frutas vermelhas e banana',
                    price: 14.00,
                    image: './assets/mix-500ml-Cnfnhnig.jpg',
                    category: 'mix',
                    available: true,
                    toppings: ['granola', 'frutas-vermelhas', 'banana']
                }
            ],
            marmitas: [
                {
                    id: 'marmita-700ml',
                    name: 'Marmita Açaí 700ml',
                    description: 'Açaí cremoso em marmita prática',
                    price: 16.50,
                    image: './assets/marmita-m-700ml-DcUWdtQX.jpg',
                    category: 'marmita',
                    available: true,
                    toppings: ['granola', 'banana', 'morango']
                },
                {
                    id: 'marmita-900ml',
                    name: 'Marmita Açaí 900ml',
                    description: 'Açaí cremoso em marmita grande',
                    price: 20.00,
                    image: './assets/marmita-g-900ml-Dxlq3EtG.jpg',
                    category: 'marmita',
                    available: true,
                    toppings: ['granola', 'banana', 'morango', 'castanha']
                }
            ]
        };

        // Mock toppings/adicionais
        this.toppings = {
            'granola': { name: 'Granola', price: 2.00 },
            'banana': { name: 'Banana', price: 1.50 },
            'morango': { name: 'Morango', price: 2.50 },
            'leite-condensado': { name: 'Leite Condensado', price: 1.00 },
            'castanha': { name: 'Castanha', price: 3.00 },
            'coco': { name: 'Coco Ralado', price: 1.50 },
            'frutas-vermelhas': { name: 'Frutas Vermelhas', price: 3.50 }
        };

        // Mock cart state
        this.cart = [];
        this.cartTotal = 0;

        // Mock customer data
        this.customerData = {
            name: '',
            phone: '',
            address: '',
            deliveryMethod: 'delivery' // 'delivery' or 'pickup'
        };

        // Mock order history
        this.orderHistory = [
            {
                id: 'ORD-001',
                date: '2024-01-15',
                items: ['Açaí Tradicional 500ml', 'Granola', 'Banana'],
                total: 16.00,
                status: 'entregue'
            },
            {
                id: 'ORD-002',
                date: '2024-01-10',
                items: ['Tigela de Açaí 480ml', 'Morango', 'Castanha'],
                total: 20.50,
                status: 'entregue'
            }
        ];
    }

    setupEventListeners() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.attachEventListeners();
            });
        } else {
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        // Listen for clicks on product cards, add to cart buttons, etc.
        document.addEventListener('click', (event) => {
            const target = event.target;
            
            // Handle add to cart buttons
            if (target.matches('[data-action="add-to-cart"]') || 
                target.closest('[data-action="add-to-cart"]')) {
                const productId = target.getAttribute('data-product-id') || 
                                target.closest('[data-product-id]')?.getAttribute('data-product-id');
                if (productId) {
                    this.addToCart(productId);
                }
            }

            // Handle cart actions
            if (target.matches('[data-action="view-cart"]')) {
                this.showCart();
            }

            // Handle checkout
            if (target.matches('[data-action="checkout"]')) {
                this.processCheckout();
            }

            // Handle WhatsApp order
            if (target.matches('[data-action="whatsapp-order"]') || 
                target.closest('a[href*="wa.me"]') || 
                target.closest('a[href*="whatsapp"]')) {
                event.preventDefault();
                this.simulateWhatsAppOrder();
            }
        });

        // Listen for form submissions
        document.addEventListener('submit', (event) => {
            if (event.target.matches('.order-form') || 
                event.target.matches('.customer-form')) {
                event.preventDefault();
                this.handleFormSubmission(event.target);
            }
        });
    }

    addToCart(productId) {
        const product = this.findProductById(productId);
        if (!product) return;

        const cartItem = {
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            toppings: [],
            timestamp: new Date().toISOString()
        };

        this.cart.push(cartItem);
        this.updateCartTotal();
        this.showAddToCartFeedback(product);
        
        console.log('Açaí da Dany Demo - Item adicionado ao carrinho:', cartItem);
    }

    findProductById(productId) {
        for (const category of Object.values(this.menuItems)) {
            const product = category.find(item => item.id === productId);
            if (product) return product;
        }
        return null;
    }

    updateCartTotal() {
        this.cartTotal = this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    showAddToCartFeedback(product) {
        const message = `${product.name} adicionado ao carrinho! 🛒`;
        this.showNotification(message, 'success');
    }

    showCart() {
        const cartSummary = this.cart.length === 0 
            ? 'Seu carrinho está vazio' 
            : `${this.cart.length} itens - Total: R$ ${this.cartTotal.toFixed(2)}`;
        
        this.showNotification(`Carrinho: ${cartSummary}`, 'info');
    }

    simulateWhatsAppOrder() {
        if (this.cart.length === 0) {
            this.showNotification('Adicione itens ao carrinho primeiro!', 'warning');
            return;
        }

        const orderSummary = this.generateOrderSummary();
        const whatsappMessage = this.formatWhatsAppMessage(orderSummary);
        
        // Show demo modal instead of opening WhatsApp
        this.showOrderModal(orderSummary, whatsappMessage);
    }

    generateOrderSummary() {
        return {
            items: this.cart,
            total: this.cartTotal,
            itemCount: this.cart.length,
            orderNumber: 'DEMO-' + Date.now().toString().slice(-6),
            timestamp: new Date().toLocaleString('pt-BR')
        };
    }

    formatWhatsAppMessage(orderSummary) {
        let message = `🍇 *PEDIDO AÇAÍ DA DANY* 🍇\n\n`;
        message += `📋 Pedido: ${orderSummary.orderNumber}\n`;
        message += `📅 Data: ${orderSummary.timestamp}\n\n`;
        message += `🛒 *ITENS:*\n`;
        
        orderSummary.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   💰 R$ ${item.price.toFixed(2)}\n`;
            if (item.toppings.length > 0) {
                message += `   🥄 Adicionais: ${item.toppings.join(', ')}\n`;
            }
            message += `\n`;
        });
        
        message += `💵 *TOTAL: R$ ${orderSummary.total.toFixed(2)}*\n\n`;
        message += `📍 Endereço de entrega: _A definir_\n`;
        message += `📞 Contato: _A definir_`;
        
        return message;
    }

    showOrderModal(orderSummary, whatsappMessage) {
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #8B5CF6; margin-bottom: 10px;">🍇 Açaí da Dany - DEMO</h2>
                        <p style="color: #666; font-size: 0.9rem;">Simulação de Pedido via WhatsApp</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px; font-family: monospace; font-size: 0.9rem; white-space: pre-line; border: 2px solid #e9ecef;">
${whatsappMessage}
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                        <h3 style="color: #065f46; margin-bottom: 10px; font-size: 1.1rem;">✅ Pedido Processado com Sucesso!</h3>
                        <p style="color: #047857; margin-bottom: 10px;"><strong>Número do Pedido:</strong> ${orderSummary.orderNumber}</p>
                        <p style="color: #047857; margin-bottom: 10px;"><strong>Total de Itens:</strong> ${orderSummary.itemCount}</p>
                        <p style="color: #047857; margin-bottom: 15px;"><strong>Valor Total:</strong> R$ ${orderSummary.total.toFixed(2)}</p>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <h4 style="color: #065f46; margin-bottom: 10px; font-size: 1rem;">📱 Em um sistema real:</h4>
                            <ul style="color: #047857; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                                <li>Mensagem seria enviada automaticamente para o WhatsApp</li>
                                <li>Cliente receberia confirmação por SMS/WhatsApp</li>
                                <li>Pedido seria integrado ao sistema de gestão</li>
                                <li>Tempo de entrega seria calculado automaticamente</li>
                                <li>Status do pedido seria atualizado em tempo real</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #8B5CF6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Fechar Demo
                        </button>
                        <button onclick="window.acaiMockData.clearCart(); this.closest('.demo-modal-overlay').remove();" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Limpar Carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    clearCart() {
        this.cart = [];
        this.cartTotal = 0;
        this.showNotification('Carrinho limpo! 🛒', 'info');
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form processing
        this.showNotification('Formulário enviado com sucesso! 📝', 'success');
        
        // Log for demo purposes
        console.log('Açaí da Dany Demo - Formulário enviado:', data);
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.acai-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = 'acai-notification';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 9999;
            font-weight: 600;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        // Add animation styles if not exists
        this.addNotificationStyles();
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#8B5CF6'
        };
        return colors[type] || colors.info;
    }

    addNotificationStyles() {
        if (!document.querySelector('#acai-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'acai-notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    injectMockFunctionality() {
        // Add mock data to window for React app to potentially use
        window.acaiMockData = this;
        window.mockMenuItems = this.menuItems;
        window.mockToppings = this.toppings;
        
        // Register with state reset system if available
        if (window.stateResetSystem) {
            window.stateResetSystem.registerDemo('acai-dany', () => {
                this.resetDemoState();
            });
        }
        
        // Simulate periodic updates (like real-time inventory)
        setInterval(() => {
            this.simulateInventoryUpdates();
        }, 30000); // Every 30 seconds
    }

    simulateInventoryUpdates() {
        // Randomly make some items unavailable/available
        const allItems = Object.values(this.menuItems).flat();
        const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
        
        if (Math.random() > 0.8) { // 20% chance
            randomItem.available = !randomItem.available;
            const status = randomItem.available ? 'disponível' : 'indisponível';
            console.log(`Açaí da Dany Demo - ${randomItem.name} agora está ${status}`);
        }
    }

    // Public API methods
    getMenuItems() {
        return this.menuItems;
    }

    getToppings() {
        return this.toppings;
    }

    getCart() {
        return {
            items: this.cart,
            total: this.cartTotal,
            count: this.cart.length
        };
    }

    getOrderHistory() {
        return this.orderHistory;
    }

    // State reset functionality
    resetDemoState() {
        // Reset cart
        this.cart = [];
        this.cartTotal = 0;
        
        // Reset customer data
        this.customerData = {
            name: '',
            phone: '',
            address: '',
            deliveryMethod: 'delivery'
        };
        
        // Reset all items to available
        Object.values(this.menuItems).flat().forEach(item => {
            item.available = true;
        });
        
        // Clear any UI notifications
        document.querySelectorAll('.acai-notification').forEach(n => n.remove());
        
        console.log('🍇 Açaí da Dany demo state reset completed');
    }
}

// Initialize mock data system when script loads
document.addEventListener('DOMContentLoaded', () => {
    window.acaiMockData = new AcaiMockData();
    console.log('🍇 Açaí da Dany Mock Data System initialized successfully!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AcaiMockData;
}