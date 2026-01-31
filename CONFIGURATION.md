# ⚙️ Configuration Guide - Portfolio Demo System

Este guia fornece instruções detalhadas para configurar e personalizar o Portfolio Demo System de acordo com suas necessidades específicas.

## 📋 Visão Geral

O Portfolio Demo System oferece múltiplas opções de configuração:

- **Projetos** - Adicionar, remover ou modificar projetos
- **Visual** - Cores, tipografia, layout
- **Performance** - Otimizações e cache
- **Acessibilidade** - Configurações WCAG
- **Integração** - Modos de embed e APIs
- **Deploy** - Configurações de hospedagem

## 🎯 Configuração de Projetos

### 1. Configuração Principal

Edite o arquivo `assets/js/main.js` para configurar seus projetos:

```javascript
// Configuração dos projetos
const projects = {
    "meu-projeto-1": {
        // Informações básicas
        name: "Meu Projeto 1",
        description: "Descrição detalhada do projeto",
        
        // Recursos visuais
        preview: "assets/images/project-previews/meu-projeto-1.jpg",
        icon: "🚀", // Emoji ou classe CSS
        
        // Tecnologias utilizadas
        technologies: ["React", "Node.js", "MongoDB"],
        
        // Características principais
        features: [
            "Autenticação JWT",
            "API RESTful",
            "Interface Responsiva"
        ],
        
        // Configuração do demo
        demoPath: "./demos/meu-projeto-1/",
        entryPoint: "index.html",
        
        // Metadados opcionais
        category: "web-app",
        status: "completed", // completed, in-progress, planned
        year: 2024,
        client: "Nome do Cliente",
        repository: "https://github.com/usuario/projeto",
        liveUrl: "https://projeto.com",
        
        // Configurações específicas
        config: {
            allowFullscreen: true,
            enableNavigation: true,
            showSourceCode: true,
            loadingTimeout: 5000
        }
    },
    
    "meu-projeto-2": {
        name: "Meu Projeto 2",
        description: "Outro projeto incrível",
        preview: "assets/images/project-previews/meu-projeto-2.jpg",
        technologies: ["Vue.js", "Python", "PostgreSQL"],
        features: ["Dashboard Analytics", "Relatórios PDF"],
        demoPath: "./demos/meu-projeto-2/",
        entryPoint: "index.html"
    }
};
```

### 2. Configuração Avançada de Projetos

#### Categorização
```javascript
const projectCategories = {
    "web-apps": {
        name: "Aplicações Web",
        icon: "🌐",
        color: "#3b82f6"
    },
    "mobile-apps": {
        name: "Apps Mobile",
        icon: "📱",
        color: "#10b981"
    },
    "apis": {
        name: "APIs e Backend",
        icon: "⚡",
        color: "#f59e0b"
    }
};

// Usar categorias nos projetos
const projects = {
    "meu-app": {
        name: "Meu App",
        category: "web-apps", // Referência à categoria
        // ... outras configurações
    }
};
```

#### Configuração de Status
```javascript
const projectStatuses = {
    "completed": {
        label: "Concluído",
        color: "#10b981",
        icon: "✅"
    },
    "in-progress": {
        label: "Em Desenvolvimento",
        color: "#f59e0b",
        icon: "🚧"
    },
    "planned": {
        label: "Planejado",
        color: "#6b7280",
        icon: "📋"
    }
};
```

### 3. Configuração de Filtros

```javascript
// Configuração de filtros na galeria
const galleryConfig = {
    enableFilters: true,
    filterBy: ["category", "technology", "status"],
    defaultFilter: "all",
    showProjectCount: true,
    
    filters: {
        technology: {
            "react": "React",
            "vue": "Vue.js",
            "angular": "Angular",
            "nodejs": "Node.js",
            "python": "Python"
        },
        category: projectCategories,
        status: projectStatuses
    }
};
```

## 🎨 Configuração Visual

### 1. Sistema de Cores

Edite `assets/css/main.css` para personalizar o tema:

