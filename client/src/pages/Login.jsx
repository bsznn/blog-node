import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css/pages/login.css";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.password.trim() === "" || inputs.email.trim() === "") {
      return setErr("Veuillez remplir tous les champs.");
    }

    axios
      .post("http://localhost:4000/login", inputs)
      .then((res) => {
        if (res.data.token) {
          auth.login({
            token: res.data.token,
            id: res.data.id,
            login: res.data.login || res.data.email,
            role: res.data.role,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          window.alert("Identifiant ou mot de passe incorrect");
        } else {
          window.alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
      });
  };

  return (
    <main className="login-container">
      <section className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>

          <label htmlFor="email">Adresse mail :</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="exemple@mail.com"
            className="login-input"
          />

          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Mot de passe"
            className="login-input"
          />

          <button type="submit" className="login-button">Se connecter</button>

          <p className="login-text">
            Pas inscrit ? <Link to="/register">Inscrivez-vous !</Link>
          </p>

          {err && <span className="login-error">{err}</span>}
        </form>
      </section>
    </main>
  );
}
