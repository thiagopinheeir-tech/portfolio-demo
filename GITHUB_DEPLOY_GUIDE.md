# 🚀 Guia Completo: Deploy no GitHub Pages

## 📋 Passo a Passo para Deploy

### 1. Configurar Git e GitHub

#### Instalar Git (se não tiver)
```bash
# Baixar e instalar Git do site oficial
# https://git-scm.com/download/win
```

#### Configurar Git pela primeira vez
```bash
# Abrir Git Bash ou Command Prompt
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
```

#### Fazer login no GitHub
```bash
# Opção 1: Via HTTPS (mais simples)
# Você será solicitado a fazer login quando fizer push

# Opção 2: Via SSH (mais seguro)
# Gerar chave SSH
ssh-keygen -t rsa -b 4096 -C "seu-email@gmail.com"
# Adicionar a chave pública no GitHub (Settings > SSH Keys)
```

### 2. Criar Repositório no GitHub

1. **Acesse**: https://github.com/thiagopinheeir-tech
2. **Clique**: "New repository" (botão verde)
3. **Nome**: `portfolio-demo` (ou outro nome de sua escolha)
4. **Descrição**: "Sistema de Portfolio com 5 Demos de Projetos"
5. **Público**: ✅ (necessário para GitHub Pages gratuito)
6. **NÃO** marque "Initialize with README" (já temos arquivos)
7. **Clique**: "Create repository"

### 3. Preparar o Projeto Local

#### Navegar até a pasta do projeto
```bash
# Abrir Command Prompt ou Git Bash
cd caminho/para/portfolio-demo
```

#### Inicializar Git (se não estiver inicializado)
```bash
git init
```

#### Adicionar arquivos ao Git
```bash
# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit: Portfolio Demo System"
```

#### Conectar com repositório GitHub
```bash
# Substituir 'thiagopinheeir-tech' pelo seu username
# Substituir 'portfolio-demo' pelo nome do seu repositório
git remote add origin https://github.com/thiagopinheeir-tech/portfolio-demo.git

# Verificar se foi adicionado corretamente
git remote -v
```

#### Fazer push para GitHub
```bash
# Enviar código para GitHub
git branch -M main
git push -u origin main
```

### 4. Ativar GitHub Pages

1. **Acesse seu repositório**: https://github.com/thiagopinheeir-tech/portfolio-demo
2. **Clique**: "Settings" (aba no topo)
3. **Role para baixo**: até encontrar "Pages" no menu lateral
4. **Source**: Selecione "GitHub Actions"
5. **Aguarde**: O deploy automático será executado

### 5. Verificar Deploy

1. **Aba Actions**: Veja o progresso do deploy
2. **URL do site**: Será algo como `https://thiagopinheeir-tech.github.io/portfolio-demo`
3. **Tempo**: Pode levar 5-10 minutos para ficar disponível

## 🔧 Comandos Úteis

### Atualizar o site (após mudanças)
```bash
# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Atualização: descrição das mudanças"

# Enviar para GitHub
git push origin main
```

### Verificar status
```bash
# Ver arquivos modificados
git status

# Ver histórico de commits
git log --oneline

# Ver repositórios remotos
git remote -v
```

### Resolver problemas comuns
```bash
# Se der erro de autenticação
git config --global credential.helper manager

# Se der erro de branch
git branch -M main

# Se der erro de push
git pull origin main --allow-unrelated-histories
git push origin main
```

## 🌐 URLs Importantes

- **Seu GitHub**: https://github.com/thiagopinheeir-tech
- **Repositório**: https://github.com/thiagopinheeir-tech/portfolio-demo
- **Site Deploy**: https://thiagopinheeir-tech.github.io/portfolio-demo
- **Actions (Deploy)**: https://github.com/thiagopinheeir-tech/portfolio-demo/actions

## 📱 Testando o Deploy

Após o deploy, teste:
- ✅ Site carrega corretamente
- ✅ Todos os 5 demos funcionam
- ✅ Modal abre e fecha
- ✅ Navegação funciona
- ✅ Responsivo no mobile

## 🔄 Workflow Automático

O sistema já está configurado com GitHub Actions que:
1. **Detecta** mudanças no código
2. **Testa** o sistema automaticamente
3. **Faz deploy** para GitHub Pages
4. **Notifica** se algo der errado

## 🆘 Precisa de Ajuda?

Se tiver problemas:
1. **Verifique** se o Git está instalado: `git --version`
2. **Verifique** se está na pasta correta: `pwd` (Linux/Mac) ou `cd` (Windows)
3. **Verifique** se o repositório existe no GitHub
4. **Verifique** a aba Actions para ver erros de deploy

## 🎉 Pronto!

Seu Portfolio Demo System estará disponível em:
**https://thiagopinheeir-tech.github.io/portfolio-demo**

Compartilhe este link para mostrar seus projetos! 🚀