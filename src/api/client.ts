import axios from 'axios'
import { activeLocale } from '@/stores/locale'

/**
 * Shared Axios instance. Requests are proxied to the Spring Boot backend
 * via Vite (`/api` -> http://localhost:8080) in development.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  // Let the backend localize responses when it supports it.
  config.headers.set('Accept-Language', activeLocale())
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized place for logging / toast hooks later on.
    return Promise.reject(error)
  },
)
