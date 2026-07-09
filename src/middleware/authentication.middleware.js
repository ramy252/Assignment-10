import { TokenTypeEnum } from "../Utils/enum/user.enum.js";
import { SignatureEnum, RoleEnum } from "../Utils/enum/user.enum.js";
import { findById } from "../DB/database.repository.js";
import { UserModel } from "../DB/model/user.model.js";
import {
  BadRequestException,
  ForbiddenException,
} from "../Utils/respons/error.response.js";
import { verifyToken, getSignature } from "../Utils/tokens/tokens.js";

// helper function to decode token
export const decodeToken = async ({
  authorization,
  TokenType = TokenTypeEnum.ACCESS,
}) => {
  if (!authorization) {
    throw new Error("Authorization header is missing");
  }
  let [Bearer, token] = authorization.split(" ");
  if (!token) {
    throw new Error("Invalid token format");
  }

  // Validate prefix
  if (Bearer !== "ADMIN" && Bearer !== "USER") {
    throw new Error("Invalid token prefix. Must be 'ADMIN' or 'USER'");
  }

  // Try both signatures to decode the token
  let decode;
  let signature;
  let signatureLevel;

  try {
    signature = getSignature({ signaturelevel: SignatureEnum.USER });
    decode = verifyToken({
      token,
      secretKey:
        TokenType === TokenTypeEnum.ACCESS
          ? signature.accessSignature
          : signature.refreshSignature,
    });
    signatureLevel = SignatureEnum.USER;
  } catch (userError) {
    try {
      signature = getSignature({ signaturelevel: SignatureEnum.ADMIN });
      decode = verifyToken({
        token,
        secretKey:
          TokenType === TokenTypeEnum.ACCESS
            ? signature.accessSignature
            : signature.refreshSignature,
      });
      signatureLevel = SignatureEnum.ADMIN;
    } catch (adminError) {
      throw new Error("Invalid token");
    }
  }

  let user = await findById({ model: UserModel, id: decode.id });
  if (!user) {
    throw new BadRequestException("User not found");
  }

  if (Bearer === "ADMIN" && user.role !== RoleEnum.ADMIN) {
    throw new Error("User is not an admin");
  }
  if (Bearer === "USER" && user.role === RoleEnum.ADMIN) {
    throw new Error("Admin users must use ADMIN prefix");
  }

  return { user, decode };
};

export const authentication = ({ TokenType = TokenTypeEnum.ACCESS }) => {
  return async (req, res, next) => {
    let { user, decode } = await decodeToken({
      authorization: req.headers.authorization,
      TokenType,
    });

    req.user = user;
    req.decode = decode;

    next();
  };
};
export const authorization = ({ RoleEnum = [] }) => {
  return async (req, res, next) => {
    if (!RoleEnum.includes(req.user.role)) {
      throw ForbiddenException({
        message: "User is not authorized",
      });
    }
    next();
  };
};
