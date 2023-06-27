import crypto from "crypto";

export function sha1(
  plainPasswordBytes: Buffer,
  saltBytes: Buffer,
  iterators: number
) {
  const hash = crypto.createHash("sha1");
  hash.update(saltBytes);
  hash.update(Buffer.from(plainPasswordBytes));
  let result = hash.digest();

  // 共进行1024此
  for (let i = 1; i < iterators; i++) {
    let tmpHash = crypto.createHash("sha1");
    tmpHash.update(result);
    result = tmpHash.digest();
  }
  return result;
}

// 加密之后的密码字符串是一串16进制字符串，前16位是盐值
export function enctyptPassword(plainPassword: string) {
  const saltBytes = crypto.randomBytes(8);
  const saltHexStr = saltBytes.toString("hex");
  const plainPasswordBytes = Buffer.from(plainPassword);

  const passwordEncrypted = sha1(plainPasswordBytes, saltBytes, 1024);
  const passwordEncryptedHexStr = passwordEncrypted.toString("hex");

  return saltHexStr + passwordEncryptedHexStr;
}

// 加密之后的密码字符串是一串16进制字符串，前16位是盐值
export function verifyPassword(plainPassword: string, password: string) {
  const saltHexStr = password.substr(0, 16);
  const saltBytes = Buffer.from(saltHexStr, "hex");
  const plainPasswordBytes = Buffer.from(plainPassword);

  const passwordEncrypted = sha1(plainPasswordBytes, saltBytes, 1024);
  const passwordEncryptedHexStr = passwordEncrypted.toString("hex");

  const password_to_compare = saltHexStr + passwordEncryptedHexStr;
  if (password_to_compare == password) return true;
  return false;
}
