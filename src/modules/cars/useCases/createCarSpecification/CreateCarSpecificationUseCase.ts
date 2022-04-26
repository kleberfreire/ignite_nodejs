import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

//@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {} // private specificationsRepository: ISpecificationsRepository // @inject("SpecificationsRepository") // private carsRepository: ICarsRepository, // @inject("CarsRepository")

  async execute({ car_id, specifications_id }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) {
      throw new AppError("Car does not exists", 400);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    console.log(carExists);
  }
}
