import jwt from "jsonwebtoken";
import prisma from "../../lib/db";
import type { APIContext } from "astro";
const jwtSecret = import.meta.env.AUTH_SECRET;

export async function GET(context: APIContext): Promise<Response> {
  try {
    const tokenCookie = context.request.headers.get("Cookie");
    if (!tokenCookie) {
      return new Response("Unauthorized", { status: 401 });
    }
    const token = tokenCookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const authToken = token.split("=")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(authToken, jwtSecret);
    } catch (error) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = (decodedToken as any).userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify("Internal Server Errorr"), {
      status: 500,
    });
  }
}
