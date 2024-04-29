<template>
  <Button @click="openModal()">Modifier</Button>

  <div v-if="visible">
    <div class="fixed inset-0 z-50 bg-black/50" @click="closeModal()"></div>
    <div
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-gray-800 dark:bg-gray-950">
      <h1 class="text-lg font-semibold leading-none tracking-tight">
        Modifier un reçu
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Remplissez les détails que vous souhaitez modifier.
      </p>

      <form @submit.prevent="submit">
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label class="text-right" for="title">
              Intitulé
            </label>
            <input v-model="formData.title"
              class="col-span-3 flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              id="title" type="text" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <label class="text-right" for="date">
              Date
            </label>
            <input v-model="formData.date"
              class="col-span-3 flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              id="date" type="date" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <label class="text-right" for="amount">
              Montant
            </label>
            <input v-model.number="formData.amount"
              class="col-span-3 flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              id="amount" type="number" />
          </div>
        </div>

        <p v-if="formDataError.title" class="text-sm tracking-tight py-0">L'intitulé doit être au moins de 3 à 25
          charactères.</p>
        <p v-if="formDataError.date" class="text-sm tracking-tight py-0">La date doit être une date valide.</p>
        <p v-if="formDataError.amount" class="text-sm tracking-tight py-0">Le montant doit être un nombre.</p>
        <p v-if="formDataError.existAlreadyOnDate" class="text-sm tracking-tight py-0">Un reçu existe déjà pour cette
          date.</p>

        <div class="flex items-center justify-end gap-2">
          <Button variant="outline" type="button" @click="cancel()">Annuler</Button>
          <Button variant="submit" type="submit">Enregistrer</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "./ui/button.vue";
import { reactive, ref } from 'vue';
import { useStore } from "../data/store";
import { ReceiptSchema } from "../utils/form-validator";

const props = defineProps({
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

const { editReceipt, receiptExistsOnDate } = useStore();
const visible = ref(false);

const closeModal = () => visible.value = false;
const openModal = () => visible.value = true;

const formData = reactive<{
  date: string | null;
  title: string;
  amount: number | null;
}>({
  date: new Date(props.date).toISOString().split('T')[0],
  title: props.title,
  amount: props.amount,
});

const formDataError = reactive<{
  date: boolean;
  title: boolean;
  amount: boolean;
  existAlreadyOnDate: boolean;
}>({
  date: false,
  title: false,
  amount: false,
  existAlreadyOnDate: false,
});

const cancel = (): void => {
  closeModal();
  reset();
};

const submit = (): void => {
  const result = ReceiptSchema.safeParse(formData);

  if (!result.success) {
    const format = result.error.format();
    formDataError.date = !!format.date;
    formDataError.title = !!format.title;
    formDataError.amount = !!format.amount;
    return;
  }

  if (receiptExistsOnDate(new Date(result.data.date))) {
    formDataError.existAlreadyOnDate = true;
    return;
  }
  formDataError.existAlreadyOnDate = false;

  editReceipt({
    amount: result.data.amount,
    date: new Date(result.data.date),
    title: result.data.title,
    id: props.receiptId,
  });

  closeModal();
  reset();
};

const reset = (): void => {
  formData.date = null;
  formData.title = '';
  formData.amount = null;
  formDataError.date = false;
  formDataError.title = false;
  formDataError.amount = false;
  formDataError.existAlreadyOnDate = false;
};


</script>
