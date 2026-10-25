<script setup lang="ts">
import { RouterLink } from 'vue-router'
import heroPhoto from '../assets/photos/hero-listening.jpg'
</script>

<template>
  <section id="top" class="hero">
    <img :src="heroPhoto" alt="" class="hero-photo" aria-hidden="true" />
    <div class="hero-veil" aria-hidden="true" />
    <div class="hero-content">
      <p class="eyebrow">Built by listening</p>
      <h1>We listen to Pakistan's problems, then we build the fix.</h1>
      <p class="lede">
        Sunao means "tell me." We talk to the families, workers, and clinicians living with a
        problem before we write a line of code, then build AI-first products, platforms, and
        enterprise systems grounded in what they actually told us.
      </p>
      <div class="cta-row">
        <RouterLink class="btn primary" to="/contact">Start a project</RouterLink>
        <RouterLink class="btn ghost" to="/products">View products</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: end;
  overflow: hidden;
  isolation: isolate;
}

.hero-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 75% 30%;
}

.hero-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      to top,
      var(--bg) 0%,
      color-mix(in srgb, var(--bg) 70%, transparent) 32%,
      transparent 62%
    ),
    linear-gradient(
      105deg,
      color-mix(in srgb, var(--bg) 88%, transparent) 0%,
      color-mix(in srgb, var(--bg) 35%, transparent) 42%,
      transparent 58%
    );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(680px, 100%);
  padding: clamp(5.5rem, 12vh, 8rem) clamp(1.25rem, 4vw, 3rem) clamp(3.5rem, 9vh, 5.5rem);
}

.eyebrow {
  margin: 0 0 1rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  margin: 0;
  font-size: clamp(2.35rem, 5.8vw, 4.25rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  text-wrap: balance;
}

.lede {
  margin: 1.25rem 0 0;
  max-width: 34rem;
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  font-weight: 400;
  line-height: 1.65;
  color: var(--text-muted);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.85rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.4rem;
  border-radius: 0;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.btn.primary {
  background: var(--accent);
  color: var(--on-accent);
  border: 1px solid var(--accent);
}

.btn.primary:hover {
  background: var(--accent-strong);
  border-color: var(--accent-strong);
}

.btn.ghost {
  border: 1px solid var(--border-strong);
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
}

.btn.ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
    align-items: center;
  }

  .hero-veil {
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--bg) 70%, transparent) 0%,
      var(--bg) 55%
    );
  }

  .hero-content {
    width: 100%;
    max-width: 100%;
    padding: 5.75rem 1.15rem 2.5rem;
    box-sizing: border-box;
  }

  .eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: clamp(1.85rem, 8vw, 2.4rem);
    line-height: 1.1;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .lede {
    margin-top: 0.95rem;
    max-width: none;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .cta-row {
    margin-top: 1.35rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
  }

  .btn {
    width: 100%;
    padding: 0.95rem 1.15rem;
  }
}

@media (max-width: 380px) {
  .hero-content {
    padding-inline: 1rem;
  }

  h1 {
    font-size: 1.65rem;
  }

  .lede {
    font-size: 0.9rem;
  }
}
</style>
