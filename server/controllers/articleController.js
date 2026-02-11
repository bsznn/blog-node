import Article from "../models/articleModel.js";

export const addArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, content, category } = req.body;

    let categories = [];

    if (category) {
      if (typeof category === "string") {
        try {
          const parsed = JSON.parse(category);
          categories = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          categories = [category];
        }
      } else if (Array.isArray(category)) {
        categories = category;
      } else {
        categories = [category];
      }
    } else {
      categories = ["Romance"];
    }

    const newArticle = new Article({
      userId,
      title,
      description,
      content,
      category: categories,
      image: {
        src: req.file ? req.file.filename : "",
        alt: req.file ? req.file.originalname : "",
      },
    });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Erreur création article :", error);
    res.status(500).json({ message: "Impossible d'ajouter l'article." });
  }
};

export const getAllArticles = async (req, res) => {
	try {
		const articles = await Article.find({})
			.populate("userId", "-password") 
		res.status(200).json(articles);
	} catch (error) {
		res.status(500).json({ message: "Erreur lors de la récupération des articles", error });
	}
};

export const getArticleById = async (req, res) => {
	try {
		const { id } = req.params;
        const article = await Article.findOne({ _id: id })
			.populate("userId", "-password") 

		if (!article) {
			return res.status(404).json({ message: "Article non trouvé." });
		}

        await article.save();

		res.status(200).json(article);	
    } catch (error) {
		res.status(500).json({ message: "Erreur lors de la récupération de l'article", error });
	}
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, category, content } = req.body; 

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // Vérifier que l'utilisateur est bien le propriétaire
    if (!article.userId || article.userId.toString() !== userId) {
      return res.status(403).json({ message: "Action non autorisée." });
    }

    // Mise à jour des champs uniquement si présents
    if (title) article.title = title;
    if (description) article.description = description;
    if (content) article.content = content;

    // Gestion des catégories : peut venir sous forme de tableau ou JSON string
    if (category) {
      article.category = Array.isArray(category) ? category : JSON.parse(category);
    }

    // Gestion de l'image uploadée
    if (req.file) {
      article.image = {
        src: req.file.filename,
        alt: req.file.originalname,
      };
    }

    await article.save();

    res.status(200).json(article);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const deleteArticle = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.userId;

		const article = await Article.findById(id);
		if (!article) {
			return res.status(404).json({ message: "Article non trouvé." });
		}

		if (!article.userId || article.userId.toString() !== userId) {
			return res.status(403).json({ message: "Action non autorisée." });
		}

		await Article.findByIdAndDelete(id);

		res.status(200).json({ message: "Article supprimé avec succès." });
	} catch (error) {
		console.error("Erreur lors de la suppression de l'article :", error);
		res.status(500).json({ message: "Erreur serveur." });
	}
};