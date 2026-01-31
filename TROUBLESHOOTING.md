# 🔧 Troubleshooting Guide - Portfolio Demo System

Este guia fornece soluções para problemas comuns que podem ocorrer durante o uso, configuração ou deployment do Portfolio Demo System.

## 🚨 Problemas Comuns

### 1. Página Principal Não Carrega

#### Sintomas
- Página em branco
- Erro 404 ou 500
- Recursos não encontrados

#### Possíveis Causas e Soluções

##### ❌ Problema: Servidor não configurado
```
Erro: "Cannot GET /"
```
**Solução:**
```bash
# Use um servidor HTTP local
python -m http.server 8000
# ou
npx serve . -p 8000
```

##### ❌ Problema: Caminhos de arquivo incorretos
```
Erro: "Failed to load resource: net::ERR_FILE_NOT_FOUND"
```
**Solução:**
1. Verifique se todos os arquivos estão na estrutura correta
2. Confirme caminhos relativos no `index.html`:
```html
<!-- Correto -->
<link rel="stylesheet" href="assets/css/main.css">
<!-- Incorreto -->
<link rel="stylesheet" href="/assets/css/main.css">
```

##### ❌ Problema: JavaScript desabilitado
```
Sintoma: Galeria não aparece, sem interatividade
```
**Solução:**
1. Habilite JavaScript no navegador
2. Verifique se há bloqueadores de script
3. Teste em modo incógnito

### 2. Demos Não Carregam no Modal

#### Sintomas
- Modal abre mas fica em branco
- Erro de carregamento no iframe
- Timeout de carregamento

#### Possíveis Causas e Soluções

##### ❌ Problema: Política de iframe (X-Frame-Options)
```
Erro: "Refused to display in a frame because it set 'X-Frame-Options' to 'deny'"
```
**Solução:**
1. Configure headers corretos no servidor:
```
X-Frame-Options: SAMEORIGIN
```
2. Para desenvolvimento local, use servidor HTTP adequado

##### ❌ Problema: Arquivos de demo ausentes
```
Erro: 404 Not Found
```
**Solução:**
1. Verifique se a pasta `demos/` existe
2. Confirme que cada demo tem `index.html`
3. Verifique configuração em `main.js`:
```javascript
const projects = {
    "meu-projeto": {
        demoPath: "./demos/meu-projeto/", // Caminho correto
        entryPoint: "index.html"          // Arquivo existe
    }
};
```

##### ❌ Problema: CORS (Cross-Origin Resource Sharing)
```
Erro: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
```
**Solução:**
1. Use servidor HTTP local (não abra arquivo diretamente)
2. Configure headers CORS no servidor:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

### 3. Problemas de Performance

#### Sintomas
- Carregamento lento (> 3 segundos)
- Interface travando
- Alto uso de memória

#### Possíveis Causas e Soluções

##### ❌ Problema: Imagens não otimizadas
```
Sintoma: Carregamento lento da galeria
```
**Solução:**
1. Otimize imagens de preview:
```bash
# Redimensionar para 400x300px
convert original.jpg -resize 400x300^ -gravity center -extent 400x300 preview.jpg

# Comprimir para WebP
cwebp -q 80 preview.jpg -o preview.webp
```
2. Use formatos modernos (WebP, AVIF)
3. Implemente lazy loading

##### ❌ Problema: Muitos recursos carregando simultaneamente
```
Sintoma: Picos de uso de rede
```
**Solução:**
1. Habilite lazy loading:
```javascript
const portfolio = new PortfolioEmbed({
    lazyLoad: true,
    preloadImages: false
});
```
2. Use resource hints:
```html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
```

##### ❌ Problema: JavaScript bloqueando renderização
```
Sintoma: Página fica em branco por alguns segundos
```
**Solução:**
1. Mova scripts para antes do `</body>`
2. Use `defer` ou `async`:
```html
<script src="assets/js/main.js" defer></script>
```
3. Implemente critical CSS inline

### 4. Problemas de Responsividade

#### Sintomas
- Layout quebrado em mobile
- Elementos sobrepostos
- Scroll horizontal indesejado

#### Possíveis Causas e Soluções

