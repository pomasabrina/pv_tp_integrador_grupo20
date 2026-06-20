import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ListaClientes from "../pages/ListaClientes";
import DetalleCliente from "../pages/DetalleCliente";
import RutaProtegida from "../components/common/RutaProtegida";
import PaginaError from "../pages/PaginaError";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <RutaProtegida />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/clientes",
        element: <ListaClientes />,
      },
      {
        path: "/clientes/:id",
        element: <DetalleCliente />,
      },
    ],
  },
  {
    path: "*",
    element: <PaginaError />,
  },
  
]);
