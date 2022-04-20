import { Car } from "./../../infra/typeorm/entities/Car";
import { injectable, inject } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    return this.carsRepository.list();
  }
}
