import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Alert,Container,Paper } from "@mui/material";
import Header from "../components/layout/header";

const DetalleCliente = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://fakestoreapi.com/users/${id}`
        );

        const data = await response.json();
   
        setCliente(data);
      } catch (err) {
        setError("Error al cargar cliente");
      } finally {
        setLoading(false);
      }
    };

    obtenerCliente();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Detalle Cliente
          </Typography>

          <Typography>ID: {cliente.id}</Typography>

          <Typography>
            Nombre: {cliente.name.firstname}
          </Typography>

          <Typography>
            Apellido: {cliente.name.lastname}
          </Typography>

          <Typography>
            Email: {cliente.email}
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default DetalleCliente;