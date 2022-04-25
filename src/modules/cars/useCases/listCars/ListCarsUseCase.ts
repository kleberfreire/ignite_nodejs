import { Car } from "./../../infra/typeorm/entities/Car";
import { injectable, inject } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  categoy_id: string;
  brand: string;
  name: string;
}

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ categoy_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      categoy_id,
      brand,
      name,
    });
    return cars;
  }
}
