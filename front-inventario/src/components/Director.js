import React, { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../services/directorService';
import DirectorForm from './DirectorForm';

const Director = () => {
  const [directores, setDirectores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDirector, setCurrentDirector] = useState(null);

  useEffect(() => {
    fetchDirectores();
  }, []);

  const fetchDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.error('Error al obtener directores:', error);
    }
  };

  const handleSave = async (director) => {
    try {
      if (currentDirector) {
        await updateDirector(currentDirector._id, director);
      } else {
        await createDirector(director);
      }
      fetchDirectores();
      setShowForm(false);
      setCurrentDirector(null);
    } catch (error) {
      console.error('Error al guardar el director:', error);
    }
  };

  const handleEdit = (director) => {
    setCurrentDirector(director);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDirector(id);
      fetchDirectores();
    } catch (error) {
      console.error('Error al eliminar el director:', error);
    }
  };

  return (
    <div>
      <h2>Módulo Director</h2>
      <button onClick={() => { setShowForm(true); setCurrentDirector(null); }}>Nuevo Director</button>
      {showForm && <DirectorForm onSave={handleSave} currentDirector={currentDirector} />}
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director._id}>
              <td>{director.nombres}</td>
              <td>{director.estado}</td>
              <td>
                <button onClick={() => handleEdit(director)}>Editar</button>
                <button onClick={() => handleDelete(director._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Director;
