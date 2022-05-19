import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async deleteById(user_id: string): Promise<void> {
    const userTokenID = this.usersTokens.findIndex(
      (userToken) => userToken.user_id !== user_id
    );

    this.usersTokens.splice(userTokenID, 1);
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refreshToken
    );
    return userToken;
  }
  async findByRefreshToken(token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === token
    );
    return userToken;
  }
}
