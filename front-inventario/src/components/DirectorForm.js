import React, { useState, useEffect } from 'react';

const DirectorForm = ({ onSave, currentDirector, onClose }) => {
  const [director, setDirector] = useState({ nombres: '', estado: 'Activo' });

  useEffect(() => {
    if (currentDirector) {
      setDirector(currentDirector);
    } else {
        setDirector({ nombres: '', estado: 'Activo' });
    }
  }, [currentDirector]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDirector({ ...director, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(director);
  };

  return (
    <div className="card bg-dark text-white mb-4">
        <div className="card-body">
            <h5 className="card-title">{currentDirector ? 'Editar Director' : 'Nuevo Director'}</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input type="text" className="form-control" id="nombres" name="nombres" value={director.nombres} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select className="form-select" id="estado" name="estado" value={director.estado} onChange={handleChange}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
  );
};

export default DirectorForm;