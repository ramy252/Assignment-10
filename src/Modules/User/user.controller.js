import { Router } from "express";
import { authentication, authorization } from "../../middleware/authentication.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../Utils/enum/user.enum.js";
import * as userService from "./user.service.js";


const router = Router();

router.get(
  "/profile",
  authentication({ TokenType: TokenTypeEnum.ACCESS }),
  authorization({ RoleEnum: [RoleEnum.ADMIN,] }),
  userService.getProfile,
);

export default router;
