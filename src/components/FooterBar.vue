<script setup>
import { profile } from '../data/profile'
import { scrollTo } from '../composables/useLenis'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-24 border-t border-bg/15 py-8 md:mt-32">
    <div class="flex flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
      <p class="text-bg/60">© {{ year }} {{ profile.name }}. All rights reserved.</p>
      <ul class="flex flex-wrap gap-x-6 gap-y-2">
        <li v-for="s in profile.socials" :key="s.label">
          <a :href="s.url" target="_blank" rel="noopener" class="text-bg/70 transition-colors hover:text-accent">{{ s.label }}</a>
        </li>
      </ul>
      <button type="button" class="group inline-flex items-center gap-2 self-start md:self-auto" @click="scrollTo(0)">
        Back to top
        <span class="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
      </button>
    </div>
  </footer>
</template>
