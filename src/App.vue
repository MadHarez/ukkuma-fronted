<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="aurora-bg" />
  <AppHeader />
  <main class="min-h-screen">
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-500 ease-[var(--ease-glass)]"
        enter-from-class="opacity-0 translate-y-4"
        leave-active-class="transition-all duration-300 ease-[var(--ease-glass)]"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <!-- Single-root wrapper so <Transition> can manage views that have
             multiple root <section> elements (otherwise enter classes such as
             opacity-0 are mis-applied and never cleared, blanking the page). -->
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>
