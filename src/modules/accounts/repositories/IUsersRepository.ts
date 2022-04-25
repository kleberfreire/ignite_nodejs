import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(): Promise<User[]>;
  update(id: string, data: IUpdateUserDTO): Promise<void>;
}

export { IUsersRepository };
