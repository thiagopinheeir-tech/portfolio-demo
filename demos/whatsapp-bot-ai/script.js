// WhatsApp Bot AI Demo JavaScript with Enhanced Mock Data System

// Enhanced bot responses with more variety and context
const botResponses = [
    "Entendi! Como posso ajudá-lo com isso? 🤔",
    "Obrigado pela sua mensagem. Vou verificar isso para você. ⏳",
    "Claro! Posso ajudar com essa informação. 📋",
    "Ótima pergunta! Deixe-me explicar... 💡",
    "Perfeito! Vou processar sua solicitação. ✅",
    "Entendo sua necessidade. Aqui está o que posso fazer: 🛠️",
    "Muito bem! Vou te ajudar com isso agora mesmo. 🚀",
    "Excelente! Tenho algumas opções para você: 📝",
    "Compreendo perfeitamente. Vamos resolver isso juntos! 🤝",
    "Interessante! Posso fornecer mais detalhes sobre isso. 📊"
];

// Enhanced contextual responses based on keywords
const contextualResponses = {
    'horário': 'Nosso horário de funcionamento é:\n\n📅 **Segunda a Sexta:** 8h às 18h\n📅 **Sábado:** 8h às 14h\n📅 **Domingo:** Fechado\n\nEstamos sempre aqui para ajudar! 😊',
    'preço': 'Temos várias opções de preços! 💰 Posso enviar nossa tabela completa. Qual produto ou serviço te interessa?',
    'entrega': 'Fazemos entregas para toda a região metropolitana! 🚚\n\n🚚 **Entrega expressa:** 2-4 horas - R$ 15,00\n🚚 **Entrega padrão:** 1-2 dias - R$ 8,00\n\nQual é seu CEP para calcular o prazo exato?',
    'produto': 'Temos uma grande variedade de produtos! 🛍️ Posso enviar nosso catálogo completo. Qual categoria te interessa mais?',
    'pagamento': 'Aceitamos várias formas de pagamento! 💳\n\n💰 **Dinheiro**\n💳 **Cartão de crédito/débito**\n📱 **PIX**\n🏦 **Transferência bancária**\n\nQual prefere?',
    'localização': 'Estamos localizados na Rua Principal, 123 - Centro 📍\n\nTambém atendemos por delivery em toda a cidade! 🚚',
    'contato': 'Você pode entrar em contato conosco:\n\n📞 **Telefone:** (11) 99999-9999\n📧 **E-mail:** contato@empresa.com\n📱 **WhatsApp:** Este mesmo número!\n🌐 **Site:** www.empresa.com'
];

