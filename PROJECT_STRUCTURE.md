# 📁 Project Structure - Portfolio Demo System

Este documento fornece uma visão detalhada da estrutura do projeto, explicando a função de cada arquivo e diretório no Portfolio Demo System.

## 🏗️ Visão Geral da Arquitetura

O Portfolio Demo System segue uma arquitetura modular e escalável:

```
portfolio-demo/
├── 🌐 Frontend (HTML/CSS/JS)
├── 🎨 Assets (Recursos estáticos)
├── 🖥️ Demos (Projetos individuais)
├── 📚 Examples (Exemplos de integração)
├── ⚙️ Config (Configurações de deploy)
├── 🧪 Tests (Testes e validação)
└── 📖 Docs (Documentação)
```

## 📂 Estrutura Detalhada

### 🌐 Arquivos Principais

```
portfolio-demo/
├── 📄 index.html                    # Página principal do portfolio
├── 📄 sw.js                         # Service Worker para cache
└── 📄 state-reset-system.js         # Sistema de reset de estado
```

#### `index.html`
- **Função**: Página principal que exibe a galeria de projetos
- **Características**:
  - HTML5 semântico com ARIA landmarks
  - Meta tags otimizadas para SEO
  - Estrutura responsiva
  - Integração com todos os sistemas (performance, acessibilidade, navegação)
- **Dependências**: Todos os arquivos CSS e JS principais

#### `sw.js`
- **Função**: Service Worker para cache e performance
- **Características**:
  - Cache de recursos estáticos
  - Estratégias de cache diferenciadas
  - Suporte offline básico
  - Invalidação automática de cache
- **Configuração**: Versioning automático e lista de arquivos para cache

#### `state-reset-system.js`
- **Função**: Sistema centralizado de reset de estado
- **Características**:
  - Limpa localStorage e sessionStorage
  - Reset de formulários
  - Registro de callbacks personalizados
  - Triggers automáticos em eventos de página

### 🎨 Assets (Recursos Estáticos)

```
assets/
├── 📁 css/                          # Folhas de estilo
│   ├── main.css                     # Estilos principais e variáveis CSS
│   ├── gallery.css                  # Estilos específicos da galeria
│   ├── accessibility.css            # Estilos de acessibilidade
│   ├── performance.css              # Estilos de performance
│   ├── navigation.css               # Estilos do sistema de navegação
│   └── embed.css                    # Estilos para integração externa
├── 📁 js/                           # Scripts JavaScript
│   ├── main.js                      # Script principal e configuração
│   ├── demo-loader.js               # Carregador de demos e modal
│   ├── accessibility.js             # Funcionalidades de acessibilidade
│   ├── performance.js               # Monitoramento de performance
│   ├── navigation.js                # Sistema de navegação entre demos
│   ├── embed.js                     # Sistema de integração completo
│   └── embed-minimal.js             # Versão minimalista para integração
└── 📁 images/                       # Imagens e recursos visuais
    ├── placeholder.jpg              # Imagem padrão para projetos
    └── 📁 project-previews/         # Miniaturas dos projetos
        ├── acai-dany.jpg
        ├── barbearia-raimundos.jpg
        ├── financas-pessoais.jpg
        ├── whatsapp-bot-ai.jpg
        └── landpage-divulga.jpg
```

#### CSS Architecture

##### `main.css`
- **Função**: Estilos base e sistema de design
- **Conteúdo**:
  - Variáveis CSS (cores, tipografia, espaçamentos)
  - Reset CSS e normalização
  - Utilitários e classes base
  - Grid system responsivo
- **Metodologia**: BEM (Block Element Modifier)

##### `gallery.css`
- **Função**: Estilos específicos da galeria de projetos
- **Conteúdo**:
  - Layout da galeria (CSS Grid)
  - Estilos dos cards de projeto
  - Animações e transições
  - Estados hover e focus

##### `accessibility.css`
- **Função**: Estilos para acessibilidade e WCAG compliance
- **Conteúdo**:
  - Skip links e navegação por teclado
  - Indicadores de foco visíveis
  - Suporte a high contrast mode
  - Estilos para screen readers
  - Reduced motion support

##### `performance.css`
- **Função**: Estilos otimizados para performance
- **Conteúdo**:
  - Hardware acceleration
  - Lazy loading indicators
  - Loading states e skeletons
  - Performance monitoring UI

##### `navigation.css`
- **Função**: Estilos do sistema de navegação
- **Conteúdo**:
  - Breadcrumbs e navegação entre demos
  - Menu dropdown de demos
  - Transições suaves
  - Responsive navigation

##### `embed.css`
- **Função**: Estilos para integração externa
- **Conteúdo**:
  - Componentes embeddable
  - Temas (light/dark/auto)
  - Diferentes modos de exibição
  - Isolamento de estilos

#### JavaScript Architecture

