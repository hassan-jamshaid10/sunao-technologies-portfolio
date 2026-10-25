<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, nextTick, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

type Role = 'user' | 'model'
type ChatMessage = { role: Role; content: string }

const open = ref(false)
const minimized = ref(false)
const input = ref('')
const sending = ref(false)
const error = ref('')
const listEl = ref<HTMLElement | null>(null)

const welcome: ChatMessage = {
  role: 'model',
  content:
    "Hello! I'm SunaoBot, your AI assistant for Sunao Technologies.\n\nAsk about PukaarAI, SunaoCall, SunaoAI, our services, or how we can help with your next build.",
}

const messages = ref<ChatMessage[]>([{ ...welcome }])

const quickActions = [
  { label: 'Our Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'PukaarAI', prompt: 'Tell me about PukaarAI' },
  { label: 'SunaoCall', prompt: 'Tell me about SunaoCall' },
  { label: 'Book a consultation', to: '/contact' },
]

const canSend = computed(() => input.value.trim().length > 0 && !sending.value)

async function scrollToBottom() {
  await nextTick()
  if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
}

watch(
  () => messages.value.length,
  () => {
    void scrollToBottom()
  },
)

function toggleOpen() {
  open.value = !open.value
  minimized.value = false
  if (open.value) void scrollToBottom()
}

function close() {
  open.value = false
}

function minimize() {
  open.value = false
  minimized.value = true
}

function resetConversation() {
  messages.value = [{ ...welcome }]
  error.value = ''
  input.value = ''
}

async function sendPrompt(text: string) {
  const content = text.trim()
  if (!content || sending.value) return

  error.value = ''
  messages.value.push({ role: 'user', content })
  input.value = ''
  sending.value = true

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.value.map((m) => ({ role: m.role, content: m.content })),
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong.')
    }
    messages.value.push({ role: 'model', content: String(data.reply || '').trim() })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Chat failed. Please try again.'
    messages.value.pop()
    input.value = content
  } finally {
    sending.value = false
    void scrollToBottom()
  }
}

function onSubmit() {
  void sendPrompt(input.value)
}

function onQuick(action: (typeof quickActions)[number]) {
  if (action.prompt) void sendPrompt(action.prompt)
}
</script>

<template>
  <div class="chat-root">
    <Transition name="panel">
      <section v-if="open" class="panel" aria-label="SunaoBot chat">
        <header class="panel-head">
          <div class="title">
            <span class="avatar" aria-hidden="true">
              <Icon icon="lucide:bot" width="18" height="18" />
            </span>
            <div>
              <h3>SunaoBot</h3>
              <p>Sunao Technologies AI</p>
            </div>
          </div>
          <div class="head-actions">
            <button type="button" aria-label="Reset conversation" @click="resetConversation">
              <Icon icon="lucide:rotate-ccw" width="15" height="15" />
            </button>
            <button type="button" aria-label="Minimize" @click="minimize">
              <Icon icon="lucide:minus" width="15" height="15" />
            </button>
            <button type="button" aria-label="Close" @click="close">
              <Icon icon="lucide:x" width="15" height="15" />
            </button>
          </div>
        </header>

        <div ref="listEl" class="messages">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="bubble"
            :class="msg.role"
          >
            <p v-for="(line, li) in msg.content.split('\n')" :key="li">
              <template v-if="line">{{ line }}</template>
              <br v-else />
            </p>
          </div>
          <div v-if="sending" class="bubble model typing">
            <span /><span /><span />
          </div>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
        </div>

        <div class="quick">
          <template v-for="action in quickActions" :key="action.label">
            <RouterLink
              v-if="action.to"
              class="chip"
              :to="action.to"
              @click="close"
            >
              {{ action.label }}
            </RouterLink>
            <button
              v-else
              type="button"
              class="chip"
              :disabled="sending"
              @click="onQuick(action)"
            >
              {{ action.label }}
            </button>
          </template>
        </div>

        <form class="composer" @submit.prevent="onSubmit">
          <input
            v-model="input"
            type="text"
            placeholder="Ask about AI, products, services..."
            maxlength="2000"
            :disabled="sending"
            autocomplete="off"
          />
          <button type="submit" aria-label="Send message" :disabled="!canSend">
            <Icon icon="lucide:send" width="16" height="16" />
          </button>
        </form>
      </section>
    </Transition>

    <button
      class="fab"
      type="button"
      :aria-expanded="open"
      :aria-label="open ? 'Close chat' : 'Chat with us'"
      @click="toggleOpen"
    >
      <Icon v-if="open" icon="lucide:x" width="22" height="22" />
      <template v-else>
        <Icon icon="lucide:message-circle" width="22" height="22" />
        <span>Chat with Us</span>
      </template>
    </button>
  </div>
