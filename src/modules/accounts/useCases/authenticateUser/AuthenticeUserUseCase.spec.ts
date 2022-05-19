import { DayjsDateProvider } from "./../../../../shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-Memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-Memory/UsersTokensRepositoryInMemory";

let authenticateUserUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      avatar: null,
      driver_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUserCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user", async () => {
    expect(
      authenticateUserUserCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
  it("Should not be able to authenticate with incorrect password", async () => {
    const user = {
      avatar: null,
      driver_license: "99999",
      email: "user@user.com",
      password: "error1234",
      name: "User user",
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUserCase.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
