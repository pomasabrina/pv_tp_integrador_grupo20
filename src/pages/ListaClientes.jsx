import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Alert, TextField } from "@mui/material";
import Header from "../components/layout/header";
import FormularioAltaCliente from "../components/clientes/FormularioAltaCliente";

const ListaClientes = () => {

    const [clientes, setClientes] = useState([]); //guarda los clientes obtenidos de la API
    const [loading, setLoading] = useState(true); //indica si se están cargando los clientes
    const [error, setError] = useState(null); //guarda el mensaje de error en caso de que ocurra un error al cargar los clientes  
    const [busqueda, setBusqueda] = useState(""); //guarda lo q el usuario escribe en el input de búsqueda

    const obtenerClientes = async () => {
        try {
            setLoading(true);//muestra el spiner mientras carga
            const res = await fetch("https://fakestoreapi.com/users");//traer los clientes desde la API
            const data = await res.json();

            setClientes(data);//guarda los clientes en el estado
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
        setClientes((prev) => [
            ...prev,
            { ...cliente, id: obtenerSiguienteId(prev) },
        ]);
    };
   const clientesFiltrados = clientes.filter((c) =>
    c.name?.lastname?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.address?.city?.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    return (
        <>
            <Header />

            <Typography variant="h4" sx={{ m: 3 }}>
              Lista de Clientes
            </Typography>
            <TextField
              label="Buscar por apellido o ciudad"
              value={busqueda}
             onChange={(e) => setBusqueda(e.target.value)}
              sx={{ m: 3, width: 350 }}
            />

            <FormularioAltaCliente onClienteCreado={handleClienteCreado} />            
            {loading && <CircularProgress sx={{ m: 3 }} />}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <TableContainer component={Paper} sx={{ m: 3 }}>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Ciudad</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {clientesFiltrados.map((c, index) => (
                                <TableRow key={`${c.id}-${c.email ?? index}`}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.name?.firstname} {c.name?.lastname}</TableCell>
                                    <TableCell>{c.email}</TableCell>
                                    <TableCell>{c.phone}</TableCell>
                                    <TableCell>{c.address?.city}</TableCell>
                                    <TableCell>
                                        <Button component={Link} to={`/clientes/${c.id}`}>
                                            Ver Ficha Completa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default ListaClientes;