import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "@roots/modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@roots/modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    this.repository.save(userToken);
    return userToken;
  }
}
