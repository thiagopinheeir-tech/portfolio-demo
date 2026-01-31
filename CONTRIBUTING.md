# 🤝 Contributing Guide - Portfolio Demo System

Obrigado pelo interesse em contribuir com o Portfolio Demo System! Este guia fornece todas as informações necessárias para contribuir de forma efetiva com o projeto.

## 📋 Visão Geral

O Portfolio Demo System é um projeto open source que visa facilitar a criação de portfolios interativos para desenvolvedores. Valorizamos contribuições de todos os níveis de experiência.

### Tipos de Contribuição

- 🐛 **Bug Reports** - Relatar problemas encontrados
- 💡 **Feature Requests** - Sugerir novas funcionalidades
- 📝 **Documentation** - Melhorar documentação
- 🔧 **Code Contributions** - Implementar correções e features
- 🎨 **Design Improvements** - Melhorar UI/UX
- 🧪 **Testing** - Adicionar ou melhorar testes
- 🌐 **Translations** - Traduzir para outros idiomas

## 🚀 Primeiros Passos

### 1. Configuração do Ambiente

#### Pré-requisitos
- Git instalado
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Servidor HTTP local (Python, Node.js, ou similar)

#### Fork e Clone
```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU-USERNAME/portfolio-demo.git
cd portfolio-demo

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/ORIGINAL-OWNER/portfolio-demo.git

# 4. Verifique os remotes
git remote -v
```

#### Configuração Local
```bash
# Inicie servidor local
python -m http.server 8000
# ou
npx serve . -p 8000

# Acesse http://localhost:8000
```

### 2. Estrutura do Projeto

Familiarize-se com a estrutura:
```
portfolio-demo/
├── assets/          # CSS, JS, imagens
├── demos/           # Demos individuais
├── examples/        # Exemplos de integração
├── docs/            # Documentação
└── tests/           # Testes e validação
```

Consulte `PROJECT_STRUCTURE.md` para detalhes completos.

## 🐛 Reportando Bugs

### Antes de Reportar

1. **Pesquise issues existentes** - Verifique se o bug já foi reportado
2. **Teste em ambiente limpo** - Use modo incógnito ou navegador diferente
3. **Reproduza o problema** - Confirme que consegue reproduzir consistentemente

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara e concisa do problema.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
Descrição clara do que deveria acontecer.

**Comportamento Atual**
Descrição do que realmente acontece.

**Screenshots**
Se aplicável, adicione screenshots para ajudar a explicar o problema.

**Ambiente:**
- OS: [e.g. Windows 10, macOS Big Sur]
- Navegador: [e.g. Chrome 91.0.4472.124]
- Versão do Projeto: [e.g. v1.0.0]
- Dispositivo: [e.g. Desktop, iPhone 12]

**Contexto Adicional**
Qualquer outra informação relevante sobre o problema.

**Logs de Erro**
```
Cole aqui logs do console do navegador
```

**Tentativas de Solução**
Descreva o que já tentou para resolver o problema.
```

## 💡 Sugerindo Features

### Antes de Sugerir

1. **Verifique o roadmap** - Veja se a feature já está planejada
2. **Pesquise issues existentes** - Talvez alguém já sugeriu
3. **Considere o escopo** - A feature se alinha com os objetivos do projeto?

### Template de Feature Request

```markdown
**Resumo da Feature**
Descrição clara e concisa da feature desejada.

**Problema que Resolve**
Explique o problema que esta feature resolveria.

**Solução Proposta**
Descrição detalhada de como você imagina que a feature funcionaria.

**Alternativas Consideradas**
Descreva outras soluções que você considerou.

**Impacto**
- **Usuários afetados**: Quem se beneficiaria?
- **Complexidade**: Simples/Média/Alta
- **Breaking changes**: Sim/Não

**Mockups/Exemplos**
Se aplicável, adicione mockups ou exemplos de código.

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 🔧 Contribuindo com Código

### Workflow de Desenvolvimento

#### 1. Preparação
```bash
# Sincronize com upstream
git fetch upstream
git checkout main
git merge upstream/main

# Crie branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

#### 2. Desenvolvimento

##### Padrões de Código

**HTML:**
- Use HTML5 semântico
- Inclua atributos ARIA apropriados
- Mantenha estrutura consistente

```html
<!-- ✅ Bom -->
<article class="project-card" role="button" tabindex="0" aria-label="Ver demo do Açaí da Dany">
    <h3>Açaí da Dany</h3>
    <p>Sistema de cardápio direto para WhatsApp</p>
</article>

<!-- ❌ Evitar -->
<div onclick="openDemo()">
    <div>Açaí da Dany</div>
    <div>Sistema de cardápio</div>
</div>
```

**CSS:**
- Use metodologia BEM
- Utilize variáveis CSS
- Mantenha responsividade

```css
/* ✅ Bom */
.project-card {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    transition: transform 0.2s ease;
}

.project-card:hover {
    transform: translateY(-2px);
}

.project-card__title {
    color: var(--text-primary);
    font-size: var(--font-size-lg);
}

