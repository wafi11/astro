import { defineMiddleware } from "astro/middleware";
import jwt from 'jsonwebtoken';
import { PUBLIC_ROUTES, TOKEN } from "../../constant";
const jwtSecret = import.meta.env.AUTH_SECRET;

const verifyAuth = async (token) => {
  if (!token) {
    return {
      status: "unauthorized",
    };
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    return {
      status: "authorized",
      payload,
      msg: "Successfully verified auth token",
    };
  } catch (error) {
    console.error("JWT verification error:", error);
    return {
      status: "unauthorized",
      msg: "Invalid or expired token",
    };
  }
};

export const onRequest = defineMiddleware(async (context, next) => {  
  if (PUBLIC_ROUTES.some(route => context.url.pathname.endsWith(route))) {
    return next();
  }
  const token = context.cookies.get(TOKEN)?.value;
  const validationResult = await verifyAuth(token);

  switch (validationResult.status) {
    case "authorized":
      return next();

    case "unauthorized":
      return Response.redirect(new URL("/redirected", context.url), 302);

    default:
      return new Response("Unexpected error", { status: 500 });
  }
});
