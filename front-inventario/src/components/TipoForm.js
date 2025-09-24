import React, { useState, useEffect } from 'react';

const TipoForm = ({ onSave, currentTipo, onClose }) => {
  const [tipo, setTipo] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    if (currentTipo) {
      setTipo(currentTipo);
    } else {
        setTipo({ nombre: '', descripcion: '' });
    }
  }, [currentTipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTipo({ ...tipo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(tipo);
  };

  return (
    <div className="card bg-dark text-white mb-4">
        <div className="card-body">
            <h5 className="card-title">{currentTipo ? 'Editar Tipo' : 'Nuevo Tipo'}</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={tipo.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" value={tipo.descripcion} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
  );
};

export default TipoForm;