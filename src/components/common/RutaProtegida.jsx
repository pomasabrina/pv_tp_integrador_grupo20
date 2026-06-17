import { Navigate } from "react-router-dom";
import { useAdmin } from "../../hook/useAdmin";

const RutaProtegida = ({ children }) => {
  // obtener el admin logueado y el estado de carga
  const { admin, cargando } = useAdmin();
  
  //mientras se recupera la sesion del admin desde LocalStorage,
  // esperamos para evitar redirecciones incorrectas
  if (cargando) {
    return null;
  }
  
  // si no hay admin logueado, se lo envia al usuario a la pantalla de login.
  if (admin === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;