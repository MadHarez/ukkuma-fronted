<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()

const steps = [
  { icon: 'chat', title: 'customPath.s1Title', desc: 'customPath.s1Desc' },
  { icon: 'layers', title: 'customPath.s2Title', desc: 'customPath.s2Desc' },
  { icon: 'compass', title: 'customPath.s3Title', desc: 'customPath.s3Desc' },
]
</script>

<template>
  <PageHero
    icon="layers"
    :eyebrow="t('brand.tagline')"
    :title="t('customPath.title')"
    :subtitle="t('customPath.subtitle')"
  />

  <section class="px-4 sm:px-6">
    <GlassCard v-reveal padding="lg" class="mx-auto max-w-3xl text-center">
      <p class="text-[var(--text-title3)] leading-relaxed">{{ t('customPath.intro') }}</p>
    </GlassCard>
  </section>

  <section class="px-4 py-16 sm:px-6">
    <div class="mx-auto max-w-5xl">
      <SectionHeading center :title="t('customPath.stepsTitle')" />
      <div class="relative mt-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="(s, i) in steps"
          :key="s.title"
          v-reveal="i * 100"
          class="relative"
        >
          <GlassCard interactive class="h-full">
            <div class="flex items-center gap-3">
              <span
                class="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-ember-500 to-aura-600 text-white shadow-lg"
              >
                <AppIcon :name="s.icon" :size="24" />
              </span>
              <span class="font-display text-[var(--text-title1)] font-bold text-ember-400/50">
                0{{ i + 1 }}
              </span>
            </div>
            <h3 class="mt-5 text-[var(--text-title3)] font-bold">{{ t(s.title) }}</h3>
            <p class="text-muted mt-2 text-[var(--text-subhead)] leading-relaxed">{{ t(s.desc) }}</p>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>

  <section class="px-4 py-12 sm:px-6">
    <div
      v-reveal
      class="glass glass-strong relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-glass-lg)] p-10 text-center sm:p-14"
    >
      <div
        class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-ember-400/40 blur-3xl"
      />
      <h2 class="relative font-display text-[var(--text-title1)] font-bold sm:text-4xl">
        {{ t('customPath.ctaTitle') }}
      </h2>
      <div class="relative mt-8 flex justify-center">
        <GlassButton to="/booking" variant="primary" size="lg">
          {{ t('common.getStarted') }}
          <AppIcon name="arrowRight" :size="20" />
        </GlassButton>
      </div>
    </div>
  </section>
</template>
