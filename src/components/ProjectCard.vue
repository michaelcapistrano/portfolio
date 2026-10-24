<script setup>
defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
})

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <article class="project-card md:sticky" :style="{ top: `calc(12vh + ${index * 1.25}rem)` }">
    <div
      class="card-inner relative grid origin-top overflow-hidden rounded-[2rem] border border-line bg-surface md:h-[74vh] md:min-h-[520px] lg:grid-cols-[1fr_1.35fr]"
    >
      <div class="order-2 flex flex-col justify-between gap-8 p-6 md:p-10 lg:order-1">
        <div>
          <div class="flex items-center justify-between text-sm text-muted">
            <span class="tabular-nums">{{ pad(index + 1) }} / {{ pad(total) }}</span>
            <span>{{ project.year }}</span>
          </div>
          <p class="mt-8 text-sm font-medium text-accent md:mt-10">{{ project.category }}</p>
          <h3 class="mt-3 text-[clamp(2.25rem,4.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.035em]">{{ project.title }}</h3>
        </div>

        <div>
          <p class="max-w-md leading-relaxed text-muted">{{ project.description }}</p>

          <ul class="mt-6 flex flex-wrap gap-2">
            <li v-for="tag in project.tags" :key="tag" class="rounded-full border border-line px-3 py-1 text-xs">{{ tag }}</li>
          </ul>

          <div v-if="project.liveUrl || project.repoUrl" class="mt-8 flex flex-wrap gap-3">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg"
            >
              Live site
              <span class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            <a
              v-if="project.repoUrl"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-fg"
            >
              Source code
            </a>
          </div>
        </div>
      </div>

      <div class="group relative order-1 m-2 aspect-[16/10] overflow-hidden rounded-[1.6rem] md:m-3 lg:order-2 lg:aspect-auto">
        <img
          :src="project.image"
          :alt="project.title"
          class="project-img absolute inset-0 size-full scale-[1.2] object-cover transition-[filter] duration-700 group-hover:brightness-110"
          loading="lazy"
        />
      </div>

      <div class="card-dim pointer-events-none absolute inset-0 bg-black opacity-0"></div>
    </div>
  </article>
</template>
