<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Contact from '../components/Contact.vue'
import { useTypewriter } from '../composables/useTypewriter'

const phrases = [
  'Let’s build what’s next',
  'Tell us what you’re shipping',
  'Start a conversation',
]

const { text } = useTypewriter(phrases, {
  typeMs: 48,
  deleteMs: 24,
  holdMs: 1800,
})
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="inner">
        <p class="eyebrow">Contact</p>
        <h1>
          <span>{{ text }}</span><span class="caret" aria-hidden="true" />
        </h1>
        <p class="lede">
          Whether it’s PukaarAI, SunaoCall, SunaoAI, or a custom platform, share a few details and
          we’ll respond with a clear next step.
        </p>
        <div class="meta">
          <a href="mailto:hello@sunaotechnologies.com">hello@sunaotechnologies.com</a>
          <RouterLink to="/products">Explore products</RouterLink>
        </div>
      </div>
    </section>

    <Contact />
  </div>
</template>

<style scoped>
.page {
  padding-top: 4.5rem;
  min-height: 70vh;
}

.hero {
  padding: clamp(3.5rem, 9vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(2.5rem, 5vh, 3.5rem);
  background:
    radial-gradient(ellipse 55% 70% at 80% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent),
    var(--bg);
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.inner {
  max-width: 720px;
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  margin: 0;
  min-height: 1.2em;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: var(--text);
}

.caret {
  display: inline-block;
  width: 0.08em;
  height: 0.9em;
  margin-left: 0.1em;
  background: var(--accent);
  vertical-align: -0.08em;
  animation: blink 0.9s steps(1) infinite;
}

@keyframes blink {
  0%,
  45% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.lede {
  margin: 1.15rem auto 0;
  max-width: 34rem;
  color: var(--text-muted);
  line-height: 1.65;
  font-size: 1.05rem;
}

.meta {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.5rem;
}

.meta a {
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}

.meta a:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
