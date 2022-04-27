import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarImage } from "./../../infra/typeorm/entities/CarImage";

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ car_id, image_name }: IRequest): Promise<CarImage> {
    // const carExists = await this.carsRepository.findById(car_id);
    // if (!carExists) {
    //   throw new AppError("Car does not exists", 400);
    // }
    image_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });

    console.log({ car_id, image_name });
    return;
  }
}
