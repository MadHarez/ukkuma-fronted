import type { AppLocale } from '@/i18n'

/** A string that exists in both supported languages. */
export type Localized = Record<AppLocale, string>

/**
 * A single piece of rich blog content. Posts may be composed of an ordered
 * list of these blocks to mix text, images, quotes and lists.
 */
export type ContentBlock =
  | { type: 'heading'; text: Localized }
  | { type: 'paragraph'; text: Localized }
  | { type: 'image'; src: string; alt?: Localized; caption?: Localized }
  | { type: 'quote'; text: Localized; cite?: Localized }
  | { type: 'list'; ordered?: boolean; items: Localized[] }
  | { type: 'divider' }

export interface BlogPost {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  /** Plain-text body (paragraphs separated by blank lines). Used as a fallback
   *  when `blocks` is not provided, and for reading-time/excerpt logic. */
  content: Localized
  /** Optional rich content. When present, it is rendered instead of `content`. */
  blocks?: ContentBlock[]
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
  /** Plain-text body, used as a fallback when `blocks` is not provided. */
  description: Localized
  /** Optional rich content rendered instead of `description` when present. */
  blocks?: ContentBlock[]
  cover: string
  /** Short framework tag, e.g. "Δ + I + R" — shown as a badge/meta. */
  framework?: string
  /** Who this is best suited for. */
  bestFor?: Localized
  role?: Localized
  year?: string
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
