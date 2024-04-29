<template>
  <div class="max-w-4xl mx-auto">
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Tableau de bord</h1>
      <CreateReceipt />
    </header>
    <section>
      <h2 class="text-lg font-semibold mb-4">Reçus récents</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardReceipt v-for="receipt in recentsReceipt" :key="receipt.id" :title="receipt.title" :date="receipt.date"
          :amount="receipt.amount" :receiptId="receipt.id" />
      </div>
    </section>
    <section class="mt-8">
      <h2 class="text-lg font-semibold mb-4">Total mensuel</h2>
      <div class="space-y-4">
        <Card v-for="month in resultMonths" :key="month.date.getTime()">
          <CardHeader>
            <CardTitle class="capitalize">{{ month.date.toLocaleDateString(undefined, {
              year: "numeric", month:
                "long"
            }) }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex justify-between">
              <span>Total:</span>
              <span class="font-semibold">{{ month.amount.toLocaleString(undefined, {
                style: "currency", currency:
                  "EUR"
              }) }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    <section class="mt-8">
      <h2 class="text-lg font-semibold mb-4">Total général</h2>
      <Card>
        <CardHeader>
          <CardTitle>Montant total</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex justify-between">
            <span>Total:</span>
            <span class="font-semibold">{{ totalAmountReceipt }}</span>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import CardReceipt from '../components/receipt-card.vue';
import CreateReceipt from '../components/create-receipt.vue';

import Card from '../components/ui/card/card.vue';
import CardHeader from '../components/ui/card/card-header.vue';
import CardTitle from '../components/ui/card/card-title.vue';
import CardContent from '../components/ui/card/card-content.vue';

import { useStore } from '../data/store';
import { computed } from 'vue';
const { receipts } = useStore();

const resultMonths = computed(() => {
  const months = receipts.reduce((acc, receipt) => {
    const date = new Date(receipt.date);
    const month = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    if (!acc[month]) {
      acc[month] = {
        date: new Date(month),
        amount: 0
      };
    }
    acc[month].amount += receipt.amount;
    return acc;
  }, {} as Record<string, { date: Date, amount: number }>);
  return Object.values(months);
});

const recentsReceipt = computed(() => {
  return receipts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
});

const totalAmountReceipt = computed(() => {
  return receipts.reduce((sum, receipt) => sum + receipt.amount, 0).toLocaleString(undefined, { style: "currency", currency: "EUR" });
});

</script>
