<template>
  <div id="app">
    <div class="flex min-h-screen">
      <nav class="flex flex-col w-64 bg-gray-800 text-gray-100 px-4 py-6">
        <a class="flex items-center gap-2 mb-6" href="#/">
          <ReceiptIcon class="h-6 w-6" />
          <span class="font-semibold">Gestionnaire</span>
        </a>
        <div class="flex flex-col gap-1">
          <a class="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700" href="#/">
            <DashboardIcon class="h-4 w-4" />
            Tableau de bord
          </a>
          <a class="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700" href="#/receipts">
            <ReceiptIcon class="h-4 w-4" />
            Reçus
          </a>
        </div>
      </nav>
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReceiptIcon from '../components/icons/receipt.vue';
import DashboardIcon from '../components/icons/dashboard.vue';
import { ref } from 'vue';

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const route = currentPath.value.slice(1)
</script>