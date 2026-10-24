<script setup>
import { ref, watch } from 'vue'
import { gsap } from 'gsap'
import RevealText from './ui/RevealText.vue'
import { profile } from '../data/profile'
import { scrollTo } from '../composables/useLenis'
import { useGsap } from '../composables/useReveal'

const props = defineProps({ ready: { type: Boolean, default: false } })

const root = ref(null)
let intro = null

useGsap(root, ({ reduced }) => {
  if (reduced) return

  intro = gsap
    .timeline({ paused: true, defaults: { ease: 'power4.out' } })
    .from('.hero-title .word-inner', { yPercent: 110, duration: 1.4, stagger: 0.07 })
    .from('.hero-fade', { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.4)
    .from('.hero-rule', { scaleX: 0, duration: 1.4, ease: 'power3.inOut' }, 0.2)
  if (props.ready) intro.play()

  // Scroll-out parallax: headline drifts up and fades, glow moves slower than the page.
  const scrub = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
  gsap.to('.hero-title', { yPercent: -25, opacity: 0.2, ease: 'none', scrollTrigger: scrub })
  gsap.to('.hero-glow', { yPercent: 40, scale: 1.2, ease: 'none', scrollTrigger: scrub })
  gsap.to('.hero-bottom', { yPercent: -60, ease: 'none', scrollTrigger: scrub })
})

watch(
  () => props.ready,
  (ready) => ready && intro?.play(),
)
</script>

<template>
  <section id="top" ref="root" class="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-6 md:pt-32 md:pb-10">
    <div
      class="hero-glow pointer-events-none absolute -right-[20vw] -top-[10vh] size-[70vw] rounded-full bg-accent/25 blur-[120px] md:-right-[10vw] md:size-[45vw]"
    ></div>

    <div class="container-x relative flex flex-wrap items-center justify-between gap-4 text-sm">
      <span class="hero-fade text-muted">{{ profile.role }} — {{ profile.location }}</span>
      <span v-if="profile.available" class="hero-fade inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
        <span class="relative flex size-2">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
          <span class="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
        </span>
        {{ profile.availabilityText }}
      </span>
    </div>

    <h1 class="hero-title container-x relative my-12 text-[clamp(3rem,11.5vw,12rem)] font-medium leading-[0.88] tracking-[-0.045em]">
      <span class="sr-only">{{ profile.name }} — </span>
      <RevealText
        v-for="(line, i) in profile.headline"
        :key="i"
        :text="line"
        class="block"
        :class="i % 2 === 1 && 'md:pl-[14vw]'"
      />
    </h1>

    <div class="hero-bottom container-x relative">
      <div class="hero-rule mb-6 h-px origin-left bg-line"></div>
      <div class="grid gap-6 md:grid-cols-3 md:items-end">
        <p class="hero-fade max-w-sm text-base leading-relaxed text-muted md:text-lg">{{ profile.intro }}</p>
        <p class="hero-fade hidden text-center text-sm text-muted md:block">
          Hi, I'm <span class="text-fg">{{ profile.name }}</span>
        </p>
        <a
          href="#about"
          class="hero-fade group inline-flex items-center gap-3 justify-self-start text-sm md:justify-self-end"
          @click.prevent="scrollTo('#about')"
        >
          Scroll to explore
          <span class="grid size-11 place-items-center rounded-full border border-line transition-colors group-hover:bg-fg group-hover:text-bg">
            <svg class="size-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
