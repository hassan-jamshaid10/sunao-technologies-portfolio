<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { featuredServices } from '../data/services'
</script>

<template>
  <section id="services" class="services">
    <div class="inner">
      <div class="header">
        <div>
          <p class="eyebrow">What we deliver</p>
          <h2>Our services</h2>
        </div>
        <RouterLink class="view-all" to="/services">View all services</RouterLink>
      </div>

      <div class="grid">
        <article v-for="item in featuredServices" :key="item.id" class="card">
          <div class="icon-wrap">
            <Icon :icon="item.icon" class="icon" />
          </div>
          <h3>{{ item.shortTitle }}</h3>
          <p>{{ item.summary }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--surface);
  padding: clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 4vw, 2.5rem);
  border-top: 1px solid var(--border);
}

.inner {
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
}

.view-all {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.15rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  border: 1px solid var(--border-strong);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.view-all:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--border);
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.5rem 1.75rem;
  border-right: 1px solid var(--border);
  min-height: 280px;
  transition: background 0.25s ease;
}

.card:last-child {
  border-right: none;
}

.card:hover {
  background: color-mix(in srgb, var(--accent) 5%, transparent);
}

.icon-wrap {
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  color: var(--accent);
}

.icon {
  width: 2.25rem;
  height: 2.25rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
}

.card p {
  margin: 0;
  margin-top: auto;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card:nth-child(2) {
    border-right: none;
  }

  .card:nth-child(1),
  .card:nth-child(2) {
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .card {
    border-right: none;
    border-bottom: 1px solid var(--border);
    min-height: auto;
  }

  .card:last-child {
    border-bottom: none;
  }
}
</style>
