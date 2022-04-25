import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@roots/modules/cars/DTOs/ICreateCarDTO";
import { Car } from "../entities/Car";
import { ICarsRepository } from "./../../../repositories/ICarsRepository";
export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
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
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable({ categoy_id, brand, name }): Promise<Car[]> {
    const whereFind = { available: true };

    if (categoy_id) {
      Object.assign(whereFind, { categoy_id });
    }

    if (brand) {
      Object.assign(whereFind, { brand });
    }

    if (name) {
      Object.assign(whereFind, { name });
    }
    const cars = await this.repository.find({
      where: whereFind,
    });
    return cars;
  }
}
