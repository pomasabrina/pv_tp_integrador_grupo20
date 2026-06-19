import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../../hook/useAdmin";

const RutaProtegida = () => {
  const { admin, cargando } = useAdmin();

  if (cargando) {
    return null;
  }

  if (admin === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RutaProtegida;
