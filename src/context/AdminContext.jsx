import { createContext, useState, useEffect } from 'react';
// 1. Creamos el contexto que servirá de almacén central
export const AdminContext = createContext();


// 2. Componente Proveedor que envolverá la aplicación
export const AdminProvider = ({ children }) => {
  // El estado inicial del administrador debe ser null por requerimiento obligatorio
  const [admin, setAdmin] = useState(() => {
    const sesionGuardada = localStorage.getItem('admin_session');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });
  // useEffect para almacenar en tiempo real una copia en LocalStorage//// Persistencia con LocalStorage en tiempo real
  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin_session', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin_session');
    }
  }, [admin]); // Sigue la directiva de escuchar los cambios en [admin]

  // Función global para iniciar sesión
  const iniciarSesion = (datosAdmin) => {
    setAdmin(datosAdmin); // Guarda el objeto { nombre, sector }
  };

  // Función global para cerrar sesión y limpiar el sistema
  const cerrarSesion = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, iniciarSesion, cerrarSesion }}>
      {children}
    </AdminContext.Provider>
  );
};
