<template>
  <Button variant="destructive" @click="openModal()">Supprimer</Button>

  <div v-if="visible">
    <div class="fixed inset-0 z-50 bg-black/50" @click="closeModal()"></div>
    <div
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-gray-800 dark:bg-gray-950">
      <h1 class="text-lg font-semibold leading-none tracking-tight">
        Supprimer un reçu
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Êtes-vous sûr de vouloir supprimer ce reçu ?
      </p>

      <div class="flex items-center justify-end gap-2">
        <Button variant="outline" type="button" @click="cancel()">Annuler</Button>
        <Button variant="submit" @click="confirmDelete()">Supprimer</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "./ui/button.vue";
import { ref } from 'vue';
import { useStore } from "../data/store";

const props = defineProps({
  receiptId: {
    type: Number,
    required: true
  }
});

const { deleteReceipt } = useStore();
const visible = ref(false);

const closeModal = () => visible.value = false;
const openModal = () => visible.value = true;
const cancel = () => closeModal();

const confirmDelete = (): void => {
  deleteReceipt(props.receiptId);
  closeModal();
};
</script>
