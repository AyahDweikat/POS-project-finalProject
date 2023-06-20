import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage.tsx';
import Carts from './Components/Carts/Carts.tsx';
import Products from './Components/Products/Products.tsx';
import Categories from './Components/Categories/Categories.tsx';
import Units from './Components/UnitsOfMeasure/Units.tsx';
import Signup from './Components/Signup/Signup.tsx';
import Login from './Components/Login/Login.tsx';
import Layout from './Components/Layout/Layout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout /> ,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        errorElement:<ErrorPage />,
        children: [
          {index:true, element:<Carts />},
          {
            path: "carts",
            element: <Carts />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "units",
            element: <Units />,
          },
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
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
