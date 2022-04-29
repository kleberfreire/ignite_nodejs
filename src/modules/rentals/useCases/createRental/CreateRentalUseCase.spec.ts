import { DayjsDateProvider } from "./../../../../shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { IDateProvider } from "./../../../../shared/container/providers/DateProvider/IDateProvider";
import dayjs from "dayjs";

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "./../../repositories/In-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Create Rentail", () => {
  const dayAdd24hrs = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expect_return_date: dayAdd24hrs,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expect_return_date: dayAdd24hrs,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expect_return_date: dayAdd24hrs,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expect_return_date: dayAdd24hrs,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "321",
        car_id: "teste",
        expect_return_date: dayAdd24hrs,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "321",
        car_id: "teste",
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
