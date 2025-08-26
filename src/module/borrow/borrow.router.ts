import express from "express";
import { createBorrow, getBorrowSummary } from "./borrow.controller";

const borrowRouter = express.Router();

// Borrow a book
borrowRouter.post("/", createBorrow);

// Get borrowed books summary
borrowRouter.get("/", getBorrowSummary);

export default borrowRouter;