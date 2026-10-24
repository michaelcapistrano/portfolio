<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import { initLenis, destroyLenis, stopScroll, startScroll } from './composables/useLenis'

const ready = ref(false)
const preloading = ref(true)

const refresh = () => ScrollTrigger.refresh()

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  initLenis()
  stopScroll()
  window.addEventListener('load', refresh)
  document.fonts?.ready.then(refresh)
})

onUnmounted(() => {
  window.removeEventListener('load', refresh)
  destroyLenis()
})

function onReveal() {
  ready.value = true
  startScroll()
}
</script>

<template>
  <Preloader v-if="preloading" @reveal="onReveal" @done="preloading = false" />
  <div class="grain" aria-hidden="true"></div>
  <NavBar />
  <main>
    <HeroSection :ready="ready" />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
  </main>
  <ContactSection />
</template>
