import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';
import './TaskList.css';

const API_URL = import.meta.env.VITE_API_URL;

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/tasks`);
      
      if (!response.ok) {
        throw new Error('Error al cargar las tareas');
      }
      
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando tareas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error eliminando:', err);
      alert('Error al eliminar: ' + err.message);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error('Error actualizando:', err);
      alert('Error al actualizar: ' + err.message);
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando tareas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <p className="error">Error: {error}</p>
          <button onClick={fetchTasks}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header con info del usuario */}
      <div className="header-container">
        <div className="header">
          <img src="https://ui-avatars.com/api/?name=ForIT+User&background=667eea&color=fff&size=128" alt="Avatar" />
          <div className="info">
            <h3>ForIT Challenge</h3>
            <span>Aplicación de Tareas</span>
          </div>
        </div>

        <div className="triangle">
          <span className="t-text">Mis Tareas</span>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar tareas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </button>
      </div>

      {/* Lista de tareas */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? (
            <p>No se encontraron tareas</p>
          ) : tasks.length === 0 ? (
            <p>No hay tareas todavía</p>
          ) : (
            <p>No hay tareas {filter === 'completed' ? 'completadas' : 'pendientes'}</p>
          )}
        </div>
      ) : (
        <div className="tasks-container">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              onEdit={() => navigate(`/edit/${task.id}`)}
            />
          ))}
        </div>
      )}

      {/* Footer con contador */}
      <div className="footer">
        <span className="tCompleted">
          {completedTasks === 0 && 'No hay tareas completadas'}
          {completedTasks === 1 && '1 tarea completada'}
          {completedTasks > 1 && completedTasks === totalTasks && 'Todas las tareas completadas'}
          {completedTasks > 1 && completedTasks < totalTasks && `${completedTasks}/${totalTasks} tareas completadas`}
        </span>
      </div>

      {/* Botón flotante para agregar */}
      <div className="add-btn-container">
        <button className="addButton" onClick={() => navigate('/new')}>
          <i className="fa fa-plus" aria-hidden="true">+</i>
        </button>
      </div>
    </div>
  );
}

export default TaskList;