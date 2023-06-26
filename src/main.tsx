import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage.tsx';
import Carts from './Components/Carts/Carts.tsx';
import Categories from './Components/Categories/Categories.tsx';
import Units from './Components/UnitsOfMeasure/Units.tsx';
import Signup from './Components/Signup/Signup.tsx';
import Login from './Components/Login/Login.tsx';
import Layout from './Components/Layout/Layout.tsx';
import IsAuth from './Components/IsAuth/IsAuth.tsx';
import RequireAuth from './Components/RequireAuth/RequireAuth.tsx';
import Profile from './Components/Profile/Profile.tsx';
import App from './App.tsx';
import ProductsComponent from './Components/Products/Products.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App/></Layout> ,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        errorElement:<ErrorPage />,
        children: [
          {index:true, element:<RequireAuth><Carts/></RequireAuth> },
          {
            path: "carts",
            element: <RequireAuth><Carts/></RequireAuth>,
          },
          {
            path: "products",
            element:<RequireAuth><ProductsComponent /></RequireAuth>,
          },
          {
            path: "categories",
            element: <RequireAuth><Categories/></RequireAuth>,
          },
          {
            path: "units",
            element: <RequireAuth><Units/></RequireAuth> ,
          },
          {
            path: "profile",
            element: <RequireAuth><Profile/></RequireAuth> ,
          },
          {
            path: "signup",
            element: <IsAuth><Signup/></IsAuth>,
          },
          {
            path: "login",
            element: <IsAuth><Login/></IsAuth>,
          },
        ],
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