##### `main.js`
- **Função**: Script principal e orquestração
- **Conteúdo**:
  - Configuração de projetos
  - Inicialização de componentes
  - Event listeners principais
  - Integração entre módulos

##### `demo-loader.js`
- **Função**: Sistema de carregamento de demos
- **Conteúdo**:
  - Modal system
  - Iframe management
  - Loading states
  - Error handling

##### `accessibility.js`
- **Função**: Funcionalidades de acessibilidade
- **Conteúdo**:
  - Keyboard navigation
  - Focus management
  - ARIA live regions
  - Screen reader support

##### `performance.js`
- **Função**: Monitoramento e otimização de performance
- **Conteúdo**:
  - Core Web Vitals tracking
  - Resource loading optimization
  - Image lazy loading
  - Bundle optimization

##### `navigation.js`
- **Função**: Sistema de navegação entre demos
- **Conteúdo**:
  - Breadcrumb generation
  - Demo menu system
  - Smooth transitions
  - History management

##### `embed.js`
- **Função**: Sistema completo de integração
- **Conteúdo**:
  - Multiple display modes
  - Auto-initialization
  - Performance monitoring
  - Event callbacks

##### `embed-minimal.js`
- **Função**: Versão minimalista para integração
- **Conteúdo**:
  - Core functionality only
  - Inline CSS injection
  - < 3KB compressed
  - Auto-initialization

### 🖥️ Demos (Projetos Individuais)

```
demos/
├── 📁 acai-dany/                    # Demo do sistema de cardápio
│   ├── index.html                   # Página principal do demo
│   ├── style.css                    # Estilos específicos
│   ├── script.js                    # Lógica do demo
│   ├── mock-data.js                 # Dados simulados
│   └── 📁 assets/                   # Recursos específicos
├── 📁 barbearia-raimundos/          # Demo do sistema de barbearia
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── mock-data.js
│   └── 📁 assets/
├── 📁 financas-pessoais/            # Demo do sistema financeiro
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── mock-data.js
│   └── 📁 assets/
├── 📁 whatsapp-bot-ai/              # Demo do bot WhatsApp
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── mock-data.js
│   └── 📁 assets/
└── 📁 landpage-divulga/             # Demo da landing page
    ├── index.html
    ├── style.css
    ├── script.js
    ├── mock-data.js
    └── 📁 assets/
```

#### Estrutura Padrão de Demo

Cada demo segue uma estrutura consistente:

##### `index.html`
- **Função**: Página principal do demo
- **Características**:
  - Integração com sistema de navegação
  - Acessibilidade (ARIA, semantic HTML)
  - Meta tags apropriadas
  - Responsive design

##### `style.css`
- **Função**: Estilos específicos do demo
- **Características**:
  - Preserva design original
  - Integração com sistema de navegação
  - Responsive breakpoints
  - Variáveis CSS customizadas

##### `script.js`
- **Função**: Lógica e interatividade do demo
- **Características**:
  - Funcionalidades originais preservadas
  - Integração com mock data
  - Event handling
  - State management

##### `mock-data.js`
- **Função**: Dados simulados para demonstração
- **Características**:
  - Dados realistas e contextuais
  - Simulação de APIs
  - Form submission handling
  - Visual feedback system

##### `assets/`
- **Função**: Recursos específicos do demo
- **Conteúdo**:
  - Imagens específicas
  - Ícones e logos
  - Arquivos de dados
  - Recursos adicionais

### 📚 Examples (Exemplos de Integração)

```
examples/
├── 📄 basic-integration.html        # Exemplo de integração básica
└── 📄 landing-page-integration.html # Exemplo de integração em landing page
```

#### `basic-integration.html`
- **Função**: Demonstra integração básica do sistema
- **Conteúdo**:
  - Diferentes modos de exibição
  - Configurações via data attributes
  - Exemplos de customização
  - Performance monitoring

#### `landing-page-integration.html`
- **Função**: Exemplo completo de integração em landing page
- **Conteúdo**:
  - Design profissional
  - Integração com outros componentes
  - Analytics integration
  - SEO optimization

### ⚙️ Config (Configurações de Deploy)

```
portfolio-demo/
├── 📄 netlify.toml                  # Configuração Netlify
├── 📄 vercel.json                   # Configuração Vercel
├── 📄 _config.yml                   # Configuração Jekyll/GitHub Pages
└── 📁 .github/                      # Configurações GitHub
    └── 📁 workflows/                # GitHub Actions
        └── 📄 deploy.yml            # Workflow de deploy automático
```

#### `netlify.toml`
- **Função**: Configuração completa para Netlify
- **Conteúdo**:
  - Build settings
  - Redirect rules
  - Security headers
  - Performance optimizations

#### `vercel.json`
- **Função**: Configuração para Vercel
- **Conteúdo**:
  - Static build configuration
  - Route handling
  - Cache control
  - Security headers

#### `_config.yml`
- **Função**: Configuração Jekyll para GitHub Pages
- **Conteúdo**:
  - Site metadata
  - Plugin configuration
  - Build settings
  - SEO optimization

