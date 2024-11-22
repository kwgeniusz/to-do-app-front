
import BaseDashboard from "../pages/layout/BaseDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";
import Welcome from "../pages/Welcome";

type TypeRoute = {
    path: string;
    element: any;
    isProtected?: boolean;
    children?: TypeRoute[];
}

export const routes: TypeRoute[] = [
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
        isProtected: true,
        children: [
            { path: "tasks", element: Tasks },
        ],
    },
];