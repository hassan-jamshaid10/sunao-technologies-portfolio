<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  productId: string
  tone: 'teal' | 'amber'
}>()
</script>

<template>
  <div class="stage" :class="tone" aria-hidden="true">
    <div class="devices">
      <div class="laptop">
        <div class="laptop-lid">
          <div class="laptop-bezel">
            <div class="screen" :class="productId">
              <template v-if="productId === 'SunaoAI'">
                <header class="s-top">
                  <span class="brand">SunaoAI</span>
                  <span class="pill">Web</span>
                </header>
                <div class="s-grid">
                  <div class="chart">
                    <p>Cognitive risk</p>
                    <div class="bars">
                      <i style="--h: 45%" /><i style="--h: 70%" /><i style="--h: 58%" />
                      <i style="--h: 84%" /><i style="--h: 62%" /><i style="--h: 76%" />
                    </div>
                  </div>
                  <div class="stats">
                    <div><strong>Memory</strong><em>Stable</em></div>
                    <div><strong>Attention</strong><em>Review</em></div>
                    <div><strong>Care plan</strong><em>Active</em></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <header class="s-top amber">
                  <span class="brand">PukaarAI</span>
                  <span class="pill">Zero-trace</span>
                </header>
                <div class="desk">
                  <p class="desk-title">Case intelligence</p>
                  <div class="row"><span>Voice report · Urdu</span><em>New</em></div>
                  <div class="row"><span>Witness consensus</span><em>Live</em></div>
                  <div class="row"><span>Attrition forecast</span><em>14d</em></div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="laptop-base"><span /></div>
      </div>

      <div class="phone">
        <div class="phone-frame">
          <span class="notch" />
          <div class="screen phone-screen" :class="productId">
            <template v-if="productId === 'SunaoAI'">
              <header class="m-top">
                <span>SunaoAI</span>
                <Icon icon="lucide:bell" width="12" height="12" />
              </header>
              <p class="m-title">Patient check-in</p>
              <div class="m-card">
                <Icon icon="lucide:brain" width="14" height="14" />
                <div><strong>Screening</strong><em>Ready</em></div>
              </div>
              <div class="m-card">
                <Icon icon="lucide:activity" width="14" height="14" />
                <div><strong>Risk index</strong><em>Moderate</em></div>
              </div>
              <div class="m-card">
                <Icon icon="lucide:heart-pulse" width="14" height="14" />
                <div><strong>Follow-up</strong><em>Scheduled</em></div>
              </div>
            </template>
            <template v-else>
              <header class="m-top amber">
                <span>PukaarAI</span>
                <em class="anon">Anonymous</em>
              </header>
              <p class="m-title">A call for help</p>
              <p class="m-sub">Speak in Urdu or your language, identity stays untraceable.</p>
              <div class="m-card">
                <Icon icon="lucide:mic" width="14" height="14" />
                <div><strong>Voice report</strong><em>Native</em></div>
              </div>
              <div class="m-card">
                <Icon icon="lucide:shield-off" width="14" height="14" />
                <div><strong>Identity</strong><em>Hashed</em></div>
              </div>
              <button class="m-cta" type="button">Speak to report</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  min-height: clamp(300px, 40vw, 440px);
  display: grid;
  place-items: center;
  padding: 1.75rem 1rem;
  background: transparent;
  overflow: visible;
}

.stage.teal {
  background: radial-gradient(
    ellipse 70% 65% at 45% 45%,
    color-mix(in srgb, var(--accent) 16%, transparent),
    transparent 72%
  );
}

.stage.amber {
  background: radial-gradient(
    ellipse 70% 65% at 55% 45%,
    color-mix(in srgb, var(--accent-warm) 16%, transparent),
    transparent 72%
  );
}

.devices {
  position: relative;
  width: min(100%, 560px);
  height: clamp(260px, 34vw, 360px);
}

.laptop {
  position: absolute;
  left: 0;
  top: 8%;
  width: 78%;
  z-index: 1;
  filter: drop-shadow(0 24px 36px rgba(0, 0, 0, 0.28));
  animation: float-a 6s ease-in-out infinite;
}