/* ❌ Evitar */
.card {
    background: #ffffff;
    border-radius: 8px;
}

.card div {
    color: #333333;
    font-size: 18px;
}
```

**JavaScript:**
- Use ES6+ features
- Mantenha funções pequenas e focadas
- Adicione comentários para lógica complexa

```javascript
// ✅ Bom
class ProjectGallery {
    constructor(container, options = {}) {
        this.container = container;
        this.options = { ...this.defaultOptions, ...options };
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    /**
     * Renderiza os cards dos projetos
     */
    render() {
        const fragment = document.createDocumentFragment();
        
        Object.entries(this.options.projects).forEach(([key, project]) => {
            const card = this.createProjectCard(key, project);
            fragment.appendChild(card);
        });
        
        this.container.appendChild(fragment);
    }
}

// ❌ Evitar
function showProjects() {
    var projects = window.projects;
    for (var i in projects) {
        var div = document.createElement('div');
        div.innerHTML = projects[i].name;
        div.onclick = function() { openDemo(i); };
        document.body.appendChild(div);
    }
}
```

#### 3. Testes

##### Executar Testes Existentes
```bash
# Testes automatizados
.\validate-deployment.ps1
.\validate-performance.ps1

# Testes manuais via browser
# Abra test-*.html no navegador
```

##### Adicionar Novos Testes
```javascript
// Exemplo de teste de funcionalidade
function testProjectCardCreation() {
    const gallery = new ProjectGallery(document.createElement('div'), {
        projects: { 'test': { name: 'Test Project' } }
    });
    
    const cards = gallery.container.querySelectorAll('.project-card');
    
    if (cards.length !== 1) {
        throw new Error('Expected 1 card, got ' + cards.length);
    }
    
    console.log('✅ Project card creation test passed');
}
```

#### 4. Documentação

- Atualize README.md se necessário
- Adicione comentários JSDoc para funções públicas
- Atualize CHANGELOG.md

```javascript
/**
 * Cria um card de projeto
 * @param {string} key - Chave única do projeto
 * @param {Object} project - Dados do projeto
 * @param {string} project.name - Nome do projeto
 * @param {string} project.description - Descrição do projeto
 * @returns {HTMLElement} Elemento DOM do card
 */
createProjectCard(key, project) {
    // implementação
}
```

#### 5. Commit e Push

##### Padrão de Commit Messages
Use Conventional Commits:

```bash
# Features
git commit -m "feat: add carousel mode for project gallery"
git commit -m "feat(accessibility): implement keyboard navigation"

# Bug fixes
git commit -m "fix: resolve modal not closing on escape key"
git commit -m "fix(performance): optimize image loading"

# Documentation
git commit -m "docs: update integration guide with React examples"

# Refactoring
git commit -m "refactor: extract modal logic to separate class"

# Tests
git commit -m "test: add unit tests for project configuration"

# Chores
git commit -m "chore: update dependencies"
```

##### Push e Pull Request
```bash
# Push para seu fork
git push origin feature/nome-da-feature

# Crie Pull Request no GitHub
```

### Pull Request Guidelines

#### Template de PR

```markdown
**Tipo de Mudança**
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação
- [ ] Refactoring
- [ ] Testes

**Descrição**
Descrição clara das mudanças implementadas.

**Issues Relacionadas**
Fixes #123
Closes #456

**Como Testar**
1. Vá para '...'
2. Clique em '...'
3. Verifique que '...'

**Screenshots**
Se aplicável, adicione screenshots das mudanças visuais.

**Checklist**
- [ ] Código segue os padrões do projeto
- [ ] Testes passam localmente
- [ ] Documentação foi atualizada
- [ ] Mudanças são backward compatible
- [ ] Performance não foi impactada negativamente
- [ ] Acessibilidade foi considerada
```

#### Critérios de Aprovação

- ✅ Código segue padrões estabelecidos
- ✅ Testes passam
- ✅ Documentação atualizada
- ✅ Performance mantida ou melhorada
- ✅ Acessibilidade preservada
- ✅ Compatibilidade com navegadores suportados

## 📝 Contribuindo com Documentação

### Tipos de Documentação

1. **README.md** - Visão geral e quick start
2. **Guias específicos** - SETUP.md, DEPLOYMENT.md, etc.
3. **Comentários no código** - JSDoc, CSS comments
4. **Exemplos** - Arquivos na pasta examples/

### Padrões de Documentação

#### Markdown
- Use headers hierárquicos (H1 > H2 > H3)
- Inclua table of contents para documentos longos
- Use code blocks com syntax highlighting
- Adicione emojis para melhor visual

#### Exemplos de Código
- Sempre teste exemplos antes de documentar
- Inclua comentários explicativos
- Mostre tanto o que fazer quanto o que evitar

```javascript
// ✅ Exemplo bom - com contexto
const portfolio = new PortfolioEmbed({
    container: '#portfolio',
    mode: 'gallery',        // Modo de exibição
    theme: 'light',         // Tema de cores
    limit: 4               // Máximo de projetos
});

// ❌ Exemplo ruim - sem contexto
new PortfolioEmbed('#portfolio', 'gallery', 'light', 4);
```

## 🎨 Contribuindo com Design

### Princípios de Design

1. **Acessibilidade First** - WCAG 2.1 AA compliance
2. **Mobile First** - Design responsivo
3. **Performance** - Otimização de recursos
4. **Consistência** - Sistema de design coerente

### Processo de Design

1. **Research** - Entenda o problema
2. **Ideation** - Explore soluções
3. **Prototyping** - Crie protótipos
4. **Testing** - Teste com usuários
5. **Implementation** - Implemente com código

### Ferramentas Recomendadas

- **Figma** - Design e prototipagem
- **Contrast** - Verificação de contraste
- **Lighthouse** - Auditoria de performance
- **axe DevTools** - Teste de acessibilidade

## 🧪 Contribuindo com Testes

### Tipos de Teste

1. **Unit Tests** - Funções individuais
2. **Integration Tests** - Interação entre componentes
3. **E2E Tests** - Fluxos completos de usuário
4. **Accessibility Tests** - Conformidade WCAG
5. **Performance Tests** - Métricas de performance

### Adicionando Testes

#### Estrutura de Teste
```javascript
// test-minha-feature.js
class MinhaFeatureTest {
    constructor() {
        this.results = [];
    }

