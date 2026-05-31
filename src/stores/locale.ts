import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { i18n, persistLocale, type AppLocale } from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()

  const current = computed<AppLocale>(() => locale.value as AppLocale)

  function setLocale(next: AppLocale) {
    locale.value = next
    persistLocale(next)
  }

  function toggle() {
    setLocale(current.value === 'zh' ? 'en' : 'zh')
  }

  return { current, setLocale, toggle }
})

// Convenience accessor outside of components (e.g. services).
export function activeLocale(): AppLocale {
  return i18n.global.locale.value as AppLocale
}
