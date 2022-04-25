import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../infra/typeorm/entities/User";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, { driver_license, email, name, password });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async list(): Promise<User[]> {
    return this.users;
  }
  update(id: string, data: IUpdateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { UsersRepositoryInMemory };
