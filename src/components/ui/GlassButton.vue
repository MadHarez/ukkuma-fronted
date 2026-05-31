<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'glass' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    type?: 'button' | 'submit'
    block?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', block: false, disabled: false },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const sizeClass = computed(
  () =>
    ({
      sm: 'px-4 py-2 text-[var(--text-subhead)]',
      md: 'px-6 py-3 text-[var(--text-body)]',
      lg: 'px-8 py-4 text-[var(--text-title3)]',
    })[props.size],
)

const variantClass = computed(
  () =>
    ({
      primary:
        'text-white bg-gradient-to-br from-aura-500 to-aura-700 shadow-[0_10px_30px_-8px_rgba(124,58,237,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(124,58,237,0.7)]',
      glass: 'glass glass-strong text-[var(--page-text)] hover:brightness-105',
      ghost: 'text-[var(--page-text)] hover:bg-black/5 dark:hover:bg-white/10',
    })[props.variant],
)
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="to || href ? undefined : type"
    :disabled="disabled"
    class="focus-ring inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[var(--ease-spring)] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
    :class="[sizeClass, variantClass, block ? 'w-full' : '']"
  >
    <slot />
  </component>
</template>
