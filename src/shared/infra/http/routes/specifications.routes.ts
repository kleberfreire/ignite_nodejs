import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecifications/ListSpecificationController";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();
specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", createSpecificationController.handle);

specificationRoutes.get("/", (request, response) => {
  return listSpecificationController.handle(request, response);
});

export { specificationRoutes };
