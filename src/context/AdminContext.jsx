import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const adminGuardado = localStorage.getItem("admin");

    if (adminGuardado) {
      setAdmin(JSON.parse(adminGuardado));
    }

    setCargando(false);
  }, []);

  const iniciarSesion = (datosAdmin) => {
    setAdmin(datosAdmin);
  };

  const cerrarSesion = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    }
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, iniciarSesion, cerrarSesion, cargando }}>
      {children}
    </AdminContext.Provider>
  );
};
