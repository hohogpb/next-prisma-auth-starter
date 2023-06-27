"use server";

import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma";
import { enctyptPassword, verifyPassword } from "libs/auth/password";
import jwt from "jsonwebtoken";
import assert from "assert";

export async function checkLogin(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !verifyPassword(password, user.password)) {
    throw new Error(`sign in faild, please check`);
  }

  return user;
}

export async function signToken(
  user: any,
  secret: string,
  expiresSecs: number
) {
  const { id, username } = user;
  const payload = { id, username };

  const token = jwt.sign(payload, secret, {
    expiresIn: expiresSecs,
  });

  return { payload, token };
}

export async function login(data: FormData) {
  const username = data.get("username")?.toString();
  const password = data.get("password")?.toString();
  assert(username && password);

  const user = await checkLogin(username, password);

  const secret = process.env.JWT_SECRET;
  assert(secret);

  const { token } = await signToken(user, secret, 24 * 60 * 60);

  cookies().set("auth-token", token);

  console.log("logging success");
  return token;
}
