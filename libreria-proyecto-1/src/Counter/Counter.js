// src/Clock/index.js
import React, { useState, useEffect } from 'react';
import './Counter.css';

const Clock = () => {
  // Estado para almacenar la hora actual
  const [time, setTime] = useState('');

  useEffect(() => {
    // Función para actualizar la hora
    const updateTime = () => {
      const now = new Date(); // Obtiene la fecha y hora actual
      const options = {
        timeZone: 'America/Guatemala', // Zona horaria de Guatemala
        hour: '2-digit', // Formato de horas de 2 dígitos
        minute: '2-digit', // Formato de minutos de 2 dígitos
        second: '2-digit', // Formato de segundos de 2 dígitos
      };
      setTime(now.toLocaleTimeString('es-GT', options)); // Actualiza el estado con la hora formateada
    };

    // Establece un intervalo que actualiza la hora cada segundo
    const timerId = setInterval(updateTime, 1000);
    updateTime(); // Establece la hora inicial inmediatamente

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock">
      <h1>Hora en Guatemala: {time}</h1> {/* Muestra la hora actual */}
    </div>
  );
};

export default Clock;
