import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";

import { validarAltaCliente } from "../../utils/validaciones";
import { crearCliente } from "../../services/clienteService";

const estadoInicial = {
  email: "",
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  phone: "",
  city: "",
  street: "",
  number: "",
  zipcode: "",
};

const FormularioAltaCliente = ({ onClienteCreado }) => {
  const [form, setForm] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSnackbar({ open: false, message: "" });

    const erroresValidacion = validarAltaCliente(form);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    const nuevoCliente = {
      email: form.email.trim(),
      username: form.username.trim(),
      password: form.password,
      name: {
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
      },
      address: {
        city: form.city.trim(),
        street: form.street.trim(),
        number: Number(form.number),
        zipcode: form.zipcode.trim(),
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: form.phone.trim(),
    };

    try {
      setLoading(true);
      const data = await crearCliente(nuevoCliente);
      const idAsignado = data.id;

      setForm(estadoInicial);
      setErrores({});
      setSnackbar({
        open: true,
        message: `Cliente registrado correctamente. ID asignado por la API: ${idAsignado}`,
      });
      onClienteCreado?.({ ...nuevoCliente, idApi: idAsignado });
    } catch (err) {
      setError(err.message || "Error al registrar el cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ m: 3, p: 3 }}>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbar({ open: false, message: "" })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Nombre"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.firstname)}
              helperText={errores.firstname}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Apellido"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.lastname)}
              helperText={errores.lastname}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.email)}
              helperText={errores.email}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Teléfono"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.phone)}
              helperText={errores.phone}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Usuario"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.username)}
              helperText={errores.username}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.password)}
              helperText={errores.password}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Ciudad"
              name="city"
              value={form.city}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.city)}
              helperText={errores.city}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Código postal"
              name="zipcode"
              value={form.zipcode}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.zipcode)}
              helperText={errores.zipcode}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              label="Calle"
              name="street"
              value={form.street}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.street)}
              helperText={errores.street}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Número"
              name="number"
              value={form.number}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errores.number)}
              helperText={errores.number}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Registrando..." : "Registrar Cliente"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FormularioAltaCliente;
