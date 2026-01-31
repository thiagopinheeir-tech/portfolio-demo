// Simple State Reset Validation
const fs = require('fs');
const path = require('path');

console.log('🔄 Validating State Reset System Implementation...\n');

// Check if state reset system file exists
const stateResetPath = './state-reset-system.js';
if (fs.existsSync(stateResetPath)) {
    console.log('✅ State reset system file exists');
    
    const content = fs.readFileSync(stateResetPath, 'utf8');
    if (content.includes('class StateResetSystem')) {
        console.log('✅ StateResetSystem class found');
    } else {
        console.log('❌ StateResetSystem class not found');
    }
} else {
    console.log('❌ State reset system file not found');
}

// Check demo integrations
const demos = ['acai-dany', 'barbearia-raimundos', 'financas-pessoais', 'whatsapp-bot-ai', 'landpage-divulga'];
console.log('\n📁 Checking demo integrations:');

demos.forEach(demo => {
    const indexPath = `./demos/${demo}/index.html`;
    if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        if (content.includes('state-reset-system.js')) {
            console.log(`✅ ${demo}: State reset system integrated`);
        } else {
            console.log(`❌ ${demo}: State reset system NOT integrated`);
        }
    } else {
        console.log(`❌ ${demo}: index.html not found`);
    }
});

// Check test file
if (fs.existsSync('./test-state-reset.html')) {
    console.log('\n✅ Test file exists');
} else {
    console.log('\n❌ Test file not found');
}

console.log('\n🎉 Validation complete!');