// Add a project by appending an object to this array — it appears on the site automatically.
// image: a path inside /public (e.g. '/projects/my-app.jpg') or a full URL.
// liveUrl / repoUrl are optional; leave '' to hide the button.
// Set featured: false to hide a project without deleting it.

export const projects = [
  {
    id: 'shopwave',
    title: 'Shopwave',
    category: 'E-commerce Platform',
    year: 2025,
    description:
      'A headless e-commerce platform with a Laravel API, real-time inventory, Stripe checkout and a lightning-fast Next.js storefront.',
    image: '/projects/project-1.svg',
    tags: ['Laravel', 'Next.js', 'MySQL', 'Tailwind'],
    liveUrl: '',
    repoUrl: '',
    featured: true,
  },
  {
    id: 'pulse-analytics',
    title: 'Pulse Analytics',
    category: 'SaaS Dashboard',
    year: 2024,
    description:
      'A multi-tenant analytics dashboard with live charts, role-based access and scheduled reports, built with Vue 3 and Laravel.',
    image: '/projects/project-2.svg',
    tags: ['Vue', 'Laravel', 'MySQL', 'Docker'],
    liveUrl: '',
    repoUrl: '',
    featured: true,
  },
  {
    id: 'bookly',
    title: 'Bookly',
    category: 'Booking System',
    year: 2024,
    description:
      'Appointment booking for clinics with calendar sync, SMS reminders and an admin panel — packaged with Docker for one-command deploys.',
    image: '/projects/project-3.svg',
    tags: ['React', 'Laravel', 'Docker', 'Git'],
    liveUrl: '',
    repoUrl: '',
    featured: true,
  },
]
