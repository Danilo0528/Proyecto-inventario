import React, { useState, useEffect } from 'react';

const ProductoraForm = ({ onSave, currentProductora, onClose }) => {
  const [productora, setProductora] = useState({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });

  useEffect(() => {
    if (currentProductora) {
      setProductora(currentProductora);
    } else {
        setProductora({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
    }
  }, [currentProductora]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductora({ ...productora, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productora);
  };

  return (
    <div className="card bg-dark text-white mb-4">
        <div className="card-body">
            <h5 className="card-title">{currentProductora ? 'Editar Productora' : 'Nueva Productora'}</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={productora.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select className="form-select" id="estado" name="estado" value={productora.estado} onChange={handleChange}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="slogan" className="form-label">Slogan</label>
                    <input type="text" className="form-control" id="slogan" name="slogan" value={productora.slogan} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" value={productora.descripcion} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
  );
};

export default ProductoraForm;