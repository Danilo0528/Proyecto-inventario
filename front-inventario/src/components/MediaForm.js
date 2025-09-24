import React, { useState, useEffect } from 'react';
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';

const MediaForm = ({ onSave, currentMedia, onClose }) => {
  const [media, setMedia] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const { data: generosData } = await getGeneros();
        setGeneros(generosData.filter(g => g.estado === 'Activo'));

        const { data: directoresData } = await getDirectores();
        setDirectores(directoresData.filter(d => d.estado === 'Activo'));

        const { data: productorasData } = await getProductoras();
        setProductoras(productorasData.filter(p => p.estado === 'Activo'));

        const { data: tiposData } = await getTipos();
        setTipos(tiposData);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (currentMedia) {
      setMedia({
        ...currentMedia,
        genero: currentMedia.genero._id,
        director: currentMedia.director._id,
        productora: currentMedia.productora._id,
        tipo: currentMedia.tipo._id
      });
    } else {
        setMedia({
            serial: '',
            titulo: '',
            sinopsis: '',
            url: '',
            imagen: '',
            anioEstreno: '',
            genero: '',
            director: '',
            productora: '',
            tipo: ''
        });
    }
  }, [currentMedia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedia({ ...media, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(media);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="serial" className="form-label">Serial</label>
                    <input type="text" className="form-control" id="serial" name="serial" value={media.serial} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input type="text" className="form-control" id="titulo" name="titulo" value={media.titulo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="sinopsis" className="form-label">Sinopsis</label>
                    <textarea className="form-control" id="sinopsis" name="sinopsis" value={media.sinopsis} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL</label>
                    <input type="url" className="form-control" id="url" name="url" value={media.url} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">URL Imagen</label>
                    <input type="url" className="form-control" id="imagen" name="imagen" value={media.imagen} onChange={handleChange} required />
                </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="anioEstreno" className="form-label">Año de Estreno</label>
                    <input type="number" className="form-control" id="anioEstreno" name="anioEstreno" value={media.anioEstreno} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Género</label>
                    <select className="form-select" id="genero" name="genero" value={media.genero} onChange={handleChange} required>
                        <option value="">Seleccione Género</option>
                        {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="director" className="form-label">Director</label>
                    <select className="form-select" id="director" name="director" value={media.director} onChange={handleChange} required>
                        <option value="">Seleccione Director</option>
                        {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="productora" className="form-label">Productora</label>
                    <select className="form-select" id="productora" name="productora" value={media.productora} onChange={handleChange} required>
                        <option value="">Seleccione Productora</option>
                        {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <select className="form-select" id="tipo" name="tipo" value={media.tipo} onChange={handleChange} required>
                        <option value="">Seleccione Tipo</option>
                        {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}>
                    </select>
                </div>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default MediaForm;