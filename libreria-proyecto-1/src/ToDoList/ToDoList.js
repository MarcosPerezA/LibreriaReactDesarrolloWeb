// src/TodoList/index.js
import React, { useReducer, useState } from 'react';
import './ToDoList.css';

// Definimos las acciones que podemos realizar en nuestra aplicación
const ACTIONS = {
  ADD_CATEGORY: 'add-category',     // Acción para agregar una categoría
  DELETE_CATEGORY: 'delete-category', // Acción para eliminar una categoría
  ADD_TODO: 'add-todo',              // Acción para agregar una tarea
  DELETE_TODO: 'delete-todo',        // Acción para eliminar una tarea
  UPDATE_STATUS: 'update-status',     // Acción para actualizar el estado de una tarea
};

// Función reducer que maneja el estado de las categorías y tareas
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_CATEGORY:
      // Agrega una nueva categoría al estado
      return { ...state, categories: { ...state.categories, [action.payload.category]: [] } };

    case ACTIONS.DELETE_CATEGORY:
      // Elimina la categoría del estado
      const { [action.payload.category]: _, ...newCategories } = state.categories;
      return { ...state, categories: newCategories };

    case ACTIONS.ADD_TODO:
      // Agrega una nueva tarea a la categoría especificada
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.category]: [
            ...state.categories[action.payload.category],
            { id: Date.now(), task: action.payload.task, status: 'Not Started' }, // Inicializa el estado de la tarea
          ],
        },
      };

    case ACTIONS.DELETE_TODO:
      // Elimina una tarea de la categoría especificada
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.category]: state.categories[action.payload.category].filter(
            (todo) => todo.id !== action.payload.id // Filtra la tarea que se va a eliminar
          ),
        },
      };
    case ACTIONS.UPDATE_STATUS:
      // Actualiza el estado de una tarea en la categoría especificada
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.category]: state.categories[action.payload.category].map((todo) =>
            todo.id === action.payload.id ? { ...todo, status: action.payload.status, colorStatus: action.payload.colorStatus } : todo // Cambia el estado de la tarea
          ),
        },
      };

    default:
      return state; // Retorna el estado actual si la acción no coincide
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, { categories: {} }); // Estado inicial
  const [task, setTask] = useState(''); // Estado para el texto de la tarea
  const [category, setCategory] = useState(''); // Estado para la categoría seleccionada
  const [newCategory, setNewCategory] = useState(''); // Estado para la nueva categoría a agregar

  // Función para agregar una nueva categoría
  const handleAddCategory = () => {
    if (newCategory.trim()) { // Verifica que la categoría no esté vacía
      dispatch({ type: ACTIONS.ADD_CATEGORY, payload: { category: newCategory } });
      setNewCategory(''); // Limpia el campo de entrada
    }
  };

  // Función para eliminar una categoría
  const handleDeleteCategory = (category) => {
    dispatch({ type: ACTIONS.DELETE_CATEGORY, payload: { category } });
  };

  // Función para agregar una nueva tarea a la categoría seleccionada
  const handleAddTodo = () => {
    if (task.trim() && category in state.categories) { // Verifica que la tarea no esté vacía y que la categoría exista
      dispatch({ type: ACTIONS.ADD_TODO, payload: { task, category } });
      setTask(''); // Limpia el campo de entrada de la tarea
    }
  };

  // Función para eliminar una tarea de la categoría especificada
  const handleDeleteTodo = (id, category) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id, category } });
  };

  // Función para actualizar el estado de una tarea
  const handleUpdateStatus = (id, category, status, colorStatus) => {
    dispatch({ type: ACTIONS.UPDATE_STATUS, payload: { id, category, status, colorStatus } });
  };

  return (
    <div className="todo-list">
      <h1>Lista de Tareas</h1>

      {/* Sección para agregar una nueva categoría */}
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)} // Actualiza el estado de la nueva categoría
          placeholder="Nueva categoría"
        />
        <button onClick={handleAddCategory}>Agregar Categoría</button>
      </div>

      {/* Sección para agregar una nueva tarea */}
      <div className='categoryDiv'>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)} // Actualiza el estado de la tarea
          placeholder="Nueva tarea"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}> // Selector para categorías
          <option value="">Selecciona una categoría</option>
          {Object.keys(state.categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option> // Muestra las categorías existentes
          ))}
        </select>
        <button className='selectButton' onClick={handleAddTodo}>Agregar</button>
      </div>

      {/* Renderiza las categorías y sus tareas */}
      {Object.keys(state.categories).map((cat) => (
        <div key={cat}>
          <h2>
            {cat}
            <button onClick={() => handleDeleteCategory(cat)} style={{ marginLeft: '10px' }}>
              Eliminar Categoría
            </button>
          </h2>
          {state.categories[cat].length > 0 ? ( // Verifica si hay tareas en la categoría
            <ul className="list-unstyled">
            {state.categories[cat].map((todo) => (
              <li key={todo.id} className="d-flex align-items-center justify-content-center" style={{ background: todo.colorStatus }}>
                <div className="col-4 text-center">{todo.task} - Estado: {todo.status}</div>
                <div className="col-2 text-center">
                  <button className="taskButton" onClick={() => handleDeleteTodo(todo.id, cat)}>Eliminar</button>
                </div>
                <div className="col-2 text-center">
                  <button className="taskButton" onClick={() => handleUpdateStatus(todo.id, cat, 'Sin Iniciar', 'white')}>Sin Empezar</button>
                </div>
                <div className="col-2 text-center">
                  <button className="taskButton" onClick={() => handleUpdateStatus(todo.id, cat, 'Iniciada', 'orange')}>Empezada</button>
                </div>
                <div className="col-2 text-center">
                  <button className="taskButton" onClick={() => handleUpdateStatus(todo.id, cat, 'Finalizada', 'green')}>Finalizada</button>
                </div>
              </li>
            ))}
          </ul>                  
          ) : (
            <p>No hay tareas en esta categoría</p> // Mensaje si no hay tareas en la categoría
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;