```css
:root {
    /* === CORES PRINCIPAIS === */
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;    /* Cor principal */
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;
    
    /* === CORES SECUNDÁRIAS === */
    --secondary-50: #f8fafc;
    --secondary-100: #f1f5f9;
    --secondary-200: #e2e8f0;
    --secondary-300: #cbd5e1;
    --secondary-400: #94a3b8;
    --secondary-500: #64748b;   /* Cor secundária */
    --secondary-600: #475569;
    --secondary-700: #334155;
    --secondary-800: #1e293b;
    --secondary-900: #0f172a;
    
    /* === CORES DE DESTAQUE === */
    --accent-color: #f59e0b;     /* Amarelo/Laranja */
    --success-color: #10b981;    /* Verde */
    --warning-color: #f59e0b;    /* Amarelo */
    --error-color: #ef4444;      /* Vermelho */
    --info-color: #3b82f6;       /* Azul */
    
    /* === CORES DE FUNDO === */
    --bg-primary: #ffffff;       /* Fundo principal */
    --bg-secondary: #f8fafc;     /* Fundo secundário */
    --bg-tertiary: #f1f5f9;      /* Fundo terciário */
    --bg-card: #ffffff;          /* Fundo dos cards */
    --bg-modal: rgba(0, 0, 0, 0.5); /* Fundo do modal */
    
    /* === CORES DE TEXTO === */
    --text-primary: #1e293b;     /* Texto principal */
    --text-secondary: #64748b;   /* Texto secundário */
    --text-muted: #94a3b8;       /* Texto esmaecido */
    --text-inverse: #ffffff;     /* Texto inverso */
    
    /* === CORES DE BORDA === */
    --border-color: #e2e8f0;     /* Borda padrão */
    --border-focus: #3b82f6;     /* Borda em foco */
    --border-error: #ef4444;     /* Borda de erro */
}
```

### 2. Tema Escuro

```css
/* Tema escuro */
[data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --bg-card: #1e293b;
    
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    
    --border-color: #334155;
}

/* Auto theme (segue preferência do sistema) */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #0f172a;
        --bg-secondary: #1e293b;
        /* ... outras variáveis */
    }
}
```

### 3. Tipografia

```css
:root {
    /* === FAMÍLIAS DE FONTE === */
    --font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-family-heading: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace;
    
    /* === TAMANHOS DE FONTE === */
    --font-size-xs: 0.75rem;     /* 12px */
    --font-size-sm: 0.875rem;    /* 14px */
    --font-size-base: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;    /* 18px */
    --font-size-xl: 1.25rem;     /* 20px */
    --font-size-2xl: 1.5rem;     /* 24px */
    --font-size-3xl: 1.875rem;   /* 30px */
    --font-size-4xl: 2.25rem;    /* 36px */
    --font-size-5xl: 3rem;       /* 48px */
    
    /* === PESOS DE FONTE === */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    
    /* === ALTURA DE LINHA === */
    --line-height-tight: 1.25;
    --line-height-snug: 1.375;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    --line-height-loose: 2;
}
```

### 4. Espaçamentos e Layout

```css
:root {
    /* === ESPAÇAMENTOS === */
    --space-1: 0.25rem;    /* 4px */
    --space-2: 0.5rem;     /* 8px */
    --space-3: 0.75rem;    /* 12px */
    --space-4: 1rem;       /* 16px */
    --space-5: 1.25rem;    /* 20px */
    --space-6: 1.5rem;     /* 24px */
    --space-8: 2rem;       /* 32px */
    --space-10: 2.5rem;    /* 40px */
    --space-12: 3rem;      /* 48px */
    --space-16: 4rem;      /* 64px */
    --space-20: 5rem;      /* 80px */
    --space-24: 6rem;      /* 96px */
    
    /* === RAIOS DE BORDA === */
    --border-radius-sm: 0.125rem;   /* 2px */
    --border-radius: 0.25rem;       /* 4px */
    --border-radius-md: 0.375rem;   /* 6px */
    --border-radius-lg: 0.5rem;     /* 8px */
    --border-radius-xl: 0.75rem;    /* 12px */
    --border-radius-2xl: 1rem;      /* 16px */
    --border-radius-full: 9999px;   /* Circular */
    
    /* === SOMBRAS === */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    
    /* === BREAKPOINTS === */
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
    --breakpoint-2xl: 1536px;
}
```

