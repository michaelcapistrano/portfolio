<script setup>
import { ref } from 'vue'
import SectionHeading from './ui/SectionHeading.vue'
import SkillIcon from './ui/SkillIcon.vue'
import SkillMarquee from './SkillMarquee.vue'
import { profile } from '../data/profile'
import { skills, allSkills } from '../data/skills'
import { useGsap, fadeUp } from '../composables/useReveal'

const root = ref(null)
const pad = (n) => String(n).padStart(2, '0')

useGsap(root, ({ reduced }) => {
  if (reduced) return
  fadeUp('.skill-group', '.skill-grid', { stagger: 0.12, y: 60 })
})
</script>

<template>
  <section id="skills" ref="root" class="relative overflow-hidden py-24 md:py-40">
    <div class="container-x">
      <SectionHeading index="03" :label="profile.sections.skills.label" :title="profile.sections.skills.title" />
    </div>

    <div class="relative left-1/2 my-16 w-[110vw] -translate-x-1/2 -rotate-2 border-y border-line bg-bg py-6 md:my-24">
      <SkillMarquee :items="allSkills" :direction="1" />
      <SkillMarquee :items="[...allSkills].reverse()" :direction="-1" outline />
    </div>

    <div class="container-x">
      <div class="skill-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(group, i) in skills"
          :key="group.category"
          class="skill-group flex flex-col rounded-[1.5rem] border border-line bg-surface p-6 md:p-8"
        >
          <div class="flex items-center justify-between text-sm text-muted">
            <span class="tabular-nums">{{ pad(i + 1) }}</span>
            <span>{{ group.items.length }} {{ group.items.length === 1 ? 'skill' : 'skills' }}</span>
          </div>
          <h3 class="mt-8 text-2xl font-medium tracking-tight md:text-3xl">{{ group.category }}</h3>
          <p v-if="group.description" class="mt-2 text-sm leading-relaxed text-muted">{{ group.description }}</p>
          <ul class="mt-6 flex flex-wrap gap-2 pt-2">
            <li
              v-for="skill in group.items"
              :key="skill.name"
              class="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <SkillIcon :name="skill.name" :icon="skill.icon" class="size-4" />
              {{ skill.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
