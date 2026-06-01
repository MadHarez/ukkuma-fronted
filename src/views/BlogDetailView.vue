<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GlassButton from '@/components/ui/GlassButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BlogContent from '@/components/ui/BlogContent.vue'
import { blogService } from '@/api/services'
import { useLocalized } from '@/composables/useLocalized'
import type { BlogPost } from '@/types'

const { t } = useI18n()
const L = useLocalized()
const route = useRoute()

const post = ref<BlogPost | undefined>()
const allPosts = ref<BlogPost[]>([])
const loading = ref(true)

async function load(slug: string) {
  loading.value = true
  post.value = await blogService.getBySlug(slug)
  allPosts.value = await blogService.list()
  loading.value = false
}

onMounted(() => load(route.params.slug as string))
watch(() => route.params.slug, (s) => s && load(s as string))

const paragraphs = computed(() => (post.value ? L(post.value.content).split('\n\n') : []))

const isUrl = (str: string) => {
  return str.startsWith('http') || str.startsWith('/') || str.startsWith('./')
}

const relatedPosts = computed(() => {
  if (!post.value) return []
  const currentPost = post.value
  const others = allPosts.value.filter((p) => p.id !== currentPost.id)
  
  const scored = others.map((p) => {
    const sharedTags = p.tags.filter((tag) => currentPost.tags.includes(tag))
    return { post: p, score: sharedTags.length }
  })
  
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.post.publishedAt.localeCompare(a.post.publishedAt)
  })
  
  return scored.slice(0, 2).map((item) => item.post)
})
</script>

<template>
  <article class="px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
    <div class="mx-auto max-w-3xl">
      <GlassButton to="/blog" variant="ghost" size="sm">
        <AppIcon name="arrowLeft" :size="18" />
        {{ t('common.backToList') }}
      </GlassButton>

      <div v-if="loading" class="mt-8">
        <div class="h-8 w-3/4 animate-pulse rounded bg-black/10 dark:bg-white/10" />
        <div class="mt-6 h-56 w-full animate-pulse rounded-3xl bg-black/10 dark:bg-white/10" />
      </div>

      <template v-else-if="post">
        <div class="mt-6 flex flex-wrap items-center gap-2 text-[var(--text-footnote)] text-muted">
          <span>{{ t('blog.by') }} {{ post.author }}</span>
          <span>·</span>
          <span>{{ post.publishedAt }}</span>
          <span>·</span>
          <span>{{ post.readingMinutes }} {{ t('common.minRead') }}</span>
        </div>
        <h1 class="mt-3 font-display text-[var(--text-largetitle)] font-bold leading-tight sm:text-5xl">
          {{ L(post.title) }}
        </h1>
        
        <div class="mt-8 h-64 w-full overflow-hidden rounded-[var(--radius-glass-lg)] border border-[var(--glass-border)]">
          <img v-if="isUrl(post.cover)" :src="post.cover" class="h-full w-full object-cover" />
          <div v-else class="h-full w-full" :style="{ background: post.cover }" />
        </div>

        <BlogContent v-if="post.blocks?.length" :blocks="post.blocks" class="mt-8" />
        <div v-else class="mt-8 space-y-5">
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="text-[var(--text-body)] leading-relaxed text-muted"
          >
            {{ para }}
          </p>
        </div>
        
        <div class="mt-10 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full bg-aura-500/12 px-3 py-1 text-[var(--text-caption)] font-medium text-aura-600 dark:text-aura-300"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Related Articles Section -->
        <template v-if="relatedPosts.length">
          <div class="my-12 border-t border-[var(--glass-border)]" />
          <div>
            <h3 class="font-display text-[var(--text-title1)] font-bold mb-6">
              {{ t('blog.related') }}
            </h3>
            <div class="grid gap-5 sm:grid-cols-2">
              <RouterLink
                v-for="p in relatedPosts"
                :key="p.id"
                :to="`/blog/${p.slug}`"
                class="focus-ring group rounded-[var(--radius-glass)]"
              >
                <GlassCard interactive padding="sm" class="h-full">
                  <div class="relative mb-4 h-36 w-full overflow-hidden rounded-2xl border border-[var(--glass-border)]">
                    <img
                      v-if="isUrl(p.cover)"
                      :src="p.cover"
                      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div v-else class="h-full w-full" :style="{ background: p.cover }" />
                  </div>
                  <div class="text-[var(--text-footnote)] text-muted mb-1">
                    {{ p.publishedAt }}
                  </div>
                  <h4 class="text-[var(--text-title3)] font-bold leading-snug line-clamp-2">
                    {{ L(p.title) }}
                  </h4>
                </GlassCard>
              </RouterLink>
            </div>
          </div>
        </template>
      </template>

      <div v-else class="mt-16 text-center">
        <p class="text-muted">{{ t('blog.empty') }}</p>
        <RouterLink to="/blog" class="mt-4 inline-block text-aura-600 dark:text-aura-300">
          {{ t('common.backToList') }}
        </RouterLink>
      </div>
    </div>
  </article>
</template>
