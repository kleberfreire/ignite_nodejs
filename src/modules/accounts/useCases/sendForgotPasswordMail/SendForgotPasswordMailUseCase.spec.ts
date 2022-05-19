import { AppError } from "@shared/errors/AppError";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-Memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-Memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Test Send forgot email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "Violet Lopez",
      driver_license: "123456789",
      email: "eka@vaud.bt",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("eka@vaud.bt");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("fijfe@dodusi.ni")
    ).rejects.toEqual(new AppError("User already exists!"));
  });

  it("Should be able to create an users token", async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryInMemory, "create");
    const newUser = {
      name: "Alex Farmer",
      driver_license: "123456",
      email: "vawseriw@rubva.nu",
      password: "3709741668",
    };

    await usersRepositoryInMemory.create(newUser);

    await sendForgotPasswordMailUseCase.execute(newUser.email);

    expect(generateToken).toHaveBeenCalled();
  });
});
