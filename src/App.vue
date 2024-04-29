<script setup lang="ts">
import { ref, computed } from 'vue'
import Dashboard from './views/dashboard.vue'
import Receipts from './views/receipts.vue'
import NotFound from './views/not-found.vue'
import Layout from './components/layout.vue';

const routes = {
  '/': Dashboard,
  '/receipts': Receipts,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  const route = currentPath.value.slice(1) || '/';
  return routes[route as keyof typeof routes] || NotFound
})
</script>

<template>
  <Layout>
    <component :is="currentView" />
  </Layout>
</template>