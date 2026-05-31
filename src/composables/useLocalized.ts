import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/i18n'
import type { Localized } from '@/types'

/**
 * Returns a getter that picks the field matching the active UI locale,
 * falling back to English then Chinese.
 */
export function useLocalized() {
  const { locale } = useI18n()
  return (value: Localized): string => {
    const key = locale.value as AppLocale
    return value[key] ?? value.en ?? value.zh
  }
}
