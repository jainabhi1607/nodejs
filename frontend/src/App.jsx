import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from './components/First.jsx';
import AddUser from './pages/AddUser';

const router = createBrowserRouter([
  {
    path: "/",
    element : <First/>,
    children : [
      {
        index: true,
        element: <AddUser />,
      }
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