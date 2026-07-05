import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_USER_SECRET,
  ACCESS_TOKEN_USER_EXPIRES_IN,
  REFRESH_TOKEN_USER_SECRET,
  REFRESH_TOKEN_ADMIN_SECRET,
  ACCESS_TOKEN_ADMIN_SECRET,
  REFRESH_TOKEN_USER_EXPIRES_IN,
} from "../../config/process.js";
import { RoleEnum, SignatureEnum } from "../enum/user.enum.js";
export const generateToken = ({ payload, secretKey, option }) => {
  return jwt.sign(payload, secretKey, option);
};
export const verifyToken = ({ token, secretKey }) => {
  return jwt.verify(token, secretKey);
};


export const getSignature = ({ signatureLever = SignatureEnum.USER }) => {
  let signature = { accessSignature: undefined, refreshSignature: undefined };
  switch (signatureLever) {
    case SignatureEnum.ADMIN:
      signature.accessSignature = ACCESS_TOKEN_ADMIN_SECRET;
      signature.refreshSignature = REFRESH_TOKEN_ADMIN_SECRET;
      break;
    case SignatureEnum.USER:
      signature.accessSignature = ACCESS_TOKEN_USER_SECRET;
      signature.refreshSignature = REFRESH_TOKEN_USER_SECRET;
      break;
    default:
      signature.accessSignature = ACCESS_TOKEN_USER_SECRET;
      signature.refreshSignature = REFRESH_TOKEN_USER_SECRET;
      break;
  }
  return signature;
};

export const getNewLogicCredentials = async (user) => {
  const signature = getSignature({signatureLever: user.role !== RoleEnum.ADMIN ? SignatureEnum.USER : SignatureEnum.ADMIN});


  let accessToken = generateToken({
    payload: { id: user._id },
    secretKey: signature.accessSignature,
    option: {
      subject: "user_id",
      issuer: "auth-service",
      audience: "sarahah_app",
      expiresIn: {expiresIn: user.role !== RoleEnum.ADMIN ? Number(ACCESS_TOKEN_USER_EXPIRES_IN) : Number(ACCESS_TOKEN_ADMIN_EXPIRES_IN)},
    },

  });
  let refreshToken = generateToken({
    payload: { id: user._id },
    secretKey: signature.refreshSignature,
    option: {
      subject: "user_id",
      issuer: "auth-service",
      audience: "sarahah_app",
      expiresIn: {expiresIn: user.role !== RoleEnum.ADMIN ? Number(REFRESH_TOKEN_USER_EXPIRES_IN) : Number(REFRESH_TOKEN_ADMIN_EXPIRES_IN)},
    },
  });

  return {
    accessToken,
    refreshToken,
  };
};

