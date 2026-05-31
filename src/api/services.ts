import { http } from './client'
import { mockPosts, mockProjects } from './mock'
import type { BlogPost, BookingPayload, BookingResult, Project } from '@/types'

/**
 * Each call tries the real backend first and gracefully falls back to local
 * mock content if the API is unavailable (e.g. backend not running yet).
 */
async function withFallback<T>(request: Promise<{ data: T }>, fallback: T): Promise<T> {
  try {
    const { data } = await request
    return data
  } catch {
    // Simulate a small latency so loading states are visible during development.
    await new Promise((r) => setTimeout(r, 300))
    return fallback
  }
}

export const blogService = {
  list(): Promise<BlogPost[]> {
    return withFallback(http.get<BlogPost[]>('/blog/posts'), mockPosts)
  },
  async getBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await withFallback(http.get<BlogPost[]>('/blog/posts'), mockPosts)
    return posts.find((p) => p.slug === slug)
  },
}

export const projectService = {
  list(): Promise<Project[]> {
    return withFallback(http.get<Project[]>('/projects'), mockProjects)
  },
  async getBySlug(slug: string): Promise<Project | undefined> {
    const projects = await withFallback(http.get<Project[]>('/projects'), mockProjects)
    return projects.find((p) => p.slug === slug)
  },
}

export const bookingService = {
  submit(payload: BookingPayload): Promise<BookingResult> {
    return withFallback(http.post<BookingResult>('/bookings', payload), {
      id: `local-${Date.now()}`,
      status: 'received',
    })
  },
}
