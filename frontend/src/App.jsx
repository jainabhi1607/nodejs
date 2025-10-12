import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./components/First.jsx";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Logout from "./pages/Logout.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import EditUser from "./pages/EditUser.jsx";

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
        element: (
          <ProtectedRoute>
            <AddUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editUser/:id",
        element: (
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      
          <AuthProvider><RouterProvider router={router} /></AuthProvider>
    </>
  );
}

export default App;
