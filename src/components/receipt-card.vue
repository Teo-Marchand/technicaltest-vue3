<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        <span class="font-semibold">Date:</span>
        {{ date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between">
        <span>Total:</span>
        <span class="font-semibold">{{ amount.toLocaleString(undefined, { style: "currency", currency: "EUR" }) }}</span>
      </div>
    </CardContent>
    <CardFooter class="flex justify-between">
      <ModifyReceipt :title="title" :date="date" :amount="amount" :receiptId="receiptId" />
      <DeleteReceipt :receiptId="receiptId" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Card from '../components/ui/card/card.vue';
import CardHeader from '../components/ui/card/card-header.vue';
import CardTitle from '../components/ui/card/card-title.vue';
import CardDescription from '../components/ui/card/card-description.vue';
import CardContent from '../components/ui/card/card-content.vue';
import CardFooter from '../components/ui/card/card-footer.vue';

import DeleteReceipt from '../components/delete-receipt.vue';
import ModifyReceipt from '../components/modify-receipt.vue';

const { title, date, amount, receiptId } = defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  receiptId: {
    type: Number,
    required: true
  }
});
</script>
