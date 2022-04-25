import { CarRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoyInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carRepositoryInMemory);
  });

  it("should be able to list all cars", async () => {
    const car1 = await carRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro popular brasileiro",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "testCategory",
    });

    const car2 = await carRepositoryInMemory.create({
      name: "Gol",
      description: "Carro popular brasileiro",
      daily_rate: 100,
      license_plate: "ABC1235",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "testCategory",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car1, car2]);
  });

  it("should be able to list all available cars by name", async () => {});
});
