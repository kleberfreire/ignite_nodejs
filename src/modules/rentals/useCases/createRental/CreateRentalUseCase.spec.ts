import { Car } from "./../../../cars/infra/typeorm/entities/Car";
import { CarRepositoryInMemory } from "./../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "./../../../../shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { IDateProvider } from "./../../../../shared/container/providers/DateProvider/IDateProvider";
import dayjs from "dayjs";

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "./../../repositories/In-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let carRepositoryInMemory: CarRepositoryInMemory;

let car: Car;
describe("Create Rental", () => {
  const dayAdd24hrs = dayjs().add(2, "day").toDate();
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carRepositoryInMemory = new CarRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carRepositoryInMemory
    );
    car = await carRepositoryInMemory.create({
      name: "test",
      description: "Fiat",
      daily_rate: 100,
      license_plate: "AAA-111",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expect_return_date: dayAdd24hrs,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expect_return_date: dayAdd24hrs,
      });
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expect_return_date: dayAdd24hrs,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expect_return_date: dayAdd24hrs,
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: car.id,
        expect_return_date: dayAdd24hrs,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "321",
        car_id: car.id,
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
