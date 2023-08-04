import express from "express";
import cors from "cors";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";
import authRouter from "./routes/authRouter";
import uploadRouter from "./routes/uploadRouter";
import searchRouter from "./routes/searchRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";
import commentRouter from "./routes/commentRouter";
import connectDB from "./config/database";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(productRouter);
app.use(categoryRouter);
app.use(authRouter);
app.use(uploadRouter);
app.use(searchRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(commentRouter);
connectDB(process.env.URL_MONGO);

export const viteNodeApp = app;
