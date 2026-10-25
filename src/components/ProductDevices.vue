<script setup lang="ts">
import { computed } from 'vue'
import pukaarPhoto from '../assets/photos/pukaarai.jpg'
import sunaoaiPhoto from '../assets/photos/sunaoai.jpg'
import sunaocallPhoto from '../assets/photos/sunaocall.jpg'

const props = defineProps<{
  productId: string
  tone: 'teal' | 'amber' | 'violet'
}>()

const photos: Record<string, string> = {
  SunaoAI: sunaoaiPhoto,
  SunaoCall: sunaocallPhoto,
  PukaarAI: pukaarPhoto,
}

const photo = computed(() => photos[props.productId] ?? pukaarPhoto)
</script>

<template>
  <div class="stage" :class="tone" aria-hidden="true">
    <img :src="photo" alt="" class="photo" />
    <span class="tint" />
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  min-height: clamp(260px, 32vw, 380px);
  overflow: hidden;
}

.photo {
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  display: block;
  filter: saturate(0.92) contrast(1.02);
}

.tint {
  position: absolute;
  inset: 0;
  mix-blend-mode: multiply;
  pointer-events: none;
}

.stage.teal .tint {
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

.stage.amber .tint {
  background: color-mix(in srgb, var(--accent-warm) 16%, transparent);
}

.stage.violet .tint {
  background: color-mix(in srgb, var(--accent-violet) 16%, transparent);
}
</style>
