<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillIcon from './ui/SkillIcon.vue'
import { reducedMotion } from '../composables/useLenis'

const props = defineProps({
  items: { type: Array, required: true },
  direction: { type: Number, default: 1 }, // 1 = left, -1 = right
  outline: { type: Boolean, default: false },
  speed: { type: Number, default: 2.5 }, // % of track per second
})

const track = ref(null)

// Repeat short lists so one copy is always wider than the viewport.
const set = computed(() => {
  const out = []
  while (out.length < 8 && props.items.length) out.push(...props.items)
  return out
})

let pos = 0
let boost = 0
let scrollDir = 1
let trigger

function tick(_, deltaTime) {
  boost *= 0.92
  pos -= props.direction * scrollDir * (props.speed + boost) * (deltaTime / 1000)
  if (pos <= -50) pos += 50
  if (pos > 0) pos -= 50
  gsap.set(track.value, { xPercent: pos })
}

onMounted(() => {
  if (reducedMotion) return
  // Scrolling speeds the marquee up; scrolling up reverses it.
  trigger = ScrollTrigger.create({
    onUpdate(self) {
      scrollDir = self.direction
      boost = Math.min(Math.abs(self.getVelocity()) / 150, 20)
    },
  })
  gsap.ticker.add(tick)
})

onUnmounted(() => {
  gsap.ticker.remove(tick)
  trigger?.kill()
})
</script>

<template>
  <div class="overflow-hidden py-2" aria-hidden="true">
    <div ref="track" class="flex w-max will-change-transform">
      <ul v-for="copy in 2" :key="copy" class="flex shrink-0 items-center">
        <li
          v-for="(skill, i) in set"
          :key="`${copy}-${i}`"
          class="flex items-center gap-[0.35em] px-[0.4em] text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[1.1] tracking-[-0.04em]"
        >
          <SkillIcon :name="skill.name" :icon="skill.icon" class="size-[0.7em]" :class="outline ? 'text-muted' : 'text-fg'" />
          <span :class="outline ? 'text-outline' : ''">{{ skill.name }}</span>
          <span class="ml-[0.4em] font-serif text-[0.6em] italic text-accent">✦</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.text-outline {
  color: transparent;
  -webkit-text-stroke: 1px var(--fg);
}
</style>
