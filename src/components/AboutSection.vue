<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import SectionHeading from './ui/SectionHeading.vue'
import RevealText from './ui/RevealText.vue'
import { profile } from '../data/profile'
import { useGsap, parallax, fadeUp } from '../composables/useReveal'

const root = ref(null)

useGsap(root, ({ reduced }) => {
  if (reduced) return

  // Portrait: clip-path reveal, then inner image parallax.
  gsap.from('.about-photo', {
    clipPath: 'inset(100% 0 0 0)',
    duration: 1.4,
    ease: 'power4.inOut',
    scrollTrigger: { trigger: '.about-photo', start: 'top 85%' },
  })
  parallax('.about-photo img', { speed: 8, trigger: root.value })

  // Bio lights up word by word as you scroll.
  gsap.fromTo(
    '.about-bio .word',
    { opacity: 0.15 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: '.about-bio', start: 'top 80%', end: 'bottom 45%', scrub: true },
    },
  )

  // Stat counters.
  gsap.utils.toArray('.stat-value').forEach((el) => {
    gsap.from(el, {
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: { trigger: el, start: 'top 90%' },
    })
  })
  fadeUp('.stat', '.about-stats')
  fadeUp('.about-cta', '.about-cta', { start: 'top 95%' })
})
</script>

<template>
  <section id="about" ref="root" class="relative py-24 md:py-40">
    <div class="container-x">
      <SectionHeading index="01" :label="profile.sections.about.label" :title="profile.sections.about.title" />

      <div class="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <div class="about-photo relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface">
            <img :src="profile.photo" :alt="`Portrait of ${profile.name}`" class="absolute inset-0 size-full scale-[1.2] object-cover object-[50%_30%]" loading="lazy" />
          </div>
        </div>

        <div class="flex flex-col justify-between gap-16">
          <RevealText
            tag="p"
            :text="profile.bio"
            :mask="false"
            em-class=""
            class="about-bio text-[clamp(1.5rem,2.8vw,2.6rem)] font-normal leading-[1.2] tracking-[-0.02em]"
          />

          <div class="about-stats grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
            <div v-for="stat in profile.stats" :key="stat.label" class="stat">
              <p class="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.04em]">
                <span class="stat-value tabular-nums">{{ stat.value }}</span><span class="font-serif italic text-accent">{{ stat.suffix }}</span>
              </p>
              <p class="mt-3 text-sm text-muted">{{ stat.label }}</p>
            </div>
          </div>

          <div class="about-cta flex flex-wrap items-center gap-4">
            <a
              v-if="profile.resumeUrl"
              :href="profile.resumeUrl"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-105"
            >
              Download résumé
            </a>
            <a
              v-for="s in profile.socials"
              :key="s.label"
              :href="s.url"
              target="_blank"
              rel="noopener"
              class="rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-fg hover:bg-fg hover:text-bg"
            >
              {{ s.label }} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
