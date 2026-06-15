import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, Typography, Container } from "@mui/material";

import { useAdmin } from "../hook/useAdmin";

const Login = () => {
  const [nombre, setNombre] = useState("Juan");
  const [sector, setSector] = useState("Gerencia");

  const {admin, iniciarSesion } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    iniciarSesion({ nombre, sector });
    navigate("/dashboard");
  };
  /*para que no se rediriga al login si ya esta logueado y no se pueda acceder a la pagina*/
  useEffect(() => {
    if (admin !== null) {
      navigate("/dashboard", { replace: true });
    }
  }, [admin, navigate]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">
        Acceso de Administrador
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Administrador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          select
          label="Sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="Soporte">Soporte</MenuItem>
          <MenuItem value="Gerencia">Gerencia</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" fullWidth>
          Ingresar
        </Button>
      </form>
    </Container>
  );
};

export default Login;