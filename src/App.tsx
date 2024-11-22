import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createElement } from "react";
import { routes } from "./routes/route";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  const router = createBrowserRouter(
    routes.map((route) => ({
    ...route,
    element: route.isProtected ? (
      <ProtectedRoute children={createElement(route.element)} />
    ) : (
      createElement(route.element)
    ),
    children: route.children?.map((child) => ({
       ...child,
       element: child.isProtected ? ( 
       <ProtectedRoute children={createElement(route.element)}/> 
       ) : (
        createElement(child.element)
       ),
    })),
  }))
);

  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    </>
  )

}

export default App
