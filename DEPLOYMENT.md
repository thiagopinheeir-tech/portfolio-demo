# 🚀 Guia de Deployment - Portfolio Demo System

Este guia fornece instruções detalhadas para fazer deploy do Portfolio Demo System em diferentes plataformas de hospedagem estática.

## 📋 Pré-requisitos

- Repositório Git com o código do projeto
- Conta nas plataformas de hospedagem desejadas
- Arquivos de configuração incluídos no projeto

## 🌐 Plataformas Suportadas

### 1. GitHub Pages

#### Configuração Automática

1. **Preparar Repositório**
   ```bash
   git add .
   git commit -m "Add GitHub Pages configuration"
   git push origin main
   ```

2. **Ativar GitHub Pages**
   - Vá para Settings > Pages no seu repositório
   - Source: "GitHub Actions"
   - O workflow `.github/workflows/deploy.yml` será executado automaticamente

3. **Verificar Deploy**
   - Acesse a aba "Actions" para ver o progresso
   - URL final: `https://[username].github.io/[repository-name]`

#### Configuração Manual

1. **Ativar GitHub Pages**
   - Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / `master`
   - Folder: `/ (root)`

2. **Aguardar Deploy**
   - O deploy pode levar alguns minutos
   - Verifique em Settings > Pages a URL gerada

### 2. Netlify

#### Deploy via Git (Recomendado)

1. **Conectar Repositório**
   - Acesse [netlify.com](https://netlify.com)
   - "New site from Git"
   - Conecte seu repositório GitHub/GitLab/Bitbucket

2. **Configurar Build**
   - Build command: (deixar vazio)
   - Publish directory: `.` (root)
   - O arquivo `netlify.toml` será usado automaticamente

3. **Deploy Automático**
   - Cada push para main/master fará deploy automático
   - URL personalizada disponível nas configurações

#### Deploy Manual

1. **Preparar Arquivos**
   ```bash
   # Criar arquivo zip com todos os arquivos
   zip -r portfolio-demo.zip . -x "*.git*" "node_modules/*" "*.log"
   ```

2. **Upload Manual**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste o arquivo zip para a área de deploy
   - Aguarde o processamento

### 3. Vercel

#### Deploy via Git

1. **Conectar Repositório**
   - Acesse [vercel.com](https://vercel.com)
   - "New Project"
   - Import do GitHub/GitLab/Bitbucket

2. **Configurar Projeto**
   - Framework Preset: "Other"
   - Build Command: (deixar vazio)
   - Output Directory: `.`
   - Install Command: (deixar vazio)

3. **Deploy**
   - Clique "Deploy"
   - O arquivo `vercel.json` será usado automaticamente

#### Deploy via CLI

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login e Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

### 4. Firebase Hosting

1. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicializar Projeto**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configurar firebase.json**
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ],
       "headers": [
         {
           "source": "**/*.@(css|js)",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "max-age=31536000"
             }
           ]
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

## ⚙️ Configurações Específicas

### Variáveis de Ambiente

Para diferentes ambientes, você pode precisar ajustar:

```javascript
// assets/js/config.js
const config = {
  baseUrl: window.location.origin,
  isDevelopment: window.location.hostname === 'localhost',
  isProduction: window.location.hostname !== 'localhost'
};
```

### Headers de Segurança

Todas as plataformas estão configuradas com:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Cache Control

- **Assets estáticos** (CSS, JS, imagens): 1 ano
- **HTML**: 1 hora
- **Service Worker**: sem cache

## 🧪 Testes de Deploy

### Checklist Pós-Deploy

- [ ] ✅ Site carrega corretamente
- [ ] ✅ Todos os 5 demos funcionam
- [ ] ✅ Modal abre e fecha corretamente
- [ ] ✅ Navegação entre demos funciona
- [ ] ✅ Responsividade em mobile/tablet
- [ ] ✅ Acessibilidade (navegação por teclado)
- [ ] ✅ Performance (< 3 segundos de carregamento)
- [ ] ✅ HTTPS habilitado
- [ ] ✅ Headers de segurança configurados

### Ferramentas de Teste

```bash
# Lighthouse (Performance/Acessibilidade)
npx lighthouse https://seu-site.com --output html

# Teste de acessibilidade
npx axe-cli https://seu-site.com

# Teste de links quebrados
npx broken-link-checker https://seu-site.com
```

## 🔧 Solução de Problemas

### Problemas Comuns

#### 1. Demos não carregam
**Causa**: Problemas com iframes ou CORS
**Solução**: 
- Verificar headers `X-Frame-Options`
- Testar em modo incógnito
- Verificar console do navegador

#### 2. Assets não carregam
**Causa**: Caminhos relativos incorretos
**Solução**:
- Verificar `baseUrl` na configuração
- Usar caminhos relativos consistentes
- Testar localmente primeiro

#### 3. Performance baixa
**Causa**: Imagens não otimizadas
**Solução**:
- Comprimir imagens
- Usar formatos modernos (WebP)
- Implementar lazy loading

#### 4. Problemas de cache
**Causa**: Cache agressivo em assets
**Solução**:
- Usar versioning em arquivos
- Configurar cache headers corretamente
- Limpar cache do navegador

### Logs e Debugging

#### Netlify
- Deploy logs: Site dashboard > Deploys
- Function logs: Site dashboard > Functions
- Edge logs: Site dashboard > Edge handlers

#### Vercel
- Build logs: Project dashboard > Deployments
- Function logs: Project dashboard > Functions
- Analytics: Project dashboard > Analytics

#### GitHub Pages
- Action logs: Repository > Actions
- Pages status: Repository > Settings > Pages

## 📊 Monitoramento

### Métricas Importantes

- **Core Web Vitals**
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

- **Acessibilidade**
  - Score Lighthouse > 90
  - Navegação por teclado funcional
  - Contraste adequado

- **Performance**
  - Time to First Byte < 600ms
  - First Contentful Paint < 1.8s
  - Speed Index < 3.4s

### Ferramentas de Monitoramento

- **Google Analytics** (opcional)
- **Google Search Console**
- **Lighthouse CI**
- **WebPageTest**
- **GTmetrix**

## 🔄 Atualizações e Manutenção

### Processo de Atualização

1. **Desenvolvimento Local**
   ```bash
   # Testar mudanças localmente
   python -m http.server 8000
   # ou
   npx serve .
   ```

2. **Commit e Push**
   ```bash
   git add .
   git commit -m "Update: descrição das mudanças"
   git push origin main
   ```

3. **Verificar Deploy**
   - Aguardar build automático
   - Testar funcionalidades
   - Verificar métricas

### Backup e Versionamento

- **Tags de Release**
  ```bash
  git tag -a v1.0.0 -m "Release version 1.0.0"
  git push origin v1.0.0
  ```

- **Branches de Ambiente**
  - `main/master`: Produção
  - `develop`: Desenvolvimento
  - `staging`: Testes

## 📞 Suporte

### Recursos Úteis

- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Firebase**: [firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting)

### Comunidade

- **Stack Overflow**: Tags específicas de cada plataforma
- **Discord/Slack**: Comunidades das plataformas
- **GitHub Issues**: Para problemas específicos do projeto

---

**✅ Deploy realizado com sucesso!** 🎉

Seu Portfolio Demo System está agora disponível para o mundo!