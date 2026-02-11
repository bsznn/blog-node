import dotenv from "dotenv"; 
import mongoose from "mongoose"; 

dotenv.config(); 

/* Utilisation localhost classique */

// const connectDB = () => {
// 	mongoose
// 		.connect(`${process.env.BASE_URL}`) 
// 		.then(() => console.log("Connexion à la BDD établie !")) 
// 		.catch(() => console.log("Impossible de se connecter à la BDD")); 
// };

/* Utilisation cluster */

const connectDB = () => {
	mongoose
		.connect(`${process.env.URL_ATLAS}`) 
		.then(() => console.log("Connexion à la BDD établie !")) 
		.catch(() => console.log("Impossible de se connecter à la BDD")); 
};

export default connectDB; 