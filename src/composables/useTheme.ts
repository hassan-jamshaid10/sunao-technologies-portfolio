import { onMounted, ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'

const theme = ref<ThemeMode>('light')
let initialized = false

function applyTheme(mode: ThemeMode) {
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem('sunao-theme', mode)
}

export function useTheme() {
  onMounted(() => {
    if (initialized) return
    initialized = true

    const stored = localStorage.getItem('sunao-theme') as ThemeMode | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light'
    applyTheme(theme.value)
  })

  watch(theme, (mode) => applyTheme(mode))

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
