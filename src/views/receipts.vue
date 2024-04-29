<template>
  <div class="max-w-4xl mx-auto">
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Liste des reçus</h1>
      <CreateReceipt />
    </header>
    <section>
      <h2 class="text-lg font-semibold mb-4">Mes reçus</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardReceipt v-for="receipt in recentsReceipt" :key="receipt.id" :title="receipt.title" :date="receipt.date"
          :amount="receipt.amount" :receiptId="receipt.id" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CardReceipt from '../components/receipt-card.vue';
import CreateReceipt from '../components/create-receipt.vue';

import { useStore } from '../data/store';
import { computed } from 'vue';
const { receipts } = useStore();

const recentsReceipt = computed(() => {
  return receipts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});
</script>
