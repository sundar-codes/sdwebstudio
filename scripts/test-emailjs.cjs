// Test EmailJS API submission directly
const https = require('https');

const data = JSON.stringify({
  service_id: 'service_wo9a9gs',
  template_id: 'template_1xpncm8',
  user_id: 'mL778sVq-ehYJKVf4',
  template_params: {
    from_name: 'SD Web Studio V3 Verification Test',
    reply_to: 'sundaresan.codes@gmail.com',
    phone_no: '7904140120',
    budget: '₹5,000 – ₹10,000',
    timeline: '2–3 Weeks',
    message: 'Testing EmailJS template compatibility and delivery from SD Web Studio V3 build verification.',
  },
});

const options = {
  hostname: 'api.emailjs.com',
  port: 443,
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Origin': 'https://sdwebstudio.vercel.app',
    'Referer': 'https://sdwebstudio.vercel.app/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => {
    body += d;
  });
  res.on('end', () => {
    console.log('EmailJS Response Code:', res.statusCode);
    console.log('EmailJS Response Body:', body);
  });
});

req.on('error', (e) => {
  console.error('EmailJS Request Error:', e);
});

req.write(data);
req.end();
