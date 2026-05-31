<script setup lang="ts">
withDefaults(
  defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean }>(),
  { center: false },
)
</script>

<template>
  <div v-reveal :class="center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'">
    <p
      v-if="eyebrow"
      class="mb-3 text-[var(--text-footnote)] font-semibold uppercase tracking-[0.18em] text-aura-600 dark:text-aura-300"
    >
      {{ eyebrow }}
    </p>
    <h2 class="font-display text-[var(--text-title1)] sm:text-[var(--text-largetitle)] font-bold leading-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-muted mt-4 text-[var(--text-title3)] leading-relaxed">
      {{ subtitle }}
    </p>
  </div>
</template>
