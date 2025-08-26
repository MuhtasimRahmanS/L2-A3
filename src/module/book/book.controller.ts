import { Request, Response } from "express";
import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
} from "./book.service";
import { BookValidationSchema } from "./book.validation";

// Helper to extract error message safely
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const parsedData = BookValidationSchema.parse(req.body);
    const book = await createBookService(parsedData);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: "Error creating book",
      error: getErrorMessage(error),
    });
  }
};

// Get all books with filter, sorting, and limit
export const getAllBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const books = await getAllBooksService(
      filter as string,
      (sortBy as string) || "createdAt",
      (sort as "asc" | "desc") || "desc",
      limit ? parseInt(limit as string, 10) : 10
    );

    return res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: "Error retrieving books",
      error: getErrorMessage(error),
    });
  }
};

// Get a specific book by ID
export const getBookById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await getBookByIdService(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: "Error retrieving book",
      error: getErrorMessage(error),
    });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedBook = await updateBookService(req.params.bookId, req.body);

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: "Error updating book",
      error: getErrorMessage(error),
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedBook = await deleteBookService(req.params.bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: "Error deleting book",
      error: getErrorMessage(error),
    });
  }
};
