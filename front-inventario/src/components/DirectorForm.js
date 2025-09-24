import React, { useState, useEffect } from 'react';

const DirectorForm = ({ onSave, currentDirector }) => {
  const [director, setDirector] = useState({ nombres: '', estado: 'Activo' });

  useEffect(() => {
    if (currentDirector) {
      setDirector(currentDirector);
    }
  }, [currentDirector]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDirector({ ...director, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(director);
    setDirector({ nombres: '', estado: 'Activo' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombres"
        value={director.nombres}
        onChange={handleChange}
        placeholder="Nombres"
        required
      />
      <select name="estado" value={director.estado} onChange={handleChange}>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default DirectorForm;
