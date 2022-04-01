import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCatagory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesControllers";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// routes
categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