.phone {
  position: absolute;
  right: 2%;
  bottom: 0;
  width: 32%;
  max-width: 160px;
  z-index: 2;
  filter: drop-shadow(0 22px 30px rgba(0, 0, 0, 0.32));
  animation: float-b 5.5s ease-in-out infinite;
}

.laptop-lid {
  background: #14181d;
  border: 2px solid #2b323a;
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
  padding: 8px 8px 0;
}

.laptop-bezel {
  background: #070b0f;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
}

.laptop-base {
  height: 10px;
  background: linear-gradient(180deg, #3a434c, #1f262c);
  border-radius: 0 0 6px 6px;
  position: relative;
}

.laptop-base span {
  display: block;
  width: 16%;
  height: 3px;
  margin: 2px auto 0;
  background: #0d1115;
}

.laptop-base::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 116%;
  height: 6px;
  background: #151a1f;
  border-radius: 0 0 8px 8px;
}

.phone-frame {
  background: #0a0a0a;
  border: 2px solid #2a2a2a;
  border-radius: 22px;
  padding: 8px 6px 10px;
  position: relative;
}

.notch {
  position: absolute;
  top: 11px;
  left: 50%;
  transform: translateX(-50%);
  width: 34%;
  height: 8px;
  background: #000;
  border-radius: 999px;
  z-index: 2;
}

.screen {
  overflow: hidden;
  color: #e8f4f1;
  font-size: 9px;
}

.laptop .screen {
  aspect-ratio: 16 / 10;
  background: #0b1719;
}

.phone-screen {
  aspect-ratio: 9 / 17;
  border-radius: 16px;
  background: #0b1719;
  padding: 1.35rem 0.55rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.s-top,
.m-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.45rem 0.55rem;
  background: color-mix(in srgb, #0f766e 85%, #000);
}

.s-top.amber,
.m-top.amber {
  background: color-mix(in srgb, #b45309 75%, #1a1200);
}

.brand,
.m-top span {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  font-size: 0.72rem;
}

.pill,
.anon {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.12rem 0.3rem;
  font-style: normal;
}

.s-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 0.45rem;
  padding: 0.5rem;
  height: calc(100% - 1.7rem);
}

.chart,
.stats div,
.desk,
.m-card,
.row {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.chart {
  padding: 0.45rem;
  display: flex;
  flex-direction: column;
}

.chart p,
.desk-title {
  margin: 0 0 0.4rem;
  font-size: 0.52rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(232, 244, 241, 0.55);
}

.bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 0.22rem;
}

.bars i {
  flex: 1;
  height: var(--h);
  background: linear-gradient(180deg, #2dd4bf, #0f766e);
}

.stats {
  display: grid;
  gap: 0.3rem;
}

.stats div {
  padding: 0.35rem;
}

.stats strong,
.m-card strong,
.row span {
  display: block;
  font-size: 0.55rem;
  color: #fff;
}

.stats em,
.m-card em,
.row em {
  font-style: normal;
  font-size: 0.48rem;
  color: rgba(232, 244, 241, 0.55);
}

.desk {
  margin: 0.5rem;
  padding: 0.45rem;
  display: grid;
  gap: 0.3rem;
  height: calc(100% - 2.4rem);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.4rem;
}

.row em {
  color: #f0b429;
}

.m-title {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.m-sub {
  margin: 0;
  font-size: 0.55rem;
  line-height: 1.4;
  color: rgba(232, 244, 241, 0.65);
}

.m-card {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.4rem;
  color: #2dd4bf;
}

.stage.amber .m-card {
  color: #f0b429;
}

.m-cta {
  margin-top: auto;
  border: 0;
  width: 100%;
  padding: 0.55rem;
  background: #f0b429;
  color: #1a1200;
  font: inherit;
  font-size: 0.58rem;
  font-weight: 700;
}

@keyframes float-a {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes float-b {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@media (max-width: 900px) {
  .devices {
    height: 300px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .laptop,
  .phone {
    animation: none;
  }
}
</style>
