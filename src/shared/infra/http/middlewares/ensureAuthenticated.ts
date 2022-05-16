import { auth } from "@roots/config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
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
  const usersTokensRepository = new UsersTokensRepository();
  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [, token] = authHeader.split(" ");
  try {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;

    const { sub: user_id } = decode;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
