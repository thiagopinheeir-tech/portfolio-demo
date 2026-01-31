# Portfolio Demo System

Sistema de demonstração de portfolio que apresenta versões HTML estáticas de 5 projetos desenvolvidos para exibição em site pessoal. O sistema copia e apresenta interfaces dos projetos existentes sem modificar os arquivos originais, focando na demonstração visual das funcionalidades.

## 📋 Visão Geral

O Portfolio Demo System é uma aplicação web estática que:

- Apresenta demonstrações interativas de 5 projetos
- Preserva a integridade dos arquivos originais (exceto "landpage divulga")
- Oferece interface responsiva e acessível
- É otimizado para hospedagem estática
- Não requer autenticação ou backend

## 🚀 Projetos Incluídos

1. **Açaí da Dany** - Sistema de cardápio direto para WhatsApp
2. **Barbearia Raimundos** - Sistema de agendamento para barbearia
3. **Finanças Pessoais** - Sistema de controle financeiro com calculadora
4. **WhatsApp Bot AI** - Bot inteligente para WhatsApp
5. **Landing Page Divulga** - Landing page promocional

## 📁 Estrutura do Projeto

```
portfolio-demo/
├── index.html                 # Página principal do portfolio
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos globais
│   │   └── gallery.css       # Estilos da galeria
│   ├── js/
│   │   ├── main.js           # Funcionalidade principal
│   │   └── demo-loader.js    # Carregamento de demos
│   └── images/
│       ├── placeholder.jpg   # Imagem padrão
│       └── project-previews/ # Miniaturas dos projetos
├── demos/
│   ├── acai-dany/           # Demo do Açaí da Dany
│   ├── barbearia-raimundos/ # Demo da Barbearia Raimundos
│   ├── financas-pessoais/   # Demo do Finanças Pessoais
│   ├── whatsapp-bot-ai/     # Demo do WhatsApp Bot AI
│   └── landpage-divulga/    # Demo da Landing Page
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos e animações
- **JavaScript (Vanilla)** - Funcionalidade interativa
- **CSS Grid & Flexbox** - Layout responsivo
- **WCAG 2.1 AA** - Padrões de acessibilidade

## ⚡ Funcionalidades

### Interface Principal
- Galeria responsiva de projetos
- Cards interativos com hover effects
- Modal para visualização de demos
- Navegação por teclado
- Suporte a tela cheia

### Sistema de Demos
- Carregamento via iframe isolado
- Navegação integrada entre demos
- Simulação de dados sem persistência
- Reset automático de estado
- Tratamento de erros e timeouts

### Acessibilidade
- Conformidade WCAG 2.1 AA
- Navegação por teclado completa
- Indicadores de foco visíveis
- Textos alternativos apropriados
- Estrutura HTML semântica

### Performance
- Carregamento inicial < 3 segundos
- Pré-carregamento inteligente de demos
- Otimização para dispositivos móveis
- Lazy loading de conteúdo

## 🚀 Como Usar

### Instalação Local

1. Clone ou baixe o projeto
2. Abra `index.html` em um navegador moderno
3. Navegue pelos projetos clicando nos cards

### Hospedagem Estática

O projeto é totalmente compatível com hospedagem estática e inclui configurações otimizadas para:

- **GitHub Pages** - Deploy automático via GitHub Actions
- **Netlify** - Configuração completa com redirects e headers
- **Vercel** - Otimizado para edge functions e CDN global
- **Firebase Hosting** - Suporte completo com instruções detalhadas

#### Configurações Incluídas

- `netlify.toml` - Configuração completa do Netlify
- `vercel.json` - Configuração otimizada do Vercel  
- `.github/workflows/deploy.yml` - GitHub Actions para deploy automático
- `_config.yml` - Configuração Jekyll para GitHub Pages
- `DEPLOYMENT.md` - Guia completo de deployment

#### Deploy Rápido

1. **GitHub Pages**: Push para main/master (deploy automático)
2. **Netlify**: Conecte o repositório (deploy contínuo)
3. **Vercel**: Import do GitHub (deploy instantâneo)

Consulte o arquivo `DEPLOYMENT.md` para instruções detalhadas.

### Integração em Site Existente

```html
<!-- Incluir CSS -->
<link rel="stylesheet" href="path/to/portfolio-demo/assets/css/main.css">
<link rel="stylesheet" href="path/to/portfolio-demo/assets/css/gallery.css">