</template>

<style scoped>
.chat-root {
  position: fixed;
  right: clamp(1rem, 3vw, 1.75rem);
  bottom: clamp(1rem, 3vw, 1.75rem);
  z-index: 80;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.85rem;
}

.fab {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 3.1rem;
  padding: 0.85rem 1.15rem;
  border: 0;
  background: var(--text);
  color: var(--bg);
  font: inherit;
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 14px 36px color-mix(in srgb, #000 22%, transparent);
  transition: background 0.2s ease, transform 0.2s ease;
}

.fab:hover {
  background: var(--accent);
  color: var(--on-accent);
}

.panel {
  width: min(392px, calc(100vw - 2rem));
  height: min(560px, calc(100vh - 7rem));
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 24px 64px color-mix(in srgb, #000 22%, transparent);
  overflow: hidden;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.title {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.avatar {
  display: inline-grid;
  place-items: center;
  width: 2.15rem;
  height: 2.15rem;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  color: var(--accent);
}

.title h3 {
  margin: 0;
  font-size: 0.98rem;
  letter-spacing: -0.02em;
}

.title p {
  margin: 0.1rem 0 0;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.head-actions {
  display: flex;
  gap: 0.25rem;
}

.head-actions button {
  display: inline-grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}

.head-actions button:hover {
  color: var(--text);
  background: var(--surface);
}

.messages {
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--bg);
}

.bubble {
  max-width: 88%;
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.bubble p {
  margin: 0;
}

.bubble p + p {
  margin-top: 0.45rem;
}

.bubble.model {
  align-self: flex-start;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
}

.bubble.user {
  align-self: flex-end;
  background: var(--accent);
  color: var(--on-accent);
}

.bubble.typing {
  display: inline-flex;
  gap: 0.3rem;
  align-items: center;
  padding: 0.85rem 1rem;
}

.bubble.typing span {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: var(--text-muted);
  animation: bounce 1s ease-in-out infinite;
}

.bubble.typing span:nth-child(2) {
  animation-delay: 0.15s;
}

.bubble.typing span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    opacity: 0.35;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

.error {
  margin: 0;
  font-size: 0.82rem;
  color: #c2410c;
}

.quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.65rem 0.85rem;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.chip {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font: inherit;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.35rem 0.55rem;
  text-decoration: none;
  cursor: pointer;
}

.chip:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.chip:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.composer {
  display: flex;
  gap: 0.45rem;
  padding: 0.75rem;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.composer input {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: 0.88rem;
  padding: 0.7rem 0.8rem;
  outline: none;
}

.composer input:focus {
  border-color: var(--accent);
}

.composer button {
  display: inline-grid;
  place-items: center;
  width: 2.6rem;
  border: 0;
  background: var(--accent);
  color: var(--on-accent);
  cursor: pointer;
}

.composer button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 520px) {
  .fab span {
    display: none;
  }

  .fab {
    width: 3.25rem;
    height: 3.25rem;
    padding: 0;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble.typing span,
  .panel-enter-active,
  .panel-leave-active {
    animation: none;
    transition: none;
  }
}
</style>