### 5. Animações e Transições

```css
:root {
    /* === DURAÇÕES === */
    --duration-75: 75ms;
    --duration-100: 100ms;
    --duration-150: 150ms;
    --duration-200: 200ms;
    --duration-300: 300ms;
    --duration-500: 500ms;
    --duration-700: 700ms;
    --duration-1000: 1000ms;
    
    /* === EASING === */
    --ease-linear: linear;
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    
    /* === TRANSIÇÕES COMUNS === */
    --transition-colors: color var(--duration-150) var(--ease-in-out),
                        background-color var(--duration-150) var(--ease-in-out),
                        border-color var(--duration-150) var(--ease-in-out);
    --transition-opacity: opacity var(--duration-150) var(--ease-in-out);
    --transition-shadow: box-shadow var(--duration-150) var(--ease-in-out);
    --transition-transform: transform var(--duration-150) var(--ease-in-out);
    --transition-all: all var(--duration-150) var(--ease-in-out);
}

/* Respeitar preferência de movimento reduzido */
@media (prefers-reduced-motion: reduce) {
    :root {
        --duration-75: 0ms;
        --duration-100: 0ms;
        --duration-150: 0ms;
        --duration-200: 0ms;
        --duration-300: 0ms;
        --duration-500: 0ms;
        --duration-700: 0ms;
        --duration-1000: 0ms;
    }
}
```

## ⚡ Configuração de Performance

### 1. Service Worker

Edite `sw.js` para configurar cache:

```javascript
// Configuração do Service Worker
const CACHE_CONFIG = {
    version: 'v1.0.0',
    staticCacheName: 'portfolio-static-v1.0.0',
    dynamicCacheName: 'portfolio-dynamic-v1.0.0',
    imageCacheName: 'portfolio-images-v1.0.0',
    
    // Arquivos para cache estático
    staticAssets: [
        '/',
        '/index.html',
        '/assets/css/main.css',
        '/assets/css/gallery.css',
        '/assets/js/main.js',
        '/assets/js/demo-loader.js',
        '/assets/images/placeholder.jpg'
    ],
    
    // Configurações de cache
    maxEntries: {
        images: 50,
        pages: 20,
        api: 30
    },
    
    maxAge: {
        images: 30 * 24 * 60 * 60, // 30 dias
        pages: 7 * 24 * 60 * 60,   // 7 dias
        api: 24 * 60 * 60          // 1 dia
    }
};
```

### 2. Lazy Loading

Configure lazy loading em `assets/js/performance.js`:

```javascript
// Configuração de lazy loading
const LAZY_LOADING_CONFIG = {
    // Configurações do Intersection Observer
    rootMargin: '50px',
    threshold: 0.1,
    
    // Configurações de imagem
    enableNativeLazyLoading: true,
    placeholderColor: '#f3f4f6',
    fadeInDuration: 300,
    
    // Configurações de conteúdo
    deferNonCritical: true,
    loadingTimeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000
};
```

### 3. Bundle Optimization

```javascript
// Configuração de otimização de bundle
const BUNDLE_CONFIG = {
    // Recursos críticos (carregam primeiro)
    criticalResources: [
        'assets/css/main.css',
        'assets/css/gallery.css',
        'assets/js/main.js'
    ],
    
    // Recursos não-críticos (carregam depois)
    nonCriticalResources: [
        'assets/css/accessibility.css',
        'assets/css/performance.css',
        'assets/js/accessibility.js',
        'assets/js/performance.js'
    ],
    
    // Preload hints
    preloadResources: [
        { href: 'assets/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: true }
    ],
    
    // DNS prefetch
    dnsPrefetch: [
        '//fonts.googleapis.com',
        '//fonts.gstatic.com'
    ]
};
```

## ♿ Configuração de Acessibilidade

### 1. Configuração WCAG

Edite `assets/js/accessibility.js`:

