import React, { useState, useEffect } from 'react';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../services/mediaService';
import MediaForm from './MediaForm';

const Media = () => {
  const [medias, setMedias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);

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

  const handleSave = async (media) => {
    try {
      if (currentMedia) {
        await updateMedia(currentMedia._id, media);
      } else {
        await createMedia(media);
      }
      fetchMedias();
      setShowForm(false);
      setCurrentMedia(null);
    } catch (error) {
      console.error('Error al guardar la media:', error);
    }
  };

  const handleEdit = (media) => {
    setCurrentMedia(media);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      fetchMedias();
    } catch (error) {
      console.error('Error al eliminar la media:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Catálogo de Películas</h2>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setCurrentMedia(null); }}>Nueva Media</button>
      </div>
      {showForm && <MediaForm onSave={handleSave} currentMedia={currentMedia} onClose={() => setShowForm(false)} />}
      <div className="media-grid">
        {medias.map((media) => (
          <div key={media._id} className="media-card">
            <img src={media.imagen} alt={media.titulo} />
            <div className="media-card-body">
              <h5 className="media-card-title">{media.titulo}</h5>
              <p className="media-card-text">{media.anioEstreno}</p>
              <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(media)}>Editar</button>
              <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(media._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Media;