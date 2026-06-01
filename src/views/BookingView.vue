<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import GlassSelect from '@/components/ui/GlassSelect.vue'
import GlassDatePicker from '@/components/ui/GlassDatePicker.vue'
import GlassTimePicker from '@/components/ui/GlassTimePicker.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { bookingService } from '@/api/services'
import {
  COMMON_TIMEZONES,
  detectTimezone,
  nowInTimezone,
  offsetLabel,
  toPractitionerTime,
} from '@/utils/timezoneConverter'
import type { AppLocale } from '@/i18n'
import type { BookingPayload } from '@/types'

const { t, locale } = useI18n()

// Auto-detect the visitor's timezone (Apple HIG: be helpful by default).
const detectedTz = detectTimezone()

// Build the selector options, ensuring the detected zone is always present.
const timezoneOptions = computed(() => {
  const zones = new Set<string>([detectedTz, ...COMMON_TIMEZONES])
  return [...zones].map((tz) => ({ value: tz, label: `${tz} (${offsetLabel(tz)})` }))
})

const form = reactive<BookingPayload>({
  name: '',
  email: '',
  service: '',
  date: '',
  time: '',
  timezone: detectedTz,
  message: '',
})

// The visitor's own offset, shown for clarity.
const yourOffset = computed(() => offsetLabel(form.timezone))

// Earliest selectable date/time, evaluated in the visitor's chosen timezone so
// past slots cannot be booked. Time is only constrained when the chosen date is
// today (in that zone).
const minDate = computed(() => nowInTimezone(form.timezone).date)
const minTime = computed(() => {
  const now = nowInTimezone(form.timezone)
  return form.date === now.date ? now.time : undefined
})

// If the date or timezone changes such that the chosen time is now in the past,
// clear the stale time so the user must re-pick a valid slot.
watch([() => form.date, () => form.timezone], () => {
  const now = nowInTimezone(form.timezone)
  if (form.date && form.date < now.date) form.date = ''
  if (form.time && form.date === now.date && form.time < now.time) form.time = ''
})

// Live conversion of the chosen wall time into the practitioner's NZ time.
const converted = computed(() =>
  toPractitionerTime(form.date, form.time, form.timezone, locale.value as AppLocale),
)

const services = [
  { value: 'reading', key: 'booking.services.reading' },
  { value: 'cleansing', key: 'booking.services.cleansing' },
  { value: 'custom', key: 'booking.services.custom' },
]

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const success = ref(false)

const fieldClass =
  'focus-ring w-full rounded-2xl border border-[var(--glass-border)] bg-white/40 px-4 py-3 text-[var(--text-body)] outline-none transition-colors placeholder:text-muted dark:bg-white/5'

function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim()) errors.name = t('booking.errorName')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('booking.errorEmail')
  if (!form.service) errors.service = t('booking.errorService')
  const now = nowInTimezone(form.timezone)
  if (!form.date) errors.date = t('booking.errorDate')
  else if (form.date < now.date) errors.date = t('booking.errorDatePast')
  if (!form.time) errors.time = t('booking.errorTime')
  else if (form.date === now.date && form.time < now.time) errors.time = t('booking.errorTimePast')
  return Object.keys(errors).length === 0
}

async function submit() {
  if (!validate()) return
  submitting.value = true
  try {
    await bookingService.submit({ ...form })
    success.value = true
  } finally {
    submitting.value = false
  }
}

function reset() {
  success.value = false
  Object.assign(form, {
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    timezone: detectedTz,
    message: '',
  })
}
</script>

