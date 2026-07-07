import { findOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/model/user.model.js";
import { successResponse } from "../../Utils/respons/success.response.js";
import {
  ConflictException,
  BadRequestException,
} from "../../Utils/respons/error.response.js";
import {
  compareHash,
  generateHash,
} from "../../Utils/security/hash.security.js";
import { encrypt, decrypt } from "../../Utils/security/encryption.security.js";
import { HASHING_ALGORITHM } from "../../Utils/enum/security.enum.js";
import { getNewLogicCredentials } from "../../Utils/tokens/tokens.js";
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;

    if (await findOne({ model: UserModel, filter: { email } })) {
      throw ConflictException({ message: "User already exists" });
    }

    const user = await UserModel.create({
      firstName,
      lastName,
      ...(userName && !firstName && !lastName ? { userName } : {}),
      email,
      password: await generateHash({
        plainText: password,
        algorithm: HASHING_ALGORITHM.BCRYPT,
      }),
      phone: phone ? encrypt(phone) : undefined,
    });
    return successResponse({
      res,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return BadRequestException({
      message: error.message || "Failed to create user",
      extra: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findOne({
      model: UserModel,
      filter: { email },
      select: "userName email password firstName lastName phone",
    });
    console.log(user);
    
    
    if (!user) {
      throw BadRequestException({ message: "Invalid email or password" });
    }
    const isMatch = await compareHash({
      plainText: password,
      hashedText: user.password,
      algorithm: HASHING_ALGORITHM.BCRYPT,
    });
    if (!isMatch) {
      throw BadRequestException({ message: "Invalid email or password" });
    }
    const { accessToken, refreshToken } = await getNewLogicCredentials({
      user: user,
    });



    return successResponse({
      res,
      message: "User logged in successfully",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return BadRequestException({
      message: "Invalid email or password3333",
      extra: error,
    });
  }
};