```javascript
// Configuração de acessibilidade
const ACCESSIBILITY_CONFIG = {
    // Nível de conformidade WCAG
    wcagLevel: 'AA', // A, AA, AAA
    
    // Configurações de foco
    focusManagement: {
        enableFocusTrap: true,
        enableFocusRestore: true,
        visibleFocusIndicator: true,
        focusOutlineWidth: '3px',
        focusOutlineColor: 'var(--primary-500)'
    },
    
    // Configurações de navegação por teclado
    keyboardNavigation: {
        enableArrowKeys: true,
        enableHomeEnd: true,
        enablePageUpDown: false,
        enableTabNavigation: true
    },
    
    // Configurações de leitor de tela
    screenReader: {
        enableLiveRegions: true,
        politenessLevel: 'polite', // polite, assertive
        announcePageChanges: true,
        announceModalChanges: true
    },
    
    // Atalhos de teclado
    keyboardShortcuts: {
        'Alt+M': 'focusMainContent',
        'Alt+N': 'focusNavigation',
        'Alt+S': 'focusSearch',
        'Escape': 'closeModal'
    }
};
```

### 2. Configuração de Contraste

```css
/* Configuração de alto contraste */
@media (prefers-contrast: high) {
    :root {
        --text-primary: #000000;
        --bg-primary: #ffffff;
        --border-color: #000000;
        --focus-outline-color: #000000;
    }
    
    .project-card {
        border: 2px solid var(--border-color);
    }
    
    .project-card:focus {
        outline: 3px solid var(--focus-outline-color);
        outline-offset: 2px;
    }
}
```

### 3. Configuração de Movimento Reduzido

```css
/* Configuração para usuários que preferem movimento reduzido */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .project-card {
        transform: none !important;
    }
    
    .modal {
        animation: none !important;
    }
}
```

## 🔗 Configuração de Integração

### 1. Configuração de Embed

Edite `assets/js/embed.js`:

```javascript
// Configuração padrão para embed
const EMBED_DEFAULT_CONFIG = {
    // Modo de exibição
    mode: 'gallery', // gallery, carousel, grid, list
    
    // Tema
    theme: 'light', // light, dark, auto
    
    // Limitações
    limit: 0, // 0 = todos os projetos
    projects: [], // [] = todos os projetos
    
    // URLs
    baseUrl: '',
    demoPath: './demos/',
    
    // Comportamento
    openMode: 'modal', // modal, newTab, iframe
    enableNavigation: true,
    enableSearch: false,
    enableFilters: false,
    
    // Performance
    lazyLoad: true,
    preloadImages: true,
    deferNonCritical: true,
    
    // Callbacks
    onProjectClick: null,
    onLoad: null,
    onError: null,
    
    // Customização
    customCSS: '',
    customClasses: {}
};
```

### 2. Modos de Integração

#### Gallery Mode
```javascript
const galleryConfig = {
    mode: 'gallery',
    showHeader: true,
    showDescription: true,
    showTechnologies: true,
    showFeatures: true,
    cardsPerRow: {
        mobile: 1,
        tablet: 2,
        desktop: 3
    }
};
```

#### Carousel Mode
```javascript
const carouselConfig = {
    mode: 'carousel',
    autoplay: false,
    autoplayDelay: 5000,
    showDots: true,
    showArrows: true,
    infinite: true,
    slidesToShow: {
        mobile: 1,
        tablet: 2,
        desktop: 3
    }
};
```

#### Grid Mode
```javascript
const gridConfig = {
    mode: 'grid',
    compact: true,
    showHeader: false,
    columns: {
        mobile: 1,
        tablet: 2,
        desktop: 4
    }
};
```

#### List Mode
```javascript
const listConfig = {
    mode: 'list',
    showThumbnails: true,
    showDescriptions: false,
    maxItems: 5
};
```

## 🚀 Configuração de Deploy

### 1. Netlify

Edite `netlify.toml`:

