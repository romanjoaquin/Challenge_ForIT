import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

const API_URL = import.meta.env.VITE_API_URL;

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const editMode = Boolean(id);

  useEffect(() => {
    if (editMode) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/tasks`);
      
      if (!response.ok) {
        throw new Error('Error al cargar la tarea');
      }
      
      const tasks = await response.json();
      const task = tasks.find(t => t.id === parseInt(id));
      
      if (!task) {
        throw new Error('Tarea no encontrada');
      }

      setTitle(task.title);
      setDescription(task.description || '');
      setCompleted(task.completed);
      setError(null);
    } catch (err) {
      console.error('Error cargando tarea:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      setError('El título es obligatorio');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      completed
    };

    try {
      setLoading(true);
      setError(null);

      const url = editMode 
        ? `${API_URL}/api/tasks/${id}`
        : `${API_URL}/api/tasks`;
      
      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la tarea');
      }

      console.log(editMode ? 'Tarea actualizada' : 'Tarea creada');
      navigate('/');
    } catch (err) {
      console.error('Error guardando:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddTaskContainer" onClick={(e) => {
      if (e.target.className === 'AddTaskContainer') {
        navigate('/');
      }
    }}>
      <div className="AddTaskControle">
        <button 
          className="close-w"
          onClick={() => navigate('/')}
        >
          ✕
        </button>

        <h2 className="form-title">
          {editMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <label htmlFor="title">Título de la tarea *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe el título..."
            disabled={loading}
            className={`InputTaskName ${error && title === '' ? 'required' : ''}`}
            required
          />

          <label htmlFor="description">Descripción (opcional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe la tarea..."
            disabled={loading}
            className="InputTaskDescription"
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="completed">Marcar como completada</label>
          </div>

          <button 
            type="submit"
            className="btn-save"
            disabled={loading}
            title={editMode ? 'Actualizar' : 'Guardar'}
          >
            {loading ? '...' : editMode ? '✓' : '+'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;