import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { fetchTasks, deleteTask, updateTask } from "../store/taskSlice";
import Button from "../components/button/Button";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const toggleStatus = (id: number, status: string) => {
    dispatch(updateTask({ id, data: { status: status === "pending" ? "completed" : "pending" } }));
  };

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      {isLoading && <p>Cargando...</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.title} ({task.status})</p>
            <Button value="Cambiar Estado" onClick={() => toggleStatus(task.id, task.status)} />
            <Button value="Eliminar" onClick={() => handleDelete(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
