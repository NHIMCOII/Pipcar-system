import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";

import cookieSession from "cookie-session";

//config
dotenv.config();

//routes
import { UserRouter } from "./routes/user";
import { AuthRouter } from "./routes/auth";
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';
// import { signupRouter } from './routes/signup';

//middlewares
import { errorHandler } from "@pippip/pip-system-common";
import { NotFoundError } from "@pippip/pip-system-common";

const app = express();

//logs
app.use(logger("dev", {}));

app.set("trust proxy", true); //trust HTTPS connection
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
//api
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

//middleware Usage
app.use(errorHandler);

export { app };
