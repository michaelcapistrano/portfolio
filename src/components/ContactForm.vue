<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data/profile'

// Submits to Web3Forms when VITE_WEB3FORMS_KEY is set (see .env.example); otherwise opens the visitor's mail app.
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

const form = reactive({ name: '', email: '', message: '', botcheck: false })
const errors = reactive({})
const status = ref('idle') // idle | sending | success | error

function validate() {
  errors.name = form.name.trim() ? '' : 'Please enter your name.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Please enter a valid email.'
  errors.message = form.message.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  return !errors.name && !errors.email && !errors.message
}

async function submit() {
  if (!validate() || form.botcheck) return

  if (!accessKey) {
    const subject = encodeURIComponent(`Hello from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    return
  }

  status.value = 'sending'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New portfolio message from ${form.name}`,
        from_name: 'Portfolio',
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    status.value = 'success'
    Object.assign(form, { name: '', email: '', message: '' })
  } catch {
    status.value = 'error'
  }
}

const field =
  'w-full border-b border-bg/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-bg/40 focus:border-accent'
</script>

<template>
  <form class="flex flex-col gap-6" novalidate @submit.prevent="submit">
    <input v-model="form.botcheck" type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" />

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="block">
        <span class="sr-only">Name</span>
        <input v-model="form.name" type="text" name="name" placeholder="Your name" autocomplete="name" :class="field" />
        <span v-if="errors.name" class="mt-2 block text-sm text-accent">{{ errors.name }}</span>
      </label>
      <label class="block">
        <span class="sr-only">Email</span>
        <input v-model="form.email" type="email" name="email" placeholder="Email address" autocomplete="email" :class="field" />
        <span v-if="errors.email" class="mt-2 block text-sm text-accent">{{ errors.email }}</span>
      </label>
    </div>

    <label class="block">
      <span class="sr-only">Message</span>
      <textarea v-model="form.message" name="message" rows="4" placeholder="Tell me about your project…" :class="[field, 'resize-none']" data-lenis-prevent></textarea>
      <span v-if="errors.message" class="mt-2 block text-sm text-accent">{{ errors.message }}</span>
    </label>

    <div class="flex flex-wrap items-center gap-4">
      <button
        type="submit"
        :disabled="status === 'sending'"
        class="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-medium text-accent-fg transition-transform hover:scale-[1.03] disabled:opacity-60"
      >
        {{ status === 'sending' ? 'Sending…' : 'Send message' }}
        <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
      <p v-if="status === 'success'" class="text-sm text-bg/70">Thanks! Your message is on its way — I'll get back to you soon.</p>
      <p v-else-if="status === 'error'" class="text-sm text-accent">
        Something went wrong. Please email me directly at {{ profile.email }}.
      </p>
      <p v-else-if="!accessKey" class="text-xs text-bg/50">Opens your email app to send.</p>
    </div>
  </form>
</template>
