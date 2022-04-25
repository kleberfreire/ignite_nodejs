import { Car } from "./../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";

interface IFindAvailableParams {
  categoy_id?: string;
  brand?: string;
  name?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable({
    categoy_id,
    brand,
    name,
  }: IFindAvailableParams): Promise<Car[]>;
}
