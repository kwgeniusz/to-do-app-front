import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logoutUser } from "../../store/authSlice";

const BaseDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Función de logout
  const handleLogout = () => {
    // Elimina el token y los datos del usuario en el localStorage
    window.localStorage.removeItem("token");
    dispatch(logoutUser()); // Cambia el estado en Redux para reflejar el logout
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Menu Principal</h2>
        <ul>
          <li>
            <a href="/dashboard" className="block py-2 px-4 rounded-md hover:bg-indigo-600">
              Dashboard
            </a>
          </li>
          {/* <li>
            <a href="/tasks" className="block py-2 px-4 rounded-md hover:bg-indigo-600">
              Tareas
            </a>
          </li> */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseDashboard;
