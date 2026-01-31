@echo off
echo ========================================
echo    PORTFOLIO DEMO - DEPLOY GITHUB
echo ========================================
echo.

REM Verificar se Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git não está instalado!
    echo Baixe e instale: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git encontrado!
echo.

REM Verificar se estamos na pasta correta
if not exist "index.html" (
    echo ❌ Erro: Execute este script na pasta portfolio-demo
    echo Certifique-se de estar na pasta que contém index.html
    pause
    exit /b 1
)

echo ✅ Pasta correta encontrada!
echo.

REM Solicitar informações do usuário
set /p USERNAME="Digite seu username do GitHub (thiagopinheeir-tech): "
if "%USERNAME%"=="" set USERNAME=thiagopinheeir-tech

set /p REPO_NAME="Digite o nome do repositório (portfolio-demo): "
if "%REPO_NAME%"=="" set REPO_NAME=portfolio-demo

set /p USER_NAME="Digite seu nome completo: "
set /p USER_EMAIL="Digite seu email: "

echo.
echo ========================================
echo Configurando Git...
echo ========================================

REM Configurar Git
git config --global user.name "%USER_NAME%"
git config --global user.email "%USER_EMAIL%"

echo ✅ Git configurado!
echo.

REM Verificar se já é um repositório Git
if not exist ".git" (
    echo Inicializando repositório Git...
    git init
    echo ✅ Repositório Git inicializado!
) else (
    echo ✅ Repositório Git já existe!
)

echo.
echo ========================================
echo Preparando arquivos...
echo ========================================

REM Adicionar todos os arquivos
git add .

REM Fazer commit
git commit -m "Deploy: Portfolio Demo System - Todos os 5 projetos funcionais"

echo ✅ Arquivos preparados!
echo.

REM Verificar se remote já existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adicionando repositório remoto...
    git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git
    echo ✅ Repositório remoto adicionado!
) else (
    echo ✅ Repositório remoto já configurado!
)

echo.
echo ========================================
echo Fazendo deploy...
echo ========================================

REM Configurar branch principal
git branch -M main

REM Fazer push
echo Enviando código para GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Erro no push! Possíveis soluções:
    echo 1. Verifique se o repositório existe no GitHub
    echo 2. Verifique suas credenciais
    echo 3. Tente fazer login no GitHub primeiro
    echo.
    echo Comandos manuais:
    echo git remote set-url origin https://github.com/%USERNAME%/%REPO_NAME%.git
    echo git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ DEPLOY REALIZADO COM SUCESSO! 🎉
echo ========================================
echo.
echo Próximos passos:
echo.
echo 1. Acesse: https://github.com/%USERNAME%/%REPO_NAME%
echo 2. Vá em Settings ^> Pages
echo 3. Em Source, selecione "GitHub Actions"
echo 4. Aguarde 5-10 minutos
echo 5. Seu site estará em: https://%USERNAME%.github.io/%REPO_NAME%
echo.
echo ========================================
echo URLs importantes:
echo ========================================
echo Repositório: https://github.com/%USERNAME%/%REPO_NAME%
echo Site (após deploy): https://%USERNAME%.github.io/%REPO_NAME%
echo Actions: https://github.com/%USERNAME%/%REPO_NAME%/actions
echo.

pause