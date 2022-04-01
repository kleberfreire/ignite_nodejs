import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRoutes };
