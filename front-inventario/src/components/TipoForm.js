import React, { useState, useEffect } from 'react';

const TipoForm = ({ onSave, currentTipo }) => {
  const [tipo, setTipo] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    if (currentTipo) {
      setTipo(currentTipo);
    }
  }, [currentTipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTipo({ ...tipo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(tipo);
    setTipo({ nombre: '', descripcion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={tipo.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <textarea
        name="descripcion"
        value={tipo.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      ></textarea>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default TipoForm;
