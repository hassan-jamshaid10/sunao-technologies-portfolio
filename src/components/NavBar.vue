<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const scrolled = ref(false)
const open = ref(false)
const navEl = ref<HTMLElement | null>(null)

const links = [
  { to: '/services', label: 'Services', isRoute: true },
  { to: '/products', label: 'Products', isRoute: true },
  { to: '/industries', label: 'Industries', isRoute: true },
  { to: '/about', label: 'About', isRoute: true },
  { to: '/contact', label: 'Contact', isRoute: true },
]

function syncNavHeight() {
  if (!navEl.value) return
  const h = navEl.value.getBoundingClientRect().height
  document.documentElement.style.setProperty('--nav-h', `${Math.ceil(h)}px`)
}

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function close() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  syncNavHeight()
})

onMounted(() => {
  onScroll()
  syncNavHeight()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', syncNavHeight, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', syncNavHeight)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header ref="navEl" class="nav" :class="{ scrolled, open }">
    <div class="nav-bar">
      <RouterLink class="brand" to="/" @click="close">
        <span class="brand-text">
          Sunao<span class="brand-sub">Technologies</span>
        </span>
      </RouterLink>

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

    <nav id="site-nav" class="nav-links" :class="{ open }">
      <div class="nav-links-inner">
        <template v-for="link in links" :key="link.label">
          <RouterLink v-if="link.isRoute" :to="link.to" @click="close">
            {{ link.label }}
          </RouterLink>
          <a v-else :href="link.to" @click="close">{{ link.label }}</a>
        </template>

        <RouterLink class="mobile-cta" to="/contact" @click="close">
          Get Started
        </RouterLink>

        <button
          class="theme-btn mobile-only"
          type="button"
          @click="toggleTheme"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        >
          {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  padding-top: env(safe-area-inset-top, 0px);
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border-bottom: 1px solid transparent;
  -webkit-backdrop-filter: blur(18px) saturate(1.15);
  backdrop-filter: blur(18px) saturate(1.15);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.nav.scrolled,
.nav.open {
  border-bottom-color: var(--border);
  box-shadow: 0 10px 28px color-mix(in srgb, #000 8%, transparent);
  background: color-mix(in srgb, var(--bg) 86%, transparent);
}

.nav-bar {
  position: relative;
  z-index: 3;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.85rem clamp(1rem, 4vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.75rem;
  box-sizing: border-box;
}

.brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  flex-shrink: 1;
  min-width: 0;
}

.brand-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-sub {
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

/* Desktop: put links between brand and actions via absolute centering */
@media (min-width: 961px) {
  .nav-links {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    padding: 0;
    background: transparent;
    pointer-events: auto;
  }

  .nav-links-inner {
    display: flex;
    align-items: center;
    gap: 1.75rem;
  }

  .nav-bar {
    position: relative;
  }
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
  justify-content: flex-end;
  gap: 0.55rem;
  flex: 0 0 auto;
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

.mobile-only,
.mobile-cta {
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
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
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
  .nav {
    background: color-mix(in srgb, var(--bg) 72%, transparent);
    -webkit-backdrop-filter: blur(22px) saturate(1.2);
    backdrop-filter: blur(22px) saturate(1.2);
  }

  .nav-bar {
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }

  .brand {
    flex: 1 1 auto;
    max-width: calc(100% - 3.25rem);
  }

  .brand-text {
    font-size: 1.05rem;
  }

  .nav-links {
    position: fixed;
    top: var(--nav-h, calc(3.75rem + env(safe-area-inset-top, 0px)));
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    margin: 0;
    flex: none;
    display: block;
    transform: none;
    padding: 0;
    box-sizing: border-box;
    background: color-mix(in srgb, var(--bg) 78%, transparent);
    -webkit-backdrop-filter: blur(28px) saturate(1.25);
    backdrop-filter: blur(28px) saturate(1.25);
    border-top: 1px solid var(--border);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.25s ease, visibility 0.25s ease;
    z-index: 2;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .nav-links.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .nav-links-inner {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    padding: 2rem 1.5rem calc(2rem + env(safe-area-inset-bottom, 0px));
    box-sizing: border-box;
  }

  .nav-links a {
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 6vw, 1.75rem);
    font-weight: 600;
    color: var(--text);
  }

  .mobile-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.85rem 1.35rem;
    background: var(--accent);
    color: var(--on-accent);
    font-size: 0.95rem !important;
    font-family: var(--font-body) !important;
    font-weight: 650 !important;
  }

  .desktop-only,
  .cta {
    display: none;
  }

  .mobile-only {
    display: inline-flex;
    width: auto;
    height: auto;
    padding: 0.7rem 1rem;
    margin-top: 0.35rem;
  }

  .menu-btn {
    display: flex;
  }

  .nav-actions {
    margin-left: auto;
  }
}

@media (max-width: 420px) {
  .brand-text {
    font-size: 0.98rem;
  }

  .brand-sub {
    display: none;
  }
}
</style>
