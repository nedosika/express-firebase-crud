import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import session from "express-session";
import {createProxyMiddleware} from "http-proxy-middleware"

import config from "./config.js";

import ip from "./routes/ip.js";
import films from "./routes/films.js";
import auth from "./routes/auth.js";
import validator from "./routes/validator.js";
import root from "./routes/root.js";
import user from "./routes/users.js";
import favorites from "./routes/favorites.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'https://express-firebase-crud-bca52.web.app'
}));

app.use("/api", films.router);
app.use("/api", auth.router);
app.use("/api", ip.router);
app.use("/api", validator.router);
app.use("/api", user.router);
app.use("/api", favorites.router);
app.use("/", root.router);

const port = config.port || 6000;

app.listen(port, () => console.log("server started: " + port));
