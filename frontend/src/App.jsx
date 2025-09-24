import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./components/First.jsx";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/editUser/$id",
        element: <AddUser />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
