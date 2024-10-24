import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long"),
  count: z
    .number({
      required_error: "Count is required",
      invalid_type_error: "Count must be a number",
    })
    .min(1),
  imageUrl: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image URL must be a string",
    })
    .min(3, "Image url must be at least 3 characters long")
    .refine(
      (url) => {
        const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(url);
      },
      {
        message: "Image URL must be a valid URL starting with http or https",
      }
    ),
  size: z.object({
    width: z
      .number({
        required_error: "Width is required",
        invalid_type_error: "Width must be a number",
      })
      .min(200),

    height: z
      .number({
        required_error: "Height is required",
        invalid_type_error: "Height must be a number",
      })
      .min(200),
  }),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .min(1),
});

export type ProductFormSchemaValues = z.infer<typeof ProductFormSchema>;
