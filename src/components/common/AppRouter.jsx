import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import ListaClientes from "../../pages/ListaClientes";
import DetalleCliente from "../../pages/DetalleCliente";

import RutaProtegida from "./RutaProtegida";

const AppRouter = () => {
    return(
     <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        }
      />

      <Route
        path="/clientes"
        element={
          <RutaProtegida>
            <ListaClientes />
          </RutaProtegida>
        }
      />

      <Route
        path="/clientes/:id"
        element={
          <RutaProtegida>
            <DetalleCliente />
          </RutaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    );
};
export default AppRouter;