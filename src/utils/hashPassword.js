import * as Crypto from "expo-crypto";

export const hashPassword = async (password) => {
  if (!password) return "";
  try {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    console.log("✅ Hashed password:", digest); // 👈 thêm dòng này để xem log
    return digest;
  } catch (error) {
    console.error("❌ Error hashing password:", error);
    return password;
  }
};