<template>
  <PageHero
    icon="calendar"
    :eyebrow="t('nav.booking')"
    :title="t('booking.title')"
    :subtitle="t('booking.subtitle')"
  />

  <section class="px-4 pb-16 sm:px-6">
    <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">
      <!-- Form / success -->
      <GlassCard v-reveal padding="lg">
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-400 ease-[var(--ease-glass)]"
          enter-from-class="opacity-0 translate-y-3"
        >
          <div v-if="success" key="success" class="py-10 text-center">
            <span
              class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-aura-600 text-white shadow-lg"
            >
              <AppIcon name="check" :size="40" />
            </span>
            <h2 class="mt-6 font-display text-[var(--text-title1)] font-bold">
              {{ t('booking.successTitle') }}
            </h2>
            <p class="text-muted mx-auto mt-3 max-w-md leading-relaxed">{{ t('booking.successDesc') }}</p>
            <GlassButton class="mt-8" variant="glass" @click="reset">{{ t('booking.again') }}</GlassButton>
          </div>

          <form v-else key="form" class="space-y-5" novalidate @submit.prevent="submit">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">{{ t('booking.formName') }}</label>
                <input v-model="form.name" type="text" :class="fieldClass" />
                <p v-if="errors.name" class="mt-1 text-[var(--text-footnote)] text-red-500">{{ errors.name }}</p>
              </div>
              <div>
                <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">{{ t('booking.formEmail') }}</label>
                <input v-model="form.email" type="email" :class="fieldClass" />
                <p v-if="errors.email" class="mt-1 text-[var(--text-footnote)] text-red-500">{{ errors.email }}</p>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">{{ t('booking.formService') }}</label>
              <div class="grid gap-3 sm:grid-cols-3">
                <label
                  v-for="s in services"
                  :key="s.value"
                  class="focus-ring flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-[var(--text-subhead)] font-medium transition-all"
                  :class="
                    form.service === s.value
                      ? 'border-aura-500 bg-aura-500/12 text-aura-600 dark:text-aura-300'
                      : 'border-[var(--glass-border)] bg-white/30 dark:bg-white/5'
                  "
                >
                  <input v-model="form.service" type="radio" :value="s.value" class="sr-only" />
                  {{ t(s.key) }}
                </label>
              </div>
              <p v-if="errors.service" class="mt-1 text-[var(--text-footnote)] text-red-500">{{ errors.service }}</p>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">{{ t('booking.formDate') }}</label>
                <GlassDatePicker v-model="form.date" :min="minDate" />
                <p v-if="errors.date" class="mt-1 text-[var(--text-footnote)] text-red-500">{{ errors.date }}</p>
              </div>
              <div>
                <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">{{ t('booking.formTime') }}</label>
                <GlassTimePicker v-model="form.time" :min-time="minTime" />
                <p v-if="errors.time" class="mt-1 text-[var(--text-footnote)] text-red-500">{{ errors.time }}</p>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">
                {{ t('booking.formTimezone') }}
                <span class="text-muted font-normal">· {{ yourOffset }}</span>
              </label>
              <GlassSelect v-model="form.timezone" :options="timezoneOptions" />
              <p class="mt-1.5 flex items-center gap-1.5 text-[var(--text-footnote)] text-muted">
                <AppIcon name="globe" :size="14" />
                {{ t('booking.timezoneHint') }}
              </p>

              <!-- Live conversion to the practitioner's New Zealand time -->
              <div
                class="mt-3 rounded-2xl border border-[var(--glass-border)] bg-aura-500/8 p-4"
              >
                <p class="flex items-center gap-1.5 text-[var(--text-footnote)] font-semibold text-aura-600 dark:text-aura-300">
                  <AppIcon name="moon" :size="14" />
                  {{ t('booking.convertedTitle') }}
                </p>
                <p v-if="converted" class="mt-1 text-[var(--text-body)] font-semibold">
                  {{ converted.formatted }}
                  <span class="text-muted font-normal">· {{ converted.offset }}</span>
                </p>
                <p v-else class="text-muted mt-1 text-[var(--text-subhead)]">
                  {{ t('booking.convertedPending') }}
                </p>
                <p v-if="converted" class="text-muted mt-1.5 text-[var(--text-footnote)] leading-relaxed">
                  {{ t('booking.convertedHint') }}
                </p>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-[var(--text-subhead)] font-medium">{{ t('booking.formMessage') }}</label>
              <textarea
                v-model="form.message"
                rows="4"
                :placeholder="t('booking.formMessagePlaceholder')"
                :class="[fieldClass, 'resize-none']"
              />
            </div>

            <GlassButton type="submit" variant="primary" size="lg" block :disabled="submitting">
              {{ submitting ? t('booking.submitting') : t('booking.submit') }}
              <AppIcon v-if="!submitting" name="arrowRight" :size="20" />
            </GlassButton>
          </form>
        </Transition>
      </GlassCard>

      <!-- Contact sidebar -->
      <div v-reveal="120" class="space-y-5">
        <GlassCard>
          <h3 class="text-[var(--text-title3)] font-bold">{{ t('booking.contactTitle') }}</h3>
          <ul class="mt-5 space-y-4">
            <li class="flex items-center gap-3">
              <span class="grid h-11 w-11 place-items-center rounded-2xl bg-teal-500/15 text-teal-500">
                <AppIcon name="chat" :size="22" />
              </span>
              <div>
                <p class="text-[var(--text-footnote)] text-muted">{{ t('booking.wechat') }}</p>
                <p class="font-semibold">ukkuma_nz</p>
              </div>
            </li>
            <li class="flex items-center gap-3">
              <span class="grid h-11 w-11 place-items-center rounded-2xl bg-aura-500/15 text-aura-500">
                <AppIcon name="mail" :size="22" />
              </span>
              <div>
                <p class="text-[var(--text-footnote)] text-muted">{{ t('booking.email') }}</p>
                <a href="mailto:hello@ukkuma.nz" class="font-semibold hover:text-aura-600 dark:hover:text-aura-300">
                  hello@ukkuma.nz
                </a>
              </div>
            </li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h3 class="flex items-center gap-2 text-[var(--text-subhead)] font-bold">
            <AppIcon name="sparkles" :size="18" class="text-aura-500" />
            {{ t('booking.note') }}
          </h3>
          <p class="text-muted mt-2 text-[var(--text-subhead)] leading-relaxed">{{ t('booking.noteDesc') }}</p>
        </GlassCard>
      </div>
    </div>
  </section>
</template>
