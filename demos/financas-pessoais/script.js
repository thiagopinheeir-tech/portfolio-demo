// JP Empréstimos - Demo JavaScript with Enhanced Mock Data System

class FinancasDemo {
    constructor() {
        this.initializeMockData();
        this.initializeDemo();
        this.setupEventListeners();
        this.animateStats();
        this.setupMockDataSystem();
    }

    initializeMockData() {
        // Enhanced mock loan data
        this.mockLoans = [
            {
                id: 'LOAN-001',
                clientName: 'Maria Silva Santos',
                amount: 15000,
                rate: 2.5,
                months: 24,
                status: 'ativo',
                startDate: '2024-01-15',
                monthlyPayment: 685.42,
                totalPayment: 16450.08,
                remainingBalance: 12500.00
            },
            {
                id: 'LOAN-002',
                clientName: 'João Carlos Oliveira',
                amount: 8000,
                rate: 3.0,
                months: 12,
                status: 'pendente',
                startDate: '2024-01-20',
                monthlyPayment: 720.85,
                totalPayment: 8650.20,
                remainingBalance: 8000.00
            },
            {
                id: 'LOAN-003',
                clientName: 'Ana Paula Costa',
                amount: 5000,
                rate: 2.8,
                months: 18,
                status: 'finalizado',
                startDate: '2023-08-10',
                monthlyPayment: 305.67,
                totalPayment: 5502.06,
                remainingBalance: 0.00
            }
        ];

        // Mock client database
        this.mockClients = [
            {
                id: 'CLI-001',
                name: 'Maria Silva Santos',
                cpf: '123.456.789-01',
                phone: '(11) 99999-1234',
                email: 'maria.silva@email.com',
                creditLimit: 15000,
                currentDebt: 12500,
                status: 'ativo',
                score: 750,
                registrationDate: '2023-06-15'
            },
            {
                id: 'CLI-002',
                name: 'João Carlos Oliveira',
                cpf: '987.654.321-09',
                phone: '(11) 98888-5678',
                email: 'joao.carlos@email.com',
                creditLimit: 10000,
                currentDebt: 0,
                status: 'pendente',
                score: 680,
                registrationDate: '2024-01-10'
            },
            {
                id: 'CLI-003',
                name: 'Ana Paula Costa',
                cpf: '456.789.123-45',
                phone: '(11) 97777-9012',
                email: 'ana.costa@email.com',
                creditLimit: 8000,
                currentDebt: 0,
                status: 'finalizado',
                score: 820,
                registrationDate: '2023-05-20'
            },
            {
                id: 'CLI-004',
                name: 'Pedro Henrique Lima',
                cpf: '789.123.456-78',
                phone: '(11) 96666-3456',
                email: 'pedro.lima@email.com',
                creditLimit: 20000,
                currentDebt: 15000,
                status: 'ativo',
                score: 720,
                registrationDate: '2023-12-01'
            },
            {
                id: 'CLI-005',
                name: 'Carla Fernanda Souza',
                cpf: '321.654.987-32',
                phone: '(11) 95555-7890',
                email: 'carla.souza@email.com',
                creditLimit: 12000,
                currentDebt: 8500,
                status: 'ativo',
                score: 695,
                registrationDate: '2023-09-18'
            }
        ];

        // Mock company data
        this.mockCompanies = {
            'JP': {
                name: 'JP Empréstimos',
                maxLoanAmount: 50000,
                minRate: 1.8,
                maxRate: 4.5,
                maxMonths: 60,
                active: true
            },
            'PP': {
                name: 'PP Financeira',
                maxLoanAmount: 30000,
                minRate: 2.2,
                maxRate: 5.0,
                maxMonths: 48,
                active: true
            }
        };

        // Mock analytics data
        this.mockAnalytics = {
            totalClients: 127,
            activeLoans: 43,
            pendingApplications: 8,
            completedLoans: 89,
            totalLoanAmount: 2450000,
            averageLoanAmount: 15680,
            defaultRate: 2.3,
            monthlyRevenue: 45600
        };
    }

    initializeDemo() {
        // Set default values for the loan calculator
        document.getElementById('amount').value = '10000';
        document.getElementById('rate').value = '2.5';
        document.getElementById('months').value = '12';
        
        console.log('JP Empréstimos demo initialized successfully');
    }

