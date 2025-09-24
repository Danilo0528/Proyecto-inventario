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
    <div>
      <h2>Módulo Media</h2>
      <button onClick={() => { setShowForm(true); setCurrentMedia(null); }}>Nueva Media</button>
      {showForm && <MediaForm onSave={handleSave} currentMedia={currentMedia} />}
      <table>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Título</th>
            <th>Año Estreno</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((media) => (
            <tr key={media._id}>
              <td>{media.serial}</td>
              <td>{media.titulo}</td>
              <td>{media.anioEstreno}</td>
              <td>{media.genero?.nombre}</td>
              <td>{media.director?.nombres}</td>
              <td>{media.productora?.nombre}</td>
              <td>{media.tipo?.nombre}</td>
              <td>
                <button onClick={() => handleEdit(media)}>Editar</button>
                <button onClick={() => handleDelete(media._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Media;
