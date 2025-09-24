import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Genero from './components/Genero';
import Director from './components/Director';
import Productora from './components/Productora';
import Tipo from './components/Tipo';
import Media from './components/Media';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generos' element={<Genero />} />
        <Route path='/directores' element={<Director />} />
        <Route path='/productoras' element={<Productora />} />
        <Route path='/tipos' element={<Tipo />} />
        <Route path='/medias' element={<Media />} />
      </Routes>
    </div>
  );
}

export default App;
