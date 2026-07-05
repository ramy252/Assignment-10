import { successResponse } from "../../Utils/respons/success.response.js";
import { BadRequestException } from "../../Utils/respons/error.response.js";
import { findById } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/model/user.model.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
import { getNewLogicCredentials } from "../../Utils/tokens/tokens.js";
export const getProfile = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw BadRequestException({ message: "Token is required" });
    }
    
    const user = await findById({ model: UserModel, id: payload.id });
    if (!user) {
      throw BadRequestException({ message: "User not found" });
    }
    const userData = user.toObject();
    delete userData.password;
    userData.phone = decrypt(userData.phone);
    return successResponse({
      res,
      message: "User profile retrieved successfully",
      data: userData,
    });
  } catch (error) {
    return BadRequestException({ message: error.message });
  }
};
