<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const navLinks = [
  { to: '/services', label: 'Services', external: false },
  { to: '/products', label: 'Products', external: false },
  { to: '/industries', label: 'Industries', external: false },
  { to: '/about', label: 'About', external: false },
  { to: '/contact', label: 'Contact', external: false },
]

const actionLinks = [
  { to: '/contact', label: 'Start a Project' },
  { to: '/products', label: 'Explore Products' },
  { to: '/services', label: 'View Services' },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="main">
        <div class="brand-col">
          <h2 class="tagline">
            Engineering the <span>future</span> of software.
          </h2>
          <p class="desc">
            AI-first platforms, cloud systems, and enterprise products,
            built with clarity by Sunao Technologies.
          </p>
          <div class="socials">
            <a
              href="https://www.linkedin.com/company/sunaotechnologies"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="social"
            >
              <Icon icon="simple-icons:linkedin" width="16" height="16" />
            </a>
            <a
              href="https://github.com/SunaoTechnologies"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="social"
            >
              <Icon icon="simple-icons:github" width="16" height="16" />
            </a>
          </div>
        </div>

        <div class="col">
          <p class="col-title">Navigation</p>
          <ul>
            <li v-for="link in navLinks" :key="link.label">
              <RouterLink v-if="!link.external" :to="link.to">{{ link.label }}</RouterLink>
              <a v-else :href="link.to">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div class="col">
          <p class="col-title">Get in touch</p>
          <ul>
            <li v-for="link in actionLinks" :key="link.label">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </li>
            <li>
              <a href="mailto:hello@sunaotechnologies.com">hello@sunaotechnologies.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="bottom">
        <p>© {{ year }} Sunao Technologies. All rights reserved.</p>
        <div class="bottom-links">
          <a href="/#top" class="to-top">
            Back to top
            <Icon icon="lucide:arrow-up" width="14" height="14" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 60% 50% at 80% 100%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%),
    linear-gradient(160deg, #1a1216 0%, #2a1c24 42%, #241820 100%);
  color: rgba(247, 243, 239, 0.72);
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    -55deg,
    rgba(255, 255, 255, 0.02) 0,
    rgba(255, 255, 255, 0.02) 1px,
    transparent 1px,
    transparent 40px
  );
  pointer-events: none;
}

.wrap {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
}

.main {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding: clamp(3.5rem, 8vh, 5rem) 0 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.tagline {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.6vw, 1.95rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.03em;
  color: #fff;
}

.tagline span {
  color: var(--accent);
}

.desc {
  margin: 1.15rem 0 0;
  max-width: 20rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
}

.socials {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.social {
  width: 2.35rem;
  height: 2.35rem;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.social:hover {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 55%, transparent);
}

.col-title {
  margin: 0 0 1.15rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

ul a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.92rem;
  transition: color 0.2s ease, padding-left 0.2s ease;
  display: inline-block;
}

ul a:hover {
  color: var(--accent);
  padding-left: 0.35rem;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem 0 1.5rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
}

.bottom a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}

.bottom a:hover {
  color: var(--accent);
}

.to-top {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

@media (max-width: 860px) {
  .main {
    grid-template-columns: 1fr 1fr;
  }

  .brand-col {
    grid-column: 1 / -1;
  }
}

@media (max-width: 520px) {
  .main {
    grid-template-columns: 1fr;
  }
}
</style>