<!-- Container do portfolio -->
<div id="portfolio-container"></div>

<!-- Incluir JavaScript -->
<script src="path/to/portfolio-demo/assets/js/main.js"></script>
<script src="path/to/portfolio-demo/assets/js/demo-loader.js"></script>
```

## 🔧 Configuração

### Configuração de Projetos

Edite o arquivo `assets/js/main.js` para personalizar os projetos:

```javascript
const projectConfig = {
    "projeto-id": {
        name: "Nome do Projeto",
        description: "Descrição do projeto",
        sourcePath: "../caminho-fonte/",
        demoPath: "./demos/projeto-id/",
        entryPoint: "index.html",
        preview: "assets/images/project-previews/projeto.jpg",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: ["Feature 1", "Feature 2"]
    }
};
```

### Personalização de Estilos

As variáveis CSS podem ser customizadas no arquivo `assets/css/main.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... outras variáveis */
}
```

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## ♿ Acessibilidade

### Recursos Implementados

- Navegação por teclado (Tab, Enter, Escape)
- Indicadores de foco visíveis
- Textos alternativos em imagens
- Estrutura HTML semântica
- Contraste adequado de cores
- Suporte a leitores de tela

### Atalhos de Teclado

- **Tab/Shift+Tab**: Navegar entre elementos
- **Enter/Space**: Ativar botões e links
- **Escape**: Fechar modal
- **F11**: Tela cheia (quando suportado)

## 🧪 Testes

### Testes de Deployment

O projeto inclui uma suíte completa de testes para validar a compatibilidade com hospedagem estática:

```bash
# Validação via PowerShell
.\validate-deployment.ps1

# Validação específica por plataforma
.\validate-deployment.ps1 -Platform netlify
.\validate-deployment.ps1 -Platform vercel
.\validate-deployment.ps1 -Platform github
```

### Interface Web de Testes

Abra `test-deployment.html` no navegador para uma interface visual de testes que verifica:
- Configurações de deployment
- Estrutura de arquivos
- Headers de segurança
- Otimizações de performance
- Compatibilidade de demos

### Testes Manuais

1. Teste todos os projetos em diferentes navegadores
2. Verifique responsividade em dispositivos móveis
3. Teste navegação por teclado
4. Valide acessibilidade com ferramentas como axe

### Testes Automatizados

```bash
# Validação HTML
npx html-validate index.html

# Teste de acessibilidade
npx axe-cli http://localhost:3000

# Teste de performance
npx lighthouse http://localhost:3000
```

## 🔍 Solução de Problemas

### Demos Não Carregam

1. Verifique se os arquivos existem no diretório `demos/`
2. Confirme que o servidor suporta iframes
3. Verifique console do navegador para erros

### Problemas de Performance

1. Otimize imagens de preview
2. Minimize arquivos CSS/JS
3. Use CDN para recursos estáticos

### Problemas de Acessibilidade

1. Teste com leitor de tela
2. Verifique contraste de cores
3. Valide estrutura HTML

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📚 Documentação Completa

### Guias Principais
- **[SETUP.md](SETUP.md)** - Configuração inicial e instalação
- **[CONFIGURATION.md](CONFIGURATION.md)** - Personalização e configuração avançada
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guia completo de deployment
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Integração em sites externos

### Documentação Técnica
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estrutura detalhada do projeto
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solução de problemas comuns
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia para contribuidores

### Exemplos e Testes
- **`examples/`** - Exemplos de integração
- **`test-*.html`** - Interfaces de teste e validação
- **`TASK_*.md`** - Documentação de implementação

## 📞 Suporte

### Recursos de Ajuda
- **Documentação**: Consulte os guias listados acima
- **Exemplos**: Veja a pasta `examples/` para referências
- **Testes**: Use os arquivos `test-*.html` para validação
- **Issues**: Abra issues no repositório para problemas específicos

### Comunidade
- **GitHub Discussions**: Para discussões gerais
- **Stack Overflow**: Use a tag `portfolio-demo-system`

### Solução de Problemas
Consulte **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** para soluções detalhadas de problemas comuns.

## 🔄 Atualizações

### Versão 1.0.0
- Estrutura inicial do projeto
- Sistema de galeria responsiva
- Modal de demonstração
- Suporte a 5 projetos
- Acessibilidade WCAG 2.1 AA

---

**Desenvolvido com ❤️ para demonstração de projetos web**