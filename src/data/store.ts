import { reactive } from 'vue';
import { formatDate } from '../utils/formatDate';

interface Receipt {
  date: Date;
  title: string;
  amount: number;
  id: number;
}

const store = reactive<{ receipts: Receipt[] }>({
  receipts: []
});

export function useStore() {
  const saveReceipt = (receipt: Receipt): void => {
    store.receipts.push(receipt);
  };

  const editReceipt = (updatedReceipt: Receipt): void => {
    const index = store.receipts.findIndex(r => r.date === updatedReceipt.date);
    if (index !== -1) store.receipts[index] = updatedReceipt;
  };

  const deleteReceipt = (id: number): void => {
    const index = store.receipts.findIndex(r => r.id === id);
    if (index !== -1) store.receipts.splice(index, 1);
  };

  function receiptExistsOnDate(date: Date): boolean {
    let formattedDate = formatDate(date);
    return store.receipts.some(receipt => formatDate(receipt.date) === formattedDate);
  }

  return { receipts: store.receipts, saveReceipt, editReceipt, deleteReceipt, receiptExistsOnDate };
}
