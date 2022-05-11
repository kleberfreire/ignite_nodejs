import { Car } from "../../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "./../../DTOs/ICreateCarDTO";

import { ICarsRepository } from "./../ICarsRepository";

interface IFindAvailableParams {
  category_id?: string;
  brand?: string;
  name?: string;
}

export class CarRepositoryInMemory implements ICarsRepository {
  private cars: Car[];
  constructor() {
    this.cars = [];
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
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

  async findAvailable({
    category_id,
    brand,
    name,
  }: IFindAvailableParams): Promise<Car[]> {
    // let all = this.cars.filter((car) => {
    //   if (
    //     car.available === true ||
    //     (brand && car.brand === brand) ||
    //    (category_id && car.category_id === category_id) ||
    //     (name && car.name === name)
    //   ) {
    //     return car;
    //   }
    // });
    let all = this.cars.filter((car) => car.available === true);
    if (category_id || brand || name) {
      all = all.filter((car) => {
        if (car.category_id === category_id) {
          return car;
        }
        if (car.brand === brand) {
          return car;
        }

        if (car.name === name) {
          return car;
        }
      });
    }

    return all;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}
