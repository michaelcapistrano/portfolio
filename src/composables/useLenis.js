import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

function raf(time) {
  lenis?.raf(time * 1000)
}

// One Lenis instance for the whole app, driven by GSAP's ticker so ScrollTrigger stays in sync.
export function initLenis() {
  if (lenis || reducedMotion) return lenis
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function destroyLenis() {
  if (!lenis) return
  gsap.ticker.remove(raf)
  lenis.destroy()
  lenis = null
}

export function scrollTo(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4), ...options })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}
