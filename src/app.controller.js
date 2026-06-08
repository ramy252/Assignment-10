import { AuthRouter, userRouter, messageRouter } from "./Module/index.js";
import { BadRequestException, globalException } from "./Utils/response/error.response.js";
import { connectToDatabase } from "./DB/connection.js";

const bootStrap = (app, express) => {
  app.use(express.json());
  connectToDatabase();
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/message", messageRouter);
  app.all("/*dummy", (req, res) => {
    BadRequestException("Not Found Handler !!", null);
  });
  app.use(globalException);
};

export default bootStrap;
  