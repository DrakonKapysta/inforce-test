import { z } from "zod";

export const CommentFormSchema = z.object({
  description: z.string(),
  productId: z.number(),
  date: z.date(),
});

export type CommentFormSchemaValues = z.infer<typeof CommentFormSchema>;
