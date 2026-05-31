<script setup lang="ts">
import { useLocalized } from '@/composables/useLocalized'
import type { ContentBlock } from '@/types'

defineProps<{ blocks: ContentBlock[] }>()

const L = useLocalized()
</script>

<template>
  <div class="space-y-6">
    <template v-for="(block, i) in blocks" :key="i">
      <!-- Heading -->
      <h2
        v-if="block.type === 'heading'"
        class="font-display text-[var(--text-title1)] font-bold leading-snug"
      >
        {{ L(block.text) }}
      </h2>

      <!-- Paragraph -->
      <p
        v-else-if="block.type === 'paragraph'"
        class="text-[var(--text-body)] leading-relaxed text-muted"
      >
        {{ L(block.text) }}
      </p>

      <!-- Image -->
      <figure v-else-if="block.type === 'image'" class="my-2">
        <div class="overflow-hidden rounded-[var(--radius-glass-lg)] border border-[var(--glass-border)]">
          <img
            :src="block.src"
            :alt="block.alt ? L(block.alt) : ''"
            loading="lazy"
            class="aspect-[16/10] w-full object-cover"
          />
        </div>
        <figcaption
          v-if="block.caption"
          class="text-muted mt-2.5 text-center text-[var(--text-footnote)] italic"
        >
          {{ L(block.caption) }}
        </figcaption>
      </figure>

      <!-- Quote -->
      <figure
        v-else-if="block.type === 'quote'"
        class="rounded-[var(--radius-glass)] border-l-4 border-aura-500 bg-aura-500/8 py-4 pl-5 pr-4"
      >
        <blockquote class="text-[var(--text-title3)] font-medium leading-relaxed">
          {{ L(block.text) }}
        </blockquote>
        <figcaption v-if="block.cite" class="text-muted mt-2 text-[var(--text-subhead)]">
          — {{ L(block.cite) }}
        </figcaption>
      </figure>

      <!-- List -->
      <component
        :is="block.ordered ? 'ol' : 'ul'"
        v-else-if="block.type === 'list'"
        class="space-y-2 pl-1"
      >
        <li
          v-for="(item, j) in block.items"
          :key="j"
          class="flex items-start gap-3 text-[var(--text-body)] leading-relaxed text-muted"
        >
          <span
            class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-aura-500 to-teal-500"
          />
          {{ L(item) }}
        </li>
      </component>

      <!-- Divider -->
      <hr
        v-else-if="block.type === 'divider'"
        class="mx-auto w-24 border-0 border-t border-[var(--glass-border)]"
      />
    </template>
  </div>
</template>
