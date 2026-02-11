import dotenv from "dotenv";
dotenv.config(); 

import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import articleRouter from "./routes/articleRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 
app.use(
	cors({
		origin: "http://localhost:5174", 
		credentials: true, 
	}),
);
connectDB(); 

app.use(articleRouter);
app.use(userRouter)

app.listen(process.env.PORT, () => {
	console.log(`Serveur lancé à : ${process.env.BASE_URL}`);
});