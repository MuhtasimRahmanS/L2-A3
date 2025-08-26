import { Schema, model } from "mongoose";

const borrowSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: (value: number) => value > 0,
        message: "Quantity must be a positive number",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: (value: Date) => value > new Date(),
        message: "Due date must be in the future",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model("Borrow", borrowSchema);
