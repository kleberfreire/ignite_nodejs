import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(userId: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(userId);

    return UserMap.toDTO(user);
  }
}
