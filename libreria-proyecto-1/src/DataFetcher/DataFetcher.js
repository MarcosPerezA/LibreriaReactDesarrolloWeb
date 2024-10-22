// src/DataFetcher/index.js
import React, { useState } from 'react';
import './DataFetcher.css';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [opcionElegida, setOpcionElegida] = useState('');

  const fetchData = async () => {
    if (!opcionElegida) return; // No hacer la llamada si no hay opción elegida

    try {
      const response = await fetch(`https://localhost:7193/WeatherForecast?opcionElegida=${encodeURIComponent(opcionElegida)}`, {
        method: 'GET', // Mantener GET
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleInputChange = (event) => {
    setOpcionElegida(event.target.value);
  };

  return (
    <div className="data-fetcher">
      <h2>Datos obtenidos de la API:</h2>
      <input
        type="text"
        value={opcionElegida}
        onChange={handleInputChange}
        placeholder="Ingresa la opción elegida"
      />
      <button onClick={fetchData}>Buscar</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
