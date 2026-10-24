<script setup>
import { ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThemeToggle from './ThemeToggle.vue'
import { profile } from '../data/profile'
import { scrollTo, stopScroll, startScroll } from '../composables/useLenis'
import { useGsap } from '../composables/useReveal'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const root = ref(null)
const hidden = ref(false)
const scrolled = ref(false)
const menuOpen = ref(false)

useGsap(root, () => {
  gsap.to('.nav-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: true },
  })
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      scrolled.value = self.scroll() > 40
      hidden.value = self.direction === 1 && self.scroll() > 400
    },
  })
})

watch(menuOpen, (open) => (open ? stopScroll() : startScroll()))

function go(target) {
  menuOpen.value = false
  scrollTo(target)
}
</script>

<template>
  <header
    ref="root"
    class="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
    :class="hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'"
  >
    <div
      class="border-b transition-colors duration-300"
      :class="scrolled || menuOpen ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent'"
    >
      <nav class="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" class="group flex items-center gap-2 font-medium tracking-tight" @click.prevent="go(0)">
          <span
            class="grid size-9 place-items-center rounded-full bg-fg font-serif text-lg italic text-bg transition-transform duration-500 group-hover:rotate-[360deg]"
          >
            {{ profile.initials.toLowerCase() }}
          </span>
          <span class="hidden sm:inline">{{ profile.name }}</span>
        </a>

        <ul class="hidden items-center gap-8 text-sm md:flex">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" class="group relative py-1" @click.prevent="go(link.href)">
              {{ link.label }}
              <span
                class="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-fg transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"
              ></span>
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            class="relative grid size-10 place-items-center rounded-full border border-line md:hidden"
            :aria-expanded="menuOpen"
            aria-label="Toggle menu"
            @click="menuOpen = !menuOpen"
          >
            <span class="absolute h-px w-4 bg-fg transition-transform duration-300" :class="menuOpen ? 'rotate-45' : '-translate-y-1'"></span>
            <span class="absolute h-px w-4 bg-fg transition-transform duration-300" :class="menuOpen ? '-rotate-45' : 'translate-y-1'"></span>
          </button>
        </div>
      </nav>
      <div class="nav-progress h-px origin-left scale-x-0 bg-accent"></div>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" class="fixed inset-x-0 top-16 bottom-0 bg-bg md:hidden">
        <ul class="container-x flex flex-col gap-2 pt-10">
          <li v-for="(link, i) in links" :key="link.href" class="menu-item overflow-hidden" :style="{ '--i': i }">
            <a :href="link.href" class="flex items-baseline gap-3 py-2 text-5xl font-medium tracking-tight" @click.prevent="go(link.href)">
              <span class="text-sm text-muted">0{{ i + 1 }}</span>{{ link.label }}
            </a>
          </li>
        </ul>
        <div class="container-x mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <a v-for="s in profile.socials" :key="s.label" :href="s.url" target="_blank" rel="noopener">{{ s.label }} ↗</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: clip-path 0.6s cubic-bezier(0.7, 0, 0.3, 1);
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}
.menu-enter-active .menu-item a {
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: calc(0.15s + var(--i) * 0.06s);
}
.menu-enter-from .menu-item a {
  transform: translateY(110%);
}
</style>
