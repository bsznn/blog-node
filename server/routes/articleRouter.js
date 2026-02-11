import express from "express";
import {
  addArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const articleRouter = express.Router();

articleRouter.get("/articles", getAllArticles);
articleRouter.get("/articles/:id", getArticleById);

articleRouter.post("/articles/new", isLogged, isAuthorized(["admin", "user"]), 	upload.single("image"), addArticle);

articleRouter.put("/articles/edit/:id", isLogged, isAuthorized(["admin", "user"]), 	upload.single("image"), updateArticle);

articleRouter.delete("/articles/delete/:id/:userId", isLogged, isAuthorized(["admin", "user"]), deleteArticle);

export default articleRouter;
