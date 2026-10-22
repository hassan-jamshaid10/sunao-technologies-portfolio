<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  company: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

async function onSubmit() {
  status.value = 'sending'
  errorMsg.value = ''

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })

    const data = (await res.json().catch(() => ({}))) as { error?: string }

    if (!res.ok) {
      status.value = 'error'
      errorMsg.value = data.error || 'Something went wrong. Please try again.'
      return
    }

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.company = ''
    form.message = ''
  } catch {
    status.value = 'error'
    errorMsg.value = 'Unable to reach the server. Is the API running?'
  }
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="layout">
      <form class="form" @submit.prevent="onSubmit">
        <label>
          <span>Name</span>
          <input v-model="form.name" name="name" type="text" autocomplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input v-model="form.email" name="email" type="email" autocomplete="email" required />
        </label>
        <label>
          <span>Company <em>(optional)</em></span>
          <input v-model="form.company" name="company" type="text" autocomplete="organization" />
        </label>
        <label class="full">
          <span>Message</span>
          <textarea v-model="form.message" name="message" rows="5" required />
        </label>

        <div class="actions full">
          <button type="submit" class="submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : 'Send message' }}
          </button>
          <p v-if="status === 'success'" class="feedback ok" role="status">
            Message sent. We’ll be in touch soon.
          </p>
          <p v-else-if="status === 'error'" class="feedback err" role="alert">
            {{ errorMsg }}
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: clamp(2.5rem, 6vh, 4rem) clamp(1.25rem, 4vw, 3rem) clamp(4.5rem, 10vh, 7rem);
  background: var(--bg);
}

.layout {
  max-width: 720px;
  margin: 0 auto;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.1rem;
  padding: 1.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
}

label {
  display: grid;
  gap: 0.4rem;
}

label.full,
.actions.full {
  grid-column: 1 / -1;
}

label span {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
}

label em {
  font-style: normal;
  font-weight: 450;
  opacity: 0.75;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--border-strong);
  border-radius: 0;
  background: var(--bg);
  color: var(--text);
  padding: 0.75rem 0.9rem;
  font: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

textarea {
  resize: vertical;
  min-height: 8rem;
}

input:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
}

.submit {
  border: 1px solid var(--accent);
  border-radius: 0;
  padding: 0.9rem 1.5rem;
  background: var(--accent);
  color: var(--on-accent);
  font: inherit;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.submit:hover:not(:disabled) {
  background: var(--accent-strong);
  border-color: var(--accent-strong);
}

.submit:disabled {
  opacity: 0.7;
  cursor: wait;
}

.feedback {
  margin: 0.85rem 0 0;
  font-size: 0.92rem;
}

.feedback.ok {
  color: var(--accent);
}

.feedback.err {
  color: #dc2626;
}

@media (max-width: 560px) {
  .form {
    grid-template-columns: 1fr;
  }
}
</style>
