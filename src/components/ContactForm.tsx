import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Check, Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const serviceOptions = [
  'Landing Page',
  'Business Website',
  'Online Catalog',
  'Custom Web Application',
  'Not Sure Yet',
];

const budgetOptions = [
  'Below ₹2,000',
  '₹3,000 – ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000+',
  'Need Guidance',
];

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  budget?: string;
}

export const ContactForm: React.FC = () => {
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Normalise phone number to 10-digit Indian standard
  const normalisePhone = (raw: string): string => {
    // Strip country code +91 or 91 prefix if user typed it, plus spaces, dashes, parentheses
    let digits = raw.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return digits;
  };

  const validate = (): { isValid: boolean; newErrors: FormErrors } => {
    const newErrors: FormErrors = {};

    // Validate Name
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Please enter your name.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Validate Phone
    const cleanPhone = normalisePhone(phone);
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your WhatsApp number.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Mobile number must begin with 6, 7, 8, or 9.';
    }

    // Validate Service
    if (!service) {
      newErrors.service = 'Please select a service requirement.';
    }

    // Validate Budget
    if (!budget) {
      newErrors.budget = 'Please select an estimated budget.';
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      newErrors,
    };
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const { newErrors } = validate();
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      service: true,
      budget: true,
    });

    const { isValid, newErrors } = validate();
    setErrors(newErrors);

    if (!isValid) {
      error('Please fill in the required fields correctly before submitting.', 'Validation Error');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_wo9a9gs';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_1xpncm8';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mL778sVq-ehYJKVf4';

    const cleanPhone = normalisePhone(phone);

    // Timeline inference based on budget/service for existing template contract
    let estimatedTimeline = '2–3 Weeks';
    if (budget === 'Below ₹2,000') estimatedTimeline = '1–2 Weeks';
    else if (budget === '₹3,000 – ₹5,000') estimatedTimeline = '2–3 Weeks';
    else if (budget === '₹5,000 – ₹10,000') estimatedTimeline = '3–4 Weeks';
    else if (budget === '₹10,000+') estimatedTimeline = '4+ Weeks';

    const templateParams = {
      from_name: name.trim(),
      reply_to: '',
      phone_no: cleanPhone,
      budget: budget,
      timeline: estimatedTimeline,
      message: `Selected Service: ${service}\nAdditional Details: ${details.trim() || 'No additional details provided.'}`,
    };

    setSubmitState('sending');

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitState('sent');
      success(
        "Enquiry sent successfully! We'll get back to you shortly.",
        'Message Delivered'
      );

      // Reset fields after confirmed delivery
      setName('');
      setPhone('');
      setService('');
      setBudget('');
      setDetails('');
      setTouched({});
      setErrors({});

      setTimeout(() => {
        setSubmitState('idle');
      }, 5000);
    } catch (err: unknown) {
      console.error('EmailJS submission error:', err);
      setSubmitState('idle');
      error(
        "Something went wrong. Your enquiry couldn't be sent. Please try again.",
        'Delivery Failed'
      );
    }
  };

  // WhatsApp prefilled link generation
  const handleWhatsAppDirect = (e: React.MouseEvent) => {
    e.preventDefault();

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

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/917904140120?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/[0.05] relative">
      {/* Background Subtle Ambient Glow */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] bg-[#9986B3]/[0.04] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2.5 font-medium">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
            Have a project <span className="text-[#9986B3] italic font-normal">in mind?</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] max-w-sm mt-3 leading-relaxed">
            Tell us what you're looking to build. We'll get back to you.
          </p>
        </div>

        {/* Compact Form Card */}
        <div className="bg-[#0A0A0C] border border-white/[0.07] rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="client-name"
                className="block font-sans text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF] mb-1.5 font-medium"
              >
                Your Name <span className="text-[#C2A878]">*</span>
              </label>
              <input
                id="client-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Anand Kumar"
                disabled={submitState === 'sending'}
                className={`w-full bg-[#050506] border rounded-xl px-4 py-3 text-sm text-[#FDFCFB] placeholder-white/20 font-sans transition-colors focus:outline-none ${
                  touched.name && errors.name
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-white/10 focus:border-[#9986B3]'
                }`}
              />
              {touched.name && errors.name && (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-sans">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* WhatsApp Number Field */}
            <div>
              <label
                htmlFor="client-phone"
                className="block font-sans text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF] mb-1.5 font-medium"
              >
                WhatsApp Number <span className="text-[#C2A878]">*</span>
              </label>
              <div className="relative">
                <input
                  id="client-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  onBlur={() => handleBlur('phone')}
                  placeholder="e.g. 98435 99030 or +91 9843599030"
                  disabled={submitState === 'sending'}
                  className={`w-full bg-[#050506] border rounded-xl px-4 py-3 text-sm text-[#FDFCFB] placeholder-white/20 font-sans transition-colors focus:outline-none ${
                    touched.phone && errors.phone
                      ? 'border-rose-500/80 focus:border-rose-500'
                      : 'border-white/10 focus:border-[#9986B3]'
                  }`}
                />
              </div>
              {touched.phone && errors.phone ? (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-sans">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.phone}
                </p>
              ) : (
                <p className="mt-1 font-sans text-[10px] text-[#9CA3AF]/60">
                  Standard 10-digit Indian mobile number. No email required.
                </p>
              )}
            </div>

            {/* Grid for Service and Budget selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Service Selection */}
              <div>
                <label
                  htmlFor="client-service"
                  className="block font-sans text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF] mb-1.5 font-medium"
                >
                  What do you need? <span className="text-[#C2A878]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="client-service"
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value);
                      if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                    }}
                    onBlur={() => handleBlur('service')}
                    disabled={submitState === 'sending'}
                    className={`w-full bg-[#050506] border rounded-xl px-4 py-3 text-sm font-sans transition-colors focus:outline-none appearance-none cursor-pointer ${
                      !service ? 'text-white/30' : 'text-[#FDFCFB]'
                    } ${
                      touched.service && errors.service
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-[#9986B3]'
                    }`}
                  >
                    <option value="" disabled>
                      Select Service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0A0A0C] text-[#FDFCFB]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {touched.service && errors.service && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-sans">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Budget Selection */}
              <div>
                <label
                  htmlFor="client-budget"
                  className="block font-sans text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF] mb-1.5 font-medium"
                >
                  Estimated Budget <span className="text-[#C2A878]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="client-budget"
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      if (errors.budget) setErrors((prev) => ({ ...prev, budget: undefined }));
                    }}
                    onBlur={() => handleBlur('budget')}
                    disabled={submitState === 'sending'}
                    className={`w-full bg-[#050506] border rounded-xl px-4 py-3 text-sm font-sans transition-colors focus:outline-none appearance-none cursor-pointer ${
                      !budget ? 'text-white/30' : 'text-[#FDFCFB]'
                    } ${
                      touched.budget && errors.budget
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-[#9986B3]'
                    }`}
                  >
                    <option value="" disabled>
                      Select Budget
                    </option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0A0A0C] text-[#FDFCFB]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {touched.budget && errors.budget && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-sans">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.budget}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Project Details */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="client-details"
                  className="block font-sans text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF] font-medium"
                >
                  Additional Project Details <span className="text-[#9CA3AF]/50 lowercase">(optional)</span>
                </label>
                <span className="font-sans text-[10px] text-[#9CA3AF]/40">
                  {details.length}/500
                </span>
              </div>
              <textarea
                id="client-details"
                rows={3}
                maxLength={500}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Briefly describe your business, timeline, or any specific reference sites you admire..."
                disabled={submitState === 'sending'}
                className="w-full bg-[#050506] border border-white/10 focus:border-[#9986B3] rounded-xl px-4 py-3 text-sm text-[#FDFCFB] placeholder-white/20 font-sans transition-colors focus:outline-none resize-none"
              />
            </div>

            {/* Form Submit Action with 3 visible states */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitState === 'sending'}
                className={`w-full py-3.5 rounded-full font-sans text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  submitState === 'sent'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : submitState === 'sending'
                    ? 'bg-[#C2A878]/20 text-[#C2A878] border-[#C2A878]/40 cursor-wait'
                    : 'bg-[#FDFCFB] text-[#050506] border-[#FDFCFB] hover:bg-[#9986B3] hover:text-[#050506] hover:border-[#9986B3] shadow-lg shadow-white/5'
                }`}
              >
                {submitState === 'sent' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Enquiry Sent ✓</span>
                  </>
                ) : submitState === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C2A878]" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <Send className="w-3.5 h-3.5 ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Secondary Action: WhatsApp Direct Link */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] text-center">
            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-2 text-xs font-sans text-[#9CA3AF] hover:text-[#C2A878] transition-colors group focus-visible:ring-1 focus-visible:ring-[#C2A878] rounded px-2 py-1"
            >
              <MessageSquare className="w-4 h-4 text-[#C2A878] transition-transform group-hover:scale-110" />
              <span>Prefer WhatsApp? Send your enquiry there →</span>
            </button>
            <p className="font-sans text-[10px] text-[#9CA3AF]/50 mt-1">
              Opens WhatsApp directly with your pre-filled inquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
