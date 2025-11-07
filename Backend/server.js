require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Base de datos temporal en memoria
// TODO: En el futuro cambiar esto por una DB real
let tasks = [
  {
    id: 1,
    title: 'Tarea de ejemplo',
    description: 'Esta es una tarea de ejemplo',
    completed: false
  }
];

let nextId = 2;

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  try {
    console.log('GET /api/tasks - Obteniendo todas las tareas');
    res.json(tasks);
  } catch (error) {
    console.error('Error en GET /api/tasks:', error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    console.log('POST /api/tasks - Nueva tarea:', title);

    // Validar que venga el título
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description || '',
      completed: completed || false
    };

    tasks.push(newTask);
    console.log('Tarea creada con ID:', newTask.id);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creando tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    console.log('PUT /api/tasks/' + id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      console.log('Tarea no encontrada:', id);
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Actualizar solo los campos que vienen en el body
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'El título no puede estar vacío' });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (description !== undefined) {
      tasks[taskIndex].description = description;
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = completed;
    }

    console.log('Tarea actualizada:', tasks[taskIndex]);
    res.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Error actualizando tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('DELETE /api/tasks/' + id);
    
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      console.log('Tarea no encontrada para eliminar:', id);
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    console.log('Tarea eliminada:', deletedTask.title);
    
    res.json({ 
      message: 'Tarea eliminada exitosamente', 
      task: deletedTask 
    });
  } catch (error) {
    console.error('Error eliminando tarea:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

// Manejar rutas que no existen
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`✓ Tareas iniciales: ${tasks.length}`);
});