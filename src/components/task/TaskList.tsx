// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  // Cargar las tareas desde la API
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await Api.get("/tasks");
      if (response.statusCode === 200) {
        setTasks(response.data); // Establecer tareas obtenidas de la API
      }
    };

    fetchTasks();
  }, []);

  // Función para eliminar una tarea de la lista localmente
  const handleDeleteTask = (taskId: number) => {
    // Filtrar las tareas para eliminar la tarea con el ID proporcionado
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); 
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Mis Tareas</h3>
      <ul>
        {tasks.map((task) => (
          // Pasamos handleDeleteTask como prop a TaskItem para actualizar la lista después de eliminar una tarea
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
