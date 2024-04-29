import { z } from "zod";

export const ReceiptSchema = z.object({
  title: z.string().min(3).max(25),
  date: z.string().date(),
  amount: z.number().min(0.01),
});
