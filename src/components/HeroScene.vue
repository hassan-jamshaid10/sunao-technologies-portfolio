<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, ref } from 'vue'

const pointer = ref({ x: 0, y: 0 })
const showIcons = ref(false)

const icons = [
  { name: 'TypeScript', icon: 'simple-icons:typescript', color: '#3178C6' },
  { name: 'React', icon: 'simple-icons:react', color: '#61DAFB' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs', color: '#339933' },
  { name: 'Python', icon: 'simple-icons:python', color: '#3776AB' },
  { name: 'Docker', icon: 'simple-icons:docker', color: '#2496ED' },
  { name: 'AWS', icon: 'simple-icons:amazonaws', color: '#FF9900' },
  { name: 'Kubernetes', icon: 'simple-icons:kubernetes', color: '#326CE5' },
  { name: 'TensorFlow', icon: 'simple-icons:tensorflow', color: '#FF6F00' },
  { name: 'PostgreSQL', icon: 'simple-icons:postgresql', color: '#4169E1' },
  { name: 'Flutter', icon: 'simple-icons:flutter', color: '#02569B' },
  { name: 'Next.js', icon: 'simple-icons:nextdotjs', color: 'var(--text)' },
  { name: 'Go', icon: 'simple-icons:go', color: '#00ADD8' },
]

/* Keep icons in the right/lower field, clear of header + left copy */
const positions = [
  { x: 58, y: 22, z: 30, s: 1.05, d: 0 },
  { x: 78, y: 18, z: 10, s: 0.95, d: 0.4 },
  { x: 90, y: 36, z: 40, s: 1.12, d: 0.8 },
  { x: 52, y: 42, z: 5, s: 0.88, d: 1.1 },
  { x: 68, y: 48, z: 55, s: 1.2, d: 0.2 },
  { x: 84, y: 58, z: 20, s: 0.92, d: 1.5 },
  { x: 56, y: 68, z: 35, s: 1.0, d: 0.6 },
  { x: 74, y: 72, z: 15, s: 0.9, d: 1.8 },
  { x: 94, y: 70, z: 45, s: 1.08, d: 1.2 },
  { x: 62, y: 32, z: 25, s: 0.86, d: 0.9 },
  { x: 86, y: 24, z: 50, s: 1.05, d: 1.4 },
  { x: 70, y: 60, z: 8, s: 0.94, d: 0.3 },
]

const tiles = icons.map((icon, i) => ({ ...icon, ...positions[i] }))

let media: MediaQueryList | null = null

function onMove(e: PointerEvent) {
  if (!showIcons.value) return
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1
  pointer.value = {
    x: (e.clientX / w - 0.5) * 18,
    y: (e.clientY / h - 0.5) * 12,
  }
}

function syncViewport() {
  showIcons.value = Boolean(media?.matches)
  if (!showIcons.value) {
    pointer.value = { x: 0, y: 0 }
  }
}

onMounted(() => {
  media = window.matchMedia('(min-width: 769px)')
  syncViewport()
  media.addEventListener('change', syncViewport)
  window.addEventListener('pointermove', onMove, { passive: true })
})

onUnmounted(() => {
  media?.removeEventListener('change', syncViewport)
  window.removeEventListener('pointermove', onMove)
})
</script>

<template>
  <div
    v-if="showIcons"
    class="tech-field"
    aria-hidden="true"
    :style="{
      '--px': `${pointer.x}px`,
      '--py': `${pointer.y}px`,
    }"
  >
    <div
      v-for="tile in tiles"
      :key="tile.name"
      class="tile"
      :title="tile.name"
      :style="{
        left: `${tile.x}%`,
        top: `${tile.y}%`,
        '--z': tile.z,
        '--s': tile.s,
        '--d': `${tile.d}s`,
        color: tile.color,
      }"
    >
      <Icon :icon="tile.icon" class="brand-icon" />
    </div>
  </div>
</template>

<style scoped>
.tech-field {
  position: absolute;
  /* Clear fixed header (~72px) */
  top: 4.75rem;
  right: 0;
  bottom: 0;
  left: 42%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.tile {
  position: absolute;
  display: grid;
  place-items: center;
  width: clamp(2.4rem, 4.5vw, 3.25rem);
  height: clamp(2.4rem, 4.5vw, 3.25rem);
  background: none;
  border: 0;
  box-shadow: none;
  transform: translate3d(
      calc(var(--px) * (var(--z) / 90)),
      calc(var(--py) * (var(--z) / 110)),
      0
    )
    scale(var(--s));
  animation: float 5.5s ease-in-out infinite;
  animation-delay: var(--d);
  opacity: 0.88;
  filter: drop-shadow(0 10px 18px color-mix(in srgb, currentColor 22%, transparent));
  will-change: transform;
}

.brand-icon {
  width: 100%;
  height: 100%;
}

@keyframes float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -12px;
  }
}

@media (max-width: 1100px) {
  .tech-field {
    left: 36%;
  }

  .tile:nth-child(n + 10) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    animation: none;
  }
}
</style>
