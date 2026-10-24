import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from './useLenis'

gsap.registerPlugin(ScrollTrigger)

// Runs `setup` inside a gsap.context scoped to `scope` once mounted, and reverts everything on unmount.
// Animations are skipped entirely for reduced-motion users; content is visible by default.
export function useGsap(scope, setup) {
  let ctx
  onMounted(() => {
    ctx = gsap.context(() => setup({ reduced: reducedMotion }), scope.value)
  })
  onUnmounted(() => ctx?.revert())
}

// Masked word slide-up for text rendered with <RevealText>.
export function revealWords(el, { start = 'top 85%', stagger = 0.04, delay = 0 } = {}) {
  if (!el) return
  return gsap.from(el.querySelectorAll('.word-inner'), {
    yPercent: 110,
    duration: 1.1,
    ease: 'power4.out',
    stagger,
    delay,
    scrollTrigger: { trigger: el, start },
  })
}

export function fadeUp(targets, trigger, { start = 'top 85%', stagger = 0.08, y = 40 } = {}) {
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger,
    scrollTrigger: { trigger, start },
  })
}

// Scrubbed vertical parallax. `speed` is the travel in yPercent each way.
export function parallax(el, { speed = 10, trigger = el, start = 'top bottom', end = 'bottom top' } = {}) {
  return gsap.fromTo(
    el,
    { yPercent: -speed },
    { yPercent: speed, ease: 'none', scrollTrigger: { trigger, start, end, scrub: true } },
  )
}

// Any element with data-speed="n" inside `scope` gets a parallax of n yPercent.
export function parallaxAll(scope) {
  scope.querySelectorAll('[data-speed]').forEach((el) => {
    parallax(el, { speed: Number(el.dataset.speed) || 10, trigger: el.parentElement })
  })
}
