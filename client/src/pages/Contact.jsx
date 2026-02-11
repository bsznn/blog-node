import React from "react";
import "../assets/css/pages/contact.css";

export default function Contact() {
  return (
    <main className="contact-container">
      <section className="contact-content">
        <h1 className="contact-title">Contactez la rédaction</h1>

        <p className="contact-text">
          Vous souhaitez nous écrire, proposer un sujet, signaler une erreur ou collaborer avec notre équipe ?  
          Nous serions ravis d’échanger avec vous.
        </p>

        <div className="contact-info">
          <p><strong>Rédaction :</strong> contact@blog-actu.fr</p>
          <p><strong>Publicité & partenariats :</strong> partenariat@blog-actu.fr</p>
          <p><strong>Adresse :</strong> 13 rue Henri Barbusse, 92110 Clichy, France</p>
        </div>

        <div className="map-container">
          <iframe
            title="Localisation de la rédaction"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999222555764!2d2.3080393156746974!3d48.89191607928927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fbd24b1c5ef%3A0x956a4566a6f7b2d1!2s13%20Rue%20Henri%20Barbusse%2C%2092110%20Clichy!5e0!3m2!1sfr!2sfr!4v1699989999999!5m2!1sfr!2sfr"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="contact-links">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>

        <p className="contact-footer">
          Suivez-nous pour ne rien manquer de l’actualité quotidienne 🌍
        </p>
      </section>
    </main>
  );
}
