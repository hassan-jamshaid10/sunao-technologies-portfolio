import { onMounted, onUnmounted, ref } from 'vue'

export function useTypewriter(
  phrases: string[],
  options: { typeMs?: number; deleteMs?: number; holdMs?: number } = {},
) {
  const { typeMs = 55, deleteMs = 28, holdMs = 1600 } = options
  const text = ref('')
  const done = ref(false)
  const index = ref(0)

  let charIndex = 0
  let deleting = false
  let timer = 0
  let cancelled = false

  function tick() {
    if (cancelled) return
    const current = phrases[index.value] ?? ''

    if (!deleting) {
      charIndex += 1
      text.value = current.slice(0, charIndex)
      if (charIndex >= current.length) {
        done.value = phrases.length === 1
        if (phrases.length === 1) return
        timer = window.setTimeout(() => {
          deleting = true
          tick()
        }, holdMs)
        return
      }
      timer = window.setTimeout(tick, typeMs)
      return
    }

    charIndex -= 1
    text.value = current.slice(0, charIndex)
    if (charIndex <= 0) {
      deleting = false
      index.value = (index.value + 1) % phrases.length
      timer = window.setTimeout(tick, typeMs * 2)
      return
    }
    timer = window.setTimeout(tick, deleteMs)
  }

  onMounted(() => {
    timer = window.setTimeout(tick, 350)
  })

  onUnmounted(() => {
    cancelled = true
    window.clearTimeout(timer)
  })

  return { text, done, index }
}
