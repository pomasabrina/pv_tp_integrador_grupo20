import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";

import { useAdmin } from "../hook/useAdmin";
import { validarLogin } from "../utils/validaciones";
import usuarios from "../data/usuarios.json";
import { agregarActividad } from "../utils/registroActividad";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errores, setErrores] = useState({});
  const [errorAuth, setErrorAuth] = useState("");

  const { admin, iniciarSesion } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (admin !== null) {
      navigate("/dashboard", { replace: true });
    }
  }, [admin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorAuth("");

    const erroresValidacion = validarLogin(nombre, contraseña);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    const usuario = usuarios.find(
      (u) =>
        u.nombre=== nombre.trim() &&
        u.contraseña === contraseña
    );

    if (!usuario) {
      setErrorAuth("Nombre o contraseña incorrectos");
      return;
    }

    iniciarSesion({ nombre: usuario.nombre, rol: usuario.rol });

    agregarActividad(`${usuario.nombre} inició sesión`);

    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 4, bgcolor: "white", borderRadius: 3, boxShadow: 4, borderTop: "4px solid #1976d2" }}>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 1 }}>
        Panel de Control de Clientes
      </Typography>

      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
        Acceso al Sistema
      </Typography>

      {errorAuth && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorAuth}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Administrador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          margin="normal"
          error={Boolean(errores.nombre)}
          helperText={errores.nombre}
        />

        <TextField
          label="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          fullWidth
          required
          margin="normal"
          error={Boolean(errores.contraseña)}
          helperText={errores.contraseña}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}>
          Ingresar
        </Button>
      </form>
    </Container>
  );
};

export default Login;
