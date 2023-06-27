import assert from "assert";
import jwt from "jsonwebtoken";

export async function authorized(token: any) {
  try {
    assert(token, "no token");

    const secret = process.env.JWT_SECRET;
    assert(secret, "no secret");

    const payload = await jwt.verify(token, secret);
    return payload;
  } catch (error: any) {
    console.log("authorized faild:", error.message);
  }
  return null;
}
