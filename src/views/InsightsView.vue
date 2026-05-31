<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()

const offerings = [
  { icon: 'compass', title: 'insights.o1Title', desc: 'insights.o1Desc' },
  { icon: 'moon', title: 'insights.o2Title', desc: 'insights.o2Desc' },
  { icon: 'sparkles', title: 'insights.o3Title', desc: 'insights.o3Desc' },
]
const steps = ['insights.s1', 'insights.s2', 'insights.s3']
</script>

<template>
  <PageHero
    icon="compass"
    :eyebrow="t('brand.tagline')"
    :title="t('insights.title')"
    :subtitle="t('insights.subtitle')"
  />

  <section class="px-4 sm:px-6">
    <GlassCard v-reveal padding="lg" class="mx-auto max-w-3xl text-center">
      <p class="text-[var(--text-title3)] leading-relaxed">{{ t('insights.intro') }}</p>
    </GlassCard>
  </section>

  <section class="px-4 py-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <SectionHeading center :title="t('insights.offeringsTitle')" />
      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <GlassCard
          v-for="(o, i) in offerings"
          :key="o.title"
          v-reveal="i * 80"
          interactive
          class="h-full"
        >
          <span
            class="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-aura-500 to-aura-700 text-white shadow-lg"
          >
            <AppIcon :name="o.icon" :size="26" />
          </span>
          <h3 class="mt-5 text-[var(--text-title3)] font-bold">{{ t(o.title) }}</h3>
          <p class="text-muted mt-2 text-[var(--text-subhead)] leading-relaxed">{{ t(o.desc) }}</p>
        </GlassCard>
      </div>
    </div>
  </section>

  <section class="px-4 py-12 sm:px-6">
    <div class="mx-auto max-w-4xl">
      <SectionHeading center :title="t('insights.processTitle')" />
      <ol class="mt-12 grid gap-5 sm:grid-cols-3">
        <li v-for="(s, i) in steps" :key="s" v-reveal="i * 80">
          <GlassCard class="h-full">
            <span class="font-display text-[var(--text-largetitle)] font-bold text-aura-500/40">
              0{{ i + 1 }}
            </span>
            <p class="mt-2 text-[var(--text-body)] leading-relaxed">{{ t(s) }}</p>
          </GlassCard>
        </li>
      </ol>
      <div class="mt-12 flex justify-center">
        <GlassButton to="/booking" variant="primary" size="lg">
          {{ t('common.bookNow') }}
          <AppIcon name="arrowRight" :size="20" />
        </GlassButton>
      </div>
    </div>
  </section>
</template>
