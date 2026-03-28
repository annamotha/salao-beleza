import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRoutes } from './routes';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
    <h1>Seja bem-vindo!</h1>
      <ul>
        <li><Link to="/agendamentos">Lista de Agendamentos</Link></li>
      </ul>
      <AppRoutes />
      </>
  );
}

export default App;