```toml
[build]
  publish = "."
  command = ""

[build.environment]
  NODE_VERSION = "18"

# Redirects e rewrites
[[redirects]]
  from = "/demo/*"
  to = "/demos/:splat"
  status = 200

# Headers de segurança
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache para assets estáticos
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Cache para HTML
[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

### 2. Vercel

Edite `vercel.json`:

```json
{
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/demo/(.*)",
      "dest": "/demos/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. GitHub Pages

Edite `_config.yml`:

```yaml
# Configurações do site
title: "Meu Portfolio"
description: "Demonstrações interativas dos meus projetos"
url: "https://usuario.github.io"
baseurl: "/portfolio-demo"

# Configurações de build
markdown: kramdown
highlighter: rouge
permalink: pretty

# Plugins
plugins:
  - jekyll-sitemap
  - jekyll-feed
  - jekyll-seo-tag

# Configurações SEO
lang: pt-BR
author: "Seu Nome"

# Exclusões
exclude:
  - node_modules/
  - .git/
  - .github/
  - README.md
  - package*.json
  - "*.log"

# Compressão
sass:
  style: compressed

# Configurações de servidor
host: 0.0.0.0
port: 4000
```

## 🔧 Configuração de Desenvolvimento

### 1. Ambiente Local

Crie `.env.local`:

```bash
# Configurações de desenvolvimento
NODE_ENV=development
PORT=8000
HOST=localhost

# URLs
BASE_URL=http://localhost:8000
API_URL=http://localhost:3000/api

# Features flags
ENABLE_DEBUG=true
ENABLE_ANALYTICS=false
ENABLE_SERVICE_WORKER=false

# Performance
ENABLE_LAZY_LOADING=true
ENABLE_IMAGE_OPTIMIZATION=true
CACHE_DURATION=3600
```

### 2. Scripts de Desenvolvimento

Crie `package.json`:

```json
{
  "name": "portfolio-demo-system",
  "version": "1.0.0",
  "scripts": {
    "dev": "python -m http.server 8000",
    "build": "npm run optimize",
    "optimize": "npm run optimize:css && npm run optimize:js && npm run optimize:images",
    "optimize:css": "cleancss -o assets/css/main.min.css assets/css/main.css",
    "optimize:js": "terser assets/js/main.js -o assets/js/main.min.js",
    "optimize:images": "imagemin assets/images/* --out-dir=assets/images/optimized",
    "test": "npm run test:html && npm run test:css && npm run test:js && npm run test:accessibility",
    "test:html": "html-validate index.html",
    "test:css": "stylelint assets/css/*.css",
    "test:js": "eslint assets/js/*.js",
    "test:accessibility": "axe-cli http://localhost:8000",
    "lighthouse": "lighthouse http://localhost:8000 --output html --output-path lighthouse-report.html",
    "deploy:netlify": "netlify deploy --prod",
    "deploy:vercel": "vercel --prod"
  },
  "devDependencies": {
    "clean-css-cli": "^5.6.2",
    "terser": "^5.16.6",
    "imagemin-cli": "^7.0.0",
    "html-validate": "^7.13.0",
    "stylelint": "^15.2.0",
    "eslint": "^8.35.0",
    "@axe-core/cli": "^4.6.0",
    "lighthouse": "^10.0.1"
  }
}
```

## 📊 Configuração de Analytics

### 1. Google Analytics

Adicione no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
        // Configurações de privacidade
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
    });
</script>
```

### 2. Eventos Personalizados

```javascript
// Configuração de eventos
const ANALYTICS_CONFIG = {
    enabled: true,
    provider: 'google', // google, plausible, custom
    
    // Eventos para rastrear
    trackEvents: {
        projectView: true,
        demoOpen: true,
        navigationClick: true,
        searchUsage: true,
        filterUsage: true,
        errorOccurred: true
    },
    
    // Configurações de privacidade
    respectDoNotTrack: true,
    anonymizeIP: true,
    cookieConsent: true
};

// Função para rastrear eventos
function trackEvent(eventName, parameters = {}) {
    if (!ANALYTICS_CONFIG.enabled) return;
    
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'portfolio',
            ...parameters
        });
    }
}
```

---

**⚙️ Configuração concluída!** Seu Portfolio Demo System está personalizado e pronto para uso.

Para mais detalhes sobre implementação específica, consulte os outros arquivos de documentação.