import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/generos">Géneros</Link></li>
        <li><Link to="/directores">Directores</Link></li>
        <li><Link to="/productoras">Productoras</Link></li>
        <li><Link to="/tipos">Tipos</Link></li>
        <li><Link to="/medias">Media</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
