// import express from "express";
// import { bootStrap } from "./src/app.controller.js";
// import { userRouter, noteRouter } from "./src/module/index.js";
// import { PORT } from "./src/config/process.js";

// const app = express();
// bootStrap(app, PORT);

// app.use("/users", userRouter);
// app.use("/notes", noteRouter);

// app.get("/", (req, res) => res.send("Hello World!"));

import express from "express";
import { PORT } from "./config/config.service.js";
import bootStrap from "./src/app.controller.js";
const app = express();
const port = PORT;

app.get("/", (req, res) => res.send("Hello World!"));

bootStrap(app, express);
app.listen(port, () => console.log(`Server running on port ${port}`));
