import express, { Request, Response, NextFunction, RequestHandler } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "./book.controller";

const bookRouter = express.Router();

// Properly typed async wrapper
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

bookRouter.post("/", asyncHandler(createBook));
bookRouter.get("/", asyncHandler(getAllBooks));
bookRouter.get("/:bookId", asyncHandler(getBookById));
bookRouter.put("/:bookId", asyncHandler(updateBook));
bookRouter.delete("/:bookId", asyncHandler(deleteBook));

export default bookRouter;

