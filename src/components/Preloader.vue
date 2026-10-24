<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { profile } from '../data/profile'
import { reducedMotion } from '../composables/useLenis'

// `reveal` fires as the curtain starts lifting (start the hero intro); `done` once it's gone.
const emit = defineEmits(['reveal', 'done'])
const root = ref(null)
const count = ref(0)

onMounted(() => {
  if (reducedMotion) {
    emit('reveal')
    emit('done')
    return
  }
  const counter = { value: 0 }
  gsap
    .timeline({ onComplete: () => emit('done') })
    .from('.pre-name .word-inner', { yPercent: 110, duration: 0.8, ease: 'power4.out', stagger: 0.08 }, 0)
    .to(
      counter,
      { value: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => (count.value = Math.round(counter.value)) },
      0,
    )
    .to('.pre-content', { yPercent: -30, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .add(() => emit('reveal'))
    .to(root.value, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '<')
})
</script>

<template>
  <div ref="root" class="fixed inset-0 z-[100] bg-fg p-4 text-bg md:p-10">
    <div class="pre-content flex h-full flex-col justify-between">
      <p class="pre-name text-xs uppercase tracking-[0.2em] md:text-sm">
        <span class="word-mask"><span class="word-inner">{{ profile.name }}</span></span>
        <span class="word-mask ml-2 opacity-50"><span class="word-inner">— {{ profile.role }}</span></span>
      </p>
      <p class="self-end text-[clamp(5rem,20vw,16rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
        {{ count }}<span class="font-serif italic text-accent">%</span>
      </p>
    </div>
  </div>
</template>
