<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

interface Option {
  value: string
  label: string
}

const props = defineProps<{ modelValue: string; options: Option[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? '',
)

function choose(value: string) {
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
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <AppIcon
        name="arrowRight"
        :size="16"
        class="shrink-0 rotate-90 text-muted transition-transform duration-300"
        :class="{ '-rotate-90': open }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-[var(--ease-glass)]"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-[var(--ease-glass)]"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul
        v-if="open"
        role="listbox"
        class="glass glass-strong absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-2xl p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]"
      >
        <li
          v-for="o in options"
          :key="o.value"
          role="option"
          :aria-selected="o.value === modelValue"
          class="focus-ring cursor-pointer rounded-xl px-3.5 py-2.5 text-[var(--text-subhead)] transition-colors"
          :class="
            o.value === modelValue
              ? 'bg-aura-500/15 font-semibold text-aura-600 dark:text-aura-300'
              : 'hover:bg-black/5 dark:hover:bg-white/10'
          "
          @click="choose(o.value)"
        >
          {{ o.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>
