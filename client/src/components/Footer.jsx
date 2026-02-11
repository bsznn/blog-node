import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../assets/css/components/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>Actu’Web</h3>
          <p>Votre regard sur l’actualité, chaque jour.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Accueil</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>
          <a href="#top">Haut de page ↑</a>
        </div>

        <div className="footer-socials">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Actu’Web — Tous droits réservés.</p>
      </div>
    </footer>
  );
}
