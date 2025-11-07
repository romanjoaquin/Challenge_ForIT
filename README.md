**Gestor de Tareas** 
====================

App de lista de tareas hecha para el challenge de ForIT 2025.

**Qué tiene**
-------------

*   Crear, editar y borrar tareas
    
*   Marcar tareas como completadas
    
*   Filtrar por completadas/pendientes
    
*   Buscar tareas por título
    
*   Diseño Atractivo
    

**Tecnologías**
---------------

**Backend:**

*   Node.js + Express
    
*   Almacenamiento en memoria
    

**Frontend:**

*   React con Vite
    
*   React Router
    
*   CSS
    

**Cómo ejecutarlo**
-------------------

### **Lo que necesitás tener instalado**

*   Node.js (v16 o mayor)
    
*   npm
    

### **Paso 1: Clonar el repo**

```bash
git clone https://github.com/TU-USUARIO/todo-app-forit.git
cd todo-app-forit
```

### **Paso 2: Backend**

```bash
cd backend
npm install
```

Crear un archivo .env en la carpeta backend:

```
PORT=3000
NODE_ENV=development
```

Arrancar el servidor:

```bash
npm run dev
```

Deberías ver algo como:

✓ Servidor corriendo en http://localhost:3000

**Importante:** Dejá esta terminal abierta.

### **Paso 3: Frontend**

Abrí otra terminal y:

```bash
cd frontend
npm install
```

Crear un archivo .env en la carpeta frontend:

```
VITE_API_URL=http://localhost:3000
```

Arrancar la app:

```bash
npm run dev
```

Vas a ver algo como:

Local: http://localhost:5173/

Abrí esa URL en el navegador y listo.

**Estructura del proyecto**
---------------------------

```
todo-app-forit/
├── backend/
│   ├── server.js          # servidor express
│   ├── package.json
│   └── .env              # crear este
├── frontend/
│   ├── src/
│   │   ├── components/   # TaskList, TaskItem, TaskForm
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env             # crear este
└── README.md
```

**API**
-------

El backend tiene estos endpoints:

*   GET /api/tasks - trae todas las tareas
    
*   POST /api/tasks - crea una tarea
    
*   PUT /api/tasks/:id - actualiza una tarea
    
*   DELETE /api/tasks/:id - borra una tarea
    

Ejemplo de una tarea:

```json
{
  "id": 1,
  "title": "Hacer algo",
  "description": "Descripción opcional",
  "completed": false
}
```

**Comandos útiles**
-------------------

**Backend:**

```bash
npm run dev    # desarrollo con auto-reload
npm start      # producción
npm run lint   # revisar código
```

**Frontend:**

```bash
npm run dev    # servidor de desarrollo
npm run build  # build para producción
```

**Si algo no anda**
-------------------

**No se conecta el frontend con el backend:**

*   Verificá que el backend esté corriendo en el puerto 3000
    
*   Fijate que el .env del frontend tenga la URL correcta
    
*   Reiniciá Vite después de cambiar el .env
    

**Puerto 3000 ocupado:**

*   Cambiá el puerto en backend/.env (ponele 3001)
    
*   Actualizá también frontend/.env con el nuevo puerto
    

**Error al instalar:**

```bash
# Borrá node_modules y reinstalá
rm -rf node_modules package-lock.json
npm install
```

**Notas**
---------

*   Los datos se guardan en memoria, se pierden al reiniciar el servidor
    
*   Usé hooks de React (useState, useEffect, useNavigate, useParams)
    
*   El código tiene ESLint configurado
    

**Bonus implementados**
-----------------------

*   Filtros por estado
    
*   Búsqueda en tiempo real
    
*   Validación de forms
    
*   Diseño moderno
