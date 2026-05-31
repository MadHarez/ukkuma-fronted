<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GlassButton from '@/components/ui/GlassButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { projectService } from '@/api/services'
import { useLocalized } from '@/composables/useLocalized'
import type { Project } from '@/types'

const { t } = useI18n()
const L = useLocalized()
const route = useRoute()

const project = ref<Project | undefined>()
const loading = ref(true)

async function load(slug: string) {
  loading.value = true
  project.value = await projectService.getBySlug(slug)
  loading.value = false
}

onMounted(() => load(route.params.slug as string))
watch(() => route.params.slug, (s) => s && load(s as string))

const paragraphs = computed(() =>
  project.value ? L(project.value.description).split('\n\n') : [],
)
</script>

<template>
  <article class="px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
    <div class="mx-auto max-w-4xl">
      <GlassButton to="/projects" variant="ghost" size="sm">
        <AppIcon name="arrowLeft" :size="18" />
        {{ t('common.backToList') }}
      </GlassButton>

      <div v-if="loading" class="mt-8 h-64 w-full animate-pulse rounded-3xl bg-black/10 dark:bg-white/10" />

      <template v-else-if="project">
        <div class="mt-6 h-72 w-full rounded-[var(--radius-glass-lg)]" :style="{ background: project.cover }" />
        <h1 class="mt-8 font-display text-[var(--text-largetitle)] font-bold leading-tight sm:text-5xl">
          {{ L(project.title) }}
        </h1>

        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <GlassCard padding="sm">
            <p class="text-[var(--text-footnote)] text-muted">{{ t('projects.role') }}</p>
            <p class="mt-1 font-semibold">{{ L(project.role) }}</p>
          </GlassCard>
          <GlassCard padding="sm">
            <p class="text-[var(--text-footnote)] text-muted">{{ t('projects.year') }}</p>
            <p class="mt-1 font-semibold">{{ project.year }}</p>
          </GlassCard>
          <GlassCard v-if="project.url" padding="sm">
            <p class="text-[var(--text-footnote)] text-muted">{{ t('common.contactUs') }}</p>
            <a
              :href="project.url"
              target="_blank"
              rel="noopener"
              class="mt-1 inline-flex items-center gap-1 font-semibold text-aura-600 dark:text-aura-300"
            >
              {{ t('projects.visit') }}
              <AppIcon name="arrowRight" :size="16" />
            </a>
          </GlassCard>
        </div>

        <div class="mt-8 space-y-5">
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="text-[var(--text-body)] leading-relaxed text-muted"
          >
            {{ para }}
          </p>
        </div>
      </template>

      <div v-else class="mt-16 text-center">
        <p class="text-muted">{{ t('projects.empty') }}</p>
        <RouterLink to="/projects" class="mt-4 inline-block text-aura-600 dark:text-aura-300">
          {{ t('common.backToList') }}
        </RouterLink>
      </div>
    </div>
  </article>
</template>
