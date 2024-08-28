import React from 'react';
import Personajes from './Personajes';
import ViewPlanet from './ViewPlanet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Ruta principal que muestra los personajes */}
          <Route path="/" element={<Personajes />} />
          
          {/* Ruta para ver un planeta específico */}
          <Route path="/planets/:planetId" element={<ViewPlanet />} />
          
          {/* Ruta para ver todos los personajes */}
          <Route path="/characters" element={<Personajes />} />
          
          {/* Otras rutas */}
        </Routes>
      </Router>
    </div>
  );
}

export default Main;
