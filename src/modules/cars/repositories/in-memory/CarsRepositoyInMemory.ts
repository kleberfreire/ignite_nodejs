import { Car } from "../../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "./../../DTOs/ICreateCarDTO";

import { ICarsRepository } from "./../ICarsRepository";

export class CarRepositoryInMemory implements ICarsRepository {
  private cars: Car[];
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({ categoy_id, brand, name }): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available === true &&
        ((brand && car.brand === brand) ||
          (categoy_id && car.category_id === categoy_id) ||
          (name && car.name === name))
      ) {
        return car;
      }
    });

    return all;
  }
}
