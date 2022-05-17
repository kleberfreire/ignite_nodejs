import { ICreateUserTokenDTO } from "./../dtos/ICreateUserTokenDTO";
import { UserTokens } from "./../infra/typeorm/entities/UserTokens";
export interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  deleteById(user_id: string): Promise<void>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens>;

  findByRefreshToken(token: string): Promise<UserTokens>;
}
