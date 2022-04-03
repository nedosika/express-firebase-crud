import express from "express";
import cors from "cors";

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

const whitelist = ["http://localhost:3000", "https://express-firebase-crud-bca52.web.app", "https://express-firebase-crud-bca52.firebaseapp.com"]
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))


app.use("/api", films.router);
app.use("/api", auth.router);
app.use("/api", ip.router);
app.use("/api", validator.router);
app.use("/api", user.router);
app.use("/api", favorites.router);
app.use("/", root.router);

const port = config.port;

app.listen(port || 5000, () => console.log("server started: " + port));

