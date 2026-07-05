import { TokenTypeEnum } from "../Utils/enum/user.enum.js";
import { getSignature, verifyToken } from "../Utils/tokens/tokens.js";

import { SignatureEnum } from "../Utils/enum/user.enum.js";
import { findById } from "../DB/database.repository.js";
import { UserModel } from "../DB/model/user.model.js";
import { BadRequestException } from "../Utils/respons/error.response.js";
import jwt from "jsonwebtoken";

// helper function to decode token
export const decodeToken = async ({
  authorization,
  TokenType = TokenTypeEnum.ACCESS,
}) => {
  const [Bearer, token] = authorization.split(" ");
  const signature = getSignature({
    signatureLever:
      Bearer === "ADMIN"
        ? SignatureEnum.ADMIN
        : Bearer === "USER"
          ? SignatureEnum.USER
          : new Error("Invalid token"),
  });
  const decode = verifyToken({
    token,
    secretKey:
      TokenType === TokenTypeEnum.ACCESS
        ? signature.accessSignature
        : signature.refreshSignature,
  });
  const user = await findById({
    model: UserModel,
    id: decode.id,
  });
  if (!user) {
    throw BadRequestException({ message: "User not found" });
  }
  return { user, decode };
};

// middleware for authentication 
export const authentication = (tokenType = TokenTypeEnum.ACCESS) => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      throw BadRequestException({ message: "Token is required" });
    }
    try {
      const { user, decode } = await decodeToken({
        authorization: req.headers.authorization,
        TokenType: tokenType,
      });
      req.user = user;
      req.decode = decode;
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
