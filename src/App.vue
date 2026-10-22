<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatWidget from './components/ChatWidget.vue'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useTheme } from './composables/useTheme'

useTheme()
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
  <ChatWidget />
</template>
