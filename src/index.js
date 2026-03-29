import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Pages/Dashboard'; // O React entende que deve ler o index.jsx dentro dessa pasta
import './Styles/global.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);