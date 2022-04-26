import { Car } from "./../../infra/typeorm/entities/Car";
import { injectable, inject } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      category_id,
      brand,
      name,
    });

    return cars;
  }
}