##### ❌ Problema: Viewport não configurado
```
Sintoma: Site aparece "zoomed out" no mobile
```
**Solução:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

##### ❌ Problema: CSS Grid/Flexbox não responsivo
```
Sintoma: Cards não se adaptam ao tamanho da tela
```
**Solução:**
1. Use media queries apropriadas:
```css
@media (max-width: 768px) {
    .project-gallery {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
```
2. Use unidades relativas (rem, em, %)

##### ❌ Problema: Imagens não responsivas
```
Sintoma: Imagens ultrapassam container
```
**Solução:**
```css
.project-card img {
    max-width: 100%;
    height: auto;
}
```

### 5. Problemas de Acessibilidade

#### Sintomas
- Navegação por teclado não funciona
- Leitor de tela não reconhece conteúdo
- Contraste insuficiente

#### Possíveis Causas e Soluções

##### ❌ Problema: Elementos não focáveis
```
Sintoma: Tab não navega pelos cards
```
**Solução:**
1. Adicione `tabindex="0"` em elementos interativos:
```html
<div class="project-card" tabindex="0" role="button">
```
2. Implemente event listeners para Enter/Space:
```javascript
card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        openDemo(projectKey);
    }
});
```

##### ❌ Problema: ARIA labels ausentes
```
Sintoma: Leitor de tela não descreve elementos
```
**Solução:**
```html
<button aria-label="Ver demo do projeto Açaí da Dany">
    Ver Demo
</button>
```

##### ❌ Problema: Contraste insuficiente
```
Sintoma: Texto difícil de ler
```
**Solução:**
1. Use ferramentas de verificação de contraste
2. Ajuste cores para atender WCAG 2.1 AA (4.5:1)
```css
:root {
    --text-primary: #1e293b;    /* Contraste 4.5:1 com branco */
    --bg-primary: #ffffff;
}
```

### 6. Problemas de Deploy

#### Sintomas
- Deploy falha
- Site não acessível após deploy
- Recursos 404 em produção

#### Possíveis Causas e Soluções

##### ❌ Problema: Configuração de build incorreta
```
Erro: "Build failed"
```
**Solução para Netlify:**
```toml
# netlify.toml
[build]
  publish = "."
  command = ""

[build.environment]
  NODE_VERSION = "18"
```

**Solução para Vercel:**
```json
{
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ]
}
```

##### ❌ Problema: Caminhos absolutos em produção
```
Erro: 404 em recursos
```
**Solução:**
1. Use caminhos relativos:
```javascript
// Incorreto
const basePath = '/portfolio-demo/';

// Correto
const basePath = './';
```
2. Configure base URL dinamicamente:
```javascript
const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
```

##### ❌ Problema: Headers de segurança bloqueando iframes
```
Erro: "Refused to display in a frame"
```
**Solução:**
Configure headers apropriados:
```
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self'
```

### 7. Problemas de Integração

#### Sintomas
- Portfolio não aparece em site externo
- Conflitos de CSS
- JavaScript não funciona

#### Possíveis Causas e Soluções

##### ❌ Problema: Conflitos de CSS
```
Sintoma: Estilos do portfolio afetam site host
```
**Solução:**
1. Use versão embed com CSS isolado:
```html
<link rel="stylesheet" href="portfolio-demo/assets/css/embed.css">
```
2. Use CSS custom properties para customização:
```css
.portfolio-embed {
    --embed-primary: #your-brand-color;
}
```

##### ❌ Problema: JavaScript não inicializa
```
Sintoma: Portfolio não aparece
```
**Solução:**
1. Verifique ordem de carregamento:
```html
<!-- CSS primeiro -->
<link rel="stylesheet" href="portfolio-demo/assets/css/embed.css">

<!-- JavaScript depois -->
<script src="portfolio-demo/assets/js/embed.js"></script>
```
2. Use inicialização manual se necessário:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEmbed({
        container: '#portfolio-container'
    });
});
```

## 🛠️ Ferramentas de Diagnóstico

### 1. Console do Navegador

#### Verificar Erros JavaScript
```javascript
// Abra DevTools (F12) e execute:
console.log('Portfolio config:', window.projects);
console.log('Demo loader:', window.demoLoader);
```

#### Verificar Network Issues
1. Abra DevTools → Network
2. Recarregue a página
3. Procure por recursos com status 404 ou 500

### 2. Lighthouse Audit

```bash
# Instalar Lighthouse
npm install -g lighthouse

