<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

withDefaults(defineProps<{ icon?: string; eyebrow?: string; title: string; subtitle?: string }>(), {})
</script>

<template>
  <section class="px-4 pb-8 pt-32 sm:px-6 sm:pt-36">
    <div v-reveal class="mx-auto max-w-4xl text-center">
      <span
        v-if="icon"
        class="mb-6 inline-grid h-16 w-16 place-items-center rounded-[1.4rem] bg-gradient-to-br from-aura-500 to-teal-500 text-white shadow-[0_12px_30px_-8px_rgba(124,58,237,0.6)]"
      >
        <AppIcon :name="icon" :size="30" />
      </span>
      <p
        v-if="eyebrow"
        class="mb-3 text-[var(--text-footnote)] font-semibold uppercase tracking-[0.18em] text-aura-600 dark:text-aura-300"
      >
        {{ eyebrow }}
      </p>
      <h1
        class="font-display text-[var(--text-largetitle)] font-bold leading-tight sm:text-5xl"
      >
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-muted mx-auto mt-5 max-w-2xl text-[var(--text-title3)] leading-relaxed">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
