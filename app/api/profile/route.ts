import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma/prisma";
import assert from "assert";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("auth-token")?.value;
    assert(accessToken, "no accessToken");
    assert(process.env.JWT_SECRET, "no jwt secret");

    console.log("accectoken:", accessToken);

    const payload: any = jwt.verify(accessToken, process.env.JWT_SECRET);

    const aUser = await prisma.user.findUnique({
      where: { id: payload.id },
    });
    assert(aUser);

    const { password, ...others } = aUser;

    return NextResponse.json(others);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