    setupEventListeners() {
        // Add hover effects for client items
        document.querySelectorAll('.client-item').forEach(item => {
            item.addEventListener('mouseenter', this.handleClientHover.bind(this));
            item.addEventListener('mouseleave', this.handleClientLeave.bind(this));
        });

        // Add form validation
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', this.validateInput.bind(this));
        });
    }

    handleClientHover(event) {
        event.currentTarget.style.backgroundColor = '#f9fafb';
        event.currentTarget.style.transform = 'translateX(5px)';
        event.currentTarget.style.transition = 'all 0.2s ease';
    }

    handleClientLeave(event) {
        event.currentTarget.style.backgroundColor = 'transparent';
        event.currentTarget.style.transform = 'translateX(0)';
    }

    validateInput(event) {
        const input = event.target;
        const value = parseFloat(input.value);
        
        // Remove any existing validation styling
        input.style.borderColor = '#e5e7eb';
        
        // Validate based on input type
        if (input.id === 'amount' && value <= 0) {
            input.style.borderColor = '#ef4444';
        } else if (input.id === 'rate' && (value <= 0 || value > 100)) {
            input.style.borderColor = '#ef4444';
        } else if (input.id === 'months' && (value <= 0 || value > 360)) {
            input.style.borderColor = '#ef4444';
        }
    }

    calculateLoan() {
        const amount = parseFloat(document.getElementById('amount').value);
        const rate = parseFloat(document.getElementById('rate').value) / 100;
        const months = parseInt(document.getElementById('months').value);
        const company = document.getElementById('company').value;
        
        // Validation
        if (!this.validateLoanInputs(amount, rate, months, company)) {
            return;
        }
        
        // Calculate using PMT formula
        const monthlyPayment = amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - amount;
        
        // Create mock loan record
        const loanRecord = this.createMockLoanRecord(amount, rate * 100, months, company, monthlyPayment, totalPayment);
        
        // Display results
        this.displayResults(monthlyPayment, totalPayment, totalInterest, company);
        
        // Show enhanced success notification with loan details
        setTimeout(() => {
            this.showLoanCalculationModal(loanRecord);
        }, 300);
    }

    validateLoanInputs(amount, rate, months, company) {
        if (!amount || amount <= 0) {
            this.showNotification('Por favor, insira um valor válido para o empréstimo.', 'error');
            return false;
        }
        
        if (!rate || rate <= 0) {
            this.showNotification('Por favor, insira uma taxa de juros válida.', 'error');
            return false;
        }
        
        if (!months || months <= 0 || months > 360) {
            this.showNotification('Por favor, insira um número válido de parcelas (1-360).', 'error');
            return false;
        }
        
        if (!company) {
            this.showNotification('Por favor, selecione a empresa.', 'error');
            return false;
        }
        
        return true;
    }

    displayResults(monthlyPayment, totalPayment, totalInterest, company) {
        document.getElementById('monthlyPayment').textContent = this.formatCurrency(monthlyPayment);
        document.getElementById('totalPayment').textContent = this.formatCurrency(totalPayment);
        document.getElementById('totalInterest').textContent = this.formatCurrency(totalInterest);
        document.getElementById('selectedCompany').textContent = company;
        
        document.getElementById('results').classList.add('show');
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1001;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        // Add animation keyframes if not exists
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
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    addNotificationStyles() {
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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

    animateStats() {
        // Animate statistics on page load
        const statValues = document.querySelectorAll('.stat-card .value');
        statValues.forEach((stat, index) => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue);
            
            if (!isNaN(numericValue)) {
                stat.textContent = '0';
                
                setTimeout(() => {
                    this.animateNumber(stat, 0, numericValue, 1000);
                }, index * 200);
            }
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current.toString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end.toString();
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    // Simulate real-time data updates
    simulateDataUpdates() {
        setInterval(() => {
            // Randomly update some statistics to simulate real-time data
            const stats = [
                { element: document.querySelector('.stat-card:nth-child(2) .value'), range: [40, 50] },
                { element: document.querySelector('.stat-card:nth-child(3) .value'), range: [5, 12] }
            ];
            
            stats.forEach(stat => {
                if (Math.random() > 0.7) { // 30% chance to update
                    const newValue = Math.floor(Math.random() * (stat.range[1] - stat.range[0] + 1)) + stat.range[0];
                    stat.element.textContent = newValue.toString();
                }
            });
        }, 10000); // Update every 10 seconds
    }
}

// Global function for the calculate button
function calculateLoan() {
    if (window.financasDemo) {
        window.financasDemo.calculateLoan();
    }
}

// Initialize the demo when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.financasDemo = new FinancasDemo();
    
    // Start simulating data updates after 5 seconds
    setTimeout(() => {
        window.financasDemo.simulateDataUpdates();
    }, 5000);
});

    // Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinancasDemo;
}

    setupMockDataSystem() {
        // Add mock data to window for external access
        window.financasMockData = {
            loans: this.mockLoans,
            clients: this.mockClients,
            companies: this.mockCompanies,
            analytics: this.mockAnalytics
        };

        // Register with state reset system if available
        if (window.stateResetSystem) {
            window.stateResetSystem.registerDemo('financas-pessoais', () => {
                this.resetDemoState();
            });
        }

        // Setup form submission handlers for mock data
        this.setupFormHandlers();
        
        // Simulate real-time data updates
        this.startRealTimeUpdates();
    }

    setupFormHandlers() {
        // Handle client registration forms
        document.addEventListener('submit', (event) => {
            if (event.target.matches('.client-form') || 
                event.target.matches('.loan-application-form')) {
                event.preventDefault();
                this.handleClientForm(event.target);
            }
        });

        // Handle loan application forms
        document.addEventListener('click', (event) => {
            if (event.target.matches('[data-action="apply-loan"]')) {
                this.showLoanApplicationModal();
            }
            
            if (event.target.matches('[data-action="view-client"]')) {
                const clientId = event.target.getAttribute('data-client-id');
                this.showClientDetailsModal(clientId);
            }
        });
    }

    createMockLoanRecord(amount, rate, months, company, monthlyPayment, totalPayment) {
        const loanId = 'DEMO-' + Date.now().toString().slice(-6);
        
        return {
            id: loanId,
            amount: amount,
            rate: rate,
            months: months,
            company: company,
            monthlyPayment: monthlyPayment,
            totalPayment: totalPayment,
            totalInterest: totalPayment - amount,
            status: 'simulado',
            createdAt: new Date().toLocaleString('pt-BR'),
            clientName: 'Cliente Demo',
            approvalProbability: this.calculateApprovalProbability(amount, rate)
        };
    }

    calculateApprovalProbability(amount, rate) {
        // Mock approval probability based on amount and rate
        let probability = 85; // Base probability
        
        if (amount > 20000) probability -= 15;
        if (amount > 35000) probability -= 20;
        if (rate < 2.0) probability += 10;
        if (rate > 4.0) probability -= 15;
        
        return Math.max(30, Math.min(95, probability));
    }

    showLoanCalculationModal(loanRecord) {
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #6366f1; margin-bottom: 10px;">💰 JP Empréstimos - DEMO</h2>
                        <p style="color: #666; font-size: 0.9rem;">Simulação de Empréstimo Calculada</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">📊 Detalhes da Simulação</h3>
                        <div style="display: grid; gap: 10px;">
                            <p><strong>ID da Simulação:</strong> ${loanRecord.id}</p>
                            <p><strong>Valor Solicitado:</strong> ${this.formatCurrency(loanRecord.amount)}</p>
                            <p><strong>Taxa de Juros:</strong> ${loanRecord.rate.toFixed(2)}% ao mês</p>
                            <p><strong>Prazo:</strong> ${loanRecord.months} meses</p>
                            <p><strong>Empresa:</strong> ${loanRecord.company}</p>
                            <p><strong>Parcela Mensal:</strong> ${this.formatCurrency(loanRecord.monthlyPayment)}</p>
                            <p><strong>Total a Pagar:</strong> ${this.formatCurrency(loanRecord.totalPayment)}</p>
                            <p><strong>Total de Juros:</strong> ${this.formatCurrency(loanRecord.totalInterest)}</p>
                            <p><strong>Probabilidade de Aprovação:</strong> <span style="color: ${loanRecord.approvalProbability > 70 ? '#10b981' : '#f59e0b'}; font-weight: bold;">${loanRecord.approvalProbability}%</span></p>
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                        <h3 style="color: #065f46; margin-bottom: 10px; font-size: 1.1rem;">✅ Simulação Concluída!</h3>
                        <p style="color: #047857; margin-bottom: 15px;">Cálculo realizado com base nas melhores taxas do mercado.</p>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <h4 style="color: #065f46; margin-bottom: 10px; font-size: 1rem;">🏦 Em um sistema real:</h4>
                            <ul style="color: #047857; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                                <li>Análise de crédito automática</li>
                                <li>Consulta aos órgãos de proteção</li>
                                <li>Verificação de renda e documentos</li>
                                <li>Aprovação em até 24 horas</li>
                                <li>Liberação do valor na conta</li>
                                <li>Controle de parcelas e vencimentos</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #6366f1; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Fechar Simulação
                        </button>
                        <button onclick="window.financasDemo.showLoanApplicationModal(); this.closest('.demo-modal-overlay').remove();" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Solicitar Empréstimo
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    showLoanApplicationModal() {
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #6366f1; margin-bottom: 10px;">📋 Solicitação de Empréstimo</h2>
                        <p style="color: #666; font-size: 0.9rem;">Preencha seus dados para análise</p>
                    </div>
                    
                    <form class="loan-application-form" style="display: grid; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Nome Completo:</label>
                            <input type="text" name="name" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">CPF:</label>
                            <input type="text" name="cpf" placeholder="000.000.000-00" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Telefone:</label>
                            <input type="tel" name="phone" placeholder="(11) 99999-9999" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">E-mail:</label>
                            <input type="email" name="email" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Renda Mensal:</label>
                            <input type="number" name="income" placeholder="5000" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        </div>
                        
                        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                            <button type="submit" style="background: #6366f1; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                                Enviar Solicitação
                            </button>
                            <button type="button" onclick="this.closest('.demo-modal-overlay').remove()" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    handleClientForm(form) {
        const formData = new FormData(form);
        const clientData = Object.fromEntries(formData.entries());
        
        // Create mock client record
        const clientId = 'CLI-' + Date.now().toString().slice(-6);
        const mockClient = {
            id: clientId,
            ...clientData,
            status: 'em análise',
            score: Math.floor(Math.random() * 300) + 500, // 500-800
            registrationDate: new Date().toLocaleDateString('pt-BR'),
            creditLimit: 0
        };
        
        // Add to mock database
        this.mockClients.push(mockClient);
        
        // Show success modal
        this.showClientRegistrationSuccess(mockClient);
        
        // Close the application modal
        document.querySelector('.demo-modal-overlay')?.remove();
    }

    showClientRegistrationSuccess(client) {
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #10b981; margin-bottom: 10px;">✅ Solicitação Enviada!</h2>
                        <p style="color: #666; font-size: 0.9rem;">Sua solicitação foi recebida com sucesso</p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: #0369a1; margin-bottom: 15px;">📋 Dados da Solicitação</h3>
                        <p><strong>Protocolo:</strong> ${client.id}</p>
                        <p><strong>Nome:</strong> ${client.name}</p>
                        <p><strong>CPF:</strong> ${client.cpf}</p>
                        <p><strong>Score Estimado:</strong> ${client.score}</p>
                        <p><strong>Status:</strong> ${client.status}</p>
                        <p><strong>Data:</strong> ${client.registrationDate}</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                        <h3 style="color: #92400e; margin-bottom: 10px;">⏳ Próximos Passos</h3>
                        <ul style="color: #b45309; margin: 0; padding-left: 20px;">
                            <li>Análise de crédito em até 24 horas</li>
                            <li>Verificação de documentos</li>
                            <li>Consulta aos órgãos de proteção</li>
                            <li>Retorno por e-mail e WhatsApp</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Entendi
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    startRealTimeUpdates() {
        // Simulate real-time updates to statistics
        setInterval(() => {
            this.updateMockStatistics();
        }, 15000); // Every 15 seconds
    }

    updateMockStatistics() {
        // Randomly update some statistics
        if (Math.random() > 0.7) { // 30% chance
            const statElements = document.querySelectorAll('.stat-card .value');
            statElements.forEach((element, index) => {
                if (Math.random() > 0.8) { // 20% chance for each stat
                    const currentValue = parseInt(element.textContent);
                    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    const newValue = Math.max(0, currentValue + change);
                    element.textContent = newValue.toString();
                }
            });
        }
    }

    // Enhanced public API
    getMockData() {
        return {
            loans: this.mockLoans,
            clients: this.mockClients,
            companies: this.mockCompanies,
            analytics: this.mockAnalytics
        };
    }

    addMockClient(clientData) {
        const clientId = 'CLI-' + Date.now().toString().slice(-6);
        const mockClient = {
            id: clientId,
            ...clientData,
            registrationDate: new Date().toLocaleDateString('pt-BR')
        };
        
        this.mockClients.push(mockClient);
        return mockClient;
    }

    simulateLoanApproval(loanId) {
        const loan = this.mockLoans.find(l => l.id === loanId);
        if (loan) {
            loan.status = Math.random() > 0.2 ? 'aprovado' : 'rejeitado';
            this.showNotification(`Empréstimo ${loan.status}!`, loan.status === 'aprovado' ? 'success' : 'error');
        }
    }
    // State reset functionality
    resetDemoState() {
        // Reset form values to defaults
        const amountInput = document.getElementById('amount');
        const rateInput = document.getElementById('rate');
        const monthsInput = document.getElementById('months');
        const companySelect = document.getElementById('company');
        
        if (amountInput) amountInput.value = '10000';
        if (rateInput) rateInput.value = '2.5';
        if (monthsInput) monthsInput.value = '12';
        if (companySelect) companySelect.selectedIndex = 0;
        
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
        
        // Clear any notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        // Reset mock data to initial state
        this.initializeMockData();
        
        console.log('💰 Finanças Pessoais demo state reset completed');
    }
}