import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { token } from "../context/token";

import "../assets/css/pages/home.css"

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/articles", { withCredentials: true });
      setArticles(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet article ?")) return;

    try {
      await axios.delete(`http://localhost:4000/articles/delete/${id}/${auth.user.id}`, {headers: token()});
      setArticles(articles.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };

  return (
    <>
      <main className="container" id="home">
        <h2 className="section-title">Articles récents</h2>
        <div className="articles-list">
          {articles.map((article) => (
            <article className="article-card" key={article._id}>
              {article.image && article.image.src && (
                <img
                  src={`http://localhost:4000/assets/img/${article.image.src}`}
                  alt={article.image.alt || article.title}
                  className="article-image"
                />
              )}
              <div className="article-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description.slice(0, 140)}...</p>
                <div className="article-actions">
                  <button className="btn primary" onClick={() => navigate(`/articles/${article._id}`)}>Voir</button>

                  {article?.userId?._id === auth?.user?.id && (
                    <>
                      <button className="btn secondary" onClick={() => navigate(`/edit/${article._id}`)}>Modifier</button>
                      <button className="btn danger" onClick={() => handleDelete(article._id)}>Supprimer</button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
