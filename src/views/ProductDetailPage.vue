<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductDevices from '../components/ProductDevices.vue'
import { getProductBySlug, products } from '../data/products'

const route = useRoute()
const product = computed(() => getProductBySlug(String(route.params.slug || '')))
const others = computed(() => products.filter((p) => p.id !== product.value?.id))
</script>

<template>
  <div v-if="product" class="page" :class="product.tone">
    <section class="hero">
      <div class="inner hero-grid">
        <div class="copy">
          <p class="eyebrow">Product</p>
          <h1>
            {{ product.name }}
            <span v-if="product.stage" class="stage-badge">{{ product.stage.label }}</span>
          </h1>
          <p v-if="product.meaning" class="meaning">“{{ product.meaning }}”</p>
          <p class="tag">{{ product.tag }}</p>
          <p class="lede">{{ product.longCopy }}</p>
          <p v-if="product.stage" class="stage-note">{{ product.stage.note }}</p>
          <div class="actions">
            <RouterLink class="btn primary" to="/contact">Talk to us</RouterLink>
            <RouterLink class="btn ghost" to="/products">All products</RouterLink>
          </div>
        </div>
        <ProductDevices :product-id="product.id" :tone="product.tone" />
      </div>
    </section>

    <section v-if="product.problem" class="problem">
      <div class="inner wide">
        <p class="eyebrow">The problem</p>
        <p class="problem-copy">{{ product.problem }}</p>
      </div>
    </section>

    <section v-if="product.moat" class="moat">
      <div class="inner wide">
        <p class="eyebrow">Our edge</p>
        <p class="moat-copy">{{ product.moat }}</p>
      </div>
    </section>

    <section v-if="product.howItWorks?.length" class="how">
      <div class="inner wide">
        <h2>How {{ product.name }} works</h2>
        <div class="how-grid">
          <article v-for="(step, i) in product.howItWorks" :key="step.title" class="step">
            <span class="step-num">0{{ i + 1 }}</span>
            <Icon :icon="step.icon || 'lucide:check'" class="step-ico" />
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="inner wide">
        <h2>What it delivers</h2>
        <div class="grid" :class="{ triple: product.features.length > 4 }">
          <article v-for="item in product.features" :key="item.title" class="feature">
            <Icon icon="lucide:check" class="ico" />
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="capabilities">
      <div class="inner wide">
        <h2>Key capabilities</h2>
        <ul>
          <li v-for="point in product.points" :key="point">{{ point }}</li>
        </ul>
        <div class="device-tags">
          <span><Icon icon="lucide:laptop" width="14" height="14" /> Web</span>
          <span><Icon icon="lucide:smartphone" width="14" height="14" /> Mobile</span>
          <span v-if="product.tag.toLowerCase().includes('voice')">
            <Icon icon="lucide:mic" width="14" height="14" /> Voice-first
          </span>
        </div>
      </div>
    </section>

    <section v-if="others.length" class="more">
      <div class="inner wide">
        <h2>More products</h2>
        <div class="more-list">
          <RouterLink
            v-for="item in others"
            :key="item.id"
            class="more-card"
            :to="`/products/${item.slug}`"
          >
            <span class="more-tag">{{ item.tag }}</span>
            <strong>{{ item.name }}</strong>
            <span class="more-link">
              Learn more
              <Icon icon="lucide:arrow-right" width="14" height="14" />
            </span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="page missing">
    <div class="inner">
      <h1>Product not found</h1>
      <RouterLink to="/products">Back to products</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 4.5rem;
}

.missing {
  padding: 6rem 1.25rem;
}

.hero {
  padding: clamp(2.5rem, 6vh, 4rem) clamp(1.25rem, 4vw, 2.5rem);
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.inner {
  max-width: 760px;
  margin: 0 auto;
}

.inner.wide {
  max-width: 1100px;
}

.hero-grid {
  max-width: 1200px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.eyebrow {
  margin: 0 0 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.stage-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0.3rem 0.6rem;
}

.stage-note {
  margin: 0.5rem 0 0;
  font-size: 0.88rem;
  color: var(--text-muted);
  font-style: italic;
}

.meaning {
  margin: 0.85rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  font-style: italic;
  letter-spacing: -0.02em;
  color: var(--accent-warm);
}

.tag {
  margin: 0.75rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-warm);
}

.page.teal .tag,
.page.teal .meaning {
  color: var(--accent);
}

.page.violet .tag,
.page.violet .meaning {
  color: var(--accent-violet);
}

.lede {
  margin: 1.15rem 0 0;
  max-width: 36rem;
  color: var(--text-muted);
  line-height: 1.7;
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
  text-decoration: none;
  border: 1px solid transparent;
}

.btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.btn.ghost {
  border-color: var(--border-strong);
  color: var(--text);
}

.problem,
.how,
.features,
.capabilities,
.more {
  padding: clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 4vw, 2.5rem);
}

.problem {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.problem-copy {
  margin: 0;
  max-width: 46rem;
  font-size: clamp(1.2rem, 2.6vw, 1.55rem);
  line-height: 1.55;
  letter-spacing: -0.02em;
}

.moat {
  background: var(--surface-elevated);
  border-bottom: 1px solid var(--border);
}

.moat-copy {
  margin: 0;
  max-width: 46rem;
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  line-height: 1.6;
  letter-spacing: -0.015em;
  color: var(--text-muted);
}

.how {
  border-bottom: 1px solid var(--border);
}

.how-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}

.step {
  background: var(--bg);
  padding: 1.35rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.step-num {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.step-ico {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
  margin: 0.25rem 0 0.15rem;
}

.page.amber .step-ico {
  color: var(--accent-warm);
}

.page.violet .step-ico {
  color: var(--accent-violet);
}

.step h3 {
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}

.step p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.capabilities {
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.more {
  border-top: 1px solid var(--border);
}

h2 {
  margin: 0 0 1.5rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: -0.03em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}

.grid.triple {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature {
  background: var(--surface);
  padding: 1.4rem 1.25rem;
}

.ico {
  width: 1.15rem;
  height: 1.15rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.page.amber .ico {
  color: var(--accent-warm);
}

.page.violet .ico {
  color: var(--accent-violet);
}

.feature h3 {
  margin: 0;
  font-size: 1.05rem;
}

.feature p {
  margin: 0.45rem 0 0;
  color: var(--text-muted);
  line-height: 1.55;
  font-size: 0.92rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 1rem;
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

.page.amber li::before {
  background: var(--accent-warm);
}

.page.violet li::before {
  background: var(--accent-violet);
}

.device-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.device-tags span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--border);
  padding: 0.45rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
}

.more-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.more-card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  background: var(--surface);
}

.more-card:hover {
  border-color: var(--accent);
}

.more-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.more-card strong {
  font-size: 1.2rem;
  letter-spacing: -0.02em;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  color: var(--accent);
  font-size: 0.88rem;
  font-weight: 650;
}

@media (max-width: 1000px) {
  .how-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid.triple {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .grid,
  .grid.triple,
  .how-grid,
  .more-list {
    grid-template-columns: 1fr;
  }
}
</style>
