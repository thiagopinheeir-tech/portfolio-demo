// Barbearia Raimundos - Mock Data System
// This file provides realistic mock data for the barbershop booking demo

class BarbeariaMockData {
    constructor() {
        this.initializeMockData();
        this.setupEventListeners();
        this.injectMockFunctionality();
    }

    initializeMockData() {
        // Mock services with realistic barbershop offerings
        this.services = [
            {
                id: 'corte-tradicional',
                name: 'Corte Tradicional',
                description: 'Corte clássico com acabamento profissional',
                price: 25.00,
                duration: 30, // minutes
                image: './assets/service-haircut-bPRtGUbu.jpg',
                category: 'corte',
                available: true
            },
            {
                id: 'corte-moderno',
                name: 'Corte Moderno',
                description: 'Cortes contemporâneos e estilosos',
                price: 35.00,
                duration: 45,
                image: './assets/service-styling-CGkbUrBU.jpg',
                category: 'corte',
                available: true
            },
            {
                id: 'barba-completa',
                name: 'Barba Completa',
                description: 'Aparar, modelar e finalizar a barba',
                price: 20.00,
                duration: 25,
                image: './assets/service-beard-DrARr1Yt.jpg',
                category: 'barba',
                available: true
            },
            {
                id: 'corte-barba',
                name: 'Corte + Barba',
                description: 'Pacote completo: corte e barba',
                price: 40.00,
                duration: 60,
                image: './assets/service-haircut-bPRtGUbu.jpg',
                category: 'combo',
                available: true
            },
            {
                id: 'sobrancelha',
                name: 'Design de Sobrancelha',
                description: 'Modelagem e design profissional',
                price: 15.00,
                duration: 20,
                image: './assets/service-styling-CGkbUrBU.jpg',
                category: 'design',
                available: true
            }
        ];

        // Mock barbers with realistic profiles
        this.barbers = [
            {
                id: 'raimundo',
                name: 'Raimundo Silva',
                nickname: 'Raimundo',
                specialties: ['Cortes Clássicos', 'Barbas Tradicionais'],
                experience: '15 anos',
                image: './assets/barber-1-BmhAiiA0.jpg',
                rating: 4.9,
                available: true,
                workingHours: {
                    monday: { start: '08:00', end: '18:00' },
                    tuesday: { start: '08:00', end: '18:00' },
                    wednesday: { start: '08:00', end: '18:00' },
                    thursday: { start: '08:00', end: '18:00' },
                    friday: { start: '08:00', end: '19:00' },
                    saturday: { start: '08:00', end: '17:00' },
                    sunday: { start: null, end: null }
                }
            },
            {
                id: 'carlos',
                name: 'Carlos Mendes',
                nickname: 'Carlinhos',
                specialties: ['Cortes Modernos', 'Degradês'],
                experience: '8 anos',
                image: './assets/barber-2-aNc4FD72.jpg',
                rating: 4.8,
                available: true,
                workingHours: {
                    monday: { start: '09:00', end: '18:00' },
                    tuesday: { start: '09:00', end: '18:00' },
                    wednesday: { start: null, end: null },
                    thursday: { start: '09:00', end: '18:00' },
                    friday: { start: '09:00', end: '19:00' },
                    saturday: { start: '08:00', end: '16:00' },
                    sunday: { start: null, end: null }
                }
            },
            {
                id: 'pedro',
                name: 'Pedro Santos',
                nickname: 'Pedrinho',
                specialties: ['Barbas Artísticas', 'Sobrancelhas'],
                experience: '12 anos',
                image: './assets/barber-3-CHfk032B.jpg',
                rating: 4.7,
                available: true,
                workingHours: {
                    monday: { start: '10:00', end: '19:00' },
                    tuesday: { start: '10:00', end: '19:00' },
                    wednesday: { start: '10:00', end: '19:00' },
                    thursday: { start: '10:00', end: '19:00' },
                    friday: { start: '10:00', end: '20:00' },
                    saturday: { start: '09:00', end: '18:00' },
                    sunday: { start: null, end: null }
                }
            }
        ];

        // Mock available time slots
        this.timeSlots = this.generateTimeSlots();

        // Mock booking data
        this.currentBooking = {
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

        // Mock booking history
        this.bookingHistory = [
            {
                id: 'BOOK-001',
                date: '2024-01-20',
                time: '14:00',
                service: 'Corte + Barba',
                barber: 'Raimundo Silva',
                customer: 'João Silva',
                status: 'concluído',
                total: 40.00
            },
            {
                id: 'BOOK-002',
                date: '2024-01-18',
                time: '16:30',
                service: 'Corte Moderno',
                barber: 'Carlos Mendes',
                customer: 'Pedro Santos',
                status: 'concluído',
                total: 35.00
            },
            {
                id: 'BOOK-003',
                date: '2024-01-25',
                time: '10:00',
                service: 'Barba Completa',
                barber: 'Pedro Santos',
                customer: 'Maria Silva',
                status: 'agendado',
                total: 20.00
            }
        ];

        // Mock reviews
        this.reviews = [
            {
                id: 'REV-001',
                customer: 'João M.',
                rating: 5,
                comment: 'Excelente atendimento! O Raimundo é muito profissional.',
                date: '2024-01-15',
                service: 'Corte Tradicional',
                barber: 'Raimundo Silva'
            },
            {
                id: 'REV-002',
                customer: 'Carlos R.',
                rating: 5,
                comment: 'Melhor barbearia da região. Sempre saio satisfeito!',
                date: '2024-01-12',
                service: 'Corte + Barba',
                barber: 'Carlos Mendes'
            },
            {
                id: 'REV-003',
                customer: 'Ana P.',
                rating: 4,
                comment: 'Ótimo trabalho com sobrancelhas. Recomendo!',
                date: '2024-01-10',
                service: 'Design de Sobrancelha',
                barber: 'Pedro Santos'
            }
        ];
    }

    generateTimeSlots() {
        const slots = [];
        const startHour = 8;
        const endHour = 19;
        const interval = 30; // minutes

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push({
                    time: timeString,
                    available: Math.random() > 0.3 // 70% chance of being available
                });
            }
        }

