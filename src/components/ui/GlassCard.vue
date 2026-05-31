<script setup lang="ts">
withDefaults(defineProps<{ interactive?: boolean; padding?: 'sm' | 'md' | 'lg' }>(), {
  interactive: false,
  padding: 'md',
})
</script>

<template>
  <div
    class="glass rounded-[var(--radius-glass)] transition-all duration-500 ease-[var(--ease-glass)]"
    :class="[
      { 'p-5': padding === 'sm', 'p-7': padding === 'md', 'p-9': padding === 'lg' },
      interactive ? 'hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(31,23,64,0.28)]' : '',
    ]"
  >
    <slot />
  </div>
</template>
