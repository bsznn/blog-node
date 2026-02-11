import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUserById,
	login,
	register,
	updateUser,
} from "../controllers/userController.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", getAllUsers);

userRouter.get(
	"/users/:id",
	isLogged,
	isAuthorized(["admin", "user"]),
	getUserById,
);

userRouter.put(
	"/users/edit/:id",
	isLogged,
	isAuthorized(["admin", "user"]),
	upload.single("image"),
	updateUser,
);

userRouter.delete(
	"/users/delete/:id",
	isLogged,
	isAuthorized(["user", "admin"]),
	deleteUser,
);

export default userRouter;