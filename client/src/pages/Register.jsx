import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/pages/register.css";

export default function Register() {
  const [inputs, setInputs] = useState({
    login: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputs.email.trim() === "" ||
      inputs.password.trim() === "" ||
      inputs.login.trim() === ""
    ) {
      return setErr("Veuillez remplir tous les champs.");
    }

    axios
      .post("http://localhost:4000/register", inputs)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          window.alert("Identifiant ou mot de passe incorrect");
        } else {
          window.alert(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      });
  };

  return (
    <main className="register-container">
      <section className="register-form">
        <form onSubmit={handleSubmit}>
          <h2>Inscription</h2>

          <label htmlFor="login">Nom d'utilisateur :</label>
          <input
            type="text"
            name="login"
            id="login"
            onChange={handleChange}
            value={inputs.login}
            placeholder="ex: azerty"
            className="register-input"
          />

          <label htmlFor="email">Adresse mail :</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="ex: azerty@exemple.fr"
            className="register-input"
          />

          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Mot de passe"
            className="register-input"
          />

          <button type="submit" className="register-button">
            S'inscrire
          </button>

          <p className="register-text">
            Déjà inscrit ? <Link to="/login">Connectez-vous !</Link>
          </p>

          {err && <span className="register-error">{err}</span>}
        </form>
      </section>
    </main>
  );
}
