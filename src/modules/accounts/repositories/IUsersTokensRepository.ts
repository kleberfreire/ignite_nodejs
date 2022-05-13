import { UserTokens } from "./../infra/typeorm/entities/UserTokens";
export interface IUsersTokensRepository {
  create(user_id: string): Promise<UserTokens>;
}