// Mock conversation data with enhanced details
const conversations = {
    'cliente1': {
        name: '(11) 99999-1234',
        customerName: 'João Silva',
        status: 'online • última vez hoje às 14:30',
        tags: ['cliente-vip', 'pedido-recente'],
        totalOrders: 15,
        lastOrderValue: 85.50,
        messages: [
            { type: 'user', content: 'Olá, preciso de ajuda com meu pedido', time: '14:30' },
            { type: 'bot', content: 'Olá João! 👋 Sou o assistente virtual da empresa. Vi que você é um cliente VIP! Como posso ajudá-lo hoje? 😊', time: '14:30' },
            { type: 'user', content: 'Qual o horário de funcionamento?', time: '14:31' },
            { type: 'bot', content: contextualResponses['horário'], time: '14:31' },
            { type: 'user', content: 'Perfeito! Obrigado pela informação', time: '14:32' }
        ]
    },
    'cliente2': {
        name: '(11) 98888-5678',
        customerName: 'Maria Santos',
        status: 'online • última vez hoje às 13:45',
        tags: ['novo-cliente', 'interessado'],
        totalOrders: 2,
        lastOrderValue: 45.00,
        messages: [
            { type: 'user', content: '[ÁUDIO] Mensagem de áudio recebida', time: '13:45' },
            { type: 'bot', content: 'Recebi sua mensagem de áudio, Maria! 🎵 Como posso ajudá-la?', time: '13:45' },
            { type: 'user', content: 'Queria saber sobre os produtos disponíveis', time: '13:46' },
            { type: 'bot', content: contextualResponses['produto'], time: '13:46' }
        ]
    },
    'cliente3': {
        name: '(11) 97777-9012',
        customerName: 'Pedro Costa',
        status: 'online • última vez hoje às 12:20',
        tags: ['cliente-frequente', 'delivery'],
        totalOrders: 8,
        lastOrderValue: 120.00,
        messages: [
            { type: 'user', content: 'Gostaria de fazer um pedido', time: '12:20' },
            { type: 'bot', content: 'Claro, Pedro! Ficarei feliz em ajudar com seu pedido. 🛒 Qual produto você gostaria?', time: '12:20' },
            { type: 'user', content: 'Vocês têm entrega para minha região?', time: '12:21' },
            { type: 'bot', content: contextualResponses['entrega'], time: '12:21' },
            { type: 'user', content: '01234-567', time: '12:22' },
            { type: 'bot', content: 'Perfeito! Para seu CEP temos:\n\n🚚 **Entrega expressa:** 2-4 horas - R$ 15,00\n🚚 **Entrega padrão:** 1-2 dias - R$ 8,00\n\nQual opção prefere?', time: '12:22' }
        ]
    },
    'cliente4': {
        name: '(11) 96666-3456',
        customerName: 'Ana Oliveira',
        status: 'online • última vez hoje às 11:15',
        tags: ['primeira-compra', 'dúvidas'],
        totalOrders: 0,
        lastOrderValue: 0,
        messages: [
            { type: 'user', content: 'Qual o horário de funcionamento?', time: '11:15' },
            { type: 'bot', content: 'Olá Ana! Bem-vinda! 😊\n\n' + contextualResponses['horário'], time: '11:15' }
        ]
    },
    'cliente5': {
        name: '(11) 95555-7890',
        customerName: 'Carlos Mendes',
        status: 'online • última vez hoje às 10:30',
        tags: ['suporte-técnico', 'problema'],
        totalOrders: 12,
        lastOrderValue: 200.00,
        messages: [
            { type: 'user', content: 'Estou com problema no meu pedido', time: '10:30' },
            { type: 'bot', content: 'Olá Carlos! Sinto muito pelo inconveniente. 😔 Vou verificar seu pedido imediatamente. Pode me informar o número do pedido?', time: '10:30' },
            { type: 'user', content: 'Pedido #12345', time: '10:31' },
            { type: 'bot', content: 'Encontrei seu pedido! Vejo que houve um atraso na entrega. Já estou providenciando uma solução. Você gostaria de:\n\n1️⃣ Reembolso total\n2️⃣ Nova entrega expressa grátis\n3️⃣ Desconto na próxima compra\n\nQual opção prefere?', time: '10:31' }
        ]
    }
};

// Mock analytics and metrics
const mockAnalytics = {
    totalConversations: 1247,
    activeConversations: 24,
    averageResponseTime: '2.3 min',
    satisfactionRate: 94.5,
    resolvedIssues: 89.2,
    commonQuestions: [
        { question: 'Horário de funcionamento', count: 156 },
        { question: 'Informações de entrega', count: 134 },
        { question: 'Formas de pagamento', count: 98 },
        { question: 'Catálogo de produtos', count: 87 },
        { question: 'Status do pedido', count: 76 }
    ],
    dailyMessages: 2847,
    automatedResponses: 78.3
};

// Mock customer database
const mockCustomers = {
    'cliente1': {
        id: 'CUST-001',
        name: 'João Silva',
        phone: '(11) 99999-1234',
        email: 'joao.silva@email.com',
        registrationDate: '2023-08-15',
        totalOrders: 15,
        totalSpent: 1250.00,
        averageOrderValue: 83.33,
        lastOrderDate: '2024-01-20',
        preferredPayment: 'PIX',
        tags: ['cliente-vip', 'pedido-recente'],
        notes: 'Cliente muito satisfeito, sempre elogia o atendimento'
    },
    'cliente2': {
        id: 'CUST-002',
        name: 'Maria Santos',
        phone: '(11) 98888-5678',
        email: 'maria.santos@email.com',
        registrationDate: '2024-01-10',
        totalOrders: 2,
        totalSpent: 90.00,
        averageOrderValue: 45.00,
        lastOrderDate: '2024-01-18',
        preferredPayment: 'Cartão',
        tags: ['novo-cliente', 'interessado'],
        notes: 'Nova cliente, demonstra interesse em produtos premium'
    }
    // ... more customers
};

let currentConversation = 'cliente1';

