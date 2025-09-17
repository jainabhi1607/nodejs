import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from './components/First.jsx';
import AddUser from './pages/AddUser';
import Users from './pages/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element : <First/>,
    children : [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
    ]
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App