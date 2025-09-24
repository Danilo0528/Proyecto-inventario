import React, { useState, useEffect } from 'react';
import { getMedias } from '../services/mediaService';

const MovieCatalog = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    fetchMedias();
  }, []);

  const fetchMedias = async () => {
    try {
      const { data } = await getMedias();
      setMedias(data);
    } catch (error) {
      console.error('Error al obtener medias:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Catálogo de Películas</h2>
      </div>
      <div className="media-grid">
        {medias.map((media) => (
          <div key={media._id} className="media-card">
            <img src={media.imagen} alt={media.titulo} />
            <div className="media-card-body">
              <h5 className="media-card-title">{media.titulo}</h5>
              <p className="media-card-text">{media.anioEstreno}</p>
              <div className="media-card-description">
                <p>{media.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieCatalog;