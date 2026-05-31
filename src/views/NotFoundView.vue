<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GlassButton from '@/components/ui/GlassButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()
</script>

<template>
  <section class="grid min-h-screen place-items-center px-4 sm:px-6">
    <div class="text-center">
      <span
        class="mx-auto grid h-20 w-20 place-items-center rounded-[1.6rem] bg-gradient-to-br from-aura-500 to-teal-500 text-white shadow-[0_12px_30px_-8px_rgba(124,58,237,0.6)]"
      >
        <AppIcon name="moon" :size="38" />
      </span>
      <p class="mt-6 font-display text-6xl font-bold text-aura-500/40">404</p>
      <h1 class="mt-2 font-display text-[var(--text-title1)] font-bold">{{ t('notFound.title') }}</h1>
      <p class="text-muted mx-auto mt-3 max-w-sm leading-relaxed">{{ t('notFound.desc') }}</p>
      <GlassButton to="/" variant="primary" class="mt-8">
        <AppIcon name="arrowLeft" :size="18" />
        {{ t('notFound.back') }}
      </GlassButton>
    </div>
  </section>
</template>
