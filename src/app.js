import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";
import authRouter from "./routes/authRouter";
import uploadRouter from "./routes/uploadRouter";
import searchRouter from "./routes/searchRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";
import commentRouter from "./routes/commentRouter";
import blogRouter from "./routes/blogRouter";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const routers = [
    productRouter,
    categoryRouter,
    authRouter,
    uploadRouter,
    searchRouter,
    cartRouter,
    orderRouter,
    commentRouter,
    blogRouter,
];
routers.forEach((router) => app.use(router));

connectDB(process.env.URL_MONGO);

export const viteNodeApp = app;
