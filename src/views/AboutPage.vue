<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import HowWeWork from '../components/HowWeWork.vue'
import { useTypewriter } from '../composables/useTypewriter'

const phrases = [
  'Honest engineering for intelligent products',
  'AI-first. Production-ready.',
  'Clarity over complexity',
]

const { text } = useTypewriter(phrases, {
  typeMs: 45,
  deleteMs: 22,
  holdMs: 1700,
})

const values = [
  {
    icon: 'lucide:sparkles',
    title: 'AI-first',
    copy: 'We treat intelligence as a product capability, not a slide deck feature.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Production discipline',
    copy: 'Security, observability, and maintainability are designed in from the first sprint.',
  },
  {
    icon: 'lucide:handshake',
    title: 'Clear partnership',
    copy: 'Sunao means honesty, transparent timelines, tradeoffs, and outcomes you can trust.',
  },
]
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="inner">
        <p class="eyebrow">About Sunao Technologies</p>
        <h1>
          <span>{{ text }}</span><span class="caret" aria-hidden="true" />
        </h1>
        <p class="lede">
          We are an AI-first software company building platforms, products, and enterprise systems,
          including SunaoAI and PukaarAI, with clarity from architecture to launch.
        </p>
        <div class="actions">
          <RouterLink class="btn primary" to="/services">Our services</RouterLink>
          <RouterLink class="btn ghost" to="/contact">Work with us</RouterLink>
        </div>
      </div>
    </section>

    <section class="story">
      <div class="inner split">
        <div>
          <p class="eyebrow">Who we are</p>
          <h2>Software that thinks, ships, and lasts</h2>
        </div>
        <div class="copy">
          <p>
            Sunao Technologies partners with teams that need more than a prototype. We design and
            deliver ML systems, cloud infrastructure, web and mobile products, ERP/CRM platforms,
            healthcare software, and enterprise solutions.
          </p>
          <p>
            Our products, SunaoAI for dementia detection and PukaarAI for voice-first anonymous
            reporting, reflect how we work: intelligent systems grounded in real workflows.
          </p>
        </div>
      </div>
    </section>

    <section class="values">
      <div class="inner">
        <div class="value-grid">
          <article v-for="item in values" :key="item.title" class="value">
            <Icon :icon="item.icon" class="icon" />
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <HowWeWork />
  </div>
</template>

<style scoped>
.page {
  padding-top: 4.5rem;
}

.hero {
  padding: clamp(3.5rem, 9vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 6vh, 4rem);
  background:
    radial-gradient(ellipse 50% 60% at 10% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent),
    var(--bg);
}

.inner {
  max-width: 820px;
  margin: 0 auto;
}

.inner.split {
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2.5rem;
  align-items: start;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
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
  line-height: 1.08;
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
  margin: 1.2rem 0 0;
  max-width: 38rem;
  color: var(--text-muted);
  line-height: 1.65;
  font-size: 1.05rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.25rem;
  font-weight: 650;
  font-size: 0.9375rem;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.btn.primary:hover {
  background: var(--accent-strong);
}

.btn.ghost {
  border-color: var(--border-strong);
  color: var(--text);
}

.btn.ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.story {
  padding: clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 4vw, 2.5rem);
  border-top: 1px solid var(--border);
}

.story h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.copy p {
  margin: 0 0 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 1.02rem;
}

.copy p:last-child {
  margin-bottom: 0;
}

.values {
  padding: 0 clamp(1.25rem, 4vw, 2.5rem) clamp(1rem, 3vh, 2rem);
}

.values .inner {
  max-width: 1100px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid var(--border);
  background: var(--surface);
}

.value {
  padding: 1.6rem 1.35rem;
  border-right: 1px solid var(--border);
}

.value:last-child {
  border-right: 0;
}

.icon {
  width: 1.35rem;
  height: 1.35rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.value h3 {
  margin: 0;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.value p {
  margin: 0.55rem 0 0;
  color: var(--text-muted);
  line-height: 1.55;
  font-size: 0.93rem;
}

@media (max-width: 860px) {
  .inner.split,
  .value-grid {
    grid-template-columns: 1fr;
  }

  .value {
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .value:last-child {
    border-bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
