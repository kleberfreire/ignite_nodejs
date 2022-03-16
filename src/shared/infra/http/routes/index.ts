import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/categories" ,categoriesRoutes);
router.use("/specification", specificationRoutes);
router.use("/users", userRoutes)
router.use(authenticateRoutes)


export { router };
