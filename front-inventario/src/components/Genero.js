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
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Módulo Género</h2>
            <button className="btn btn-primary" onClick={() => { setShowForm(true); setCurrentGenero(null); }}>Nuevo Género</button>
        </div>
        {showForm && <GeneroForm onSave={handleSave} currentGenero={currentGenero} onClose={() => setShowForm(false)} />}
        <table className="table table-dark table-striped">
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
                            <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(genero)}>Editar</button>
                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(genero._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Genero;