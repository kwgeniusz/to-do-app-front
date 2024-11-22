
import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";

const Tasks = () => {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Administra tus tareas:</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Tasks;
