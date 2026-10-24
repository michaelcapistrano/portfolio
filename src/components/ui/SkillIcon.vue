<script setup>
import { ref, computed, watch } from 'vue'

// Monochrome Simple Icons logo that follows the current text color (so it adapts to the theme).
// Falls back to initials when no slug is given or the icon fails to load.
const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
})

const failed = ref(false)
const url = computed(() => (props.icon ? `https://cdn.simpleicons.org/${props.icon}` : ''))
const initials = computed(() =>
  props.name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)

watch(
  url,
  (src) => {
    failed.value = !src
    if (!src) return
    const img = new Image()
    img.onerror = () => (failed.value = true)
    img.src = src
  },
  { immediate: true },
)
</script>

<template>
  <span
    v-if="!failed"
    class="inline-block shrink-0 bg-current"
    :style="{ maskImage: `url(${url})`, WebkitMaskImage: `url(${url})`, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }"
    role="img"
    :aria-label="name"
  ></span>
  <span
    v-else
    class="inline-flex shrink-0 items-center justify-center rounded-md border border-current text-[0.6em] font-semibold leading-none"
    :aria-label="name"
    >{{ initials }}</span
  >
</template>
