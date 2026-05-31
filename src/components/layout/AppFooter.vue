<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()
const year = new Date().getFullYear()

const explore = [
  { to: '/insights', key: 'nav.insights' },
  { to: '/cleansing', key: 'nav.cleansing' },
  { to: '/custom-path', key: 'nav.customPath' },
  { to: '/learn', key: 'nav.learn' },
]
const connect = [
  { to: '/blog', key: 'nav.blog' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/booking', key: 'nav.booking' },
]
</script>

<template>
  <footer class="px-4 pb-6 pt-16 sm:px-6">
    <div class="glass mx-auto max-w-6xl rounded-[var(--radius-glass-lg)] p-8 sm:p-12">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2">
            <span
              class="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-aura-500 to-teal-500 text-white"
            >
              <AppIcon name="sparkles" :size="20" />
            </span>
            <span class="font-display text-[var(--text-title3)] font-bold">{{ t('brand.name') }}</span>
          </div>
          <p class="text-muted mt-4 max-w-sm text-[var(--text-subhead)] leading-relaxed">
            {{ t('footer.tagline') }}
          </p>
          <p class="text-muted mt-2 text-[var(--text-footnote)]">{{ t('brand.tagline') }}</p>
        </div>

        <div>
          <h3 class="text-[var(--text-footnote)] font-semibold uppercase tracking-wider text-muted">
            {{ t('footer.explore') }}
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="l in explore" :key="l.to">
              <RouterLink
                :to="l.to"
                class="focus-ring text-[var(--text-subhead)] transition-colors hover:text-aura-600 dark:hover:text-aura-300"
              >
                {{ t(l.key) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-[var(--text-footnote)] font-semibold uppercase tracking-wider text-muted">
            {{ t('footer.connect') }}
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="l in connect" :key="l.to">
              <RouterLink
                :to="l.to"
                class="focus-ring text-[var(--text-subhead)] transition-colors hover:text-aura-600 dark:hover:text-aura-300"
              >
                {{ t(l.key) }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-3 border-t border-[var(--glass-border)] pt-6 text-[var(--text-footnote)] text-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ t('brand.name') }}. {{ t('footer.rights') }}</p>
        <div class="flex gap-5">
          <a class="focus-ring transition-colors hover:text-[var(--page-text)]" href="#">{{ t('footer.privacy') }}</a>
          <a class="focus-ring transition-colors hover:text-[var(--page-text)]" href="#">{{ t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
