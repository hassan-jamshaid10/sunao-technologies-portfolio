<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page">
    <p class="eyebrow">404</p>
    <h1>Page not found</h1>
    <p class="lede">That route does not exist. Head back home or browse our products.</p>
    <div class="actions">
      <RouterLink class="btn primary" to="/">Home</RouterLink>
      <RouterLink class="btn ghost" to="/products">Products</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 70vh;
  display: grid;
  place-content: center;
  padding: 6rem 1.25rem 4rem;
  text-align: center;
}

.eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  margin: 0.75rem 0 0;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.04em;
}

.lede {
  margin: 1rem auto 0;
  max-width: 28rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
</style>
