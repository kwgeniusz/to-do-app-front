// src/components/TaskItem.tsx
import React, { useState } from "react";
import { Api } from "../../services/Api";

// Se pasa onDelete como propiedad para actualizar la lista en TaskList.tsx
const TaskItem = ({ task }: { task: any }) => {
  const [status, setStatus] = useState(task.status);

  // Cambiar el estado de la tarea entre "pending" y "completed"
  const handleStatusChange = async () => {
    const newStatus = status === "pending" ? "completed" : "pending";
    const response = await Api.put(`/tasks/${task.id}`, { status: newStatus });
    if (response.statusCode === 200) {
      setStatus(newStatus); // Actualiza el estado de la tarea
    }
  };

  // Eliminar la tarea
  const handleDelete = async () => {
    try {
      const response = await Api.delete(`/tasks/${task.id}`);

      // Comprobar si la respuesta es 204 (No Content)
      if (response.statusCode === 204) {
        // Recargar la página para actualizar la lista
        window.location.reload();
      } else {
        // Si la respuesta no es 204, manejar el error (opcional)
        console.error("Error al eliminar la tarea", response);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación", error);
    }
  };

  return (
    <li className="flex justify-between items-center p-2 border-b">
      <div className="flex flex-col">
        {/* Mostrar título de la tarea */}
        <span
          onClick={handleStatusChange}
          className={`cursor-pointer mr-2 ${
            status === "completed" ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </span>

        {/* Mostrar el estado de la tarea */}
        <span
          className={`text-sm ${
            status === "completed" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          Status: {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalizar la primera letra */}
        </span>

        {/* Mostrar descripción de la tarea */}
        <p className="text-sm text-gray-600 mt-1">{task.description}</p> {/* Asegurándonos de que description existe */}
      </div>

      {/* Botón para eliminar la tarea */}
      <button onClick={handleDelete} className="text-red-600">
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
