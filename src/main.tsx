import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage.tsx';
import Carts from './Components/Carts/Carts.tsx';
import Products from './Components/Products/Products.tsx';
import Categories from './Components/Categories/Categories.tsx';
import Units from './Components/UnitsOfMeasure/Units.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        errorElement:<ErrorPage />,
        children: [
          {index:true, element:<Carts />},
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
        ],
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
