import CryptoJS from "crypto-js";

// Encryption algorithm = "AES"
const key = CryptoJS.enc.Hex.parse("00000000000000000000000000000000"); // 32-byte key for AES
const iv = CryptoJS.enc.Hex.parse("0000000000000000"); // 16-byte IV for AES

// Function to encrypt a password
export function encryptPassword(password: string): string {
  const encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv }).toString();
  return encrypted;
}

// Function to decrypt a password
export function decryptPassword(encryptedPassword: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, key, { iv: iv });
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
