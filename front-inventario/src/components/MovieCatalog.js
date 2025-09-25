import React, { useState, useEffect } from 'react';
import { getMedias } from '../services/mediaService';

const MovieCatalog = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedias();
  }, []);

  useEffect(() => {
    filterMedias();
  }, [medias, searchTerm, selectedGenre]);

  const fetchMedias = async () => {
    try {
      setLoading(true);
      const { data } = await getMedias();
      setMedias(data);
      setFilteredMedias(data);
    } catch (error) {
      console.error('Error al obtener medias:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMedias = () => {
    let filtered = medias;

    if (searchTerm) {
      filtered = filtered.filter(media =>
        media.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        media.sinopsis?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(media => media.genero?.nombre === selectedGenre);
    }

    setFilteredMedias(filtered);
  };

  const getUniqueGenres = () => {
    const genres = medias.map(media => media.genero?.nombre).filter(Boolean);
    return [...new Set(genres)];
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
          <div className="text-center">
            <div className="spinner-border text-warning mb-3" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h4 className="text-muted">Cargando catálogo...</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{paddingTop: '100px'}}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title fade-in-up">Descubre Tu Próxima Película Favorita</h1>
          <p className="hero-subtitle fade-in-up">Explora nuestra colección de películas y series cuidadosamente seleccionadas</p>
          
          {/* Search Bar */}
          <div className="row justify-content-center mb-4 fade-in-up">
            <div className="col-md-8 col-lg-6">
              <div className="position-relative">
                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Buscar películas, series..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '1.1rem',
                    padding: '1rem 1rem 1rem 3rem',
                    borderRadius: '50px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Genre Filters */}
          <div className="genre-filters mb-4 fade-in-up">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <button
                className={`btn ${selectedGenre === 'all' ? 'btn-primary' : 'btn-outline-light'} btn-sm`}
                onClick={() => handleGenreFilter('all')}
                style={{borderRadius: '20px', padding: '0.5rem 1.5rem'}}
              >
                Todos
              </button>
              {getUniqueGenres().map(genre => (
                <button
                  key={genre}
                  className={`btn ${selectedGenre === genre ? 'btn-primary' : 'btn-outline-light'} btn-sm`}
                  onClick={() => handleGenreFilter(genre)}
                  style={{borderRadius: '20px', padding: '0.5rem 1.5rem'}}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">
            {searchTerm || selectedGenre !== 'all' ? 'Resultados de búsqueda' : 'Catálogo Completo'}
            <span className="text-muted ms-2">({filteredMedias.length} películas)</span>
          </h3>
          
          {(searchTerm || selectedGenre !== 'all') && (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('all');
              }}
            >
              <i className="fas fa-times me-1"></i>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Movies Grid */}
        {filteredMedias.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-film" style={{fontSize: '4rem', color: 'var(--text-muted)'}}></i>
            </div>
            <h4 className="text-muted">No se encontraron películas</h4>
            <p className="text-muted">Intenta con otros términos de búsqueda o filtros</p>
          </div>
        ) : (
          <div className="media-grid">
            {filteredMedias.map((media, index) => (
              <div key={media._id} className="media-card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="position-relative">
                  <img src={media.imagen || 'https://via.placeholder.com/300x450/333/fff?text=Sin+Imagen'} alt={media.titulo} />
                  
                  {/* Rating overlay */}
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-warning text-dark fw-bold">
                      <i className="fas fa-star me-1"></i>
                      {(Math.random() * 2 + 8).toFixed(1)}
                    </span>
                  </div>

                  {/* Year overlay */}
                  <div className="position-absolute bottom-0 start-0 m-2">
                    <span className="badge" style={{background: 'rgba(0,0,0,0.8)'}}>
                      {media.anioEstreno}
                    </span>
                  </div>
                </div>

                <div className="media-card-body">
                  <h5 className="media-card-title">{media.titulo}</h5>
                </div>

                {/* Descripción hover */}
                <div className="media-card-description">
                  <h5>{media.titulo}</h5>
                  <div className="mb-3">
                    <span className="badge bg-primary me-2">{media.genero?.nombre}</span>
                    <span className="badge bg-secondary me-2">{media.anioEstreno}</span>
                    <span className="badge bg-info">{media.tipo?.nombre}</span>
                  </div>
                  <p>{media.sinopsis || 'Sin descripción disponible'}</p>
                  
                  <div className="mt-3">
                    <small>
                      <i className="fas fa-user-tie me-2"></i>
                      {media.director?.nombres || 'Director no disponible'}
                    </small>
                  </div>
                  
                  <div className="mt-2">
                    <small>
                      <i className="fas fa-building me-2"></i>
                      {media.productora?.nombre || 'Productora no disponible'}
                    </small>
                  </div>

                  <div className="mt-4">
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm me-2"
                    >
                      <i className="fas fa-play me-1"></i>
                      Ver Ahora
                    </a>
                    <button className="btn btn-outline-light btn-sm">
                      <i className="fas fa-heart me-1"></i>
                      Favoritos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCatalog;