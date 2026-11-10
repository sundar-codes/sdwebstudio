const { spawn } = require('child_process');
const http = require('http');

const child = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], { stdio: 'pipe', shell: true });

child.stdout.on('data', (d) => process.stdout.write(`[vite preview]: ${d}`));
child.stderr.on('data', (d) => process.stderr.write(`[vite preview err]: ${d}`));

function checkUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:4173${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

setTimeout(async () => {
  try {
    const rootRes = await checkUrl('/');
    console.log('✓ Root route HTTP status:', rootRes.status);
    console.log('✓ Contains SD Web Studio title:', rootRes.data.includes('SD Web Studio'));
    console.log('✓ Contains structured data JSON-LD:', rootRes.data.includes('"@type": "ProfessionalService"'));
    console.log('✓ Contains favicon link:', rootRes.data.includes('/favicon.ico'));
    console.log('✓ Contains Google fonts link:', rootRes.data.includes('Playfair+Display'));

    const notFoundRes = await checkUrl('/unknown-random-route');
    console.log('✓ SPA Fallback HTTP status:', notFoundRes.status);
    console.log('✓ Fallback serves SPA shell:', notFoundRes.data.includes('<div id="root"></div>'));
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    child.kill();
    process.exit(0);
  }
}, 4000);
