// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Counter from './Counter/Counter';
import DataFetcher from './DataFetcher/DataFetcher';
import TodoList from './ToDoList/ToDoList';
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <h1>React Ejercicios</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Reloj</Link>
            </li>
            <li>
              <Link to="/data-fetcher">Interacción con API</Link>
            </li>
            <li>
              <Link to="/todo-list">Lista de Tareas</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/data-fetcher" element={<DataFetcher />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;