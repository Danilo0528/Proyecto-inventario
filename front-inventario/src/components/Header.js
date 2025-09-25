import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="brand-icon me-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L28 9V23L16 28L4 23V9L16 4Z" fill="url(#gradient)" stroke="white" strokeWidth="2"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
              <defs>
                <linearGradient id="gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff6b35"/>
                  <stop offset="1" stopColor="#f39c12"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          CineFlix
        </Link>
        
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                to="/"
              >
                <i className="fas fa-home me-1"></i>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                to="/medias"
              >
                <i className="fas fa-film me-1"></i>
                Películas
              </NavLink>
            </li>
          </ul>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-cog me-1"></i>
                Administración
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="adminDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/generos">
                    <i className="fas fa-tags me-2"></i>
                    Géneros
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/directores">
                    <i className="fas fa-user-tie me-2"></i>
                    Directores
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/productoras">
                    <i className="fas fa-building me-2"></i>
                    Productoras
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/tipos">
                    <i className="fas fa-list me-2"></i>
                    Tipos
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;