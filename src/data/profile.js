// Everything personal lives here — edit text, links and stats without touching components.
// To add a social link, push { label, url } into `socials`. To add a stat, push { value, suffix, label } into `stats`.

export const profile = {
  name: 'Michael Capistrano',
  initials: 'MC',
  role: 'Full-Stack Developer',
  location: 'Philippines',
  available: true,
  availabilityText: 'Available for new projects',
  email: 'michaelcapistrano.19@gmail.com',
  resumeUrl: '', // e.g. '/resume.pdf' (put the file in /public)
  photo: '/Michael.jpg',

  // Hero headline: each string is one line. Wrap a word in *asterisks* to render it in italic accent serif.
  headline: ['Building *digital*', 'products that', 'feel *effortless*'],
  intro:
    'I design and build fast, reliable web applications — from Laravel APIs and MySQL databases to polished Vue and React interfaces.',

  // Section headings. Use *asterisks* for the italic accent words.
  sections: {
    about: { label: 'About me', title: 'A developer who cares about the *details*' },
    projects: { label: 'Selected work', title: 'Projects I am *proud* of' },
    skills: { label: 'Skills & tools', title: 'The *stack* I build with' },
    contact: { label: 'Contact', title: "Let's build something *great* together" },
  },
  contactText:
    'Have a project in mind, a role to fill, or just want to say hi? My inbox is always open — I usually reply within a day.',

  bio:
    'I am a full-stack developer who enjoys turning complex problems into simple, beautiful and intuitive experiences. I work across the stack — architecting backends with Laravel and MySQL, shipping interfaces with Vue, React and Next.js, and containerising everything with Docker. I believe good software is invisible: it just works, and it feels great doing it.',

  stats: [
    { value: 4, suffix: '+', label: 'Years of experience' },
    { value: 20, suffix: '+', label: 'Projects shipped' },
    { value: 10, suffix: '+', label: 'Technologies' },
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Facebook', url: 'https://www.facebook.com/' },
  ],
}
