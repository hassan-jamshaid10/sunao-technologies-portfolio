<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useTypewriter } from '../composables/useTypewriter'
import { products } from '../data/products'
import ProductDevices from './ProductDevices.vue'

const headlines = [
  'Built to make a difference',
  'PukaarAI: a call for help',
  'SunaoCall: a call that cares',
  'SunaoAI: research in motion',
]

const { text } = useTypewriter(headlines, {
  typeMs: 48,
  deleteMs: 26,
  holdMs: 1900,
})
</script>

<template>
  <section id="products" class="products">
    <div class="inner">
      <div class="section-head">
        <p class="eyebrow">Products</p>
        <h2>
          <span class="typed">{{ text }}</span><span class="caret" aria-hidden="true" />
        </h2>
        <p class="sub">
          PukaarAI, SunaoCall, and SunaoAI, three products designed for the moments that matter.
        </p>
      </div>

      <div class="product-list">
        <article
          v-for="(product, i) in products"
          :key="product.id"
          class="product"
          :class="{ reverse: i % 2 === 1 }"
        >
          <ProductDevices :product-id="product.id" :tone="product.tone" />

          <div class="copy">
            <p class="tag">{{ product.tag }}</p>
            <h3>
              {{ product.name }}
              <span v-if="product.stage" class="stage-badge">{{ product.stage.label }}</span>
            </h3>
            <p>{{ product.copy }}</p>
            <ul>
              <li v-for="point in product.points" :key="point">{{ point }}</li>
            </ul>
            <div class="device-tags">
              <span><Icon icon="lucide:laptop" width="14" height="14" /> Web</span>
              <span><Icon icon="lucide:smartphone" width="14" height="14" /> Mobile</span>
            </div>
            <RouterLink class="learn" :to="`/products/${product.slug}`">
              Learn more
              <Icon icon="lucide:arrow-right" width="16" height="16" />
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: clamp(4rem, 9vh, 6.5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--bg);
  border-top: 1px solid var(--border);
}

.inner {
  max-width: 1280px;
  margin: 0 auto;
}

.section-head {
  max-width: 44rem;
  margin: 0 auto clamp(2.75rem, 6vw, 3.75rem);
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h2 {
  margin: 0;
  min-height: 1.2em;
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.15;
  color: var(--text);
}

.typed {
  display: inline;
}

.caret {
  display: inline-block;
  width: 0.08em;
  height: 0.9em;
  margin-left: 0.08em;
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

.sub {
  margin: 1rem auto 0;
  max-width: 34rem;
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 1.05rem;
}

.product-list {
  display: grid;
  gap: clamp(3.5rem, 8vw, 5.5rem);
}

.product {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: clamp(1.5rem, 4vw, 2.75rem);
  align-items: center;
}

.product.reverse {
  grid-template-columns: 0.9fr 1.2fr;
}

.product.reverse > :first-child {
  order: 2;
}

.product.reverse > :last-child {
  order: 1;
}

.copy .tag {
  margin: 0 0 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-warm);
}

.copy h3 {
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.stage-badge {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0.2rem 0.45rem;
}

.copy > p {
  margin: 0.9rem 0 0;
  color: var(--text-muted);
  line-height: 1.65;
  font-size: 1.02rem;
}

.copy ul {
  list-style: none;
  margin: 1.15rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.copy li {
  position: relative;
  padding-left: 1.05rem;
  color: var(--text);
  font-weight: 550;
  font-size: 0.95rem;
}

.copy li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  background: var(--accent);
}

.device-tags {
  display: flex;
  gap: 0.65rem;
  margin-top: 1.35rem;
}

.device-tags span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 0.4rem 0.65rem;
}

.learn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.35rem;
  color: var(--accent);
  font-weight: 650;
  font-size: 0.95rem;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.learn:hover {
  gap: 0.7rem;
}

@media (max-width: 900px) {
  .product,
  .product.reverse {
    grid-template-columns: 1fr;
  }

  .product.reverse > :first-child,
  .product.reverse > :last-child {
    order: initial;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
