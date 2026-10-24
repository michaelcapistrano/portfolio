<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { reducedMotion } from '../../composables/useLenis'

const props = defineProps({
  tag: { type: String, default: 'a' },
  strength: { type: Number, default: 0.35 },
})

const el = ref(null)
const inner = ref(null)
let xTo, yTo, ixTo, iyTo

onMounted(() => {
  const opts = { duration: 0.8, ease: 'elastic.out(1, 0.4)' }
  xTo = gsap.quickTo(el.value, 'x', opts)
  yTo = gsap.quickTo(el.value, 'y', opts)
  ixTo = gsap.quickTo(inner.value, 'x', opts)
  iyTo = gsap.quickTo(inner.value, 'y', opts)
})

function onMove(e) {
  if (reducedMotion) return
  const r = el.value.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  xTo(dx * props.strength)
  yTo(dy * props.strength)
  ixTo(dx * props.strength * 0.4)
  iyTo(dy * props.strength * 0.4)
}

function onLeave() {
  xTo?.(0)
  yTo?.(0)
  ixTo?.(0)
  iyTo?.(0)
}
</script>

<template>
  <component :is="tag" ref="el" class="inline-flex will-change-transform" @mousemove="onMove" @mouseleave="onLeave">
    <span ref="inner" class="inline-flex h-full w-full items-center justify-center"><slot /></span>
  </component>
</template>
