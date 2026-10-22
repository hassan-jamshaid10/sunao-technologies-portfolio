<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { cloudStack, engineeringStack } from '../data/tech'

const items = [...engineeringStack, ...cloudStack]
</script>

<template>
  <section class="trusted-bar" aria-label="Technologies we use">
    <p class="trusted-label">Engineering with world-class technology</p>
    <div class="trusted-logos-wrap">
      <div class="trusted-logos-track">
        <div v-for="n in 2" :key="n" class="group">
          <div v-for="item in items" :key="`${n}-${item.name}`" class="tech-logo">
            <Icon :icon="item.icon" class="logo-icon" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trusted-bar {
  width: 100%;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 3.25rem 0;
}

.trusted-label {
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.4;
  margin: 0 0 2.75rem;
  padding: 0 1.25rem;
}

.trusted-logos-wrap {
  overflow: hidden;
  position: relative;
}

.trusted-logos-wrap::before,
.trusted-logos-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.trusted-logos-wrap::before {
  left: 0;
  background: linear-gradient(to right, var(--surface), transparent);
}

.trusted-logos-wrap::after {
  right: 0;
  background: linear-gradient(to left, var(--surface), transparent);
}

.trusted-logos-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: logoSlide 90s linear infinite;
  padding: 0.5rem 0;
}

.trusted-logos-track:hover {
  animation-play-state: paused;
}

.group {
  display: flex;
  align-items: center;
  gap: 4.5rem;
  padding-right: 4.5rem;
}

.tech-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: default;
}

.logo-icon {
  width: 34px;
  height: 34px;
  color: var(--accent);
  display: block;
  opacity: 0.85;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.tech-logo span {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  opacity: 0.45;
  letter-spacing: -0.01em;
  white-space: nowrap;
  user-select: none;
  transition: opacity 0.35s ease;
}

.tech-logo:hover .logo-icon {
  opacity: 1;
  transform: scale(1.12);
}

.tech-logo:hover span {
  opacity: 1;
}

@keyframes logoSlide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 600px) {
  .trusted-bar {
    padding: 2.5rem 0;
  }

  .group {
    gap: 2.75rem;
    padding-right: 2.75rem;
  }

  .tech-logo {
    gap: 10px;
  }

  .logo-icon {
    width: 26px;
    height: 26px;
  }

  .tech-logo span {
    font-size: 0.95rem;
  }

  .trusted-logos-wrap::before,
  .trusted-logos-wrap::after {
    width: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trusted-logos-track {
    animation: none;
  }
}
</style>
