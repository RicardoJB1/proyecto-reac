import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ListaDocentes from './Trabajadores/Docente';
import ListaAlumnos from './Alumnos/ListaAlumnos';  // Importa ListaAlumnos

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ListaDocentes />
    <ListaAlumnos />    {/* Renderiza ListaAlumnos aquí */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();

