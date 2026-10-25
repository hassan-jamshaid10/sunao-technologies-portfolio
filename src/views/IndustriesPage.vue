<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useTypewriter } from '../composables/useTypewriter'
import { industries } from '../data/industries'

const phrases = [
  'Industries we serve',
  'Healthcare to enterprise',
  'Domain-ready engineering',
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
        <p class="eyebrow">Industries</p>
        <h1>
          <span class="typed">{{ text }}</span><span class="caret" aria-hidden="true" />
        </h1>
        <p class="lede">
          From elder-care platforms like SunaoCall to voice-first anonymous reporting with PukaarAI,
          we build for the realities of each sector.
        </p>
        <div class="hero-actions">
          <a class="btn primary" href="#industry-list">Browse industries</a>
          <RouterLink class="btn ghost" to="/contact">Start a project</RouterLink>
        </div>
      </div>
    </section>

    <section id="industry-list" class="list">
      <div class="inner wide">
        <div class="grid">
          <article v-for="(item, i) in industries" :key="item.id" :id="item.id" class="item">
            <div class="item-index">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="icon-wrap">
              <Icon :icon="item.icon" class="icon" />
            </div>
            <h2>{{ item.title }}</h2>
            <p class="summary">{{ item.summary }}</p>
            <ul>
              <li v-for="point in item.details" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>

        <div class="cta">
          <div>
            <h3>Building for your industry?</h3>
            <p>Tell us the domain, we’ll map the right product and delivery approach.</p>
          </div>
          <RouterLink class="btn primary" to="/contact">Talk to us</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 4.5rem;
}

.hero {
  padding: clamp(3.5rem, 9vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 6vh, 4rem);
  background:
    radial-gradient(ellipse 55% 70% at 85% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent),
    var(--bg);
}

.inner {
  max-width: 760px;
  margin: 0 auto;
}

.inner.wide {
  max-width: 1120px;
}

.eyebrow {
  margin: 0 0 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  margin: 0;
  min-height: 1.15em;
  font-size: clamp(2.35rem, 5.5vw, 3.6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.08;
}

.typed {
  display: inline;
}

.caret {
  display: inline-block;
  width: 0.08em;
  height: 0.9em;
  margin-left: 0.12em;
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
  margin: 1.2rem 0 0;
  max-width: 38rem;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.3rem;
  font-weight: 650;
  font-size: 0.9375rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.btn.primary:hover {
  background: var(--accent-strong);
  border-color: var(--accent-strong);
}

.btn.ghost {
  border-color: var(--border-strong);
  color: var(--text);
  background: transparent;
}

.btn.ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.list {
  padding: clamp(3rem, 7vh, 5rem) clamp(1.25rem, 4vw, 2.5rem);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.item {
  position: relative;
  padding: 1.75rem 1.5rem 1.6rem;
  border: 1px solid var(--border);
  background: var(--surface);
  transition:
    border-color 0.25s ease,
    background 0.25s ease;
}

.item:hover {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  background: color-mix(in srgb, var(--accent) 4%, var(--surface));
}

.item-index {
  position: absolute;
  top: 1.15rem;
  right: 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.icon-wrap {
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
  color: var(--accent);
  margin-bottom: 1.1rem;
}

.icon {
  width: 1.75rem;
  height: 1.75rem;
}

h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  padding-right: 2.5rem;
}

.summary {
  margin: 0.65rem 0 0;
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

ul {
  list-style: none;
  margin: 1.15rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

li {
  position: relative;
  padding-left: 0.95rem;
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.45;
}

li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 0.35rem;
  height: 0.35rem;
  background: var(--accent);
}

.cta {
  margin-top: 2.5rem;
  padding: 2rem;
  border: 1px solid var(--border);
  background: var(--bg);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.25rem;
  align-items: center;
}

.cta h3 {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.cta p {
  margin: 0.4rem 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
