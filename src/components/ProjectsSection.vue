<script setup>
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import SectionHeading from './ui/SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { useGsap } from '../composables/useReveal'

const root = ref(null)
const visible = computed(() => projects.filter((p) => p.featured !== false))

useGsap(root, ({ reduced }) => {
  if (reduced) return

  // Markers are non-sticky, so their positions stay stable for ScrollTrigger while cards are stuck.
  const markers = gsap.utils.toArray('.project-marker')
  const cards = gsap.utils.toArray('.card-inner')

  gsap.utils.toArray('.project-img').forEach((img, i) => {
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: markers[i], start: 'top bottom', end: () => `+=${window.innerHeight * 1.8}`, scrub: true, invalidateOnRefresh: true },
      },
    )
  })

  gsap.matchMedia().add('(min-width: 768px)', () => {
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: markers[i], start: 'top 95%' },
      })

      // Shrink and dim each card as the next one slides over it.
      const next = markers[i + 1]
      if (!next) return
      const st = { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true }
      gsap.to(card, { scale: 0.9, ease: 'none', scrollTrigger: st })
      gsap.to(card.querySelector('.card-dim'), { opacity: 0.45, ease: 'none', scrollTrigger: st })
    })
  })
})
</script>

<template>
  <section id="projects" ref="root" class="relative py-24 md:py-40">
    <div class="container-x">
      <SectionHeading index="02" :label="profile.sections.projects.label" :title="profile.sections.projects.title" />

      <div class="mt-16 md:mt-24">
        <template v-for="(project, i) in visible" :key="project.id">
          <div class="project-marker" aria-hidden="true"></div>
          <ProjectCard
            :project="project"
            :index="i"
            :total="visible.length"
            :class="i < visible.length - 1 && 'mb-8 md:mb-[14vh]'"
          />
        </template>
      </div>
    </div>
  </section>
</template>
