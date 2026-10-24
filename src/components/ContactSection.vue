<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import RevealText from './ui/RevealText.vue'
import MagneticButton from './ui/MagneticButton.vue'
import ContactForm from './ContactForm.vue'
import FooterBar from './FooterBar.vue'
import { profile } from '../data/profile'
import { useGsap, revealWords, fadeUp } from '../composables/useReveal'

const root = ref(null)
const copied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {}
}

useGsap(root, ({ reduced }) => {
  if (reduced) return
  // The panel rises over the previous section with rounded corners flattening out.
  gsap.from(root.value, {
    borderTopLeftRadius: '6rem',
    borderTopRightRadius: '6rem',
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'top 30%', scrub: true },
  })
  revealWords(root.value.querySelector('.contact-title'), { stagger: 0.06 })
  gsap.from('.contact-cta', {
    scale: 0,
    rotate: -45,
    duration: 1.2,
    ease: 'back.out(1.6)',
    scrollTrigger: { trigger: '.contact-cta', start: 'top 90%' },
  })
  fadeUp('.contact-col', '.contact-grid', { stagger: 0.15 })
})
</script>

<template>
  <section id="contact" ref="root" class="relative overflow-hidden rounded-t-[2rem] bg-fg text-bg">
    <div class="container-x pt-24 md:pt-36">
      <div class="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-bg/50 md:text-sm">
        <span>(04)</span>
        <span class="h-px flex-1 bg-bg/15"></span>
        <span>{{ profile.sections.contact.label }}</span>
      </div>

      <div class="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <RevealText
          tag="h2"
          :text="profile.sections.contact.title"
          class="contact-title max-w-6xl text-[clamp(3rem,9vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.045em]"
        />
        <MagneticButton
          :href="`mailto:${profile.email}`"
          class="contact-cta size-36 rounded-full bg-accent text-accent-fg md:size-48"
        >
          <span class="text-center text-sm font-medium md:text-base">Get in<br />touch ↗</span>
        </MagneticButton>
      </div>

      <div class="contact-grid mt-20 grid gap-16 border-t border-bg/15 pt-14 md:mt-28 lg:grid-cols-[5fr_7fr]">
        <div class="contact-col flex flex-col gap-10">
          <p class="max-w-md text-lg leading-relaxed text-bg/70">{{ profile.contactText }}</p>
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-bg/50">Email</p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
              <a :href="`mailto:${profile.email}`" class="break-all text-xl font-medium transition-colors hover:text-accent md:text-2xl">
                {{ profile.email }}
              </a>
              <button
                type="button"
                class="rounded-full border border-bg/20 px-3 py-1 text-xs transition-colors hover:border-bg"
                @click="copyEmail"
              >
                {{ copied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-bg/50">Elsewhere</p>
            <ul class="mt-3 flex flex-col">
              <li v-for="s in profile.socials" :key="s.label" class="border-b border-bg/15">
                <a :href="s.url" target="_blank" rel="noopener" class="group flex items-center justify-between py-4 text-xl">
                  <span class="transition-transform duration-300 group-hover:translate-x-2">{{ s.label }}</span>
                  <span class="transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="contact-col">
          <ContactForm />
        </div>
      </div>

      <FooterBar />
    </div>
  </section>
</template>
