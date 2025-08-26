import { z } from "zod";

export const BorrowValidationSchema = z.object({
  book: z.string().min(1, "Book ID is required"), 
  quantity: z.number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"), 
  dueDate: z.coerce.date({
    required_error: "Due date is required",
    invalid_type_error: "Invalid date format",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

