import { AppError } from "@shared/errors/AppError";
import { auth } from "@roots/config/auth";
import { sign, verify } from "jsonwebtoken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@roots/shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { sub, email } = (await verify(
      token,
      auth.secret_refresh_token
    )) as IPayload;

    if (!sub) {
      throw new AppError("Invalid token");
    }

    const user_id = sub;

    const userTokens =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userTokens) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userTokens.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    return refresh_token;
  }
}
