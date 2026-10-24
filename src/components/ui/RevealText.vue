<script setup>
import { computed } from 'vue'

// Splits text into words for GSAP. Words wrapped in *asterisks* get the accent serif style.
// mask=true → words sit in overflow masks (slide-up reveal); mask=false → plain spans (opacity scrub).
const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'span' },
  mask: { type: Boolean, default: true },
  emClass: { type: String, default: 'font-serif italic font-normal text-accent' },
})

const words = computed(() => {
  let em = false
  return props.text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      const opens = raw.startsWith('*')
      const closes = raw.endsWith('*') && (raw.length > 1 || !opens)
      if (opens) em = true
      const word = { text: raw.replace(/\*/g, ''), em }
      if (closes) em = false
      return word
    })
})
</script>

<template>
  <component :is="tag">
    <template v-for="(word, i) in words" :key="i">
      <span v-if="mask" class="word-mask"><span class="word-inner" :class="word.em && emClass">{{ word.text }}</span></span>
      <span v-else class="word" :class="word.em && emClass">{{ word.text }}</span>{{ i < words.length - 1 ? ' ' : '' }}
    </template>
  </component>
</template>
