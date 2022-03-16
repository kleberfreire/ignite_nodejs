import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../entities/User";


interface IUsersRepository {
  create(data: ICreateUserDTO) : Promise<void>
  findByEmail(email: string) : Promise<User>
  findById(id: string) : Promise<User>
  list(): Promise<User[]>
  update(id: string, data:IUpdateUserDTO) : Promise<void>
}

export { IUsersRepository } 