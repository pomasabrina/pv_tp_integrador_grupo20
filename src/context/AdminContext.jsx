import { createContext, useState, useEffect } from 'react';

// 1. Creamos el contexto que servirá de almacén central
export const AdminContext = createContext();

// 2. Provider: será el encargado de guardar la información global
export const AdminProvider = ({ children }) => {
// El estado inicial del administrador debe ser null por requerimiento obligatorio
  const [admin, setAdmin] = useState(null);
// Cuando inicia la aplicación busca un usuario guardado en LocalStorage para mantener 
// la sesión activa
  useEffect(() => {
    const adminGuardado = localStorage.getItem("admin");
    if (adminGuardado) {
     setAdmin(JSON.parse(adminGuardado));
        }
    }, []);

 // Función para iniciar sesión
  const iniciarSesion = (datosAdmin) => {
    setAdmin(datosAdmin); // Guarda el objeto { nombre, sector }
  };
 // Función  para cerrar sesión y limpiar el sistema
  const cerrarSesion = () => {
    setAdmin(null);
    localStorage.removeItem("admin"); // Limpia el LocalStorage al cerrar sesión
  };
 // Cada vez que cambia admin se actualiza LocalStorage
    useEffect(() => {
        if(admin){
            localStorage.setItem("admin",JSON.stringify(admin) );
        }
    }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, iniciarSesion, cerrarSesion }}>
      {children}
    </AdminContext.Provider>
  );
};