    async runAllTests() {
        await this.testBasicFunctionality();
        await this.testEdgeCases();
        await this.testAccessibility();
        return this.results;
    }

    async testBasicFunctionality() {
        try {
            // Implementar teste
            this.results.push({ test: 'Basic Functionality', status: 'passed' });
        } catch (error) {
            this.results.push({ test: 'Basic Functionality', status: 'failed', error });
        }
    }
}
```

#### Interface de Teste
```html
<!-- test-minha-feature.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Teste - Minha Feature</title>
    <link rel="stylesheet" href="assets/css/test-interface.css">
</head>
<body>
    <div class="test-container">
        <h1>Teste - Minha Feature</h1>
        <button onclick="runTests()">Executar Testes</button>
        <div id="results"></div>
    </div>
    <script src="test-minha-feature.js"></script>
</body>
</html>
```

## 🌐 Contribuindo com Traduções

### Idiomas Suportados

- 🇧🇷 Português (Brasil) - Principal
- 🇺🇸 English - Secundário
- 🇪🇸 Español - Planejado
- 🇫🇷 Français - Planejado

### Processo de Tradução

1. **Identifique strings** - Encontre textos para traduzir
2. **Crie arquivo de idioma** - `i18n/[lang].json`
3. **Implemente sistema** - Use JavaScript para trocar textos
4. **Teste** - Verifique layout em diferentes idiomas

```json
// i18n/en.json
{
    "gallery.title": "Featured Projects",
    "gallery.description": "Interactive demonstrations of developed systems",
    "project.viewDemo": "View Demo",
    "modal.close": "Close",
    "navigation.backToPortfolio": "Back to Portfolio"
}
```

## 📊 Métricas e Qualidade

### Métricas de Código

- **Coverage** - Cobertura de testes > 80%
- **Performance** - Lighthouse Score > 90
- **Accessibility** - WCAG 2.1 AA compliance
- **Bundle Size** - Manter < 100KB total

### Ferramentas de Qualidade

```bash
# Linting
npx eslint assets/js/
npx stylelint assets/css/

# Formatação
npx prettier --write assets/

# Auditoria
npx lighthouse http://localhost:8000
npx axe-cli http://localhost:8000
```

## 🏆 Reconhecimento

### Contributors

Todos os contributors são reconhecidos:
- README.md contributors section
- CHANGELOG.md mentions
- GitHub contributors page

### Tipos de Contribuição

- 💻 Code
- 📖 Documentation
- 🎨 Design
- 🐛 Bug reports
- 💡 Ideas
- 🧪 Tests
- 🌐 Translation
- 📢 Outreach

## 📞 Comunicação

### Canais

- **GitHub Issues** - Bugs e features
- **GitHub Discussions** - Discussões gerais
- **Pull Requests** - Code review
- **Email** - Contato direto com maintainers

### Código de Conduta

- Seja respeitoso e inclusivo
- Foque no problema, não na pessoa
- Aceite feedback construtivo
- Ajude outros contributors

## ❓ FAQ

### Como posso começar a contribuir?
1. Leia este guia completamente
2. Configure o ambiente local
3. Procure issues marcadas como "good first issue"
4. Faça um pequeno PR para se familiarizar

### Quanto tempo leva para revisar PRs?
- PRs pequenos: 1-3 dias
- PRs grandes: 3-7 dias
- Documentação: 1-2 dias

### Posso trabalhar em features grandes?
Sim, mas recomendamos:
1. Abrir issue para discussão primeiro
2. Dividir em PRs menores
3. Manter comunicação constante

### Como reportar vulnerabilidades de segurança?
Use GitHub Security Advisories ou envie email direto para os maintainers.

---

**🙏 Obrigado por contribuir com o Portfolio Demo System!**

Sua contribuição ajuda a tornar este projeto melhor para toda a comunidade de desenvolvedores.