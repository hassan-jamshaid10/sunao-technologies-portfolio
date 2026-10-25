<script setup lang="ts">
import { Icon } from '@iconify/vue'

const steps = [
  {
    icon: 'lucide:ear',
    title: 'Listen',
    copy: 'We talk to the people living with the problem first, then map constraints and define what success looks like.',
  },
  {
    icon: 'lucide:pen-tool',
    title: 'Design',
    copy: 'Architecture, product flows, and AI touchpoints are shaped together so the system stays coherent.',
  },
  {
    icon: 'lucide:hammer',
    title: 'Build',
    copy: 'Small, shipping increments with clear ownership, from models and APIs to interfaces and infra.',
  },
  {
    icon: 'lucide:rocket',
    title: 'Launch & evolve',
    copy: 'Production hardening, observability, and iteration so what we ship keeps improving after day one.',
  },
]
</script>

<template>
  <section id="how-we-work" class="how">
    <div class="inner">
      <div class="head">
        <p class="eyebrow">How we work</p>
        <h2>A clear path from idea to production</h2>
        <p class="sub">
          Four focused stages. No black boxes, just disciplined delivery with AI where it creates leverage.
        </p>
      </div>

      <div class="steps">
        <article v-for="(step, i) in steps" :key="step.title" class="step">
          <div class="step-top">
            <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
            <Icon :icon="step.icon" class="icon" />
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.copy }}</p>
          <span v-if="i < steps.length - 1" class="connector" aria-hidden="true" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how {
  padding: clamp(3.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--bg);
}

.inner {
  max-width: 1280px;
  margin: 0 auto;
}

.head {
  max-width: 40rem;
  margin-bottom: 2.75rem;
}

.eyebrow {
  margin: 0 0 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h2 {
  margin: 0;
  font-size: clamp(1.85rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

.sub {
  margin: 0.85rem 0 0;
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 1.02rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  border: 1px solid var(--border);
  background: var(--surface);
}

.step {
  position: relative;
  padding: 1.75rem 1.4rem 1.9rem;
  border-right: 1px solid var(--border);
}

.step:last-child {
  border-right: 0;
}

.step-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.35rem;
}

.num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.icon {
  width: 1.35rem;
  height: 1.35rem;
  color: var(--text);
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.step p {
  margin: 0.7rem 0 0;
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.connector {
  display: none;
}

@media (max-width: 960px) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .step:nth-child(2n) {
    border-right: 0;
  }

  .step:nth-child(-n + 2) {
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 560px) {
  .steps {
    grid-template-columns: 1fr;
  }

  .step {
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .step:last-child {
    border-bottom: 0;
  }
}
</style>
