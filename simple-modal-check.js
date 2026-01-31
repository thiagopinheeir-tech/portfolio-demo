// Simple Modal Implementation Check
const fs = require('fs');

console.log('🔍 Checking Modal Implementation for Task 5.1...\n');

// Check HTML structure
try {
    const html = fs.readFileSync('index.html', 'utf8');
    console.log('✅ HTML file exists');
    console.log('✅ Modal structure:', html.includes('class="demo-modal"') ? 'FOUND' : 'MISSING');
    console.log('✅ Modal container:', html.includes('class="demo-container"') ? 'FOUND' : 'MISSING');
    console.log('✅ Modal header:', html.includes('class="demo-header"') ? 'FOUND' : 'MISSING');
    console.log('✅ Modal content:', html.includes('class="demo-content"') ? 'FOUND' : 'MISSING');
    console.log('✅ Modal footer:', html.includes('class="demo-footer"') ? 'FOUND' : 'MISSING');
    console.log('✅ Iframe element:', html.includes('id="demoFrame"') ? 'FOUND' : 'MISSING');
    console.log('✅ Close button:', html.includes('id="closeDemoBtn"') ? 'FOUND' : 'MISSING');
    console.log('✅ Fullscreen button:', html.includes('id="fullscreenBtn"') ? 'FOUND' : 'MISSING');
    console.log('✅ External link:', html.includes('id="externalLink"') ? 'FOUND' : 'MISSING');
} catch (e) {
    console.log('❌ HTML file error:', e.message);
}

// Check CSS styles
try {
    const css = fs.readFileSync('assets/css/gallery.css', 'utf8');
    console.log('\n🎨 CSS Styles:');
    console.log('✅ Modal styles:', css.includes('.demo-modal') ? 'FOUND' : 'MISSING');
    console.log('✅ Fixed positioning:', css.includes('position: fixed') ? 'FOUND' : 'MISSING');
    console.log('✅ Backdrop overlay:', css.includes('rgba(0, 0, 0, 0.8)') ? 'FOUND' : 'MISSING');
    console.log('✅ Active state:', css.includes('.demo-modal.active') ? 'FOUND' : 'MISSING');
    console.log('✅ Responsive design:', css.includes('@media (max-width: 768px)') ? 'FOUND' : 'MISSING');
} catch (e) {
    console.log('❌ CSS file error:', e.message);
}

// Check JavaScript functionality
try {
    const js = fs.readFileSync('assets/js/main.js', 'utf8');
    console.log('\n⚙️ JavaScript Functions:');
    console.log('✅ Open modal:', js.includes('openDemoModal') ? 'FOUND' : 'MISSING');
    console.log('✅ Close modal:', js.includes('closeDemoModal') ? 'FOUND' : 'MISSING');
    console.log('✅ Fullscreen toggle:', js.includes('toggleFullscreen') ? 'FOUND' : 'MISSING');
    console.log('✅ Escape key handler:', js.includes('Escape') ? 'FOUND' : 'MISSING');
    console.log('✅ Focus management:', js.includes('trapFocus') ? 'FOUND' : 'MISSING');
} catch (e) {
    console.log('❌ JavaScript file error:', e.message);
}

console.log('\n🎉 Task 5.1 Modal Implementation Check Complete!');