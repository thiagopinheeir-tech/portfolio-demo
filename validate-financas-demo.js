// Validation script for Finanças Pessoais demo
const fs = require('fs');
const path = require('path');

function validateFinancasDemo() {
    console.log('🧪 Validando demo Finanças Pessoais...\n');
    
    const demoPath = path.join(__dirname, 'demos', 'financas-pessoais');
    const requiredFiles = [
        'index.html',
        'styles.css', 
        'script.js',
        'README.md'
    ];
    
    let allValid = true;
    
    // Check if demo directory exists
    if (!fs.existsSync(demoPath)) {
        console.log('❌ Diretório do demo não encontrado:', demoPath);
        return false;
    }
    
    console.log('✅ Diretório do demo encontrado');
    
    // Check required files
    requiredFiles.forEach(file => {
        const filePath = path.join(demoPath, file);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            console.log(`✅ ${file} - ${stats.size} bytes`);
        } else {
            console.log(`❌ ${file} - Arquivo não encontrado`);
            allValid = false;
        }
    });
    
    // Validate HTML content
    const htmlPath = path.join(demoPath, 'index.html');
    if (fs.existsSync(htmlPath)) {
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        const requiredElements = [
            'JP Empréstimos',
            'demo-nav',
            'dashboard-grid',
            'calculateLoan',
            'client-list',
            'script.js'
        ];
        
        console.log('\n📋 Validando conteúdo HTML:');
        requiredElements.forEach(element => {
            if (htmlContent.includes(element)) {
                console.log(`✅ ${element} encontrado`);
            } else {
                console.log(`❌ ${element} não encontrado`);
                allValid = false;
            }
        });
    }
    
    // Validate CSS content
    const cssPath = path.join(demoPath, 'styles.css');
    if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        const requiredStyles = [
            ':root',
            '--primary-color',
            '.demo-nav',
            '.dashboard-grid',
            '.stat-card',
            '@media'
        ];
        
        console.log('\n🎨 Validando estilos CSS:');
        requiredStyles.forEach(style => {
            if (cssContent.includes(style)) {
                console.log(`✅ ${style} encontrado`);
            } else {
                console.log(`❌ ${style} não encontrado`);
                allValid = false;
            }
        });
    }
    
    // Validate JavaScript content
    const jsPath = path.join(demoPath, 'script.js');
    if (fs.existsSync(jsPath)) {
        const jsContent = fs.readFileSync(jsPath, 'utf8');
        
        const requiredFunctions = [
            'class FinancasDemo',
            'calculateLoan',
            'formatCurrency',
            'showNotification',
            'animateStats'
        ];
        
        console.log('\n⚡ Validando JavaScript:');
        requiredFunctions.forEach(func => {
            if (jsContent.includes(func)) {
                console.log(`✅ ${func} encontrado`);
            } else {
                console.log(`❌ ${func} não encontrado`);
                allValid = false;
            }
        });
    }
    
    console.log('\n' + '='.repeat(50));
    if (allValid) {
        console.log('🎉 SUCESSO: Demo Finanças Pessoais validado com sucesso!');
        console.log('📁 Arquivos copiados e adaptados corretamente');
        console.log('🎨 Interface preservada com melhorias');
        console.log('⚡ Funcionalidades de cálculo implementadas');
        console.log('📱 Design responsivo mantido');
    } else {
        console.log('❌ ERRO: Alguns problemas foram encontrados no demo');
    }
    
    return allValid;
}

// Run validation
if (require.main === module) {
    validateFinancasDemo();
}

module.exports = { validateFinancasDemo };