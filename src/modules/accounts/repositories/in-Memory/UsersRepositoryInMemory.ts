import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create( 
    { driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
      const user = new User()
      Object.assign(user, { driver_license, email, name, password})

      this.users.push(user)
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }
 async list(): Promise<User[]> {
    return this.users
  }
  update(id: string, data: IUpdateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export { UsersRepositoryInMemory }