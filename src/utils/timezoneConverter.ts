import type { AppLocale } from '@/i18n'

/**
 * The practitioner's home timezone. UKKUMA operates from New Zealand, so all
 * sessions are ultimately scheduled against Pacific/Auckland time.
 */
export const PRACTITIONER_TIMEZONE = 'Pacific/Auckland'

/** A short curated list of common IANA timezones for the booking selector. */
export const COMMON_TIMEZONES = [
  'Pacific/Auckland',
  'Australia/Sydney',
  'Asia/Shanghai',
  'Asia/Hong_Kong',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Europe/London',
  'Europe/Paris',
  'Europe/Moscow',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'America/Sao_Paulo',
  'UTC',
] as const

/** Detect the visitor's IANA timezone, falling back to UTC. */
export function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

/**
 * The offset (in milliseconds) of an IANA timezone at a given instant.
 * Positive means the zone is ahead of UTC.
 */
function offsetMs(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const parts = dtf.formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0')
  // `hour` can come back as 24 at midnight in some engines; normalize to 0.
  const hour = get('hour') === 24 ? 0 : get('hour')
  const asUTC = Date.UTC(get('year'), get('month') - 1, get('day'), hour, get('minute'), get('second'))
  return asUTC - date.getTime()
}

/** A human label for a timezone's offset, e.g. "UTC+12" or "UTC-5:30". */
export function offsetLabel(timeZone: string, date: Date = new Date()): string {
  let ms: number
  try {
    ms = offsetMs(timeZone, date)
  } catch {
    return 'UTC'
  }
  const totalMinutes = Math.round(ms / 60000)
  const sign = totalMinutes >= 0 ? '+' : '-'
  const abs = Math.abs(totalMinutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`
}

/**
 * Interpret a wall-clock date + time as belonging to `timeZone` and return the
 * absolute instant (a UTC-based Date). Returns null if inputs are incomplete.
 */
export function zonedWallTimeToInstant(
  date: string,
  time: string,
  timeZone: string,
): Date | null {
  if (!date || !time) return null
  const [ys, mos, ds] = date.split('-')
  const [hs, mis] = time.split(':')
  const y = Number(ys)
  const mo = Number(mos)
  const d = Number(ds)
  const h = Number(hs)
  const mi = Number(mis)
  if ([y, mo, d, h, mi].some((n) => Number.isNaN(n))) return null

  // Treat the wall time as if it were UTC, then correct by the zone's offset.
  const guess = Date.UTC(y, mo - 1, d, h, mi)
  try {
    const corrected = guess - offsetMs(timeZone, new Date(guess))
    const result = new Date(corrected)
    return Number.isNaN(result.getTime()) ? null : result
  } catch {
    return null
  }
}

/** Format an instant in a target timezone using the active UI locale. */
export function formatInTimezone(
  instant: Date,
  timeZone: string,
  locale: AppLocale,
): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    timeZone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(instant)
}

/**
 * Convert a visitor's chosen wall time (in their timezone) to the
 * practitioner's New Zealand time, returning both the formatted string and the
 * offset label. Returns null when date/time are not yet filled in.
 */
export function toPractitionerTime(
  date: string,
  time: string,
  fromTimeZone: string,
  locale: AppLocale,
): { formatted: string; offset: string } | null {
  const instant = zonedWallTimeToInstant(date, time, fromTimeZone)
  if (!instant) return null
  return {
    formatted: formatInTimezone(instant, PRACTITIONER_TIMEZONE, locale),
    offset: offsetLabel(PRACTITIONER_TIMEZONE, instant),
  }
}
