import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/components/navbar.css";

export default function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <header className="navbar-header">
      <div className="header-overlay">
        <nav className="navbar navbar-expand-md navbar-dark bg-transparent px-4 py-3">
          <NavLink className="navbar-brand fw-bold fs-3 text-uppercase" to="/">
            Actu’Web          
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  Publish
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center ms-3">
              {auth.user ? (
                <>
                  <span className="text-light me-3 fw-semibold">
                    👤 {auth.user.login}
                  </span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="btn btn-outline-light btn-sm me-2"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-light btn-sm"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="header-text text-center text-light mt-4">
          <h1 className="display-4 fw-bold">Actu’Web</h1>
          <p className="lead fst-italic">Votre info, sans détour !</p>
        </div>
      </div>
    </header>
  );
}
