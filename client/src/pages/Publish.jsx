import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { token } from "../context/token";

import "../assets/css/pages/publish.css"

const MAX_DESCRIPTION_LENGTH = 250;

const PublishArticle = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    content: "",
    categories: [
        { _id: "politique", name: "Politique" },
        { _id: "economie", name: "Économie" },
        { _id: "societe", name: "Société" },
        { _id: "international", name: "International" },
        { _id: "culture", name: "Culture" },
        { _id: "technologie", name: "Technologie" },
        { _id: "science", name: "Science" },
        { _id: "environnement", name: "Environnement" },
        { _id: "sport", name: "Sport" },
        { _id: "sante", name: "Santé" },
        { _id: "lifestyle", name: "Lifestyle" },
        { _id: "education", name: "Éducation" },
        { _id: "justice", name: "Justice" },
        { _id: "opinion", name: "Opinion" },
        { _id: "evenements", name: "Événements" },
        { _id: "humour", name: "Humour" }
    ],
    selectedCategories: [],
    image: null,
  });
  const [descriptionError, setDescriptionError] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files, options } = e.target;

    if (name === "description") {
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setInputs((prev) => ({ ...prev, [name]: value }));
        setDescriptionError(false);
      } else {
        setDescriptionError(true);
      }
    } else if (name === "image") {
      setInputs((prev) => ({ ...prev, image: files[0] }));
    } else if (name === "selectedCategories") {
      const selected = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setInputs((prev) => ({ ...prev, selectedCategories: selected }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !inputs.title.trim() ||
      !inputs.description.trim() ||
      !inputs.content.trim() ||
      inputs.selectedCategories.length === 0
    ) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }
    if (descriptionError) {
      alert("La description ne peut pas dépasser 250 caractères.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("content", inputs.content);
      formData.append("category", JSON.stringify(inputs.selectedCategories));
      if (inputs.image) formData.append("image", inputs.image);

      await axios.post("http://localhost:4000/articles/new", formData, {
        headers: {
          ...token(),
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Article publié avec succès !");
      navigate("/profil");
    } catch (err) {
      alert("Erreur lors de la publication de l'article.");
      console.error(err);
    }
  };

  if (!auth.user) {
    return (
      <section>
        <p>Vous devez être connecté(e) pour publier un article.</p>
      </section>
    );
  }

  return (
    <section className="publish-article-section">
    <h2 className="publish-article-title">Publier un article</h2>
    <form className="publish-article-form" onSubmit={handleSubmit} encType="multipart/form-data">

        <label className="publish-article-label" htmlFor="image">Image :</label>
        <input
        className="publish-article-input-file"
        type="file"
        name="image"
        id="image"
        onChange={handleChange}
        accept="image/*"
        />

        <label className="publish-article-label" htmlFor="title">Titre :</label>
        <input
        className="publish-article-input-text"
        type="text"
        id="title"
        name="title"
        value={inputs.title}
        onChange={handleChange}
        placeholder="Titre de l'article"
        required
        />

        <label className="publish-article-label" htmlFor="description">Description :</label>
        <textarea
        className="publish-article-textarea-description"
        id="description"
        name="description"
        value={inputs.description}
        onChange={handleChange}
        placeholder="Description courte (max 250 caractères)"
        maxLength={MAX_DESCRIPTION_LENGTH}
        required
        />
        {descriptionError && (
        <p className="publish-article-error">
            La description ne doit pas dépasser 250 caractères.
        </p>
        )}

        <label className="publish-article-label" htmlFor="categories">Catégories :</label>
        <select
        className="publish-article-select"
        multiple
        name="selectedCategories"
        id="categories"
        value={inputs.selectedCategories}
        onChange={handleChange}
        required
        >
        {inputs.categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
            {cat.name}
            </option>
        ))}
        </select>

        <label className="publish-article-label" htmlFor="content">Contenu :</label>
        <textarea
        className="publish-article-textarea-content"
        id="content"
        name="content"
        value={inputs.content}
        onChange={handleChange}
        placeholder="Contenu complet de l'article"
        required
        rows={10}
        />

        <button className="publish-article-button" type="submit">Publier</button>
    </form>
    </section>
  );
};

export default PublishArticle;
