import { successResponse } from "../../Utils/respons/success.response.js";
import { BadRequestException } from "../../Utils/respons/error.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
export const getProfile = async (req, res) => {
  try {
    const user = req.user;
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
