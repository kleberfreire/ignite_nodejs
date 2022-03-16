import { Router } from "express";
import { AthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
