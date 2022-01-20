import express from "express";
import config from "./config.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(config.port || 5000, () => console.log("server started: " + config.port))