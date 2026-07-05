import crypto from "node:crypto";
import { ENCRYPTION_SECRET_KEY } from "../../config/process.js";

const IV_LENGTH = 16;
const secretKey = Buffer.from(ENCRYPTION_SECRET_KEY);
export const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encryptedData = cipher.update(text, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return `${iv.toString("hex")}:${encryptedData}`;
};
export const decrypt = (encryptedData) => {
  const [ivHex, encryptedText] = encryptedData.split(":");
  const binaryLikeIV = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, binaryLikeIV);
  let decryptedData = decipher.update(encryptedText, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};