# Executar auditoria
lighthouse http://localhost:8000 --output html --output-path report.html
```

### 3. Testes Automatizados

#### Executar Testes de Validação
```bash
# PowerShell (Windows)
.\validate-deployment.ps1

# Teste específico
.\validate-deployment.ps1 -Platform netlify -Verbose
```

#### Interface Web de Testes
Abra no navegador:
- `test-deployment.html` - Testes de deployment
- `test-performance.html` - Testes de performance
- `test-accessibility.html` - Testes de acessibilidade

### 4. Validação HTML/CSS

```bash
# Validar HTML
npx html-validate index.html

# Validar CSS
npx stylelint "assets/css/*.css"

# Teste de acessibilidade
npx axe-cli http://localhost:8000
```

## 🔍 Debugging Avançado

### 1. Debug de Performance

#### Identificar Gargalos
```javascript
// Adicione no console do navegador
performance.mark('start');
// ... código a ser testado
performance.mark('end');
performance.measure('test', 'start', 'end');
console.log(performance.getEntriesByType('measure'));
```

#### Monitorar Core Web Vitals
```javascript
// Verificar LCP, FID, CLS
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log(entry.name, entry.value);
    }
}).observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
```

### 2. Debug de Acessibilidade

#### Verificar Ordem de Foco
```javascript
// Destacar elementos focáveis
document.querySelectorAll('[tabindex], button, a, input, select, textarea').forEach((el, i) => {
    el.style.outline = `2px solid red`;
    el.setAttribute('data-tab-order', i);
});
```

#### Simular Leitor de Tela
```javascript
// Listar elementos com ARIA labels
document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]').forEach(el => {
    console.log(el.tagName, el.getAttribute('aria-label') || el.textContent);
});
```

### 3. Debug de Responsividade

#### Testar Breakpoints
```javascript
// Verificar breakpoints ativos
const breakpoints = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)'
};

Object.entries(breakpoints).forEach(([name, query]) => {
    if (window.matchMedia(query).matches) {
        console.log('Active breakpoint:', name);
    }
});
```

## 📞 Obtendo Ajuda

### 1. Recursos de Autoajuda

#### Documentação
- `README.md` - Visão geral e uso básico
- `SETUP.md` - Configuração inicial
- `DEPLOYMENT.md` - Guia de deploy
- `INTEGRATION_GUIDE.md` - Integração externa

#### Testes e Validação
- Execute testes automatizados
- Use interfaces web de teste
- Verifique métricas de performance

### 2. Comunidade e Suporte

#### GitHub Issues
1. Pesquise issues existentes
2. Forneça informações detalhadas:
   - Versão do navegador
   - Sistema operacional
   - Passos para reproduzir
   - Screenshots/logs de erro

#### Stack Overflow
- Use a tag `portfolio-demo-system`
- Inclua código relevante
- Descreva o comportamento esperado vs atual

### 3. Informações para Suporte

Ao reportar problemas, inclua:

```
**Ambiente:**
- SO: Windows 10 / macOS / Linux
- Navegador: Chrome 91.0.4472.124
- Resolução: 1920x1080
- Dispositivo: Desktop / Mobile

**Problema:**
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado
- Comportamento atual

**Logs de Erro:**
- Console do navegador
- Network tab (se relevante)
- Lighthouse report (se performance)

**Configuração:**
- Modificações feitas no código
- Configurações de servidor
- Integrações externas
```

## ✅ Checklist de Resolução

Antes de buscar ajuda, verifique:

- [ ] Testou em navegador diferente
- [ ] Testou em modo incógnito
- [ ] Verificou console do navegador
- [ ] Executou testes automatizados
- [ ] Consultou documentação relevante
- [ ] Verificou configurações de servidor
- [ ] Testou com dados mínimos
- [ ] Verificou conectividade de rede

---

**🔧 Problema não resolvido?** Abra uma issue no repositório com informações detalhadas!