# SD Web Studio V3

Production-ready, high-performance website for **SD Web Studio**, an independent web development studio based in Coimbatore, India.

Built with a focus on fast first paint, restrained editorial aesthetics, clear communication, and high inquiry conversion.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** GSAP 3 + @gsap/react
- **Routing:** React Router v7
- **Inquiry Delivery:** EmailJS (@emailjs/browser)

---

## 🎨 Brand Design Tokens

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Dark Background** | `#050506` | Primary canvas background |
| **Surface** | `#0A0A0C` | Cards, navbar, modal backdrops |
| **Lavender** | `#9986B3` | Brand accent, Serif S, active tags |
| **Gold** | `#C2A878` | Highlight accent, Serif D, CTA borders |
| **Primary Text** | `#FDFCFB` | High-contrast typography |
| **Muted Text** | `#9CA3AF` | Secondary body, metadata, labels |

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+ or v20+)
- npm or pnpm

### 2. Installation

```bash
npm install
```

### 3. Environment Configuration

Copy the sample environment file:

```bash
cp .env.example .env
```

Ensure the EmailJS keys are populated:

```env
VITE_EMAILJS_SERVICE_ID=service_wo9a9gs
VITE_EMAILJS_TEMPLATE_ID=template_1xpncm8
VITE_EMAILJS_PUBLIC_KEY=mL778sVq-ehYJKVf4
```

### 4. Development Server

```bash
npm run dev
```

### 5. Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Architecture & Organization

```
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/
│   │   └── sd-logo.png
│   └── projects/
│       ├── moonwoven.png
│       ├── rockey-chicken.jpg
│       ├── murugan-store.webp
│       ├── sd-pos.png
│       └── velvet.png
├── src/
│   ├── components/
│   │   ├── Logo.tsx             # Overlapping S/D brand mark
│   │   ├── Navbar.tsx           # Floating glass navbar + mobile drawer
│   │   ├── Loader.tsx           # GSAP dual-accent ring & split-curtain reveal
│   │   ├── Hero.tsx             # Editorial hero with concise conversion copy
│   │   ├── Services.tsx         # 4 compact capability cards
│   │   ├── ProjectCard.tsx      # Reusable project showcase card
│   │   ├── SelectedWork.tsx     # 3 initial projects + expandable portfolio
│   │   ├── Process.tsx          # 3-step transparent methodology
│   │   ├── ContactForm.tsx      # WhatsApp-first validation + EmailJS lead form
│   │   ├── Toast.tsx            # Dynamic multi-type notification system
│   │   └── Footer.tsx           # Compact brand and verified social links
│   ├── context/
│   │   └── ToastContext.tsx     # Global notification provider
│   ├── data/
│   │   └── projects.ts          # Centralized project portfolio metadata
│   ├── hooks/
│   │   └── useToast.ts          # Toast dispatch hook
│   ├── pages/
│   │   ├── Home.tsx             # One-page studio experience
│   │   └── NotFound.tsx         # Dedicated animated 404 page
│   ├── App.tsx                  # Root router & layout wrapper
│   ├── index.css                # Tailwind v4 theme & token definitions
│   └── main.tsx                 # DOM entry point
├── vercel.json                  # Clean SPA rewrite configuration
└── vite.config.ts               # Vite + Tailwind v4 config
```

---

## 📱 Features

- **WhatsApp-first Leads:** Validates 10-digit Indian numbers with zero forced email requirement.
- **Dual Contact Channels:** Direct automated delivery via EmailJS + optional 1-tap prefilled WhatsApp inquiry.
- **Dynamic Toast Feedback:** Contextual success (emerald), error (rose), warning (amber), and info (lavender) notifications.
- **Expandable Portfolio:** Features 3 primary works upfront, with seamless expansion for additional projects without layout shifts.
- **Accessibility & Performance:** Semantic tags, zero heavy WebGL/video, responsive images, ARIA live regions, and `prefers-reduced-motion` compliance.

---

## 🌐 Deployment (Vercel)

The project includes `vercel.json` configured with SPA routing rewrites. Simply import the repository on Vercel:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
