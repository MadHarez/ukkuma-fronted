<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GlassButton from '@/components/ui/GlassButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { blogService } from '@/api/services'
import { useLocalized } from '@/composables/useLocalized'
import type { BlogPost, ServiceItem } from '@/types'

const { t } = useI18n()
const L = useLocalized()

const services: ServiceItem[] = [
  { id: 'insights', icon: 'compass', title: { zh: '洞察解读', en: 'Insights' }, desc: { zh: '塔罗、占星与直觉解读，照亮当下。', en: 'Tarot, astrology, and intuitive readings.' }, to: '/insights', accent: 'aura' },
  { id: 'cleansing', icon: 'wind', title: { zh: '能量清理', en: 'Cleansing' }, desc: { zh: '释放停滞，让身心重新流动。', en: 'Release what’s stagnant and flow again.' }, to: '/cleansing', accent: 'teal' },
  { id: 'custom', icon: 'layers', title: { zh: '定制路径', en: 'Custom Path' }, desc: { zh: '为你量身设计的长期陪伴。', en: 'A long-form journey designed around you.' }, to: '/custom-path', accent: 'ember' },
  { id: 'learn', icon: 'book', title: { zh: '学习与工具', en: 'Learn & Tools' }, desc: { zh: '把练习带回日常，成为自己的引导者。', en: 'Bring the practice home and guide yourself.' }, to: '/learn', accent: 'aura' },
]

const accentRing: Record<ServiceItem['accent'], string> = {
  aura: 'from-aura-500 to-aura-700',
  teal: 'from-teal-500 to-aura-600',
  ember: 'from-ember-500 to-aura-600',
}

const stats = [
  { value: '1.2k+', key: 'home.statsClients' },
  { value: '8', key: 'home.statsYears' },
  { value: '3.5k+', key: 'home.statsSessions' },
]

const posts = ref<BlogPost[]>([])
onMounted(async () => {
  posts.value = (await blogService.list()).slice(0, 3)
})
</script>

<template>
  <!-- Hero -->
  <section class="relative px-4 pb-12 pt-32 sm:px-6 sm:pt-40">
    <div class="mx-auto max-w-4xl text-center">
      <p
        v-reveal
        class="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[var(--text-footnote)] font-semibold uppercase tracking-[0.18em] text-aura-600 dark:text-aura-300"
      >
        <AppIcon name="sparkles" :size="15" />
        {{ t('home.heroEyebrow') }}
      </p>
      <h1
        v-reveal="80"
        class="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl"
      >
        {{ t('home.heroTitle') }}
      </h1>
      <p
        v-reveal="160"
        class="text-muted mx-auto mt-6 max-w-2xl text-[var(--text-title3)] leading-relaxed"
      >
        {{ t('home.heroSubtitle') }}
      </p>
      <div v-reveal="240" class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <GlassButton to="/booking" variant="primary" size="lg">
          {{ t('home.heroPrimary') }}
          <AppIcon name="arrowRight" :size="20" />
        </GlassButton>
        <GlassButton to="/insights" variant="glass" size="lg">
          {{ t('home.heroSecondary') }}
        </GlassButton>
      </div>

      <!-- Stats -->
      <div v-reveal="320" class="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
        <GlassCard v-for="s in stats" :key="s.key" padding="sm">
          <p class="font-display text-[var(--text-title1)] font-bold sm:text-4xl">{{ s.value }}</p>
          <p class="text-muted mt-1 text-[var(--text-footnote)] sm:text-[var(--text-subhead)]">
            {{ t(s.key) }}
          </p>
        </GlassCard>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section class="px-4 py-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        center
        :eyebrow="t('brand.tagline')"
        :title="t('home.servicesTitle')"
        :subtitle="t('home.servicesSubtitle')"
      />
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <RouterLink
          v-for="(s, i) in services"
          :key="s.id"
          :to="s.to"
          v-reveal="i * 80"
          class="focus-ring group rounded-[var(--radius-glass)]"
        >
          <GlassCard interactive class="h-full">
            <span
              class="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg"
              :class="accentRing[s.accent]"
            >
              <AppIcon :name="s.icon" :size="26" />
            </span>
            <h3 class="mt-5 text-[var(--text-title3)] font-bold">{{ L(s.title) }}</h3>
            <p class="text-muted mt-2 text-[var(--text-subhead)] leading-relaxed">{{ L(s.desc) }}</p>
            <span
              class="mt-4 inline-flex items-center gap-1 text-[var(--text-subhead)] font-medium text-aura-600 transition-transform group-hover:translate-x-1 dark:text-aura-300"
            >
              {{ t('common.learnMore') }}
              <AppIcon name="arrowRight" :size="16" />
            </span>
          </GlassCard>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Featured posts -->
  <section class="px-4 py-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          :eyebrow="t('nav.blog')"
          :title="t('home.featuredTitle')"
          :subtitle="t('home.featuredSubtitle')"
        />
        <GlassButton to="/blog" variant="glass" size="sm">{{ t('common.viewAll') }}</GlassButton>
      </div>
      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <RouterLink
          v-for="(p, i) in posts"
          :key="p.id"
          :to="`/blog/${p.slug}`"
          v-reveal="i * 80"
          class="focus-ring group rounded-[var(--radius-glass)]"
        >
          <GlassCard interactive padding="sm" class="h-full overflow-hidden">
            <div
              class="mb-4 h-40 w-full rounded-2xl"
              :style="{ background: p.cover }"
            />
            <div class="flex items-center gap-2 text-[var(--text-footnote)] text-muted">
              <span>{{ p.publishedAt }}</span>
              <span>·</span>
              <span>{{ p.readingMinutes }} {{ t('common.minRead') }}</span>
            </div>
            <h3 class="mt-2 text-[var(--text-title3)] font-bold leading-snug">{{ L(p.title) }}</h3>
            <p class="text-muted mt-2 line-clamp-2 text-[var(--text-subhead)] leading-relaxed">
              {{ L(p.excerpt) }}
            </p>
          </GlassCard>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="px-4 py-16 sm:px-6">
    <div
      v-reveal
      class="glass glass-strong relative mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-glass-lg)] p-10 text-center sm:p-16"
    >
      <div
        class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-aura-400/40 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-teal-400/40 blur-3xl"
      />
      <div class="relative">
        <h2 class="font-display text-[var(--text-title1)] font-bold sm:text-4xl">
          {{ t('home.ctaTitle') }}
        </h2>
        <p class="text-muted mx-auto mt-4 max-w-xl text-[var(--text-title3)]">
          {{ t('home.ctaSubtitle') }}
        </p>
        <div class="mt-8 flex justify-center">
          <GlassButton to="/booking" variant="primary" size="lg">
            {{ t('common.getStarted') }}
            <AppIcon name="arrowRight" :size="20" />
          </GlassButton>
        </div>
      </div>
    </div>
  </section>
</template>
