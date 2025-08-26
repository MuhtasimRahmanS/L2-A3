import { Request, Response } from "express";
import mongoose from "mongoose";
import { createBorrowService, getBorrowSummaryService } from "./borrow.service";
import { BorrowValidationSchema } from "./borrow.validation";

// Borrow a book
export const createBorrow = async (req: Request, res: Response) => {
  try {
    const parsedData = BorrowValidationSchema.parse(req.body);

    // Convert book string to ObjectId
    const borrowData = {
      ...parsedData,
      book: new mongoose.Types.ObjectId(parsedData.book),
    };

    const borrow = await createBorrowService(borrowData);

    res.status(201).json({
      message: "Book borrowed successfully",
      success: true,
      data: borrow,
    });
  } catch (error: unknown) {
    let errorMessage = "Error borrowing book";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      message: errorMessage,
      success: false,
      error,
    });
  }
};

// Get borrowed books summary
export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await getBorrowSummaryService();
    res.json({
      message: "Borrowed books summary retrieved successfully",
      success: true,
      data: summary,
    });
  } catch (error: unknown) {
    let errorMessage = "Error retrieving borrow summary";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      message: errorMessage,
      success: false,
      error,
    });
  }
};


