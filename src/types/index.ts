import type { AppLocale } from '@/i18n'

/** A string that exists in both supported languages. */
export type Localized = Record<AppLocale, string>

export interface BlogPost {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  content: Localized
  cover: string
  author: string
  tags: string[]
  readingMinutes: number
  publishedAt: string
}

export interface Project {
  id: number
  slug: string
  title: Localized
  summary: Localized
  description: Localized
  cover: string
  role: Localized
  year: string
  url?: string
  tags: string[]
}

export interface ServiceItem {
  id: string
  icon: string
  title: Localized
  desc: Localized
  to: string
  accent: 'aura' | 'teal' | 'ember'
}

export interface BookingPayload {
  name: string
  email: string
  service: string
  date: string
  time: string
  timezone: string
  message: string
}

export interface BookingResult {
  id: string
  status: 'received'
}
