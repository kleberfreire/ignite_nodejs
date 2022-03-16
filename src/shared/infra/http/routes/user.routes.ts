import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAthenticated";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

import uploadConfig from "@config/upload";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userRoutes = Router();

userRoutes.use(ensureAuthenticated);
userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
