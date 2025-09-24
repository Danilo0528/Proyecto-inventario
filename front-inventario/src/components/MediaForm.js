import React, { useState, useEffect } from 'react';
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';

const MediaForm = ({ onSave, currentMedia }) => {
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
    }
  }, [currentMedia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedia({ ...media, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(media);
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="serial" value={media.serial} onChange={handleChange} placeholder="Serial" required />
      <input type="text" name="titulo" value={media.titulo} onChange={handleChange} placeholder="Título" required />
      <textarea name="sinopsis" value={media.sinopsis} onChange={handleChange} placeholder="Sinopsis"></textarea>
      <input type="url" name="url" value={media.url} onChange={handleChange} placeholder="URL" required />
      <input type="url" name="imagen" value={media.imagen} onChange={handleChange} placeholder="URL Imagen" required />
      <input type="number" name="anioEstreno" value={media.anioEstreno} onChange={handleChange} placeholder="Año de Estreno" required />

      <select name="genero" value={media.genero} onChange={handleChange} required>
        <option value="">Seleccione Género</option>
        {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}>
      </select>

      <select name="director" value={media.director} onChange={handleChange} required>
        <option value="">Seleccione Director</option>
        {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}>
      </select>

      <select name="productora" value={media.productora} onChange={handleChange} required>
        <option value="">Seleccione Productora</option>
        {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}>
      </select>

      <select name="tipo" value={media.tipo} onChange={handleChange} required>
        <option value="">Seleccione Tipo</option>
        {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}>
      </select>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default MediaForm;
