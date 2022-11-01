import express from "express";
import cors from "cors";
import morgan from 'morgan'

import { viewsRouter, userRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));



// html, css, js 라우팅
app.use(viewsRouter);

app.use("/api", userRouter);

app.use(errorHandler);

export { app };
