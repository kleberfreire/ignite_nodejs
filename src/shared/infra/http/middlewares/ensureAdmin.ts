import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { Request, Response, NextFunction } from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("Only admin can access this route", 401);
  }

  return next();
}