export interface Project {
  id: string;
  name: string;
  category: 'Landing Page' | 'Business Website' | 'Product Catalog' | 'Custom Web Application' | 'Fashion Showcase';
  description: string;
  image: string;
  url: string;
  isLive: boolean;
  featured: boolean;
  tag?: string;
}

export const projects: Project[] = [
  {
    id: 'murugan-stores',
    name: 'Sri Murugan Store',
    category: 'Business Website',
    description: 'A neighborhood grocery and provisions storefront in Coimbatore featuring store timings, location directions, and quick inquiries.',
    image: '/projects/murugan-store.webp',
    // Editable placeholder URL until final custom domain/deployment is linked
    url: 'https://sri-murugan-store.vercel.app',
    isLive: false,
    featured: true,
    tag: 'Coimbatore, IN',
  },
  {
    id: 'rockey-chicken',
    name: 'The Raakky Chicken',
    category: 'Business Website',
    description: 'Clean business website for a fresh meat retailer in Press Colony, featuring live opening/closing status, product offerings, and one-tap directions.',
    image: '/projects/rockey-chicken.jpg',
    // Editable placeholder URL until final custom domain/deployment is linked
    url: 'https://the-raakky-chicken.vercel.app',
    isLive: false,
    featured: true,
    tag: 'Coimbatore, IN',
  },
  {
    id: 'moonwoven-loops',
    name: 'Moonwoven Loops',
    category: 'Product Catalog',
    description: 'An elegant visual catalog for an artisanal crochet brand featuring categorized collections, client policies, and instant customer ordering.',
    image: '/projects/moonwoven.png',
    url: 'https://moonwoven-loops-catlog.pages.dev/',
    isLive: true,
    featured: true,
    tag: 'Live Client',
  },
  {
    id: 'sd-pos',
    name: 'SD POS',
    category: 'Custom Web Application',
    description: 'A fast, distraction-free point-of-sale web application and billing dashboard designed for real shop counter workflows and invoice previews.',
    image: '/projects/sd-pos.png',
    url: 'https://sd-pos-seven.vercel.app/',
    isLive: true,
    featured: false,
    tag: 'Web Application',
  },
  {
    id: 'velvet',
    name: 'Velvet',
    category: 'Fashion Showcase',
    description: 'An editorial design showcase exploring editorial typography, dark aesthetics, and seamless fluid transitions.',
    image: '/projects/velvet.png',
    url: 'https://sundar-codes.github.io/Velvet/',
    isLive: true,
    featured: false,
    tag: 'Studio Showcase',
  },
];
