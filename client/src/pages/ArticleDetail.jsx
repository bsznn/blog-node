import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import "../assets/css/pages/article-detail.css"

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement de l’article :", err);
        setError("Impossible de charger l’article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Chargement de l’article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Aucun article trouvé.</p>;

  return (
    <>
      <div className="container article-detail">
        <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>

        <h1 className="article-title">{article.title}</h1>

        {article.userId && (
          <p className="article-author">
            Auteur : {article.userId.login || "Utilisateur inconnu"}
          </p>
        )}

        <p className="article-description">{article.description}</p>

        {article.image && article.image.src && (
          <img
            src={`http://localhost:4000/assets/img/${article.image.src}`}
            alt={article.image.alt || article.title}
            className="article-image"
          />
        )}

        {article.content && (
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        )}

        <p className="article-date">
          Publié le :{" "}
          {new Date(article.createdAt).toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>

        {user && article.userId && article.userId._id === user.id && (
          <div className="article-actions">
            <button className="btn secondary" onClick={() => navigate(`/edit/${article._id}`)}>
              Modifier
            </button>
            <button className="btn danger" onClick={() => navigate(`/delete/${article._id}`)}>
              Supprimer
            </button>
          </div>
        )}
      </div>

      <style>{`
        
      `}</style>
    </>
  );
};

export default ArticleDetail;
