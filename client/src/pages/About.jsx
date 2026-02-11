import React from "react";
import "../assets/css/pages/about.css";

export default function About() {
  return (
    <main className="about-container">
      <section className="about-content">
        <h1 className="about-title">À propos de notre blog</h1>

        <p className="about-intro">
          Bienvenue sur <strong>Actu’Web</strong>, un espace d’information et
          d’analyse dédié à l’actualité sous toutes ses formes. Nous croyons que
          comprendre le monde d’aujourd’hui, c’est avant tout savoir le lire,
          l’interpréter et le questionner.
        </p>

        <div className="about-section">
          <h2>Notre mission</h2>
          <p>
            Offrir une information claire, vérifiée et accessible à tous.  
            Nous nous efforçons de proposer une lecture équilibrée de
            l’actualité, en mêlant rigueur journalistique et ouverture d’esprit.
          </p>
        </div>

        <div className="about-section">
          <h2>Nos valeurs</h2>
          <ul>
            <li><strong>Indépendance :</strong> notre contenu est libre de toute influence politique ou commerciale.</li>
            <li><strong>Transparence :</strong> nos sources sont citées et nos informations vérifiées.</li>
            <li><strong>Engagement :</strong> nous mettons en avant des sujets qui ont du sens pour nos lecteurs.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Notre équipe</h2>
          <p>
            Composée de rédacteurs passionnés, de journalistes indépendants et
            de contributeurs invités, notre équipe partage une même conviction :
            <em> l’information doit rester un bien commun.</em>
          </p>
        </div>

        <p className="about-closing">
          Merci de faire partie de cette aventure. Ensemble, faisons vivre une
          information libre, vivante et exigeante.
        </p>
      </section>
    </main>
  );
}
