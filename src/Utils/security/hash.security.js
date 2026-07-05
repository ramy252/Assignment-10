import bcrypt from "bcrypt";
import argon2 from "argon2";
import { HASHING_ALGORITHM } from "../enum/security.enum.js";
import { SALT_ROUNDS } from "../../config/process.js";

export const generateHash = async ({
  algorithm = HASHING_ALGORITHM.BCRYPT,
  plainText,
  saltRounds = Number(SALT_ROUNDS),
}) => {
  let hashResult;
  switch (algorithm) {
    case HASHING_ALGORITHM.BCRYPT:
      hashResult = await bcrypt.hash(plainText, saltRounds);
      return hashResult;
    case HASHING_ALGORITHM.ARGON2:
      hashResult = await argon2.hash(plainText);
      return hashResult;
    default:
      throw new Error("Invalid hashing algorithm");
  }
};

export const compareHash = async ({
  algorithm = HASHING_ALGORITHM.BCRYPT,
  plainText,
  hashedText,
}) => {
  let plainTextResult;
  switch (algorithm) {
    case HASHING_ALGORITHM.BCRYPT:
      plainTextResult = await bcrypt.compare(plainText, hashedText);
      return plainTextResult;
    case HASHING_ALGORITHM.ARGON2:
      plainTextResult = await argon2.verify(hashedText, plainText);
      return plainTextResult;
    default:
      throw new Error("Invalid hashing algorithm");
  }
};
