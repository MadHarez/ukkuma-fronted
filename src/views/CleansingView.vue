<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()

const types = [
  { icon: 'wind', title: 'cleansing.t1Title', desc: 'cleansing.t1Desc' },
  { icon: 'leaf', title: 'cleansing.t2Title', desc: 'cleansing.t2Desc' },
  { icon: 'heart', title: 'cleansing.t3Title', desc: 'cleansing.t3Desc' },
]
const benefits = ['cleansing.b1', 'cleansing.b2', 'cleansing.b3', 'cleansing.b4']
</script>

<template>
  <PageHero
    icon="wind"
    :eyebrow="t('brand.tagline')"
    :title="t('cleansing.title')"
    :subtitle="t('cleansing.subtitle')"
  />

  <section class="px-4 sm:px-6">
    <GlassCard v-reveal padding="lg" class="mx-auto max-w-3xl text-center">
      <p class="text-[var(--text-title3)] leading-relaxed">{{ t('cleansing.intro') }}</p>
    </GlassCard>
  </section>

  <section class="px-4 py-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <SectionHeading center :title="t('cleansing.typesTitle')" />
      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <GlassCard
          v-for="(o, i) in types"
          :key="o.title"
          v-reveal="i * 80"
          interactive
          class="h-full"
        >
          <span
            class="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-aura-600 text-white shadow-lg"
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
      <SectionHeading center :title="t('cleansing.benefitsTitle')" />
      <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <GlassCard v-for="(b, i) in benefits" :key="b" v-reveal="i * 70" class="text-center">
          <span
            class="mx-auto grid h-11 w-11 place-items-center rounded-full bg-teal-500/15 text-teal-500"
          >
            <AppIcon name="check" :size="22" />
          </span>
          <p class="mt-3 text-[var(--text-subhead)] font-medium">{{ t(b) }}</p>
        </GlassCard>
      </div>
      <div class="mt-12 flex justify-center">
        <GlassButton to="/booking" variant="primary" size="lg">
          {{ t('common.bookNow') }}
          <AppIcon name="arrowRight" :size="20" />
        </GlassButton>
      </div>
    </div>
  </section>
</template>
