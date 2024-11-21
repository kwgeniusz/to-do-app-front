
import BaseDashboard from "../pages/layout/BaseDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";
import Welcome from "../pages/Welcome";

export const routes = [
    {
        path: '/',
        element: Welcome
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Register
    },
    {
        path: '/dashboard',
        element: BaseDashboard,
        children: [
            {  
              path: '',
              element: Tasks
            },
        ],
    },
];