<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { blogService } from '@/api/services'
import { useLocalized } from '@/composables/useLocalized'
import type { BlogPost } from '@/types'

const { t } = useI18n()
const L = useLocalized()

const posts = ref<BlogPost[]>([])
const loading = ref(true)

onMounted(async () => {
  posts.value = await blogService.list()
  loading.value = false
})
</script>

<template>
  <PageHero icon="book" :eyebrow="t('nav.blog')" :title="t('blog.title')" :subtitle="t('blog.subtitle')" />

  <section class="px-4 pb-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <div v-if="loading" class="grid gap-5 md:grid-cols-3">
        <GlassCard v-for="n in 3" :key="n" padding="sm">
          <div class="h-40 w-full animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
          <div class="mt-4 h-4 w-2/3 animate-pulse rounded bg-black/10 dark:bg-white/10" />
          <div class="mt-3 h-3 w-full animate-pulse rounded bg-black/10 dark:bg-white/10" />
        </GlassCard>
      </div>

      <p v-else-if="!posts.length" class="text-muted py-20 text-center">{{ t('blog.empty') }}</p>

      <div v-else class="grid gap-5 md:grid-cols-3">
        <RouterLink
          v-for="(p, i) in posts"
          :key="p.id"
          :to="`/blog/${p.slug}`"
          v-reveal="i * 70"
          class="focus-ring group rounded-[var(--radius-glass)]"
        >
          <GlassCard interactive padding="sm" class="h-full">
            <div class="mb-4 h-44 w-full rounded-2xl" :style="{ background: p.cover }" />
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
