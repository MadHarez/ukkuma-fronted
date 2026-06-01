<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  minuteStep?: number
  /** Earliest selectable time as 'HH:mm'; earlier times are disabled. */
  minTime?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const hours = Array.from({ length: 24 }, (_, i) => pad(i))
const minutes = computed(() => {
  const step = props.minuteStep && props.minuteStep > 0 ? props.minuteStep : 5
  const out: string[] = []
  for (let m = 0; m < 60; m += step) out.push(pad(m))
  return out
})

const currentHour = computed(() => props.modelValue.split(':')[0] ?? '')
const currentMinute = computed(() => props.modelValue.split(':')[1] ?? '')

const minHour = computed(() => (props.minTime ? (props.minTime.split(':')[0] ?? '') : ''))
const minMinute = computed(() => (props.minTime ? (props.minTime.split(':')[1] ?? '') : ''))

// Whole hours earlier than the minimum hour are disabled.
const isHourDisabled = (h: string) => !!props.minTime && h < minHour.value
// Minutes are only constrained when the selected hour equals the minimum hour.
const isMinuteDisabled = (m: string) =>
  !!props.minTime && currentHour.value === minHour.value && m < minMinute.value

function chooseHour(h: string) {
  if (isHourDisabled(h)) return
  let minute = currentMinute.value || '00'
  // When jumping to the minimum hour, bump an invalid minute up to the minimum.
  if (props.minTime && h === minHour.value && minute < minMinute.value) {
    minute = minMinute.value
  }
  emit('update:modelValue', `${h}:${minute}`)
}
function chooseMinute(m: string) {
  if (isMinuteDisabled(m)) return
  emit('update:modelValue', `${currentHour.value || '00'}:${m}`)
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})

const itemClass = (active: boolean) =>
  active
    ? 'bg-aura-500/15 font-semibold text-aura-600 dark:text-aura-300'
    : 'hover:bg-black/5 dark:hover:bg-white/10'
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="focus-ring flex w-full items-center justify-between gap-2 rounded-2xl border border-[var(--glass-border)] bg-white/40 px-4 py-3 text-left text-[var(--text-body)] outline-none transition-colors dark:bg-white/5"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span :class="modelValue ? '' : 'text-muted'">{{ modelValue || placeholder || '--:--' }}</span>
      <AppIcon name="clock" :size="18" class="shrink-0 text-muted" />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-[var(--ease-glass)]"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-[var(--ease-glass)]"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="glass glass-strong absolute z-30 mt-2 flex w-full max-w-[14rem] gap-1 rounded-2xl p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]"
      >
        <ul class="max-h-56 flex-1 overflow-auto">
          <li
            v-for="h in hours"
            :key="h"
            class="focus-ring rounded-xl px-3 py-2 text-center text-[var(--text-subhead)] transition-colors"
            :class="
              isHourDisabled(h)
                ? 'cursor-not-allowed text-muted opacity-30'
                : ['cursor-pointer', itemClass(h === currentHour)]
            "
            @click="chooseHour(h)"
          >
            {{ h }}
          </li>
        </ul>
        <div class="my-1 w-px bg-[var(--glass-border)]" />
        <ul class="max-h-56 flex-1 overflow-auto">
          <li
            v-for="m in minutes"
            :key="m"
            class="focus-ring rounded-xl px-3 py-2 text-center text-[var(--text-subhead)] transition-colors"
            :class="
              isMinuteDisabled(m)
                ? 'cursor-not-allowed text-muted opacity-30'
                : ['cursor-pointer', itemClass(m === currentMinute)]
            "
            @click="chooseMinute(m)"
          >
            {{ m }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