        return slots;
    }

    setupEventListeners() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.attachEventListeners();
            });
        } else {
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        document.addEventListener('click', (event) => {
            const target = event.target;
            
            // Handle service selection
            if (target.matches('[data-action="select-service"]') || 
                target.closest('[data-action="select-service"]')) {
                const serviceId = target.getAttribute('data-service-id') || 
                                target.closest('[data-service-id]')?.getAttribute('data-service-id');
                if (serviceId) {
                    this.selectService(serviceId);
                }
            }

            // Handle barber selection
            if (target.matches('[data-action="select-barber"]') || 
                target.closest('[data-action="select-barber"]')) {
                const barberId = target.getAttribute('data-barber-id') || 
                               target.closest('[data-barber-id]')?.getAttribute('data-barber-id');
                if (barberId) {
                    this.selectBarber(barberId);
                }
            }

            // Handle time slot selection
            if (target.matches('[data-action="select-time"]') || 
                target.closest('[data-action="select-time"]')) {
                const timeSlot = target.getAttribute('data-time') || 
                               target.closest('[data-time]')?.getAttribute('data-time');
                if (timeSlot) {
                    this.selectTimeSlot(timeSlot);
                }
            }

            // Handle booking confirmation
            if (target.matches('[data-action="confirm-booking"]')) {
                this.confirmBooking();
            }

            // Handle WhatsApp booking
            if (target.matches('[data-action="whatsapp-booking"]') || 
                target.closest('a[href*="wa.me"]') || 
                target.closest('a[href*="whatsapp"]')) {
                event.preventDefault();
                this.simulateWhatsAppBooking();
            }
        });

        // Listen for form submissions
        document.addEventListener('submit', (event) => {
            if (event.target.matches('.booking-form') || 
                event.target.matches('.customer-form')) {
                event.preventDefault();
                this.handleBookingForm(event.target);
            }
        });

        // Listen for date picker changes
        document.addEventListener('change', (event) => {
            if (event.target.matches('input[type="date"]')) {
                this.handleDateSelection(event.target.value);
            }
        });
    }

    selectService(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        this.currentBooking.service = service;
        this.showNotification(`Serviço selecionado: ${service.name} - R$ ${service.price.toFixed(2)}`, 'success');
        
        console.log('Barbearia Demo - Serviço selecionado:', service);
    }

    selectBarber(barberId) {
        const barber = this.barbers.find(b => b.id === barberId);
        if (!barber) return;

        this.currentBooking.barber = barber;
        this.showNotification(`Barbeiro selecionado: ${barber.name}`, 'success');
        
        console.log('Barbearia Demo - Barbeiro selecionado:', barber);
    }

    selectTimeSlot(timeSlot) {
        this.currentBooking.time = timeSlot;
        this.showNotification(`Horário selecionado: ${timeSlot}`, 'success');
        
        console.log('Barbearia Demo - Horário selecionado:', timeSlot);
    }

    handleDateSelection(date) {
        this.currentBooking.date = date;
        this.showNotification(`Data selecionada: ${new Date(date).toLocaleDateString('pt-BR')}`, 'success');
        
        // Regenerate available time slots for the selected date
        this.timeSlots = this.generateTimeSlots();
        
        console.log('Barbearia Demo - Data selecionada:', date);
    }

    handleBookingForm(form) {
        const formData = new FormData(form);
        const customerData = Object.fromEntries(formData.entries());
        
        // Update customer data
        this.currentBooking.customer = {
            ...this.currentBooking.customer,
            ...customerData
        };

        this.showNotification('Dados do cliente salvos! 📝', 'success');
        console.log('Barbearia Demo - Dados do cliente:', customerData);
    }

    confirmBooking() {
        if (!this.validateBooking()) {
            return;
        }

        const booking = this.generateBookingConfirmation();
        this.showBookingModal(booking);
    }

    validateBooking() {
        const { service, barber, date, time, customer } = this.currentBooking;
        
        if (!service) {
            this.showNotification('Selecione um serviço!', 'warning');
            return false;
        }
        
        if (!barber) {
            this.showNotification('Selecione um barbeiro!', 'warning');
            return false;
        }
        
        if (!date) {
            this.showNotification('Selecione uma data!', 'warning');
            return false;
        }
        
        if (!time) {
            this.showNotification('Selecione um horário!', 'warning');
            return false;
        }
        
        if (!customer.name || !customer.phone) {
            this.showNotification('Preencha seus dados de contato!', 'warning');
            return false;
        }
        
        return true;
    }

    generateBookingConfirmation() {
        const bookingId = 'DEMO-' + Date.now().toString().slice(-6);
        const bookingDate = new Date(this.currentBooking.date).toLocaleDateString('pt-BR');
        
        return {
            id: bookingId,
            service: this.currentBooking.service,
            barber: this.currentBooking.barber,
            date: bookingDate,
            time: this.currentBooking.time,
            customer: this.currentBooking.customer,
            total: this.currentBooking.service.price,
            duration: this.currentBooking.service.duration,
            timestamp: new Date().toLocaleString('pt-BR')
        };
    }

    showBookingModal(booking) {
        const whatsappMessage = this.formatWhatsAppBooking(booking);
        
        const modalHtml = `
            <div class="demo-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="demo-modal" style="background: white; border-radius: 15px; padding: 30px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #D4AF37; margin-bottom: 10px;">✂️ Barbearia Raimundos - DEMO</h2>
                        <p style="color: #666; font-size: 0.9rem;">Confirmação de Agendamento</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">📋 Detalhes do Agendamento</h3>
                        <div style="display: grid; gap: 10px;">
                            <p><strong>Agendamento:</strong> ${booking.id}</p>
                            <p><strong>Serviço:</strong> ${booking.service.name}</p>
                            <p><strong>Barbeiro:</strong> ${booking.barber.name}</p>
                            <p><strong>Data:</strong> ${booking.date}</p>
                            <p><strong>Horário:</strong> ${booking.time}</p>
                            <p><strong>Duração:</strong> ${booking.duration} minutos</p>
                            <p><strong>Cliente:</strong> ${booking.customer.name}</p>
                            <p><strong>Telefone:</strong> ${booking.customer.phone}</p>
                            <p><strong>Valor:</strong> R$ ${booking.total.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px; font-family: monospace; font-size: 0.85rem; white-space: pre-line; border: 2px solid #e0f2fe;">
                        <h4 style="color: #0369a1; margin-bottom: 10px;">📱 Mensagem WhatsApp:</h4>
${whatsappMessage}
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                        <h3 style="color: #065f46; margin-bottom: 10px; font-size: 1.1rem;">✅ Agendamento Confirmado!</h3>
                        <p style="color: #047857; margin-bottom: 15px;">Seu horário foi reservado com sucesso!</p>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <h4 style="color: #065f46; margin-bottom: 10px; font-size: 1rem;">🔧 Em um sistema real:</h4>
                            <ul style="color: #047857; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                                <li>Confirmação seria enviada por WhatsApp/SMS</li>
                                <li>Lembrete automático 1 dia antes</li>
                                <li>Integração com agenda do barbeiro</li>
                                <li>Sistema de pagamento online</li>
                                <li>Histórico de agendamentos do cliente</li>
                                <li>Avaliação pós-atendimento</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="this.closest('.demo-modal-overlay').remove()" style="background: #D4AF37; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Fechar Demo
                        </button>
                        <button onclick="window.barbeariaMockData.resetBooking(); this.closest('.demo-modal-overlay').remove();" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                            Novo Agendamento
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Add to booking history
        this.bookingHistory.unshift({
            id: booking.id,
            date: booking.date,
            time: booking.time,
            service: booking.service.name,
            barber: booking.barber.name,
            customer: booking.customer.name,
            status: 'agendado',
            total: booking.total
        });
    }

    formatWhatsAppBooking(booking) {
        let message = `✂️ *AGENDAMENTO BARBEARIA RAIMUNDOS* ✂️\n\n`;
        message += `📋 Agendamento: ${booking.id}\n`;
        message += `📅 Data/Hora: ${booking.date} às ${booking.time}\n\n`;
        message += `👤 *CLIENTE:*\n`;
        message += `Nome: ${booking.customer.name}\n`;
        message += `Telefone: ${booking.customer.phone}\n\n`;
        message += `💼 *SERVIÇO:*\n`;
        message += `${booking.service.name}\n`;
        message += `Barbeiro: ${booking.barber.name}\n`;
        message += `Duração: ${booking.duration} minutos\n`;
        message += `Valor: R$ ${booking.total.toFixed(2)}\n\n`;
        message += `📍 *ENDEREÇO:*\n`;
        message += `Rua das Barbearias, 123 - Centro\n`;
        message += `📞 Contato: (11) 99999-9999`;
        
        return message;
    }

    simulateWhatsAppBooking() {
        if (!this.validateBooking()) {
            return;
        }

        const booking = this.generateBookingConfirmation();
        this.showBookingModal(booking);
    }

    resetBooking() {
        this.currentBooking = {
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
        
        this.showNotification('Agendamento resetado! 🔄', 'info');
    }

    showNotification(message, type = 'info') {
        document.querySelectorAll('.barbearia-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = 'barbearia-notification';
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
        
        this.addNotificationStyles();
        document.body.appendChild(notification);
        
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
            info: '#D4AF37'
        };
        return colors[type] || colors.info;
    }

    addNotificationStyles() {
        if (!document.querySelector('#barbearia-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'barbearia-notification-styles';
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
        window.barbeariaMockData = this;
        window.mockServices = this.services;
        window.mockBarbers = this.barbers;
        window.mockTimeSlots = this.timeSlots;
        
        // Register with state reset system if available
        if (window.stateResetSystem) {
            window.stateResetSystem.registerDemo('barbearia-raimundos', () => {
                this.resetDemoState();
            });
        }
        
        // Simulate real-time updates
        setInterval(() => {
            this.simulateRealTimeUpdates();
        }, 45000); // Every 45 seconds
    }

    simulateRealTimeUpdates() {
        // Randomly update barber availability
        if (Math.random() > 0.7) { // 30% chance
            const randomBarber = this.barbers[Math.floor(Math.random() * this.barbers.length)];
            randomBarber.available = !randomBarber.available;
            const status = randomBarber.available ? 'disponível' : 'ocupado';
            console.log(`Barbearia Demo - ${randomBarber.name} agora está ${status}`);
        }

        // Update time slot availability
        this.timeSlots.forEach(slot => {
            if (Math.random() > 0.9) { // 10% chance
                slot.available = !slot.available;
            }
        });
    }

    // Public API methods
    getServices() {
        return this.services;
    }

    getBarbers() {
        return this.barbers;
    }

    getTimeSlots() {
        return this.timeSlots;
    }

    getCurrentBooking() {
        return this.currentBooking;
    }

    getBookingHistory() {
        return this.bookingHistory;
    }

    getReviews() {
        return this.reviews;
    }

    // State reset functionality
    resetDemoState() {
        // Reset current booking
        this.currentBooking = {
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
        
        // Reset all barbers to available
        this.barbers.forEach(barber => {
            barber.available = true;
        });
        
        // Reset all services to available
        this.services.forEach(service => {
            service.available = true;
        });
        
        // Regenerate time slots
        this.timeSlots = this.generateTimeSlots();
        
        // Clear any UI notifications
        document.querySelectorAll('.barbearia-notification').forEach(n => n.remove());
        
        // Reset date inputs
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            input.value = '';
        });
        
        console.log('✂️ Barbearia Raimundos demo state reset completed');
    }
}

// Initialize mock data system
document.addEventListener('DOMContentLoaded', () => {
    window.barbeariaMockData = new BarbeariaMockData();
    console.log('✂️ Barbearia Raimundos Mock Data System initialized successfully!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BarbeariaMockData;
}