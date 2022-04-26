import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../../infra/typeorm/entities/Specification";

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);
  }
  async findByIds(id: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      id.includes(specification.id)
    );
  }
}
