// Add a skill by pushing { name, icon } into a category's `items`, or add a whole new category.
// icon: a Simple Icons slug (https://simpleicons.org) — e.g. 'laravel', 'vuedotjs'. Leave '' to show initials instead.

export const skills = [
  {
    category: 'Frontend',
    description: 'Interfaces that are fast, accessible and a joy to use.',
    items: [
      { name: 'Vue', icon: 'vuedotjs' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    category: 'Backend',
    description: 'Robust APIs and business logic that scale.',
    items: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'PHP', icon: 'php' },
    ],
  },
  {
    category: 'Database',
    description: 'Well-modelled data and efficient queries.',
    items: [{ name: 'MySQL', icon: 'mysql' }],
  },
  {
    category: 'Tools & DevOps',
    description: 'Version control and reproducible environments.',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
    ],
  },
]

// Flat list used by the marquee.
export const allSkills = skills.flatMap((group) => group.items)
