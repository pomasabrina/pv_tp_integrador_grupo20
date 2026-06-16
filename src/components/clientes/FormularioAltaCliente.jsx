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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSnackbar({ open: false, message: "" });

    const nuevoCliente = {
      email: form.email,
      username: form.username,
      password: form.password,
      name: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
      address: {
        city: form.city,
        street: form.street,
        number: Number(form.number),
        zipcode: form.zipcode,
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: form.phone,
    };

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCliente),
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("No se pudo dar de alta al cliente");
      }

      const data = await res.json();
      const idAsignado = data.id;

      setForm(estadoInicial);
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Alta de Cliente
      </Typography>

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
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Número"
              name="number"
              type="number"
              value={form.number}
              onChange={handleChange}
              fullWidth
              required
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
