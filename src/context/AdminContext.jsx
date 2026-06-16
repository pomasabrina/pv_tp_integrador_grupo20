import { createContext, useState, useEffect } from 'react';

// 1. Creamos el contexto que servirá de almacén central
export const AdminContext = createContext();

// 2. Provider: será el encargado de guardar la información global
export const AdminProvider = ({ children }) => {
// El estado inicial del administrador debe ser null por requerimiento obligatorio
  const [admin, setAdmin] = useState(null);


// Sirve para saber si todavia estamos revisando
// si hay una sesión guardada en el LocalStorage.
  const [cargando, setCargando] = useState(true);
//


// Cuando inicia la aplicación busca un usuario guardado en LocalStorage para mantener 
// la sesión activa
  useEffect(() => {
    const adminGuardado = localStorage.getItem("admin");
  // si habia una sesion guardada, la recuperamos
  // para que el usuario no tenga que volver a iniciar sesion al referescar.
    if (adminGuardado) {
      setAdmin(JSON.parse(adminGuardado));
        }
       // comprobamos una vez mas si existe una sesion ya iniciada
      setCargando(false);
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
    
    //agregamos cargando para compartir el estado para que las rutas protegidas
    // sepan cuando esperar antes de validar el acceso
  return (
    <AdminContext.Provider value={{ admin, iniciarSesion, cerrarSesion, cargando }}>
      {children}
    </AdminContext.Provider>
  );
};
