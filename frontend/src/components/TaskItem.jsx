import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

function TaskItem({ task, onDelete, onToggleComplete, onEdit }) {
  const [showControls, setShowControls] = useState(false);
  
  const taskClass = `activity-container ${task.completed ? 'active' : ''}`;
  
  return (
    <div 
      className={taskClass}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        <h3 className="task-title">{task.title}</h3>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="controle">
        {showControls && (
          <div className="operator">
            <button 
              onClick={onEdit}
              className="c-icon-op edit"
              title="Editar"
            >
              ✏️
            </button>
            <button 
              onClick={() => onToggleComplete(task.id)}
              className="c-icon-op check"
              title="Marcar como completada"
            >
              ✓
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="c-icon-op delete"
              title="Eliminar"
            >
              🗑️
            </button>
          </div>
        )}
        <button 
          className="c-icon"
          onClick={() => setShowControls(!showControls)}
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskItem;