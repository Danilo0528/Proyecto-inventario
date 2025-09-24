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
    <div>
      <h2>Módulo Tipo</h2>
      <button onClick={() => { setShowForm(true); setCurrentTipo(null); }}>Nuevo Tipo</button>
      {showForm && <TipoForm onSave={handleSave} currentTipo={currentTipo} />}
      <table>
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
                <button onClick={() => handleEdit(tipo)}>Editar</button>
                <button onClick={() => handleDelete(tipo._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tipo;
