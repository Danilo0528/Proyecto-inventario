import React, { useState, useEffect } from 'react';

const ProductoraForm = ({ onSave, currentProductora }) => {
  const [productora, setProductora] = useState({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });

  useEffect(() => {
    if (currentProductora) {
      setProductora(currentProductora);
    }
  }, [currentProductora]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductora({ ...productora, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productora);
    setProductora({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={productora.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <select name="estado" value={productora.estado} onChange={handleChange}>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <input
        type="text"
        name="slogan"
        value={productora.slogan}
        onChange={handleChange}
        placeholder="Slogan"
      />
      <textarea
        name="descripcion"
        value={productora.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      ></textarea>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductoraForm;
