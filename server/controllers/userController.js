import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Article from "../models/articleModel.js";
import User from "../models/userModel.js";


dotenv.config();

export const register = async (req, res) => {
	try {
		const checkPwd =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

		const { login, email, password } = req.body;

		if (login.trim() === "" || email.trim() === "" || password.trim() === "") {
			return res
				.status(400)
				.json({ message: "Veuillez remplir tous les champs" });
		}

		const verifEmail = await User.findOne({ email: email });
		if (verifEmail) {
			return res.status(401).json({ message: "Cet email est déjà enregistré" });
		}

		if (!checkPwd.test(password)) {
			return res.status(401).json({ message: "Mot de passe incorrecte" });
		}

		const newUser = new User({
			login,
			email,
			password,
		});

		await newUser.save();

		res.status(200).json({ message: "Votre compte a bien été créé !" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "La création de compte a échoué" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		if (!user) {
			return res
				.status(404)
				.json({ message: "Aucun utilisateur trouvé avec cette adresse mail" });
		}

		const isValidPwd = bcrypt.compareSync(password, user.password);
		if (!isValidPwd) {
			return res.status(401).json({ message: "Mot de passe incorrect" });
		}

		const token = jwt.sign(
			{
				id: user.id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_TOKEN },
		);

		res.status(200).json({
			id: user._id,
			login: user.login,
			role: user.role,
			description: user.description,
			image: user.image,
			token: token,
		});
	} catch (_error) {
		res.status(500).json({ message: "Erreur lors de la connexion" });
	}
};

export const getAllUsers = async (_req, res) => {
	try {
		const users = await User.find({});

		res.status(200).json({
			users: users,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Impossible de récupérer les utilisateurs",
		});
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ _id: id });

		if (!user) {
			return res.status(404).json({ message: "Aucun utilisateur trouvé" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message:
				"Une erreur est survenue lors de la récupération de l'utilisateur",
		});
	}
};

export const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { login, email, description } = req.body;

		if (!user || !req.userId) {
			return res.status(401).json({ message: "Non autorisé" });
		}

		if (user._id.toString() !== req.userId) {
			throw new Error("Vous ne pouvez mettre à jour que votre propre compte");
		}

		if (
			(!login || login.trim() === "") &&
			(!email || email.trim() === "") &&
			(!description || description.trim() === "") &&
			!req.file
		) {
			return res.status(400).json({
				message: "Veuillez fournir au moins un champ à mettre à jour",
			});
		}

		const updateFields = {};

		if (login && login.trim() !== "") {
			updateFields.login = login.trim();
		}

		if (email && email.trim() !== "") {
			updateFields.email = email.trim();
		}

		if (description && description.trim() !== "") {
			updateFields.description = description.trim();
		}

		if (req.file) {
			updateFields.image = {
				src: req.file.filename,
				alt: req.file.originalname,
			};
		}

		const updatedUser = await User.updateOne(
			{ _id: req.params.id },
			{ $set: updateFields },
		);

		if (updatedUser.nModified === 0) {
			return res.status(400).json({
				message: "Aucune modification effectuée",
			});
		}

		const updatedUserData = await User.findById(req.params.id).select(
			"-password",
		);

		return res.status(200).json(updatedUserData);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Impossible de mettre à jour l'utilisateur",
			error: error.message,
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		const article = await Article.deleteMany({
			userId: req.params.id,
		});

		if (!article) {
			res.status(404).json({ message: "Livre non trouvé" });
		}

		const user = await User.findOneAndDelete({
			_id: req.params.id,
		});

		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}

		return res
			.status(200)
			.json({ message: "Utilisateur supprimé avec succès" });
	} catch (error) {
		return res.status(500).json({
			message: "Impossible de supprimer l'utilisateur",
			error: error.message,
		});
	}
};

