import React, { useState, useEffect } from 'react';

const GeneroForm = ({ onSave, currentGenero, onClose }) => {
  const [genero, setGenero] = useState({ nombre: '', estado: 'Activo', descripcion: '' });

  useEffect(() => {
    if (currentGenero) {
      setGenero(currentGenero);
    } else {
        setGenero({ nombre: '', estado: 'Activo', descripcion: '' });
    }
  }, [currentGenero]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenero({ ...genero, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(genero);
  };

  return (
    <div className="card bg-dark text-white mb-4">
        <div className="card-body">
            <h5 className="card-title">{currentGenero ? 'Editar Género' : 'Nuevo Género'}</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={genero.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select className="form-select" id="estado" name="estado" value={genero.estado} onChange={handleChange}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" value={genero.descripcion} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
  );
};

export default GeneroForm;