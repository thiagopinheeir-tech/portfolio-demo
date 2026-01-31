# Portfolio Demo - Deploy GitHub PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    PORTFOLIO DEMO - DEPLOY GITHUB" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado!" -ForegroundColor Red
    Write-Host "Baixe e instale: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""

# Verificar se estamos na pasta correta
if (-not (Test-Path "index.html")) {
    Write-Host "❌ Erro: Execute este script na pasta portfolio-demo" -ForegroundColor Red
    Write-Host "Certifique-se de estar na pasta que contém index.html" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Pasta correta encontrada!" -ForegroundColor Green
Write-Host ""

# Solicitar informações do usuário
$username = Read-Host "Digite seu username do GitHub (thiagopinheeir-tech)"
if ([string]::IsNullOrEmpty($username)) { $username = "thiagopinheeir-tech" }

$repoName = Read-Host "Digite o nome do repositório (portfolio-demo)"
if ([string]::IsNullOrEmpty($repoName)) { $repoName = "portfolio-demo" }

$userName = Read-Host "Digite seu nome completo"
$userEmail = Read-Host "Digite seu email"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configurando Git..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Configurar Git
git config --global user.name "$userName"
git config --global user.email "$userEmail"

Write-Host "✅ Git configurado!" -ForegroundColor Green
Write-Host ""

# Verificar se já é um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositório Git inicializado!" -ForegroundColor Green
} else {
    Write-Host "✅ Repositório Git já existe!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Preparando arquivos..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy: Portfolio Demo System - Todos os 5 projetos funcionais"

Write-Host "✅ Arquivos preparados!" -ForegroundColor Green
Write-Host ""

# Verificar se remote já existe
try {
    $remoteUrl = git remote get-url origin 2>$null
    Write-Host "✅ Repositório remoto já configurado!" -ForegroundColor Green
} catch {
    Write-Host "Adicionando repositório remoto..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$username/$repoName.git"
    Write-Host "✅ Repositório remoto adicionado!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Fazendo deploy..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Configurar branch principal
git branch -M main

# Fazer push
Write-Host "Enviando código para GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ DEPLOY REALIZADO COM SUCESSO! 🎉" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Acesse: https://github.com/$username/$repoName" -ForegroundColor White
    Write-Host "2. Vá em Settings > Pages" -ForegroundColor White
    Write-Host "3. Em Source, selecione 'GitHub Actions'" -ForegroundColor White
    Write-Host "4. Aguarde 5-10 minutos" -ForegroundColor White
    Write-Host "5. Seu site estará em: https://$username.github.io/$repoName" -ForegroundColor White
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "URLs importantes:" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Repositório: https://github.com/$username/$repoName" -ForegroundColor White
    Write-Host "Site (após deploy): https://$username.github.io/$repoName" -ForegroundColor Green
    Write-Host "Actions: https://github.com/$username/$repoName/actions" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ Erro no push! Possíveis soluções:" -ForegroundColor Red
    Write-Host "1. Verifique se o repositório existe no GitHub" -ForegroundColor Yellow
    Write-Host "2. Verifique suas credenciais" -ForegroundColor Yellow
    Write-Host "3. Tente fazer login no GitHub primeiro" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Comandos manuais:" -ForegroundColor Yellow
    Write-Host "git remote set-url origin https://github.com/$username/$repoName.git" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
}

Read-Host "Pressione Enter para sair"