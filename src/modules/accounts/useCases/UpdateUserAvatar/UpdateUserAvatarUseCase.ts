import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, "avatar");
    }

    user.avatar = avatar_file;

    await this.storageProvider.saveFile(avatar_file, "avatar");

    console.log(user);

    await this.userRepository.update(user.id, {
      avatar: avatar_file,
    });
  }
}

export { UpdateUserAvatarUseCase };
