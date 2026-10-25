<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import ProductDevices from '../components/ProductDevices.vue'
import { useTypewriter } from '../composables/useTypewriter'
import { products } from '../data/products'

const phrases = [
  'Products that change outcomes',
  'PukaarAI · SunaoCall · SunaoAI',
  'Built for web and mobile',
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
      <div class="hero-inner">
        <p class="eyebrow">Products</p>
        <h1>
          <span>{{ text }}</span><span class="caret" aria-hidden="true" />
        </h1>
        <p class="lede">
          Three platforms from Sunao Technologies, voice-first anonymous reporting with
          PukaarAI, an AI phone companion for elder care with SunaoCall, and SunaoAI, our
          early-stage research into Urdu cognitive-health screening.
        </p>
        <div class="hero-actions">
          <a class="btn primary" href="#catalog">Explore catalog</a>
          <RouterLink class="btn ghost" to="/contact">Talk to us</RouterLink>
        </div>
      </div>
    </section>

    <section id="catalog" class="catalog">
      <article
        v-for="(product, i) in products"
        :key="product.id"
        class="showcase"
        :class="[{ reverse: i % 2 === 1 }, product.tone]"
      >
        <div class="showcase-inner">
          <ProductDevices :product-id="product.id" :tone="product.tone" />

          <div class="copy">
            <div class="copy-top">
              <p class="tag">{{ product.tag }}</p>
              <span class="index">0{{ i + 1 }}</span>
            </div>
            <h2>
              {{ product.name }}
              <span v-if="product.stage" class="stage-badge">{{ product.stage.label }}</span>
            </h2>
            <p class="summary">{{ product.copy }}</p>
            <ul>
              <li v-for="point in product.points" :key="point">{{ point }}</li>
            </ul>
            <div class="row-actions">
              <RouterLink class="learn" :to="`/products/${product.slug}`">
                Learn more
                <Icon icon="lucide:arrow-right" width="16" height="16" />
              </RouterLink>
              <div class="platforms">
                <span><Icon icon="lucide:laptop" width="14" height="14" /> Web</span>
                <span><Icon icon="lucide:smartphone" width="14" height="14" /> Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="cta">
      <div class="cta-inner">
        <div>
          <h2>Need a custom build around these products?</h2>
          <p>We design, integrate, and ship production systems with the same engineering discipline.</p>
        </div>
        <div class="cta-actions">
          <RouterLink class="btn primary" to="/contact">Start a project</RouterLink>
          <RouterLink class="btn ghost" to="/services">View services</RouterLink>
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
  position: relative;
  padding: clamp(4rem, 10vh, 6.5rem) clamp(1.25rem, 4vw, 2.5rem);
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background:
    radial-gradient(ellipse 55% 70% at 50% -10%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%),
    radial-gradient(ellipse 40% 50% at 90% 80%, color-mix(in srgb, var(--accent-warm) 10%, transparent), transparent 60%),
    var(--bg);
}

.hero-inner {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.eyebrow {
  margin: 0 0 0.85rem;
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
  font-size: clamp(2.35rem, 5.5vw, 3.6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.08;
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
  margin: 1.2rem auto 0;
  max-width: 36rem;
  color: var(--text-muted);
  line-height: 1.65;
  font-size: 1.05rem;
}

.hero-actions,
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.hero-actions {
  justify-content: center;
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

.catalog {
  display: grid;
}

.showcase {
  border-bottom: 1px solid var(--border);
  padding: clamp(3rem, 7vh, 5rem) clamp(1.25rem, 4vw, 2.5rem);
}

.showcase.teal {
  background: color-mix(in srgb, var(--accent) 4%, var(--bg));
}

.showcase.amber {
  background: color-mix(in srgb, var(--accent-warm) 4%, var(--bg));
}

.showcase.violet {
  background: color-mix(in srgb, var(--accent-violet) 4%, var(--bg));
}

.showcase-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.showcase.reverse .showcase-inner {
  grid-template-columns: 0.95fr 1.15fr;
}

.showcase.reverse .showcase-inner > :first-child {
  order: 2;
}

.showcase.reverse .showcase-inner > :last-child {
  order: 1;
}

.copy-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.55rem;
}

.tag {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-warm);
}

.index {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

h2 {
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  font-size: clamp(1.85rem, 3.5vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

.stage-badge {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0.22rem 0.5rem;
}

.summary {
  margin: 0.9rem 0 0;
  color: var(--text-muted);
  line-height: 1.65;
  font-size: 1.02rem;
  max-width: 34rem;
}

ul {
  list-style: none;
  margin: 1.2rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

li {
  position: relative;
  padding-left: 1.05rem;
  color: var(--text);
  font-weight: 550;
  font-size: 0.95rem;
}

li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  background: var(--accent);
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

.learn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--accent);
  font-weight: 650;
  font-size: 0.95rem;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.learn:hover {
  gap: 0.7rem;
}

.platforms {
  display: flex;
  gap: 0.55rem;
}

.platforms span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 0.4rem 0.65rem;
  background: var(--surface);
}

.cta {
  padding: clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--surface);
}

.cta-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid var(--border);
  background: var(--bg);
}

.cta h2 {
  margin: 0;
  font-size: clamp(1.4rem, 2.8vw, 1.85rem);
  letter-spacing: -0.03em;
}

.cta p {
  margin: 0.5rem 0 0;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 36rem;
}

.cta-actions {
  margin-top: 0;
}

@media (max-width: 900px) {
  .showcase-inner,
  .showcase.reverse .showcase-inner {
    grid-template-columns: 1fr;
  }

  .showcase.reverse .showcase-inner > :first-child,
  .showcase.reverse .showcase-inner > :last-child {
    order: initial;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
