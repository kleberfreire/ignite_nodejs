import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";

import { ListUsersController } from "@roots/modules/accounts/useCases/listUsers/ListUsersController";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUsersController = new ListUsersController();

import uploadConfig from "@config/upload";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userRoutes = Router();

userRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);
userRoutes.get("/", listUsersController.handle);

userRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
