import { Car } from "./../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";

interface IFindAvailableParams {
  category_id?: string;
  brand?: string;
  name?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable({
    category_id,
    brand,
    name,
  }: IFindAvailableParams): Promise<Car[]>;

  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
