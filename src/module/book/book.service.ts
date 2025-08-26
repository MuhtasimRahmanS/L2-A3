import { IBook } from "./book.interface";
import { Book } from "./book.model";

// Create a new book
export const createBookService = async (bookData: IBook) => {
  const book = new Book(bookData);
  return await book.save();
};

// Get all books with optional filter, sort, and limit
export const getAllBooksService = async (
  filter?: string,
  sortBy: string = "createdAt",
  sort: "asc" | "desc" = "desc",
  limit: number = 10
) => {
  const query = filter ? { genre: filter } : {};

  return await Book.find(query)
    .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
    .limit(limit);
};

// Get a specific book by ID
export const getBookByIdService = async (bookId: string) => {
  return await Book.findById(bookId);
};

// Update a book
export const updateBookService = async (
  bookId: string,
  updateData: Partial<IBook>
) => {
  return await Book.findByIdAndUpdate(bookId, updateData, {
    new: true,
    runValidators: true,
  });
};

// Delete a book
export const deleteBookService = async (bookId: string) => {
  return await Book.findByIdAndDelete(bookId);
};