import { CarImage } from "./../infra/typeorm/entities/CarImage";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
