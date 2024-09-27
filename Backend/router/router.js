import express from "express";
// import { authorizeToken } from "../controllers/autorizeToken.js";
import { postSignupController } from "../controllers/signupController.js";

import { limiter } from "../middlewares/limiter.js";
import {
  postLoginController,
  postLogoutController,
} from "../controllers/loginController.js";
import {
  getAllUsers,
  getUserById,
  getUserInfo,
} from "../controllers/userController.js";
import authintcatUser from "../middlewares/authintcatUser.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  postDelete,
  postItem,
  postUpdate,
  updateItemCategory,
} from "../controllers/itemsController.js";
import { postUpdatePwdController } from "../controllers/updatePassword.js";
import { getAllTodos } from "../controllers/getAllTodos.js";
const router = express.Router();

// sign up
router.post("/signup", validateUser, validateSchema, postSignupController);
//log in
router.post("/login", limiter, postLoginController);
router.post("/logout", postLogoutController);
router.put("/update-password", postUpdatePwdController);
router.get("/userinfo/:userId", authintcatUser, getUserInfo);
router.get("/users", getAllUsers);
router.get("/user/:id", authintcatUser, getUserById);
router.get("/alltodos/:id", getAllTodos);

//////
router.post("/postitem/:id", postItem);
router.put("/updateItemCategory/:userId/:itemId", updateItemCategory);
router.put("/users/:id/items/:itemId", postUpdate);
router.delete("/users/:id/items/:itemId", postDelete);

export default router;
