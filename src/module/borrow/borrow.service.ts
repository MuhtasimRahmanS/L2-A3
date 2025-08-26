import  { Book } from "../book/book.model";
import { IBorrow } from "./borrow.interface";
import { Borrow } from "./borrow.model";

// Borrow a book
export const createBorrowService = async (borrowData: IBorrow) => {
  const { book: bookId, quantity, dueDate } = borrowData;

  // Find the book
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  // Check available copies
  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  // Deduct copies
  book.copies -= quantity;
  // Update availability
  book.available = book.copies > 0;
  await book.save();

  // Save borrow record
  const borrow = new Borrow({ book: bookId, quantity, dueDate });
  await borrow.save();

  return borrow;
};

// Get borrowed books summary
export const getBorrowSummaryService = async () => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    { $unwind: "$bookDetails" },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  return summary;
};

