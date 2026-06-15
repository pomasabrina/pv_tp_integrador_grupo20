import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import Header from "../components/layout/header";

const ListaClientes = () => {

    const [clientes, setClientes] = useState([]); //guarda los clientes obtenidos de la API
    const [loading, setLoading] = useState(true); //indica si se están cargando los clientes
    const [error, setError] = useState(null); //guarda el mensaje de error en caso de que ocurra un error al cargar los clientes  

    useEffect(() => {

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

        obtenerClientes();

    }, []);

    return (
        <>
            <Header />

            <Typography variant="h4" sx={{ m: 3 }}>
                Lista de Clientes
            </Typography>

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
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {clientes.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.name.firstname} {c.name.lastname}</TableCell>
                                    <TableCell>{c.email}</TableCell>
                                    <TableCell>{c.phone}</TableCell>
                                    <TableCell>{c.address.city}</TableCell>
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