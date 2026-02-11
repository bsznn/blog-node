import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { token } from "../context/token";

import "../assets/css/pages/article-update.css"

const categoriesList = [
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
];

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    content: "",
    selectedCategories: [],
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/articles/${id}`, { withCredentials: true })
      .then((res) => {
        const article = res.data;
        setInputs({
          title: article.title || "",
          description: article.description || "",
          content: article.content || "",
          selectedCategories: article.category || [],
        });
        if(article.imageUrl) setExistingImage(article.imageUrl); 
      })
      .catch((err) => {
        console.error("Erreur chargement article :", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setInputs((prev) => {
      const current = prev.selectedCategories;
      if (current.includes(value)) {
        return {
          ...prev,
          selectedCategories: current.filter((cat) => cat !== value),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...current, value],
        };
      }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("content", inputs.content);
      formData.append("category", JSON.stringify(inputs.selectedCategories));
      if (file) formData.append("image", file);

      await axios.put(`http://localhost:4000/articles/edit/${id}`, formData, {
        headers: {
          ...token(),
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Article mis à jour avec succès !");
      navigate("/");
    } catch (error) {
      console.error("Erreur mise à jour article :", error);
      alert("Erreur lors de la mise à jour.");
    }
    setLoading(false);
  };

  return (
    <section className="update-article-section">
    <h2 className="update-article-title">Modifier l'article</h2>
    <form
        className="update-article-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
    >
        <div className="update-article-group">
        <label className="update-article-label" htmlFor="title">Titre :</label>
        <input
            className="update-article-input-text"
            type="text"
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
        />
        </div>

        <div className="update-article-group">
        <label className="update-article-label" htmlFor="description">Description :</label>
        <textarea
            className="update-article-textarea-description"
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            rows={3}
            required
        />
        </div>

        <div className="update-article-group">
        <label className="update-article-label" htmlFor="content">Contenu :</label>
        <textarea
            className="update-article-textarea-content"
            id="content"
            name="content"
            value={inputs.content}
            onChange={handleChange}
            rows={6}
            required
        />
        </div>

        <div className="update-article-group">
        <label className="update-article-label">Catégories :</label>
        <div className="update-article-categories">
            {categoriesList.map((cat) => (
            <label
                key={cat._id}
                className="update-article-category-label"
            >
                <input
                type="checkbox"
                value={cat._id}
                checked={inputs.selectedCategories.includes(cat._id)}
                onChange={handleCategoryChange}
                className="update-article-checkbox"
                />
                {cat.name}
            </label>
            ))}
        </div>
        </div>

        <div className="update-article-group">
        <label className="update-article-label" htmlFor="image">Image :</label>
        {existingImage && (
            <div className="update-article-existing-image-container">
            <p className="update-article-existing-image-label">Image actuelle :</p>
            <img
                src={`http://localhost:4000/${existingImage}`}
                alt="Image actuelle"
                className="update-article-existing-image"
            />
            </div>
        )}
        <input
            className="update-article-input-file"
            type="file"
            accept="image/*"
            id="image"
            onChange={handleFileChange}
        />
        </div>

        <button
        className="update-article-button"
        type="submit"
        disabled={loading}
        >
        {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
    </form>
    </section>
  );
};

export default UpdateArticle;
