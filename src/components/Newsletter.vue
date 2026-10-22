<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const email = ref('')
const status = ref<'idle' | 'ok'>('idle')

function onSubmit() {
  if (!email.value.trim()) return
  status.value = 'ok'
  email.value = ''
}
</script>

<template>
  <section id="newsletter" class="newsletter">
    <div class="wrap">
      <div class="card">
        <div class="left">
          <div class="content">
            <h2>Subscribe to Our<br />Newsletter</h2>
            <p>
              Stay ahead with insights on AI, engineering, and digital transformation,
              delivered straight to your inbox.
            </p>

            <form class="form" @submit.prevent="onSubmit">
              <input
                v-model="email"
                class="input"
                type="email"
                placeholder="Work email *"
                required
                autocomplete="email"
              />
              <div class="btns">
                <button class="primary" type="submit">
                  <Icon icon="lucide:send" width="14" height="14" />
                  Subscribe now
                </button>
                <a class="secondary" href="#products">Explore products</a>
              </div>
              <p v-if="status === 'ok'" class="ok" role="status">
                Thanks, you’re on the list.
              </p>
            </form>
          </div>
        </div>

        <div class="right">
          <div class="doc-stack" aria-hidden="true">
            <div class="doc-back" />
            <div class="doc-front">
              <div class="doc-logo">Sunao Technologies</div>
              <div class="doc-badge">Newsletter</div>
              <div class="doc-title">Weekly Insights<br />on AI & Tech</div>
              <div class="doc-footer">
                A curated digest of trends,<br />tutorials & case studies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  padding: clamp(3.5rem, 7vh, 5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--bg);
}

.wrap {
  max-width: 1280px;
  margin: 0 auto;
}

.card {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  overflow: hidden;
  box-shadow: 0 24px 64px color-mix(in srgb, #000 14%, transparent);
}

.left {
  position: relative;
  padding: clamp(2.5rem, 5vw, 3.5rem);
  background:
    radial-gradient(ellipse 80% 60% at 70% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%),
    linear-gradient(135deg, #1a1216 0%, #2e1f28 45%, #a85f74 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.left::before {
  content: '';
  position: absolute;
  top: -30%;
  right: 5%;
  width: 55%;
  height: 160%;
  background: linear-gradient(
    115deg,
    transparent 40%,
    color-mix(in srgb, var(--accent) 10%, transparent) 50%,
    transparent 60%
  );
  transform: rotate(8deg);
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
}

h2 {
  margin: 0 0 1rem;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.12;
  color: #fff;
}

.content > p {
  margin: 0 0 2rem;
  max-width: 420px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
}

.input {
  width: 100%;
  max-width: 380px;
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font: inherit;
  font-size: 0.9rem;
  outline: none;
  margin-bottom: 1.15rem;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input:focus {
  border-color: color-mix(in srgb, var(--accent) 65%, transparent);
  background: rgba(255, 255, 255, 0.1);
}

.btns {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.primary,
.secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 13px 24px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.primary {
  color: var(--on-accent);
  background: var(--accent);
}

.primary:hover {
  background: var(--accent-strong);
}

.secondary {
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.ok {
  margin: 1rem 0 0;
  font-size: 0.88rem;
  color: var(--accent);
}

.right {
  position: relative;
  background: linear-gradient(145deg, #2a1c24 0%, #a85f74 40%, #e5a07a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  overflow: hidden;
}

.right::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 70%);
  top: 10%;
  right: -10%;
  pointer-events: none;
}

.right::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%);
  bottom: 5%;
  left: 10%;
  pointer-events: none;
}

.doc-stack {
  position: relative;
  z-index: 2;
  width: 260px;
  height: 340px;
}

.doc-back {
  position: absolute;
  inset: 18px 0 0 18px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: rotate(4deg);
}

.doc-front {
  position: absolute;
  inset: 0 18px 18px 0;
  background: #fff;
  padding: 1.5rem 1.35rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.doc-logo {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0a0a0a;
}

.doc-badge {
  margin-top: 0.85rem;
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a85f74;
  background: color-mix(in srgb, #c97b8f 14%, #fff);
  padding: 0.3rem 0.55rem;
}

.doc-title {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #0a0a0a;
}

.doc-footer {
  margin-top: 0.85rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: #5a5456;
}

@media (max-width: 900px) {
  .card {
    grid-template-columns: 1fr;
  }

  .right {
    min-height: 320px;
  }
}
</style>
