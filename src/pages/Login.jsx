import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";

import { useAdmin } from "../hook/useAdmin";
import { validarLogin } from "../utils/validaciones";
import usuarios from "../data/usuarios.json";

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
        u.nombre.toLowerCase() === nombre.trim().toLowerCase() &&
        u.contraseña === contraseña
    );

    if (!usuario) {
      setErrorAuth("Nombre o contraseña incorrectos");
      return;
    }

    iniciarSesion({ nombre: usuario.nombre, rol: usuario.rol });
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Acceso de Administrador
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

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Ingresar
        </Button>
      </form>
    </Container>
  );
};

export default Login;
