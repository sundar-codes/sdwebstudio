// Test script to verify form validation and WhatsApp link encoding

function normalisePhone(raw) {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits;
}

function validate(name, phone, service, budget) {
  const errors = {};
  const trimmedName = name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const cleanPhone = normalisePhone(phone);
  if (!phone.trim()) {
    errors.phone = 'Please enter your WhatsApp number.';
  } else if (cleanPhone.length !== 10) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phone = 'Mobile number must begin with 6, 7, 8, or 9.';
  }

  if (!service) {
    errors.service = 'Please select a service requirement.';
  }

  if (!budget) {
    errors.budget = 'Please select an estimated budget.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function generateWhatsAppUrl(name, phone, service, budget, details) {
  const cleanPhone = normalisePhone(phone);
  const clientName = name.trim() || 'Website Visitor';
  const clientService = service || 'General Web Inquiry';
  const clientBudget = budget || 'Flexible';
  const clientDetails = details.trim() || 'Looking for project discussion.';

  const messageText = [
    `*SD Web Studio Project Enquiry*`,
    `---------------------------------`,
    `• *Name:* ${clientName}`,
    `• *WhatsApp:* ${cleanPhone || 'Not specified'}`,
    `• *Requirement:* ${clientService}`,
    `• *Budget:* ${clientBudget}`,
    `• *Details:* ${clientDetails}`,
  ].join('\n');

  return `https://wa.me/917904140120?text=${encodeURIComponent(messageText)}`;
}

// 1. Test normalisation
console.log('--- 1. Testing Phone Normalisation ---');
const testCases = [
  { input: '7904140120', expected: '7904140120' },
  { input: '+91 79041 40120', expected: '7904140120' },
  { input: '+91-7904140120', expected: '7904140120' },
  { input: '07904140120', expected: '7904140120' },
  { input: '98435 99030', expected: '9843599030' },
];

testCases.forEach(({ input, expected }) => {
  const result = normalisePhone(input);
  console.log(`Input: "${input}" => "${result}" (Match: ${result === expected})`);
  if (result !== expected) throw new Error(`Normalisation failed for ${input}`);
});

// 2. Test validation
console.log('\n--- 2. Testing Validation ---');
const validRun = validate('Sundar', '+91 7904140120', 'Landing Page', '₹5,000 – ₹10,000');
console.log('Valid submission isValid:', validRun.isValid, validRun.errors);
if (!validRun.isValid) throw new Error('Valid run was flagged as invalid');

const invalidNumberRun = validate('Sundar', '12345', 'Landing Page', '₹5,000 – ₹10,000');
console.log('Invalid short phone rejected:', !invalidNumberRun.isValid, invalidNumberRun.errors.phone);
if (invalidNumberRun.isValid) throw new Error('Invalid phone was accepted');

const invalidStartDigit = validate('Sundar', '5555555555', 'Landing Page', '₹5,000 – ₹10,000');
console.log('Invalid starting digit rejected:', !invalidStartDigit.isValid, invalidStartDigit.errors.phone);
if (invalidStartDigit.isValid) throw new Error('Invalid starting digit was accepted');

// 3. Test WhatsApp Link Generation
console.log('\n--- 3. Testing WhatsApp URL Generation ---');
const waUrl = generateWhatsAppUrl('Sundar', '+91 7904140120', 'Business Website', '₹10,000+', 'Need custom catalog');
console.log('Generated WhatsApp Link:\n', waUrl);
if (!waUrl.startsWith('https://wa.me/917904140120?text=')) throw new Error('Malformed WhatsApp link');
if (!waUrl.includes('Sundar')) throw new Error('Missing name in WhatsApp link');

console.log('\nAll validation and link tests passed successfully!');
