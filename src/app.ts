import express, { Request, Response } from "express";
import bookRouter from "./module/book/book.router";
import borrowRouter from "./module/borrow/borrow.router";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://l2-a4.vercel.app"],
  })
);
app.use(express.json())
app.use('/api/books',bookRouter)
app.use('/api/borrow',borrowRouter)

app.get("/", (req:Request, res:Response)=>{
    res.send({
        status: true,
        message:"server live"})
})

export default app;
