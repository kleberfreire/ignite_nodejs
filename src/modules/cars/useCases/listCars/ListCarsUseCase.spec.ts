import { CarRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoyInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepository: CarRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it("should be able to list all cars", async () => {
    const car1 = await carsRepository.create({
      name: "Fusca",
      description: "Carro popular brasileiro",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "testCategory",
    });

    const car2 = await carsRepository.create({
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
});
