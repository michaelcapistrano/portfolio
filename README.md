# Portfolio

Vue 3 + Vite + Tailwind CSS v4, animated with GSAP (ScrollTrigger) and smooth-scrolled with Lenis. Design inspired by the Arpeggio template.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Editing content

All content is data-driven. You never need to touch components to update copy.

| File | What it controls |
| --- | --- |
| `src/data/profile.js` | Name, role, hero headline, bio, stats, section titles, email, socials, résumé link |
| `src/data/projects.js` | Projects — append an object to add one (`featured: false` hides it) |
| `src/data/skills.js` | Skill categories and items — `icon` is a [Simple Icons](https://simpleicons.org) slug |

- Wrap words in `*asterisks*` in headings/headline to render them in the italic accent serif.
- Put images in `public/` (e.g. `public/projects/my-app.jpg`) and reference them as `/projects/my-app.jpg`.
- Your portrait is `public/Michael.jpg` (set via `profile.photo`).

## Contact form

Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY` (free key from [web3forms.com](https://web3forms.com)). Without a key the form falls back to opening the visitor's mail app.

## Theming

Colors are CSS variables in `src/style.css` (`:root` for light, `.dark` for dark). Change `--accent` to rebrand.
