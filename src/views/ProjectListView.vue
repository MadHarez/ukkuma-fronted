<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/ui/PageHero.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { projectService } from '@/api/services'
import { useLocalized } from '@/composables/useLocalized'
import type { Project } from '@/types'

const { t } = useI18n()
const L = useLocalized()

const projects = ref<Project[]>([])
const loading = ref(true)

onMounted(async () => {
  projects.value = await projectService.list()
  loading.value = false
})
</script>

<template>
  <PageHero
    icon="layers"
    :eyebrow="t('nav.projects')"
    :title="t('projects.title')"
    :subtitle="t('projects.subtitle')"
  />

  <section class="px-4 pb-16 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <div v-if="loading" class="grid gap-5 md:grid-cols-2">
        <GlassCard v-for="n in 2" :key="n" padding="sm">
          <div class="h-48 w-full animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
        </GlassCard>
      </div>

      <p v-else-if="!projects.length" class="text-muted py-20 text-center">{{ t('projects.empty') }}</p>

      <div v-else class="grid gap-5 md:grid-cols-2">
        <RouterLink
          v-for="(p, i) in projects"
          :key="p.id"
          :to="`/projects/${p.slug}`"
          v-reveal="i * 80"
          class="focus-ring group rounded-[var(--radius-glass)]"
        >
          <GlassCard interactive padding="sm" class="h-full">
            <div
              class="relative mb-5 flex h-52 w-full items-end overflow-hidden rounded-2xl p-5"
              :style="{ background: p.cover }"
            >
              <span
                v-if="p.framework || p.year"
                class="rounded-full bg-black/25 px-3 py-1 text-[var(--text-caption)] font-semibold text-white backdrop-blur"
              >
                {{ p.framework || p.year }}
              </span>
            </div>
            <h3 class="text-[var(--text-title2)] font-bold">{{ L(p.title) }}</h3>
            <p class="text-muted mt-2 text-[var(--text-subhead)] leading-relaxed">{{ L(p.summary) }}</p>
            <span
              class="mt-4 inline-flex items-center gap-1 text-[var(--text-subhead)] font-medium text-aura-600 transition-transform group-hover:translate-x-1 dark:text-aura-300"
            >
              {{ t('common.readMore') }}
              <AppIcon name="arrowRight" :size="16" />
            </span>
          </GlassCard>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
