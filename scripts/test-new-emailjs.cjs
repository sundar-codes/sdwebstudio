const https = require('https');

const payload = {
  service_id: 'service_wo9a9gs',
  template_id: 'template_t3iv7e9',
  user_id: 'mL778sVq-ehYJKVf4',
  accessToken: 'ZBJ9vFtm3Z2ohbLKrjczP',
  template_params: {
    from_name: 'Sundar Test',
    name: 'Sundar Test',
    reply_to: 'sundaresan.codes@gmail.com',
    email: 'sundaresan.codes@gmail.com',
    phone_no: '7904140120',
    phone: '7904140120',
    service: 'Business Website',
    budget: '₹5,000 – ₹10,000',
    timeline: '2–3 Weeks',
    message: 'Testing template_t3iv7e9 inquiry delivery to your inbox from SD Web Studio V3.',
  },
};

const data = JSON.stringify(payload);

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
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log('HTTP Status Code:', res.statusCode);
    console.log('Response Body:', body);
  });
});

req.on('error', (e) => console.error('Error:', e));
req.write(data);
req.end();
