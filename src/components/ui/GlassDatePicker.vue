<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps<{ modelValue: string; placeholder?: string; min?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const { locale } = useI18n()
const intlLocale = computed(() => (locale.value === 'zh' ? 'zh-CN' : 'en-GB'))

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth()) // 0-11

function pad(n: number) {
  return String(n).padStart(2, '0')
}
function format(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`
}

// Sync the visible month to the selected value whenever it changes externally.
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const [y, m] = val.split('-').map(Number)
      if (y && m) {
        viewYear.value = y
        viewMonth.value = m - 1
      }
    }
  },
  { immediate: true },
)

const monthLabel = computed(() =>
  new Intl.DateTimeFormat(intlLocale.value, { year: 'numeric', month: 'long' }).format(
    new Date(viewYear.value, viewMonth.value, 1),
  ),
)

// Localized short weekday names, starting on Sunday to match Date.getDay().
const weekdays = computed(() => {
  const fmt = new Intl.DateTimeFormat(intlLocale.value, { weekday: 'short' })
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 7 + i))) // 2024-01-07 is Sunday
})

interface Cell {
  day: number | null
  value?: string
}

const cells = computed<Cell[]>(() => {
  const firstDay = new Date(viewYear.value, viewMonth.value, 1).getDay() // 0=Sun
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const result: Cell[] = []
  for (let i = 0; i < firstDay; i++) result.push({ day: null })
  for (let d = 1; d <= daysInMonth; d++) {
    result.push({ day: d, value: format(viewYear.value, viewMonth.value, d) })
  }
  return result
})

const displayLabel = computed(() => {
  if (!props.modelValue) return ''
  const [y, m, d] = props.modelValue.split('-').map(Number)
  if (!y || !m || !d) return ''
  return format(y, m - 1, d)
})

const todayValue = format(today.getFullYear(), today.getMonth(), today.getDate())

// A day is disabled when it falls before the `min` date (string compare works
// because the 'YYYY-MM-DD' format is lexicographically ordered).
const isDisabled = (value?: string) => !!value && !!props.min && value < props.min

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value -= 1
  } else viewMonth.value -= 1
}
function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value += 1
  } else viewMonth.value += 1
}

function choose(value?: string) {
  if (!value || isDisabled(value)) return
  emit('update:modelValue', value)
  open.value = false
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
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="focus-ring flex w-full items-center justify-between gap-2 rounded-2xl border border-[var(--glass-border)] bg-white/40 px-4 py-3 text-left text-[var(--text-body)] outline-none transition-colors dark:bg-white/5"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span :class="displayLabel ? '' : 'text-muted'">
        {{ displayLabel || placeholder || 'yyyy-mm-dd' }}
      </span>
      <AppIcon name="calendar" :size="18" class="shrink-0 text-muted" />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-[var(--ease-glass)]"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-[var(--ease-glass)]"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="glass glass-strong absolute z-30 mt-2 w-[19rem] rounded-2xl p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]"
      >
        <div class="mb-2 flex items-center justify-between">
          <button
            type="button"
            class="focus-ring grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-[var(--page-text)] dark:hover:bg-white/10"
            @click="prevMonth"
          >
            <AppIcon name="arrowLeft" :size="18" />
          </button>
          <span class="text-[var(--text-subhead)] font-semibold">{{ monthLabel }}</span>
          <button
            type="button"
            class="focus-ring grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-[var(--page-text)] dark:hover:bg-white/10"
            @click="nextMonth"
          >
            <AppIcon name="arrowRight" :size="18" />
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center">
          <span
            v-for="w in weekdays"
            :key="w"
            class="py-1 text-[var(--text-caption)] font-semibold uppercase text-muted"
          >
            {{ w }}
          </span>
          <template v-for="(cell, i) in cells" :key="i">
            <span v-if="cell.day === null" />
            <button
              v-else
              type="button"
              :disabled="isDisabled(cell.value)"
              class="focus-ring mx-auto grid h-9 w-9 place-items-center rounded-full text-[var(--text-subhead)] transition-colors"
              :class="
                isDisabled(cell.value)
                  ? 'cursor-not-allowed text-muted opacity-30'
                  : cell.value === modelValue
                    ? 'bg-gradient-to-br from-aura-500 to-aura-700 font-semibold text-white'
                    : cell.value === todayValue
                      ? 'text-aura-600 ring-1 ring-aura-500/40 dark:text-aura-300'
                      : 'hover:bg-black/5 dark:hover:bg-white/10'
              "
              @click="choose(cell.value)"
            >
              {{ cell.day }}
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
