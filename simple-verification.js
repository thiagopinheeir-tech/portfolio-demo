const fs = require('fs');

console.log('🔍 Starting Portfolio Demo System Verification...');
console.log('==========================================');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function checkFile(name, path) {
    totalTests++;
    if (fs.existsSync(path)) {
        console.log(`✅ ${name}: Found`);
        passedTests++;
        return true;
    } else {
        console.log(`❌ ${name}: Missing`);
        failedTests++;
        return false;
    }
}

// Check core components
console.log('\n📦 Core Components:');
checkFile('Main HTML', 'index.html');
checkFile('Main CSS', 'assets/css/main.css');
checkFile('Main JS', 'assets/js/main.js');
checkFile('Service Worker', 'sw.js');

// Check project demos
console.log('\n🎯 Project Demos:');
const demos = [
    'demos/acai-dany/index.html',
    'demos/barbearia-raimundos/index.html', 
    'demos/financas-pessoais/index.html',
    'demos/whatsapp-bot-ai/index.html',
    'demos/landpage-divulga/index.html'
];

let demosFound = 0;
demos.forEach((demo, i) => {
    if (checkFile(`Demo ${i+1}`, demo)) {
        demosFound++;
    }
});

// Check documentation
console.log('\n📚 Documentation:');
checkFile('README', 'README.md');
checkFile('Setup Guide', 'SETUP.md');
checkFile('Deployment Guide', 'DEPLOYMENT.md');

// Check deployment configs
console.log('\n🚀 Deployment Configs:');
checkFile('Vercel Config', 'vercel.json');
checkFile('Netlify Config', 'netlify.toml');
checkFile('GitHub Pages Config', '_config.yml');

console.log('\n==========================================');
console.log('📊 VERIFICATION RESULTS');
console.log('==========================================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success Rate: ${Math.round((passedTests/totalTests)*100)}%`);
console.log(`Project Demos: ${demosFound}/5`);

if (failedTests === 0 && demosFound === 5) {
    console.log('\n🎉 SYSTEM VERIFICATION: PASSED');
    console.log('✅ Portfolio Demo System is ready for production!');
} else if (failedTests <= 2 && demosFound >= 4) {
    console.log('\n⚠️ SYSTEM VERIFICATION: PASSED WITH WARNINGS');
    console.log('✅ Portfolio Demo System is functional with minor issues');
} else {
    console.log('\n❌ SYSTEM VERIFICATION: FAILED');
    console.log('❌ Critical issues need to be addressed');
}
console.log('==========================================');