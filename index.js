import express from "express";
import { PORT } from "./src/config/process.js";
import { bootStrap } from "./src/app.controller.js";

const app = express();

bootStrap(app, express);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
}); 