#### `.github/workflows/deploy.yml`
- **Função**: GitHub Actions para deploy automático
- **Conteúdo**:
  - Build process
  - Testing pipeline
  - Deployment steps
  - Environment configuration

### 🧪 Tests (Testes e Validação)

```
portfolio-demo/
├── 📄 test-deployment.html          # Interface de testes de deployment
├── 📄 test-deployment.js            # Lógica de testes de deployment
├── 📄 test-performance.html         # Interface de testes de performance
├── 📄 test-accessibility.html       # Interface de testes de acessibilidade
├── 📄 test-integration.html         # Interface de testes de integração
├── 📄 validate-deployment.ps1       # Script PowerShell de validação
├── 📄 validate-performance.ps1      # Script PowerShell de performance
├── 📄 validate-accessibility.js     # Validação de acessibilidade
├── 📄 validate-integration.js       # Validação de integração
└── 📄 simple-validation.js          # Validação simples para browser
```

#### Test Interfaces
- **Função**: Interfaces web para execução de testes
- **Características**:
  - Execução interativa
  - Relatórios detalhados
  - Métricas em tempo real
  - Export de resultados

#### Validation Scripts
- **Função**: Scripts automatizados de validação
- **Características**:
  - Execução via linha de comando
  - Integração com CI/CD
  - Relatórios estruturados
  - Exit codes apropriados

### 📖 Docs (Documentação)

```
portfolio-demo/
├── 📄 README.md                     # Documentação principal
├── 📄 SETUP.md                      # Guia de configuração inicial
├── 📄 PROJECT_STRUCTURE.md          # Este documento
├── 📄 DEPLOYMENT.md                 # Guia de deployment
├── 📄 INTEGRATION_GUIDE.md          # Guia de integração
├── 📄 TROUBLESHOOTING.md            # Guia de solução de problemas
├── 📄 CONTRIBUTING.md               # Guia de contribuição
└── 📄 IMPLEMENTATION_SUMMARY.md     # Resumo da implementação
```

## 🔄 Fluxo de Dados

### 1. Inicialização
```
index.html → main.js → Configuração de projetos → Renderização da galeria
```

### 2. Interação do Usuário
```
Click no projeto → demo-loader.js → Modal → Iframe → Demo específico
```

### 3. Navegação entre Demos
```
Demo → navigation.js → Breadcrumbs → Transição → Novo demo
```

### 4. Reset de Estado
```
Page load/refresh → state-reset-system.js → Limpa storage → Reset forms
```

## 🏗️ Padrões de Arquitetura

### 1. Modularidade
- Cada funcionalidade em arquivo separado
- Interfaces bem definidas entre módulos
- Baixo acoplamento, alta coesão

### 2. Responsabilidade Única
- Cada arquivo tem uma responsabilidade específica
- Separação clara entre apresentação e lógica
- Isolamento de funcionalidades

### 3. Extensibilidade
- Sistema de plugins para novas funcionalidades
- Configuração externa de projetos
- Hooks para customização

### 4. Performance
- Lazy loading de recursos
- Code splitting por funcionalidade
- Cache strategies diferenciadas

### 5. Acessibilidade
- WCAG 2.1 AA compliance
- Progressive enhancement
- Semantic HTML structure

## 🔧 Pontos de Extensão

### 1. Novos Demos
- Adicionar pasta em `demos/`
- Seguir estrutura padrão
- Atualizar configuração em `main.js`

### 2. Novos Estilos
- Adicionar arquivo CSS em `assets/css/`
- Incluir no `index.html`
- Usar variáveis CSS existentes

### 3. Novas Funcionalidades
- Adicionar arquivo JS em `assets/js/`
- Seguir padrões de módulo existentes
- Documentar API pública

### 4. Novos Testes
- Adicionar arquivo de teste
- Seguir convenções de nomenclatura
- Integrar com sistema de validação

## 📊 Métricas e Monitoramento

### 1. Performance
- Core Web Vitals tracking
- Resource loading metrics
- User interaction timing

### 2. Acessibilidade
- WCAG compliance monitoring
- Keyboard navigation tracking
- Screen reader compatibility

### 3. Uso
- Project view analytics
- User interaction patterns
- Error tracking

### 4. Qualidade
- Code coverage metrics
- Test execution results
- Deployment success rates

## 🔒 Segurança

### 1. Content Security Policy
- Configurado em headers de deploy
- Prevenção de XSS
- Resource origin validation

### 2. Iframe Security
- Sandbox attributes
- Origin restrictions
- Secure communication

### 3. Data Protection
- No persistent storage
- State reset on session end
- Privacy-first design

---

**📚 Esta documentação é mantida atualizada com cada release do projeto.**

Para mais detalhes sobre implementação específica, consulte os arquivos de implementação (`TASK_*.md`) na raiz do projeto.