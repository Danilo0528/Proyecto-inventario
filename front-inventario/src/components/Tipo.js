import React, { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../services/tipoService';
import TipoForm from './TipoForm';

const Tipo = () => {
  const [tipos, setTipos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTipo, setCurrentTipo] = useState(null);

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data);
    } catch (error) {
      console.error('Error al obtener tipos:', error);
    }
  };

  const handleSave = async (tipo) => {
    try {
      if (currentTipo) {
        await updateTipo(currentTipo._id, tipo);
      } else {
        await createTipo(tipo);
      }
      fetchTipos();
      setShowForm(false);
      setCurrentTipo(null);
    } catch (error) {
      console.error('Error al guardar el tipo:', error);
    }
  };

  const handleEdit = (tipo) => {
    setCurrentTipo(tipo);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTipo(id);
      fetchTipos();
    } catch (error) {
      console.error('Error al eliminar el tipo:', error);
    }
  };

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Módulo Tipo</h2>
            <button className="btn btn-primary" onClick={() => { setShowForm(true); setCurrentTipo(null); }}>Nuevo Tipo</button>
        </div>
                <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tipos.map((tipo) => (
                    <tr key={tipo._id}>
                        <td>{tipo.nombre}</td>
                        <td>{tipo.descripcion}</td>
                        <td>
                            <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(tipo)}>Editar</button>
                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(tipo._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Modal para TipoForm */}
        <div className={`modal fade ${showForm ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: showForm ? 'rgba(0,0,0,0.5)' : '' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentTipo ? 'Editar Tipo' : 'Nuevo Tipo'}</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowForm(false)}></button>
                    </div>
                    <div className="modal-body">
                        <TipoForm onSave={handleSave} currentTipo={currentTipo} onClose={() => setShowForm(false)} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Tipo;