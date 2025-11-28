/**
 * Golf Lab Website Test Suite
 * Run with: node tests/tests.js
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

let passed = 0;
let failed = 0;

function log(message, color = colors.reset) {
    console.log(color + message + colors.reset);
}

function test(name, condition, message = '') {
    if (condition) {
        passed++;
        log(`  ✅ ${name}${message ? ': ' + message : ''}`, colors.green);
    } else {
        failed++;
        log(`  ❌ ${name}${message ? ': ' + message : ''}`, colors.red);
    }
}

function section(name) {
    log(`\n${name}`, colors.cyan);
    log('─'.repeat(50), colors.cyan);
}

// ============================================
// Test Suites
// ============================================

function testFileExists() {
    section('📁 File Existence Tests');

    const requiredFiles = [
        'index.html',
        'products.json',
        'news.json',
        'README.md'
    ];

    requiredFiles.forEach(file => {
        const exists = fs.existsSync(path.join(__dirname, '..', file));
        test(`${file} exists`, exists);
    });
}

function testProductsJSON() {
    section('🛒 Products JSON Tests');

    try {
        const filePath = path.join(__dirname, '..', 'products.json');
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        test('products.json is valid JSON', true);
        test('Has affiliate_id field', !!data.affiliate_id);
        test('Affiliate ID is not placeholder', data.affiliate_id !== 'YOUR-AFFILIATE-TAG');
        test('Affiliate ID format valid', /^[a-z0-9]+-[0-9]+$/i.test(data.affiliate_id), data.affiliate_id);
        test('Has categories object', !!data.categories && typeof data.categories === 'object');

        // Test categories
        const expectedCategories = ['speed', 'fitness', 'technology', 'recovery'];
        expectedCategories.forEach(cat => {
            test(`Category "${cat}" exists`, !!data.categories[cat]);
        });

        // Test products structure
        let productCount = 0;
        let validProducts = 0;
        const requiredFields = ['id', 'name', 'description', 'category', 'rating', 'badge', 'asin', 'image'];

        Object.values(data.categories).forEach(category => {
            category.products.forEach(product => {
                productCount++;
                const hasAllFields = requiredFields.every(field => product[field] !== undefined);
                if (hasAllFields) validProducts++;
            });
        });

        test('Products have all required fields', validProducts === productCount, `${validProducts}/${productCount}`);
        test('Has at least 10 products', productCount >= 10, `Found ${productCount}`);

        // Test ASIN format (10 characters)
        let validAsins = 0;
        Object.values(data.categories).forEach(category => {
            category.products.forEach(product => {
                if (product.asin && product.asin.length === 10) validAsins++;
            });
        });
        test('All ASINs are valid format', validAsins === productCount, `${validAsins}/${productCount}`);

        // Test image URLs
        let httpsImages = 0;
        Object.values(data.categories).forEach(category => {
            category.products.forEach(product => {
                if (product.image && product.image.startsWith('https://')) httpsImages++;
            });
        });
        test('All images use HTTPS', httpsImages === productCount, `${httpsImages}/${productCount}`);

    } catch (e) {
        test('products.json is valid JSON', false, e.message);
    }
}

function testNewsJSON() {
    section('📰 News JSON Tests');

    try {
        const filePath = path.join(__dirname, '..', 'news.json');
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        test('news.json is valid JSON', true);
        test('Has last_updated field', !!data.last_updated);
        test('Has articles array', Array.isArray(data.articles));
        test('Has at least 1 article', data.articles.length > 0, `Found ${data.articles.length}`);

        // Test article structure
        const requiredFields = ['id', 'date', 'title', 'summary', 'image', 'link'];
        let validArticles = 0;

        data.articles.forEach(article => {
            const hasAllFields = requiredFields.every(field => article[field] !== undefined);
            if (hasAllFields) validArticles++;
        });

        test('All articles have required fields', validArticles === data.articles.length, `${validArticles}/${data.articles.length}`);

        // Check for featured article
        const featuredCount = data.articles.filter(a => a.featured === true).length;
        test('Has at least one featured article', featuredCount > 0, `Found ${featuredCount}`);

    } catch (e) {
        test('news.json is valid JSON', false, e.message);
    }
}

function testIndexHTML() {
    section('🌐 HTML Structure Tests');

    try {
        const filePath = path.join(__dirname, '..', 'index.html');
        const html = fs.readFileSync(filePath, 'utf8');

        test('index.html exists and readable', true);

        // Meta tags
        test('Has DOCTYPE', html.includes('<!DOCTYPE html>'));
        test('Has charset meta', html.includes('charset="UTF-8"') || html.includes('charset=UTF-8'));
        test('Has viewport meta', html.includes('viewport'));
        test('Has title tag', html.includes('<title>') && html.includes('</title>'));
        test('Has description meta', html.includes('name="description"'));

        // Required sections
        const sections = ['home', 'news', 'workouts', 'mobility', 'range', 'gear', 'programs'];
        sections.forEach(section => {
            test(`Has "${section}" section`, html.includes(`id="${section}"`));
        });

        // Structure elements
        test('Has navigation', html.includes('class="nav"'));
        test('Has footer', html.includes('<footer>'));
        test('Has hero section', html.includes('class="hero"'));

        // CSS
        test('Has embedded CSS', html.includes('<style>'));
        test('Uses CSS variables', html.includes(':root') && html.includes('--'));
        test('Has media queries', html.includes('@media'));

        // JavaScript
        test('Has embedded JavaScript', html.includes('<script>'));
        test('Has showSection function', html.includes('function showSection'));
        test('Has showTab function', html.includes('function showTab'));
        test('Has dynamic loading functions', html.includes('loadProducts') && html.includes('loadNews'));

        // Accessibility
        test('Images have alt attributes', (html.match(/<img[^>]*alt="/g) || []).length > 0);
        test('Has lang attribute', html.includes('lang="en"'));

        // Affiliate links
        const affiliateLinks = (html.match(/amazon\.com\/dp\/[A-Z0-9]+\?tag=/g) || []).length;
        test('Has Amazon affiliate links', affiliateLinks > 0, `Found ${affiliateLinks}`);

    } catch (e) {
        test('index.html exists and readable', false, e.message);
    }
}

function testReadme() {
    section('📖 README Tests');

    try {
        const filePath = path.join(__dirname, '..', 'README.md');
        const content = fs.readFileSync(filePath, 'utf8');

        test('README.md exists', true);
        test('Has deployment instructions', content.toLowerCase().includes('deploy') || content.toLowerCase().includes('netlify'));
        test('Has product update instructions', content.toLowerCase().includes('products.json'));
        test('Has news update instructions', content.toLowerCase().includes('news.json'));

    } catch (e) {
        test('README.md exists', false, e.message);
    }
}

function testImageURLs() {
    section('🖼️ Image URL Tests');

    try {
        const productsPath = path.join(__dirname, '..', 'products.json');
        const newsPath = path.join(__dirname, '..', 'news.json');
        const htmlPath = path.join(__dirname, '..', 'index.html');

        const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        const html = fs.readFileSync(htmlPath, 'utf8');

        // Extract all image URLs
        const imageUrls = new Set();

        // From products
        Object.values(products.categories).forEach(cat => {
            cat.products.forEach(p => imageUrls.add(p.image));
        });

        // From news
        news.articles.forEach(a => imageUrls.add(a.image));

        // Check all use HTTPS
        let httpsCount = 0;
        imageUrls.forEach(url => {
            if (url.startsWith('https://')) httpsCount++;
        });
        test('All JSON image URLs use HTTPS', httpsCount === imageUrls.size, `${httpsCount}/${imageUrls.size}`);

        // Check for Unsplash (reliable source)
        let unsplashCount = 0;
        imageUrls.forEach(url => {
            if (url.includes('unsplash.com')) unsplashCount++;
        });
        test('Uses reliable image source (Unsplash)', unsplashCount > 0, `${unsplashCount} Unsplash images`);

    } catch (e) {
        test('Image URL validation', false, e.message);
    }
}

// ============================================
// Run Tests
// ============================================

log('\n🏌️ Golf Lab Website Test Suite', colors.blue);
log('═'.repeat(50), colors.blue);

testFileExists();
testProductsJSON();
testNewsJSON();
testIndexHTML();
testReadme();
testImageURLs();

// Summary
log('\n' + '═'.repeat(50), colors.blue);
log('📊 Test Summary', colors.blue);
log('═'.repeat(50), colors.blue);

const total = passed + failed;
log(`\n  Total Tests: ${total}`, colors.yellow);
log(`  Passed: ${passed}`, colors.green);
log(`  Failed: ${failed}`, colors.red);

if (failed === 0) {
    log(`\n✅ All tests passed!`, colors.green);
    process.exit(0);
} else {
    log(`\n❌ ${failed} test(s) failed`, colors.red);
    process.exit(1);
}
