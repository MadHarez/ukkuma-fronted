<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'
import AppIcon from '@/components/ui/AppIcon.vue'

const { t } = useI18n()
const theme = useThemeStore()
const locale = useLocaleStore()
const route = useRoute()

const mobileOpen = ref(false)

const links = [
  { to: '/', key: 'nav.home', exact: true },
  { to: '/insights', key: 'nav.insights' },
  { to: '/cleansing', key: 'nav.cleansing' },
  { to: '/custom-path', key: 'nav.customPath' },
  { to: '/learn', key: 'nav.learn' },
  { to: '/blog', key: 'nav.blog' },
  { to: '/projects', key: 'nav.projects' },
]

// Close the mobile sheet whenever navigation occurs.
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
    <nav
      class="glass glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6"
    >
      <RouterLink to="/" class="focus-ring flex items-center gap-2 rounded-full pr-2">
        <span
          class="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-aura-500 to-teal-500 text-white"
        >
          <AppIcon name="sparkles" :size="18" />
        </span>
        <span class="font-display text-[var(--text-headline)] font-bold tracking-tight">
          {{ t('brand.name') }}
        </span>
      </RouterLink>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="focus-ring rounded-full px-3.5 py-2 text-[var(--text-subhead)] font-medium text-muted transition-colors hover:text-[var(--page-text)]"
            :active-class="link.exact ? '' : '!text-[var(--page-text)] bg-black/5 dark:bg-white/10'"
            :exact-active-class="link.exact ? '!text-[var(--page-text)] bg-black/5 dark:bg-white/10' : ''"
          >
            {{ t(link.key) }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-1.5">
        <button
          class="focus-ring grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-[var(--page-text)] dark:hover:bg-white/10"
          :aria-label="t('theme.toggle')"
          @click="theme.toggle()"
        >
          <AppIcon :name="theme.mode === 'dark' ? 'sun' : 'moon'" :size="19" />
        </button>
        <button
          class="focus-ring h-9 rounded-full px-3 text-[var(--text-subhead)] font-semibold text-muted transition-colors hover:bg-black/5 hover:text-[var(--page-text)] dark:hover:bg-white/10"
          :aria-label="t('lang.toggle')"
          @click="locale.toggle()"
        >
          {{ locale.current === 'zh' ? 'EN' : '中' }}
        </button>

        <RouterLink
          to="/booking"
          class="focus-ring ml-1 hidden rounded-full bg-gradient-to-br from-aura-500 to-aura-700 px-5 py-2 text-[var(--text-subhead)] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.7)] transition-transform active:scale-95 sm:inline-flex"
        >
          {{ t('nav.booking') }}
        </RouterLink>

        <button
          class="focus-ring grid h-9 w-9 place-items-center rounded-full text-[var(--page-text)] lg:hidden"
          :aria-label="t('nav.home')"
          @click="mobileOpen = !mobileOpen"
        >
          <AppIcon :name="mobileOpen ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </nav>

    <!-- Mobile sheet -->
    <Transition
      enter-active-class="transition duration-300 ease-[var(--ease-glass)]"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-[var(--ease-glass)]"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="mobileOpen" class="mx-auto mt-3 max-w-6xl lg:hidden">
        <ul class="glass glass-strong flex flex-col gap-1 rounded-[var(--radius-glass)] p-3">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="focus-ring block rounded-2xl px-4 py-3 text-[var(--text-body)] font-medium"
              :active-class="link.exact ? '' : 'bg-black/5 dark:bg-white/10'"
              :exact-active-class="link.exact ? 'bg-black/5 dark:bg-white/10' : ''"
            >
              {{ t(link.key) }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/booking"
              class="focus-ring mt-1 block rounded-2xl bg-gradient-to-br from-aura-500 to-aura-700 px-4 py-3 text-center font-semibold text-white"
            >
              {{ t('nav.booking') }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
