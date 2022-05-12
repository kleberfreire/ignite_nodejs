import { AppError } from "@shared/errors/AppError";
import { CarRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
let createCarUseCase: CreateCarUseCase;
let carsRepository: CarRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able create a new car", async () => {
    const newCar = {
      name: "test Car",
      description: "test description",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "test brand",
      category_id: "test category_id",
    };
    const car = await createCarUseCase.execute(newCar);
    expect(car).toHaveProperty("id");
  });

  it("should not be able create a car with exists license plate ", () => {
    const car = {
      name: "test Car",
      description: "test description",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "test brand",
      category_id: "test category_id",
    };

    const car2 = {
      name: "test Car2",
      description: "test description2",
      daily_rate: 111,
      license_plate: "abc123",
      fine_amount: 70,
      brand: "test brand2",
      category_id: "test category_id2",
    };
    expect(async () => {
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "test Car",
      description: "test description",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "test brand",
      category_id: "test category_id",
    });

    expect(car.available).toBe(true);
  });
});
