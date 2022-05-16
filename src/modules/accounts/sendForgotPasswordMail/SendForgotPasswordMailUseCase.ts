import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IDateProvider } from "@roots/shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User already exists!");
    }

    const token = uuidV4();

    const expires_date = this.dayjsDateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,

    });

    await this.mailProvider.sendMail(email, "Recuperação de senha", `O link para recuperar a senha é: http://localhost:3000/reset-password?token=${token}`);
  }
}
