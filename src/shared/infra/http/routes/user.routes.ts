import { ProfileUserController } from "./../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";

import { ListUsersController } from "@roots/modules/accounts/useCases/listUsers/ListUsersController";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUsersController = new ListUsersController();
const profileUserController = new ProfileUserController();

import uploadConfig from "@config/upload";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const uploadAvatar = multer(uploadConfig);

const userRoutes = Router();

userRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);
userRoutes.get("/", listUsersController.handle);
userRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

userRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  ensureAuthenticated,
  ensureAdmin,
  updateUserAvatarController.handle
);

export { userRoutes };
