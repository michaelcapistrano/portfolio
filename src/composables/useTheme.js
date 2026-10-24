import { ref } from 'vue'

const root = document.documentElement
const isDark = ref(root.classList.contains('dark'))

function apply(dark, animate = true) {
  if (animate) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 400)
  }
  root.classList.toggle('dark', dark)
  isDark.value = dark
}

// Follow the OS setting until the user picks a theme explicitly.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null
  try {
    saved = localStorage.getItem('theme')
  } catch {}
  if (!saved) apply(e.matches)
})

export function useTheme() {
  function toggle() {
    apply(!isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    } catch {}
  }
  return { isDark, toggle }
}
