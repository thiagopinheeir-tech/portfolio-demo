# 🛠️ Setup Guide - Portfolio Demo System

Este guia fornece instruções detalhadas para configurar o Portfolio Demo System do zero, incluindo preparação do ambiente, configuração inicial e primeiros passos.

## 📋 Pré-requisitos

### Requisitos do Sistema

- **Navegador moderno** (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Servidor web local** (opcional para desenvolvimento)
- **Editor de código** (VS Code, Sublime Text, etc.)
- **Git** (para controle de versão)

### Conhecimentos Recomendados

- HTML5 básico
- CSS3 e Flexbox/Grid
- JavaScript ES6+
- Conceitos de responsividade
- Básico de acessibilidade web

## 🚀 Instalação Rápida

### 1. Download do Projeto

#### Opção A: Clone via Git
```bash
git clone https://github.com/seu-usuario/portfolio-demo.git
cd portfolio-demo
```

#### Opção B: Download ZIP
1. Baixe o arquivo ZIP do repositório
2. Extraia para uma pasta de sua escolha
3. Navegue até a pasta extraída

### 2. Estrutura de Arquivos

Após o download, você deve ter a seguinte estrutura:

```
portfolio-demo/
├── 📄 index.html                    # Página principal
├── 📁 assets/                       # Recursos estáticos
│   ├── 📁 css/                      # Folhas de estilo
│   │   ├── main.css                 # Estilos principais
│   │   ├── gallery.css              # Estilos da galeria
│   │   ├── accessibility.css        # Estilos de acessibilidade
│   │   ├── performance.css          # Estilos de performance
│   │   ├── navigation.css           # Estilos de navegação
│   │   └── embed.css                # Estilos para integração
│   ├── 📁 js/                       # Scripts JavaScript
│   │   ├── main.js                  # Script principal
│   │   ├── demo-loader.js           # Carregador de demos
│   │   ├── accessibility.js         # Funcionalidades de acessibilidade
│   │   ├── performance.js           # Monitoramento de performance
│   │   ├── navigation.js            # Sistema de navegação
│   │   ├── embed.js                 # Sistema de integração
│   │   └── embed-minimal.js         # Versão minimalista
│   └── 📁 images/                   # Imagens e recursos visuais
│       ├── placeholder.jpg          # Imagem padrão
│       └── 📁 project-previews/     # Miniaturas dos projetos
├── 📁 demos/                        # Demonstrações dos projetos
│   ├── 📁 acai-dany/               # Demo Açaí da Dany
│   ├── 📁 barbearia-raimundos/     # Demo Barbearia Raimundos
│   ├── 📁 financas-pessoais/       # Demo Finanças Pessoais
│   ├── 📁 whatsapp-bot-ai/         # Demo WhatsApp Bot AI
│   └── 📁 landpage-divulga/        # Demo Landing Page
├── 📁 examples/                     # Exemplos de integração
│   ├── basic-integration.html       # Integração básica
│   └── landing-page-integration.html # Integração em landing page
├── 📁 .github/                      # Configurações GitHub
│   └── 📁 workflows/                # GitHub Actions
│       └── deploy.yml               # Deploy automático
├── 📄 netlify.toml                  # Configuração Netlify
├── 📄 vercel.json                   # Configuração Vercel
├── 📄 _config.yml                   # Configuração Jekyll/GitHub Pages
├── 📄 sw.js                         # Service Worker
├── 📄 README.md                     # Documentação principal
├── 📄 DEPLOYMENT.md                 # Guia de deployment
├── 📄 INTEGRATION_GUIDE.md          # Guia de integração
└── 📄 SETUP.md                      # Este guia
```

### 3. Teste Local

#### Opção A: Servidor Python (Recomendado)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Opção B: Node.js serve
```bash
# Instalar serve globalmente
npm install -g serve

# Servir arquivos
serve . -p 8000
```

#### Opção C: PHP Built-in Server
```bash
php -S localhost:8000
```

#### Opção D: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### 4. Verificação da Instalação

Acesse `http://localhost:8000` e verifique:

- [ ] ✅ Página principal carrega corretamente
- [ ] ✅ Galeria de projetos é exibida
- [ ] ✅ Cards dos projetos são clicáveis
- [ ] ✅ Modal abre ao clicar em um projeto
- [ ] ✅ Demos carregam dentro do modal
- [ ] ✅ Navegação entre demos funciona
- [ ] ✅ Design é responsivo (teste em diferentes tamanhos)

## ⚙️ Configuração Inicial

### 1. Configuração de Projetos

Edite o arquivo `assets/js/main.js` para personalizar os projetos:

```javascript
// Configuração dos projetos
const projects = {
    "acai-dany": {
        name: "Açaí da Dany",
        description: "Sistema de cardápio direto para WhatsApp",
        preview: "assets/images/project-previews/acai-dany.jpg",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: ["Cardápio Digital", "Integração WhatsApp", "Responsive Design"],
        demoPath: "./demos/acai-dany/",
        entryPoint: "index.html"
    },
    // Adicione seus próprios projetos aqui
    "meu-projeto": {
        name: "Meu Projeto",
        description: "Descrição do meu projeto",
        preview: "assets/images/project-previews/meu-projeto.jpg",
        technologies: ["React", "Node.js", "MongoDB"],
        features: ["Feature 1", "Feature 2", "Feature 3"],
        demoPath: "./demos/meu-projeto/",
        entryPoint: "index.html"
    }
};
```

### 2. Personalização Visual

#### Cores e Tema
Edite `assets/css/main.css` para personalizar as cores:

```css
:root {
    /* Cores principais */
    --primary-color: #2563eb;        /* Azul principal */
    --primary-hover: #1d4ed8;        /* Azul hover */
    --secondary-color: #64748b;      /* Cinza secundário */
    --accent-color: #f59e0b;         /* Amarelo destaque */
    
    /* Cores de fundo */
    --bg-primary: #ffffff;           /* Fundo principal */
    --bg-secondary: #f8fafc;         /* Fundo secundário */
    --bg-card: #ffffff;              /* Fundo dos cards */
    
    /* Cores de texto */
    --text-primary: #1e293b;         /* Texto principal */
    --text-secondary: #64748b;       /* Texto secundário */
    --text-muted: #94a3b8;           /* Texto esmaecido */
    
    /* Sombras */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    
    /* Bordas */
    --border-radius: 0.5rem;         /* Raio das bordas */
    --border-color: #e2e8f0;         /* Cor das bordas */
}
```

#### Tipografia
```css
:root {
    /* Fontes */
    --font-family-base: 'Inter', system-ui, -apple-system, sans-serif;
    --font-family-heading: 'Inter', system-ui, -apple-system, sans-serif;
    
    /* Tamanhos de fonte */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
}
```

### 3. Configuração de Imagens

#### Miniaturas dos Projetos
Adicione imagens de preview em `assets/images/project-previews/`:

- **Formato recomendado**: JPG ou WebP
- **Dimensões**: 400x300px (4:3)
- **Tamanho máximo**: 100KB por imagem
- **Nomenclatura**: `nome-do-projeto.jpg`

#### Otimização de Imagens
```bash
# Usando ImageMagick para redimensionar
convert original.jpg -resize 400x300^ -gravity center -extent 400x300 preview.jpg

# Usando FFmpeg para converter para WebP
ffmpeg -i preview.jpg -c:v libwebp -quality 80 preview.webp
```

### 4. Configuração de Demos

#### Estrutura de Demo
Cada demo deve seguir esta estrutura:

```
demos/meu-projeto/
├── index.html              # Página principal do demo
├── style.css               # Estilos específicos
├── script.js               # Scripts específicos
├── mock-data.js            # Dados simulados
├── assets/                 # Recursos do demo
│   ├── images/
│   ├── css/
│   └── js/
└── README.md               # Documentação do demo
```

#### Template de Demo
Use este template para criar novos demos:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto - Demo</title>
    
    <!-- Estilos de navegação -->
    <link rel="stylesheet" href="../../assets/css/navigation.css">
    <link rel="stylesheet" href="../../assets/css/accessibility.css">
    
    <!-- Estilos específicos do demo -->
    <link rel="stylesheet" href="style.css">
</head>
<body data-demo="meu-projeto">
    <!-- Navegação será inserida automaticamente -->
    
    <main id="main-content" role="main">
        <div class="demo-container">
            <h1>Meu Projeto</h1>
            <p>Conteúdo do demo aqui...</p>
        </div>
    </main>

    <!-- Scripts de navegação -->
    <script src="../../assets/js/navigation.js"></script>
    <script src="../../assets/js/accessibility.js"></script>
    
    <!-- Sistema de reset de estado -->
    <script src="../../state-reset-system.js"></script>
    
    <!-- Scripts específicos do demo -->
    <script src="mock-data.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

## 🔧 Configuração Avançada

### 1. Configuração de Performance

#### Service Worker
O Service Worker está configurado em `sw.js`. Para personalizar:

```javascript
// Versão do cache (atualize quando fizer mudanças)
const CACHE_VERSION = 'v1.0.0';

// Arquivos para cache
const STATIC_CACHE_FILES = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/js/main.js',
    // Adicione seus arquivos aqui
];
```

#### Lazy Loading
Configure lazy loading em `assets/js/performance.js`:

```javascript
// Configuração de lazy loading
const lazyLoadConfig = {
    rootMargin: '50px',      // Margem para pré-carregamento
    threshold: 0.1,          // Porcentagem visível para trigger
    enableNative: true       // Usar lazy loading nativo quando disponível
};
```

### 2. Configuração de Acessibilidade

#### Atalhos de Teclado
Personalize atalhos em `assets/js/accessibility.js`:

```javascript
// Atalhos de teclado personalizados
const keyboardShortcuts = {
    'Alt+M': () => focusMainContent(),
    'Alt+N': () => focusNavigation(),
    'Alt+S': () => focusSearch(),
    'Escape': () => closeModal()
};
```

#### Configuração de Screen Reader
```javascript
// Configuração para leitores de tela
const screenReaderConfig = {
    announcePageChanges: true,
    announceModalChanges: true,
    announceFormErrors: true,
    politenessLevel: 'polite'  // 'polite' ou 'assertive'
};
```

### 3. Configuração de Analytics

#### Google Analytics
Adicione no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Eventos Personalizados
```javascript
// Rastrear cliques em projetos
function trackProjectClick(projectName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'project_view', {
            'project_name': projectName,
            'event_category': 'portfolio',
            'event_label': projectName
        });
    }
}
```

## 🧪 Testes e Validação

### 1. Testes Automatizados

#### Executar Testes de Deployment
```bash
# PowerShell (Windows)
.\validate-deployment.ps1

# Teste específico para Netlify
.\validate-deployment.ps1 -Platform netlify
```

#### Testes via Interface Web
Abra os seguintes arquivos no navegador:

- `test-deployment.html` - Testes de deployment
- `test-performance.html` - Testes de performance
- `test-accessibility.html` - Testes de acessibilidade
- `test-integration.html` - Testes de integração

### 2. Testes Manuais

#### Checklist de Funcionalidade
- [ ] Página principal carrega em < 3 segundos
- [ ] Todos os 5 demos funcionam corretamente
- [ ] Modal abre e fecha sem erros
- [ ] Navegação entre demos funciona
- [ ] Breadcrumbs mostram caminho correto
- [ ] Botão "Voltar ao Portfolio" funciona
- [ ] Design é responsivo em mobile/tablet
- [ ] Funciona sem JavaScript (graceful degradation)

#### Checklist de Acessibilidade
- [ ] Navegação por teclado funciona (Tab, Enter, Escape)
- [ ] Indicadores de foco são visíveis
- [ ] Textos alternativos estão presentes
- [ ] Contraste de cores é adequado
- [ ] Funciona com leitor de tela
- [ ] Estrutura HTML é semântica

#### Checklist de Performance
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Lighthouse Score > 90 (Acessibilidade)
- [ ] Lighthouse Score > 90 (Best Practices)
- [ ] Lighthouse Score > 90 (SEO)
- [ ] Core Web Vitals dentro dos limites
- [ ] Imagens otimizadas e comprimidas

### 3. Ferramentas de Teste

#### Linha de Comando
```bash
# Lighthouse
npx lighthouse http://localhost:8000 --output html

# Validação HTML
npx html-validate index.html

# Teste de acessibilidade
npx axe-cli http://localhost:8000

# Teste de links quebrados
npx broken-link-checker http://localhost:8000
```

#### Extensões do Navegador
- **Lighthouse** - Auditoria completa
- **axe DevTools** - Teste de acessibilidade
- **WAVE** - Avaliação de acessibilidade web
- **ColorZilla** - Verificação de contraste

## 🚀 Próximos Passos

### 1. Personalização
- [ ] Adicionar seus próprios projetos
- [ ] Personalizar cores e tipografia
- [ ] Criar imagens de preview
- [ ] Configurar analytics

### 2. Otimização
- [ ] Otimizar imagens
- [ ] Configurar Service Worker
- [ ] Implementar lazy loading
- [ ] Configurar CDN

### 3. Deploy
- [ ] Escolher plataforma de hospedagem
- [ ] Configurar domínio personalizado
- [ ] Configurar HTTPS
- [ ] Configurar monitoramento

### 4. Manutenção
- [ ] Configurar backups
- [ ] Monitorar performance
- [ ] Atualizar dependências
- [ ] Coletar feedback dos usuários

## 📞 Suporte

### Recursos de Ajuda
- **Documentação**: Consulte os arquivos README.md e DEPLOYMENT.md
- **Exemplos**: Veja a pasta `examples/` para referências
- **Testes**: Use os arquivos `test-*.html` para validação
- **Issues**: Abra issues no repositório para problemas específicos

### Comunidade
- **GitHub Discussions**: Para discussões gerais
- **Stack Overflow**: Use a tag `portfolio-demo-system`
- **Discord**: Junte-se ao servidor da comunidade

### Solução de Problemas Comuns
Consulte o arquivo `TROUBLESHOOTING.md` para soluções de problemas frequentes.

---

**🎉 Parabéns!** Seu Portfolio Demo System está configurado e pronto para uso!

Próximo passo: Consulte o `DEPLOYMENT.md` para fazer deploy em produção.