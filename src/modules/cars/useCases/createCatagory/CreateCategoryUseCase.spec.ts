import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

import { AppError } from "@shared/errors/AppError";
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("Should be able to create a category", async () => {
    const category = { name: "teste Category", description: "teste" };

    await createCategoryUseCase.execute({
      name: "teste Category",
      description: "teste",
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a category with name exists", async () => {
    expect(async () => {
      const category = { name: "teste Category", description: "teste" };

      await createCategoryUseCase.execute({
        name: "teste Category",
        description: "teste",
      });

      await createCategoryUseCase.execute({
        name: "teste Category",
        description: "teste",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
