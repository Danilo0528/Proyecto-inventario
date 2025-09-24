import React, { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../services/generoService';
import GeneroForm from './GeneroForm';

const Genero = () => {
  const [generos, setGeneros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentGenero, setCurrentGenero] = useState(null);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.error('Error al obtener géneros:', error);
    }
  };

  const handleSave = async (genero) => {
    try {
      if (currentGenero) {
        await updateGenero(currentGenero._id, genero);
      } else {
        await createGenero(genero);
      }
      fetchGeneros();
      setShowForm(false);
      setCurrentGenero(null);
    } catch (error) {
      console.error('Error al guardar el género:', error);
    }
  };

  const handleEdit = (genero) => {
    setCurrentGenero(genero);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGenero(id);
      fetchGeneros();
    } catch (error) {
      console.error('Error al eliminar el género:', error);
    }
  };

  return (
    <div>
      <h2>Módulo Género</h2>
      <button onClick={() => { setShowForm(true); setCurrentGenero(null); }}>Nuevo Género</button>
      {showForm && <GeneroForm onSave={handleSave} currentGenero={currentGenero} />}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero._id}>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{genero.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(genero)}>Editar</button>
                <button onClick={() => handleDelete(genero._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Genero;
