import { Car } from "./../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}
