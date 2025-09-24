import React, { useState, useEffect } from 'react';

const GeneroForm = ({ onSave, currentGenero }) => {
  const [genero, setGenero] = useState({ nombre: '', estado: 'Activo', descripcion: '' });

  useEffect(() => {
    if (currentGenero) {
      setGenero(currentGenero);
    }
  }, [currentGenero]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenero({ ...genero, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(genero);
    setGenero({ nombre: '', estado: 'Activo', descripcion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={genero.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <select name="estado" value={genero.estado} onChange={handleChange}>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <textarea
        name="descripcion"
        value={genero.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      ></textarea>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default GeneroForm;
