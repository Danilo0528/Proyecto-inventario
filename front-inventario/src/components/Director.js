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
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Módulo Director</h2>
            <button className="btn btn-primary" onClick={() => { setShowForm(true); setCurrentDirector(null); }}>Nuevo Director</button>
        </div>
                <table className="table table-dark table-striped">
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
                            <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(director)}>Editar</button>
                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(director._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Modal para DirectorForm */}
        <div className={`modal fade ${showForm ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: showForm ? 'rgba(0,0,0,0.5)' : '' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentDirector ? 'Editar Director' : 'Nuevo Director'}</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowForm(false)}></button>
                    </div>
                    <div className="modal-body">
                        <DirectorForm onSave={handleSave} currentDirector={currentDirector} onClose={() => setShowForm(false)} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Director;