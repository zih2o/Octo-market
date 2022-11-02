import express from "express";
import cors from "cors";
import morgan from 'morgan'

import { viewsRouter, usersRouter, categoriesRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));



// html, css, js 라우팅
app.use(viewsRouter);

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter)

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use(errorHandler);

export { app };
