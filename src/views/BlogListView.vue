<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { blogService } from '@/api/services'
import { useLocalized } from '@/composables/useLocalized'
import type { BlogPost } from '@/types'

const { t } = useI18n()
const L = useLocalized()

const posts = ref<BlogPost[]>([])
const loading = ref(true)

const searchQuery = ref('')
const selectedTag = ref('')

onMounted(async () => {
  posts.value = await blogService.list()
  loading.value = false
})

const allTags = computed(() => {
  const tagsSet = new Set<string>()
  posts.value.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet)
})

const isUrl = (str: string) => {
  return str.startsWith('http') || str.startsWith('/') || str.startsWith('./')
}

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const titleMatch = L(post.title).toLowerCase().includes(searchQuery.value.toLowerCase())
    const excerptMatch = L(post.excerpt).toLowerCase().includes(searchQuery.value.toLowerCase())
    const contentMatch = L(post.content).toLowerCase().includes(searchQuery.value.toLowerCase())
    const queryMatch = titleMatch || excerptMatch || contentMatch

    const tagMatch = !selectedTag.value || post.tags.includes(selectedTag.value)

    return queryMatch && tagMatch
  })
})
</script>

<template>
  <PageHero icon="book" :eyebrow="t('nav.blog')" :title="t('blog.title')" :subtitle="t('blog.subtitle')" />

  <section class="px-4 pb-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <!-- Search & Filters -->
      <div v-if="!loading && posts.length" class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <!-- Search bar -->
        <div class="relative flex-1 max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('blog.searchPlaceholder')"
            class="focus-ring w-full rounded-2xl border border-[var(--glass-border)] bg-white/40 py-2.5 pl-11 pr-10 text-[var(--text-body)] outline-none transition-colors dark:bg-white/5 placeholder:text-muted"
          />
          <AppIcon name="search" :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <button
            v-if="searchQuery"
            type="button"
            @click="searchQuery = ''"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-[var(--page-text)] transition-colors"
          >
            <AppIcon name="close" :size="16" />
          </button>
        </div>

        <!-- Tag filter tabs -->
        <div class="flex flex-wrap gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            @click="selectedTag = ''"
            class="focus-ring rounded-full px-4 py-1.5 text-[var(--text-caption)] font-medium transition-colors"
            :class="!selectedTag ? 'bg-gradient-to-br from-aura-500 to-aura-700 text-white shadow-lg shadow-aura-500/10' : 'bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10 text-muted hover:text-[var(--page-text)]'"
          >
            {{ t('blog.allTags') }}
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            @click="selectedTag = tag"
            class="focus-ring rounded-full px-4 py-1.5 text-[var(--text-caption)] font-medium transition-colors"
            :class="selectedTag === tag ? 'bg-gradient-to-br from-aura-500 to-aura-700 text-white shadow-lg shadow-aura-500/10' : 'bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10 text-muted hover:text-[var(--page-text)]'"
          >
            #{{ tag }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="grid gap-5 md:grid-cols-3">
        <GlassCard v-for="n in 3" :key="n" padding="sm">
          <div class="h-40 w-full animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
          <div class="mt-4 h-4 w-2/3 animate-pulse rounded bg-black/10 dark:bg-white/10" />
          <div class="mt-3 h-3 w-full animate-pulse rounded bg-black/10 dark:bg-white/10" />
        </GlassCard>
      </div>

      <p v-else-if="!filteredPosts.length" class="text-muted py-20 text-center">{{ t('blog.empty') }}</p>

      <div v-else class="grid gap-5 md:grid-cols-3">
        <RouterLink
          v-for="(p, i) in filteredPosts"
          :key="p.id"
          :to="`/blog/${p.slug}`"
          v-reveal="i * 70"
          class="focus-ring group rounded-[var(--radius-glass)]"
        >
          <GlassCard interactive padding="sm" class="h-full">
            <div class="relative mb-4 h-44 w-full overflow-hidden rounded-2xl border border-[var(--glass-border)]">
              <img
                v-if="isUrl(p.cover)"
                :src="p.cover"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="h-full w-full" :style="{ background: p.cover }" />
            </div>
            <div class="flex flex-wrap items-center gap-2 text-[var(--text-footnote)] text-muted">
              <span>{{ p.publishedAt }}</span>
              <span>·</span>
              <span>{{ p.readingMinutes }} {{ t('common.minRead') }}</span>
            </div>
            <h3 class="mt-2 text-[var(--text-title3)] font-bold leading-snug">{{ L(p.title) }}</h3>
            <p class="text-muted mt-2 line-clamp-3 text-[var(--text-subhead)] leading-relaxed">
              {{ L(p.excerpt) }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in p.tags"
                :key="tag"
                class="rounded-full bg-aura-500/12 px-3 py-1 text-[var(--text-caption)] font-medium text-aura-600 dark:text-aura-300"
              >
                #{{ tag }}
              </span>
            </div>
          </GlassCard>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
