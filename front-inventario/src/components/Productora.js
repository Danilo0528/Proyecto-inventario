import React, { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../services/productoraService';
import ProductoraForm from './ProductoraForm';

const Productora = () => {
  const [productoras, setProductoras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentProductora, setCurrentProductora] = useState(null);

  useEffect(() => {
    fetchProductoras();
  }, []);

  const fetchProductoras = async () => {
    try {
      const { data } = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.error('Error al obtener productoras:', error);
    }
  };

  const handleSave = async (productora) => {
    try {
      if (currentProductora) {
        await updateProductora(currentProductora._id, productora);
      } else {
        await createProductora(productora);
      }
      fetchProductoras();
      setShowForm(false);
      setCurrentProductora(null);
    } catch (error) {
      console.error('Error al guardar la productora:', error);
    }
  };

  const handleEdit = (productora) => {
    setCurrentProductora(productora);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductora(id);
      fetchProductoras();
    } catch (error) {
      console.error('Error al eliminar la productora:', error);
    }
  };

  return (
    <div>
      <h2>Módulo Productora</h2>
      <button onClick={() => { setShowForm(true); setCurrentProductora(null); }}>Nueva Productora</button>
      {showForm && <ProductoraForm onSave={handleSave} currentProductora={currentProductora} />}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((productora) => (
            <tr key={productora._id}>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(productora)}>Editar</button>
                <button onClick={() => handleDelete(productora._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productora;
