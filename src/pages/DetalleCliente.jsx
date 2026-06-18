import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Typography, 
  CircularProgress, 
  Alert, 
  Container, 
  Paper,
  Grid,
  Button,
  Divider,
  Box,
  Snackbar
} from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useAdmin } from "../hook/useAdmin";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { admin } = useAdmin();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [eliminando, setEliminado] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);

        if (!response.ok) {
          throw new Error("No se pudo conectar la base de datos de clientes.")
        }

        const data = await response.json();
   
        setCliente(data);
      } catch (err) {
        setError("Error al cargar los detalles del cliente");
      } finally {
        setLoading(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const handleEliminarCliente = async () => {
    if (window.confirm(`¿Está seguro de eliminar al cliente ${id}?`)) {
      try {
        setEliminado(true);
        const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          throw new Error("No se pudo procesar la solicitud de eliminación.");
        }

        const data = await response.json();
        console.log("Cliente eliminado", data);
        
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/clientes");
        }, 2500);
      
      } catch (err) {
        setError(err.message);
        setEliminado(false);
      }
    }
  };

  if (loading || eliminando) {
    return (
      <>
        <Header />
        <Box display="flex" gap={2}>
          <CircularProgress size={50} />
          <Typography color="textSecondary">
            {eliminando ? "Eliminando cliente..." : "Conectando con la base de datos..."}
          </Typography>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="error" action={
            <Button color="inherit" size="small" onClick={() => navigate("/clientes")}>Volver</Button>
            }>
            {error}
          </Alert>
        </Container>
      </>
    );
  }

  // Desetructuracion del objeto cliente
  const { 
    name = {}, 
    email = "", 
    phone = "", 
    username = "", 
    password = "", 
    address = {} 
  } = cliente || {};

  const esGerente = admin?.sector === "Gerencia";
  const esSoporte = admin?.sector === "Soporte";

  return (
    <>
      <Header />

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>

        <Paper sx={{ p: 4 }} elevation={3}>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ficha Completa del Cliente {id}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Operador del Sistema: <strong>{admin?.nombre}</strong> | Sector: <strong>{admin?.sector}</strong>
          </Typography>
          
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <Typography variant="h6" color="info" gutterBottom sx={{ fontWeight: '600' }}>
                Datos Generales
              </Typography>
              <Typography variant="body1"><strong>Nombre:</strong> {name.firstname || "-"}</Typography>
              <Typography variant="body1"><strong>Apellido:</strong> {name.lastname || "-"}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {email || "-" }</Typography>
              <Typography variant="body1"><strong>Teléfono:</strong> {phone || "-"}</Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <Typography variant="h6" color="info" gutterBottom sx={{ fontWeight: '600' }}>
                Credenciales de Acceso
              </Typography>
              <Typography variant="body1"><strong>Nombre de Usuario:</strong> {username}</Typography>
              <Typography variant="body1"><strong>Contraseña:</strong> {password}</Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <Typography variant="h6" color="info" gutterBottom sx={{ fontWeight: '600' }}>
                Dirección
              </Typography>
              <Typography variant="body1">
                <strong>Calle y Altura:</strong> {address.street || "-"} N° {address.number || "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Ciudad de Origen:</strong> {address.city || "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Código Postal (ZipCode):</strong> {address.zipcode || "-"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 4, mb: 2 }} />

          {/* Lógica de Control de Permisos por Sector */}
          {esGerente && (
            <Box display="flex">

              <Button
                variant="contained"
                color="error"
                onClick={handleEliminarCliente}
                size="medium"
                sx={{ fontWeight: 'bold' }}
              >
                Eliminar Cliente
              </Button>

            </Box>
          )}

          {esSoporte && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                <strong>Perfil de Solo Lectura:</strong> Su pertenencia al sector de <strong>Soporte</strong> no le permite eliminar clientes.
              </Alert>
            </Box>
          )}
        </Paper>

      </Container>

      <Footer />
    </>
  );
};

export default DetalleCliente;