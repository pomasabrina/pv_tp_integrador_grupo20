import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FormularioAltaCliente from "../components/clientes/FormularioAltaCliente";
import { agregarActividad } from "../utils/registroActividad";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const obtenerClientes = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://fakestoreapi.com/users");
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      setError("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerSiguienteId = (lista) =>
    lista.reduce((max, c) => Math.max(max, Number(c.id) || 0), 0) + 1;

  const handleClienteCreado = (cliente) => {
    agregarActividad("Se registró un nuevo cliente");
    setClientes((prev) => [
      ...prev,
      { ...cliente, id: obtenerSiguienteId(prev) },
    ]);
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.name?.lastname?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.address?.city?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Header />

      <Typography variant="h4" sx={{ m: 3, mt: 8 }}>
        Lista de Clientes
      </Typography>

      <TextField
        label="Buscar por apellido o ciudad"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ m: 3, width: 350 }}
      />

      {/* efecto despliegue */}
      <Accordion sx={{m: 3,border: 1,borderColor: "divider"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Alta de Cliente
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormularioAltaCliente onClienteCreado={handleClienteCreado} />
        </AccordionDetails>
      </Accordion>

      {loading && <CircularProgress sx={{ m: 3 }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper} sx={{ m: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  variant="head"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  ID
                </TableCell>
                <TableCell
                  variant="head"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  NOMBRE
                </TableCell>
                <TableCell
                  variant="head"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  EMAIL
                </TableCell>
                <TableCell
                  variant="head"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  TELÉFONO
                </TableCell>
                <TableCell
                  variant="head"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  CIUDAD
                </TableCell>
                <TableCell
                  variant="head"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  ACCIONES
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clientesFiltrados.map((c, index) => (
                <TableRow key={`${c.id}-${c.email ?? index}`}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>
                    {c.name?.firstname} {c.name?.lastname}
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.address?.city}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/clientes/${c.id}`}
                    >
                      Ver Ficha Completa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Footer />
    </>
  );
};

export default ListaClientes;
