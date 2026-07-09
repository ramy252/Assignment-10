import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentication } from "../../middleware/authentication.middleware.js";
import { TokenTypeEnum } from "../../Utils/enum/user.enum.js";

const router = Router();

router.post("/signUp", authService.signUp);
router.post("/login", authService.login);
router.post("/refresh", authentication({ TokenType: TokenTypeEnum.REFRESH }), authService.refresh);
router.post("/social-login", authService.socialLogin);


export default router;