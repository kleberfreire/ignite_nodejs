import { CarRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoyInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
  });

  it("should be able to list all cars", async () => {
    const car1 = await carRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 100,
      license_plate: "CAR1234",
      fine_amount: 10,
      brand: "Car1 Brand",
      category_id: "Car1 Category",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by name", async () => {
    const car2 = await carRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 100,
      license_plate: "CAR2234",
      fine_amount: 10,
      brand: "Car1 Brand",
      category_id: "Car2 Category",
    });
    const cars = await carRepositoryInMemory.findAvailable({
      name: "Car2",
    });

    expect(cars).toEqual([car2]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car3 = await carRepositoryInMemory.create({
      name: "Car3",
      description: "Car3 description",
      daily_rate: 100,
      license_plate: "CAR3234",
      fine_amount: 10,
      brand: "Car3 Brand",
      category_id: "Car3 Category",
    });
    const cars = await carRepositoryInMemory.findAvailable({
      brand: "Car3 Brand",
    });

    expect(cars).toEqual([car3]);
  });

  it("should be able to list all available cars by Category", async () => {
    const car4 = await carRepositoryInMemory.create({
      name: "Car4",
      description: "Car4 description",
      daily_rate: 100,
      license_plate: "CAR4234",
      fine_amount: 10,
      brand: "Car4 Brand",
      category_id: "Car4 Category",
    });
    const cars = await carRepositoryInMemory.findAvailable({
      category_id: "Car4 Category",
    });

    expect(cars).toEqual([car4]);
  });
});
