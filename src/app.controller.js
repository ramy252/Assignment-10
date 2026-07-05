import { connectDB } from "./DB/connection.js";
import { authController, messageController, userController } from "./Modules/index.js";
import { globalError, NotFoundException } from "./Utils/respons/error.response.js";
import { successResponse } from "./Utils/respons/success.response.js";

export const bootStrap = (app,express) => {
   app.use(express.json());
   connectDB()
   app.use("/api/v1/auth", authController);
   app.use("/api/v1/message", messageController);
   app.use("/api/v1/user", userController);

   app.get("/", (req, res) => {
      return successResponse({res, statusCode: 200, message: "Hello World!"});
   });
   
   app.all("/*dummy", (req, res) => {
      return NotFoundException({ message: "Not Found Handler"});
   });
   app.use(globalError);
};