<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
const icon = ref(null)

function onClick() {
  toggle()
  gsap.fromTo(icon.value, { rotate: -120, scale: 0.4 }, { rotate: 0, scale: 1, duration: 0.7, ease: 'back.out(2)' })
}
</script>

<template>
  <button
    type="button"
    class="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-fg"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="onClick"
  >
    <span ref="icon" class="grid place-items-center">
      <svg v-if="isDark" class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg v-else class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </span>
  </button>
</template>
