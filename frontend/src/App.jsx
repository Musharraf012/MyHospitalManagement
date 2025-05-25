import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Layout from "./components/Layout";
 import { ToastContainer } from 'react-toastify';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <>
    <ToastContainer/>
      <RouterProvider
        router={router}
        //  fallbackElement={<BigSpinner />}
      />
    </>
  );
}

export default App;
