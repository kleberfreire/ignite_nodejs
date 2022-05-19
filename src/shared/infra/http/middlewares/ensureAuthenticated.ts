import { auth } from "@roots/config/auth";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [, token] = authHeader.split(" ");
  try {
    const decode = verify(token, auth.secret_token) as IPayload;

    const { sub: user_id } = decode;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
