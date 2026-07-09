import { create, createOne, findOne } from "../../DB/database.repository.js";
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
import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/process.js";
import { ProviderEnum } from "../../Utils/enum/user.enum.js";

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

export const refresh = async (req, res) => {
  const { accessToken } = await getNewLogicCredentials({
    user: req.user,
  });
  return successResponse({
    res,
    message: "Token refreshed successfully",
    data: accessToken,
  });
};

export const verifyGoogleToken = async (idToken) => {
  if (!idToken) {
    throw new Error("idToken is required");
  }

  const client = new OAuth2Client(CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token payload");
  }

  return payload;
};

export const socialLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const { email, name, given_name, family_name, picture } =
      await verifyGoogleToken(idToken);

    const user = await findOne({
      model: UserModel,
      filter: { email },
    });

    // Case 1: no user yet -> create one
    if (!user) {
      const newUserData = {
        provider: ProviderEnum.GOOGLE,
        email,
        firstName: given_name,
        lastName: family_name,
        profileImage: picture,
      };
// !!!!!!!!!!!!must createOne accept Array Data 
      const newUser = await createOne({
        model: UserModel,
        data: newUserData,
      });

      const { accessToken, refreshToken } = await getNewLogicCredentials({
        user: newUser,
      });

      return successResponse({
        res,
        message: "User created successfully",
        data: { accessToken, refreshToken },
      });
    }

    // Case 2: user exists and signed up via Google
    if (user.provider === ProviderEnum.GOOGLE) {
      const { accessToken, refreshToken } = await getNewLogicCredentials({
        user,
      });

      return successResponse({
        res,
        message: "User logged in successfully",
        data: { accessToken, refreshToken },
      });
    }

    // Case 3: user exists but signed up with a different provider
    return BadRequestException({
      message: `This email is already registered using ${user.provider}. Please log in with that method instead.`,
    });
  } catch (error) {
    console.error("socialLogin error:", error); // log full error server-side for debugging
    return BadRequestException({
      message: error.message || "Social login failed",
      extra: error,
    });
  }
};
