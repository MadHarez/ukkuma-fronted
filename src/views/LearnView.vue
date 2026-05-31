<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()

const resources = [
  { icon: 'sparkles', title: 'learn.r1Title', desc: 'learn.r1Desc', accent: 'from-aura-500 to-aura-700' },
  { icon: 'wind', title: 'learn.r2Title', desc: 'learn.r2Desc', accent: 'from-teal-500 to-aura-600' },
  { icon: 'moon', title: 'learn.r3Title', desc: 'learn.r3Desc', accent: 'from-aura-600 to-teal-500' },
  { icon: 'book', title: 'learn.r4Title', desc: 'learn.r4Desc', accent: 'from-ember-500 to-aura-600' },
]
</script>

<template>
  <PageHero
    icon="book"
    :eyebrow="t('brand.tagline')"
    :title="t('learn.title')"
    :subtitle="t('learn.subtitle')"
  />

  <section class="px-4 sm:px-6">
    <GlassCard v-reveal padding="lg" class="mx-auto max-w-3xl text-center">
      <p class="text-[var(--text-title3)] leading-relaxed">{{ t('learn.intro') }}</p>
    </GlassCard>
  </section>

  <section class="px-4 py-16 sm:px-6">
    <div class="mx-auto max-w-5xl">
      <SectionHeading center :title="t('learn.resourcesTitle')" />
      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <GlassCard
          v-for="(r, i) in resources"
          :key="r.title"
          v-reveal="i * 80"
          interactive
          class="flex h-full items-start gap-4"
        >
          <span
            class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg"
            :class="r.accent"
          >
            <AppIcon :name="r.icon" :size="26" />
          </span>
          <div>
            <h3 class="text-[var(--text-title3)] font-bold">{{ t(r.title) }}</h3>
            <p class="text-muted mt-2 text-[var(--text-subhead)] leading-relaxed">{{ t(r.desc) }}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
</template>
