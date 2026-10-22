<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const scrolled = ref(false)
const open = ref(false)

const links = [
  { to: '/services', label: 'Services', isRoute: true },
  { to: '/products', label: 'Products', isRoute: true },
  { to: '/industries', label: 'Industries', isRoute: true },
  { to: '/about', label: 'About', isRoute: true },
  { to: '/contact', label: 'Contact', isRoute: true },
]

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function close() {
  open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="nav" :class="{ scrolled, open }">
    <div class="nav-inner">
      <RouterLink class="brand" to="/" @click="close">
        <span class="brand-text">
          Sunao<span>Technologies</span>
        </span>
      </RouterLink>

      <nav id="site-nav" class="nav-links" :class="{ open }">
        <template v-for="link in links" :key="link.label">
          <RouterLink v-if="link.isRoute" :to="link.to" @click="close">
            {{ link.label }}
          </RouterLink>
          <a v-else :href="link.to" @click="close">{{ link.label }}</a>
        </template>

        <button
          class="theme-btn mobile-only"
          type="button"
          @click="toggleTheme"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        >
          {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
        </button>
      </nav>

      <div class="nav-actions">
        <button
          class="theme-btn desktop-only"
          type="button"
          @click="toggleTheme"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        >
          <Icon :icon="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" width="16" height="16" />
        </button>

        <RouterLink class="cta" to="/contact" @click="close">
          Get Started
          <span class="cta-chip" aria-hidden="true">
            <Icon icon="lucide:arrow-right" width="13" height="13" />
          </span>
        </RouterLink>

        <button
          class="menu-btn"
          type="button"
          :aria-expanded="open"
          aria-controls="site-nav"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(12px);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.nav.scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 8px 24px color-mix(in srgb, #000 6%, transparent);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.85rem clamp(1.25rem, 4vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  z-index: 2;
  flex-shrink: 0;
}

.brand-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.03em;
  line-height: 1;
}

.brand-text span {
  font-weight: 500;
  color: var(--text-muted);
  margin-left: 0.28rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  flex: 1;
  justify-content: center;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--text);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
  z-index: 2;
}

.theme-btn {
  display: inline-grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.theme-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.mobile-only {
  display: none;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.55rem 0.55rem 1rem;
  background: var(--text);
  color: var(--bg);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  transition: background 0.2s ease;
}

.cta:hover {
  background: var(--accent);
  color: var(--on-accent);
}

.cta-chip {
  display: inline-grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  background: var(--accent);
  color: var(--on-accent);
}

.cta:hover .cta-chip {
  background: var(--on-accent);
  color: var(--accent);
}

.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2.35rem;
  height: 2.35rem;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  cursor: pointer;
  padding: 0;
}

.menu-btn span {
  display: block;
  width: 1rem;
  height: 1.5px;
  margin-inline: auto;
  background: var(--text);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.nav.open .menu-btn span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.nav.open .menu-btn span:nth-child(2) {
  opacity: 0;
}
.nav.open .menu-btn span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

@media (max-width: 960px) {
  .nav-links {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    background: color-mix(in srgb, var(--bg) 96%, transparent);
    backdrop-filter: blur(18px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    z-index: 1;
  }

  .nav-links.open {
    opacity: 1;
    pointer-events: auto;
  }

  .nav-links a {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: inline-flex;
    width: auto;
    height: auto;
    padding: 0.7rem 1rem;
    margin-top: 0.5rem;
  }

  .menu-btn {
    display: flex;
  }

  .cta {
    display: none;
  }
}
</style>
