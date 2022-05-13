import { SpecificationsRepositoryInMemory } from "./../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CarRepositoryInMemory } from "./../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
      specificationInMemory
    );
  });
  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["1234", "5678"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Name Car",
      description: "description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand Car",
      category_id: "Category Car",
    });

    const specification = await specificationInMemory.create({
      name: "Name Specification",
      description: "description Specification",
    });

    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications).toHaveLength(1);
  });
});
