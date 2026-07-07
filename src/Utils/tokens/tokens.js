import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_USER_SECRET,
  ACCESS_TOKEN_USER_EXPIRES_IN,
  REFRESH_TOKEN_USER_SECRET,
  REFRESH_TOKEN_ADMIN_SECRET,
  ACCESS_TOKEN_ADMIN_SECRET,
  REFRESH_TOKEN_USER_EXPIRES_IN,
  ACCESS_TOKEN_ADMIN_EXPIRES_IN,
  REFRESH_TOKEN_ADMIN_EXPIRES_IN,
} from "../../config/process.js";
import { RoleEnum, SignatureEnum } from "../enum/user.enum.js";

export const generateToken = ({ payload, secret, option = {} }) => {
  return jwt.sign(payload, secret, option);
};
export const verifyToken = ({ token, secretKey }) => {
  return jwt.verify(token, secretKey);
};

export const getSignature = ({ signaturelevel = SignatureEnum.USER }) => {
  let signature = {
    accessSignature: undefined,
    refreshSignature: undefined,
    accessTokenExpires: 0,
    refreshTokenExpires: 0,
  };
  switch (signaturelevel) {
    case SignatureEnum.USER:
      {
        signature.accessSignature = ACCESS_TOKEN_USER_SECRET;
        signature.refreshSignature = REFRESH_TOKEN_USER_SECRET;
        signature.accessTokenExpires = Number(ACCESS_TOKEN_USER_EXPIRES_IN);
        signature.refreshTokenExpires = Number(REFRESH_TOKEN_USER_EXPIRES_IN);
      }
      break;
    case SignatureEnum.ADMIN:
      {
        signature.accessSignature = ACCESS_TOKEN_ADMIN_SECRET;
        signature.refreshSignature = REFRESH_TOKEN_ADMIN_SECRET;
        signature.accessTokenExpires = Number(ACCESS_TOKEN_ADMIN_EXPIRES_IN);
        signature.refreshTokenExpires = Number(REFRESH_TOKEN_ADMIN_EXPIRES_IN);
      }
      break;
    default:
      {
        signature.accessSignature = ACCESS_TOKEN_USER_SECRET;
        signature.refreshSignature = REFRESH_TOKEN_USER_SECRET;
        signature.accessTokenExpires = Number(ACCESS_TOKEN_USER_EXPIRES_IN);
        signature.refreshTokenExpires = Number(REFRESH_TOKEN_USER_EXPIRES_IN);
      }
      break;
  }
  return signature;
};

export const getNewLogicCredentials = ({ user }) => {
  const signatureLevel = getSignature({
    signaturelevel:
      user.role != RoleEnum.USER ? SignatureEnum.ADMIN : SignatureEnum.USER,
  });
console.log("from token"+user);

  const accessToken = generateToken({
    payload: { id: user._id },
    secret: signatureLevel.accessSignature,
    option: { expiresIn: Number(signatureLevel.accessTokenExpires) },
  });
  const refreshToken = generateToken({
    payload: { id: user._id },
    secret: signatureLevel.refreshSignature,
    option: { expiresIn: Number(signatureLevel.refreshTokenExpires) },
  });

  return { accessToken, refreshToken };
};
