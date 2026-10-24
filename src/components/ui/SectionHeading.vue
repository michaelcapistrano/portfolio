<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import RevealText from './RevealText.vue'
import { useGsap, revealWords } from '../../composables/useReveal'

defineProps({
  index: { type: String, required: true },
  label: { type: String, required: true },
  title: { type: String, required: true },
})

const root = ref(null)

useGsap(root, ({ reduced }) => {
  if (reduced) return
  gsap.from('.heading-line', {
    scaleX: 0,
    duration: 1.4,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: root.value, start: 'top 90%' },
  })
  revealWords(root.value.querySelector('h2'))
})
</script>

<template>
  <div ref="root">
    <div class="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted md:text-sm">
      <span>({{ index }})</span>
      <span class="heading-line h-px flex-1 origin-left bg-line"></span>
      <span>{{ label }}</span>
    </div>
    <RevealText
      tag="h2"
      :text="title"
      class="mt-8 max-w-5xl text-[clamp(2.25rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.035em] md:mt-12"
    />
  </div>
</template>