function sendMessage() {
    const input = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Disable input and button
    input.disabled = true;
    sendButton.disabled = true;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Generate contextual response
    setTimeout(() => {
        hideTyping();
        const response = generateContextualResponse(message);
        addMessage(response, 'bot');
        
        // Re-enable input and button
        input.disabled = false;
        sendButton.disabled = false;
        input.focus();
        
        // Log interaction for analytics
        logInteraction(message, response);
    }, 1500 + Math.random() * 1000);
}

function generateContextualResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords and return contextual responses
    for (const [keyword, response] of Object.entries(contextualResponses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    // Check for greeting patterns
    if (message.includes('oi') || message.includes('olá') || message.includes('bom dia') || 
        message.includes('boa tarde') || message.includes('boa noite')) {
        const customer = conversations[currentConversation];
        const customerName = customer.customerName || 'cliente';
        return `Olá ${customerName}! 👋 Seja bem-vindo(a)! Como posso ajudá-lo(a) hoje? 😊`;
    }
    
    // Check for thanks patterns
    if (message.includes('obrigad') || message.includes('valeu') || message.includes('brigad')) {
        return 'Por nada! 😊 Fico feliz em ajudar! Se precisar de mais alguma coisa, é só falar. Tenha um ótimo dia! 🌟';
    }
    
    // Check for problem/complaint patterns
    if (message.includes('problema') || message.includes('reclamação') || message.includes('erro') || 
        message.includes('defeito') || message.includes('não funciona')) {
        return 'Sinto muito pelo inconveniente! 😔 Vou resolver isso para você imediatamente. Pode me dar mais detalhes sobre o problema? Estou aqui para ajudar! 🛠️';
    }
    
    // Check for order/purchase patterns
    if (message.includes('pedido') || message.includes('comprar') || message.includes('quero') || 
        message.includes('preciso')) {
        return 'Perfeito! 🛒 Vou ajudá-lo(a) com seu pedido. Temos várias opções disponíveis. Que tipo de produto você está procurando? Posso enviar nosso catálogo! 📋';
    }
    
    // Check for price patterns
    if (message.includes('quanto custa') || message.includes('preço') || message.includes('valor') || 
        message.includes('caro') || message.includes('barato')) {
        return 'Temos preços muito competitivos! 💰 Para te dar o valor exato, preciso saber qual produto te interessa. Posso enviar nossa tabela de preços completa! 📊';
    }
    
    // Default to random response with some personalization
    const customer = conversations[currentConversation];
    const responses = [...botResponses];
    
    // Add personalized responses based on customer data
    if (customer.tags?.includes('cliente-vip')) {
        responses.push('Como cliente VIP, você tem prioridade no atendimento! ⭐ Como posso ajudá-lo(a)?');
    }
    
    if (customer.tags?.includes('novo-cliente')) {
        responses.push('Vejo que você é novo(a) por aqui! 🎉 Seja muito bem-vindo(a)! Como posso ajudá-lo(a)?');
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function logInteraction(userMessage, botResponse) {
    const interaction = {
        timestamp: new Date().toISOString(),
        conversation: currentConversation,
        userMessage: userMessage,
        botResponse: botResponse,
        responseTime: '2.3s' // Simulated
    };
    
    console.log('WhatsApp Bot AI Demo - Interaction logged:', interaction);
    
    // Update mock analytics
    mockAnalytics.dailyMessages++;
    if (botResponse !== botResponses[Math.floor(Math.random() * botResponses.length)]) {
        mockAnalytics.automatedResponses = ((mockAnalytics.automatedResponses * mockAnalytics.dailyMessages + 1) / (mockAnalytics.dailyMessages + 1));
    }
}

function addMessage(text, sender) {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                now.getMinutes().toString().padStart(2, '0');
    
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${time}</div>
    `;
    
    messages.insertBefore(messageDiv, document.getElementById('typingIndicator'));
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    document.getElementById('typingIndicator').style.display = 'block';
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    document.getElementById('typingIndicator').style.display = 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function selectConversation(conversationId, element) {
    // Remove active class from all conversation items
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    element.classList.add('active');
    
    // Update current conversation
    currentConversation = conversationId;
    const conversation = conversations[conversationId];
    
    // Update chat header
    document.getElementById('chatName').textContent = conversation.name;
    document.querySelector('.status').textContent = conversation.status;
    
    // Clear and load messages
    loadConversationMessages(conversationId);
}

function loadConversationMessages(conversationId) {
    const messages = document.getElementById('messages');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Clear messages but keep typing indicator
    messages.innerHTML = '';
    messages.appendChild(typingIndicator);
    
    // Load conversation messages
    const conversation = conversations[conversationId];
    conversation.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        
        let content = msg.content;
        if (content.startsWith('[ÁUDIO]')) {
            content = `<svg class="audio-indicator" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="display: inline; margin-right: 6px;">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>${content}`;
        }
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${msg.time}</div>
        `;
        
        messages.insertBefore(messageDiv, typingIndicator);
    });
    
    messages.scrollTop = messages.scrollHeight;
}

function showSection(sectionName) {
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Show different sections with mock data
    const messages = document.getElementById('messages');
    
    if (sectionName === 'dashboard') {
        messages.innerHTML = `
            <div style="padding: 20px; color: #64748b;">
                <h3 style="color: #1e293b; margin-bottom: 20px;">📊 Dashboard - WhatsApp Bot AI</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
                    <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${mockAnalytics.totalConversations}</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Total de Conversas</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${mockAnalytics.activeConversations}</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Conversas Ativas</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${mockAnalytics.averageResponseTime}</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Tempo Médio</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${mockAnalytics.satisfactionRate}%</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Satisfação</div>
                    </div>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📈 Perguntas Mais Frequentes</h4>
                    ${mockAnalytics.commonQuestions.map(q => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                            <span>${q.question}</span>
                            <span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">${q.count}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="color: #1e293b; margin-bottom: 10px;">🤖 Estatísticas do Bot</h4>
                    <p><strong>Mensagens Diárias:</strong> ${mockAnalytics.dailyMessages.toLocaleString()}</p>
                    <p><strong>Respostas Automatizadas:</strong> ${mockAnalytics.automatedResponses.toFixed(1)}%</p>
                    <p><strong>Taxa de Resolução:</strong> ${mockAnalytics.resolvedIssues}%</p>
                </div>
            </div>
        `;
    } else if (sectionName === 'chatbot') {
        messages.innerHTML = `
            <div style="padding: 20px; color: #64748b;">
                <h3 style="color: #1e293b; margin-bottom: 20px;">⚙️ Configurações do Chatbot</h3>
                
                <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">🎯 Respostas Automáticas</h4>
                    <div style="display: grid; gap: 15px;">
                        ${Object.entries(contextualResponses).slice(0, 4).map(([keyword, response]) => `
                            <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                <div style="font-weight: 600; color: #1e293b; margin-bottom: 8px;">Palavra-chave: "${keyword}"</div>
                                <div style="font-size: 0.9rem; color: #64748b; background: #f8fafc; padding: 10px; border-radius: 6px;">
                                    ${response.substring(0, 100)}...
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                    <h4 style="color: #92400e; margin-bottom: 10px;">🔧 Funcionalidades Ativas</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #b45309;">
                        <li>Respostas contextuais inteligentes</li>
                        <li>Reconhecimento de intenções</li>
                        <li>Histórico de conversas</li>
                        <li>Analytics em tempo real</li>
                        <li>Integração com CRM</li>
                        <li>Suporte a múltiplos idiomas</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        // Return to conversations
        loadConversationMessages(currentConversation);
    }
}

// Initialize demo with enhanced mock data system
document.addEventListener('DOMContentLoaded', function() {
    console.log('WhatsApp Bot AI demo loaded successfully');
    
    // Initialize mock data system
    initializeMockDataSystem();
    
    // Focus on input
    document.getElementById('messageInput').focus();
    
    // Add some demo interactivity
    setTimeout(() => {
        const customer = conversations[currentConversation];
        const customerName = customer.customerName || 'cliente';
        const demoMessage = `Bem-vindo ao demo do WhatsApp Bot AI, ${customerName}! 🤖 Digite uma mensagem para testar a interação inteligente.`;
        addMessage(demoMessage, 'bot');
    }, 1000);
    
    // Start real-time updates
    startRealTimeUpdates();
});

function initializeMockDataSystem() {
    // Add mock data to window for external access
    window.whatsappMockData = {
        conversations: conversations,
        analytics: mockAnalytics,
        customers: mockCustomers,
        contextualResponses: contextualResponses
    };
    
    // Register with state reset system if available
    if (window.stateResetSystem) {
        window.stateResetSystem.registerDemo('whatsapp-bot-ai', () => {
            resetWhatsAppDemoState();
        });
    }
    
    // Setup enhanced conversation list
    updateConversationList();
    
    console.log('🤖 WhatsApp Bot AI Mock Data System initialized successfully!');
}

function updateConversationList() {
    // This would update the conversation list with enhanced data
    // In a real implementation, this would dynamically update the sidebar
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    conversationItems.forEach((item, index) => {
        const conversationId = Object.keys(conversations)[index];
        const conversation = conversations[conversationId];
        
        if (conversation && conversation.customerName) {
            // Add customer name to conversation display
            const phoneElement = item.querySelector('.conversation-phone');
            if (phoneElement) {
                phoneElement.innerHTML = `${conversation.customerName}<br><small style="opacity: 0.7;">${conversation.name}</small>`;
            }
            
            // Add tags if available
            if (conversation.tags) {
                const tagsHtml = conversation.tags.map(tag => 
                    `<span style="background: #3b82f6; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; margin-right: 4px;">${tag}</span>`
                ).join('');
                
                const previewElement = item.querySelector('.conversation-preview');
                if (previewElement && !previewElement.querySelector('.tags')) {
                    previewElement.insertAdjacentHTML('beforeend', `<div class="tags" style="margin-top: 5px;">${tagsHtml}</div>`);
                }
            }
        }
    });
}

function startRealTimeUpdates() {
    // Simulate real-time analytics updates
    setInterval(() => {
        updateMockAnalytics();
    }, 30000); // Every 30 seconds
    
    // Simulate new conversations
    setInterval(() => {
        simulateNewConversation();
    }, 120000); // Every 2 minutes
}

function updateMockAnalytics() {
    // Randomly update analytics
    if (Math.random() > 0.7) { // 30% chance
        mockAnalytics.activeConversations += Math.floor(Math.random() * 3) - 1; // -1, 0, 1, or 2
        mockAnalytics.activeConversations = Math.max(0, mockAnalytics.activeConversations);
        
        mockAnalytics.dailyMessages += Math.floor(Math.random() * 10) + 1;
        
        console.log('WhatsApp Bot AI Demo - Analytics updated:', {
            activeConversations: mockAnalytics.activeConversations,
            dailyMessages: mockAnalytics.dailyMessages
        });
    }
}

function simulateNewConversation() {
    if (Math.random() > 0.8) { // 20% chance
        const newConversationId = 'cliente' + (Object.keys(conversations).length + 1);
        const customerNames = ['Lucas Silva', 'Fernanda Costa', 'Roberto Santos', 'Juliana Oliveira'];
        const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
        const randomPhone = `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`;
        
        conversations[newConversationId] = {
            name: randomPhone,
            customerName: randomName,
            status: 'online • agora',
            tags: ['novo-cliente'],
            totalOrders: 0,
            lastOrderValue: 0,
            messages: [
                { type: 'user', content: 'Olá, gostaria de informações', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
            ]
        };
        
        console.log('WhatsApp Bot AI Demo - Nova conversa simulada:', newConversationId);
    }
}

// Enhanced public API
window.whatsappBotAPI = {
    sendMessage: function(message) {
        document.getElementById('messageInput').value = message;
        sendMessage();
    },
    
    switchConversation: function(conversationId) {
        if (conversations[conversationId]) {
            const conversationElement = document.querySelector(`[onclick*="${conversationId}"]`);
            if (conversationElement) {
                selectConversation(conversationId, conversationElement);
            }
        }
    },
    
    getAnalytics: function() {
        return mockAnalytics;
    },
    
    getConversations: function() {
        return conversations;
    },
    
    addCustomResponse: function(keyword, response) {
        contextualResponses[keyword] = response;
        console.log(`WhatsApp Bot AI Demo - Nova resposta adicionada para "${keyword}"`);
    }
};

// State reset functionality
function resetWhatsAppDemoState() {
    // Reset to first conversation
    currentConversation = 'cliente1';
    
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
    
    // Reset conversation list active state
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Set first conversation as active
    const firstConversation = document.querySelector('.conversation-item');
    if (firstConversation) {
        firstConversation.classList.add('active');
    }
    
    // Load first conversation messages
    if (typeof loadConversationMessages === 'function') {
        loadConversationMessages('cliente1');
    }
    
    // Reset analytics to initial values
    mockAnalytics.activeConversations = 24;
    mockAnalytics.dailyMessages = 2847;
    mockAnalytics.automatedResponses = 78.3;
    
    console.log('🤖 WhatsApp Bot AI demo state reset completed');
}