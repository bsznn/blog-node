import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/pages/error-auth.css"

export default function ErrorAuth() {
  return (
    <main className="error-auth-container">
      <section>
        <h1>Accès refusé</h1>
        <p>Veuillez vous connecter pour accéder à cette page.</p>
        <Link to="/login" className="btn-primary">
          Se connecter
        </Link>
      </section>
    </main>
  );
}
