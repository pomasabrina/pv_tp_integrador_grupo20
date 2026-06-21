import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Card, CardContent, Typography, Grid, Box ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hook/useAdmin";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const navigate = useNavigate();
    const { admin } = useAdmin();

    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const datos =
        JSON.parse(localStorage.getItem("actividades")) || [];
        setActividades(datos);
    }, []);

    const [totalClientes, setTotalClientes] = useState(0);

    useEffect(() => {

        const obtenerCantidadClientes = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/users');
            if (!response.ok) {
            throw new Error('Error al conectar con la API');
            }
            const data = await response.json();
            
            setTotalClientes(data.length);
        } catch (error) {
            console.error("Error al cargar las métricas:", error);
            setTotalClientes(0);
        }
        };

        obtenerCantidadClientes();
    }, []);

return(
    <>
        <Header />

        <Typography variant="h4" sx={{ margin: 3, mt: 8 }}>
            Panel de Clientes
        </Typography>

        <Card sx={{ margin: 3, bgcolor:"primary.main"}}>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color:"white", fontWeight:"bold"}}>
                    Bienvenido al Panel de Control de Clientes
                </Typography>

                <Typography sx={{ color:"#eeeeee" }}>
                    Desde este sistema podrá consultar clientes registrados,
                    dar de alta nuevos clientes, visualizar fichas completas
                    y administrar información según los permisos asignados
                    a su rol.
                </Typography>
            </CardContent>
        </Card>

        <Grid container spacing={3} sx={{ padding: 3 }}>

            <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Total Clientes
                        </Typography>
                        <Typography variant="h4">
                            {totalClientes}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Administrador
                        </Typography>

                        <Typography variant="h4">
                            {admin?.nombre || "-"}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Rol
                        </Typography>

                        <Typography variant="h4">
                            {admin?.rol || "-"}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Estado
                        </Typography>

                        <Typography variant="h4">
                            Activo
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>

        <Card sx={{ m: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Actividad Reciente
                </Typography>

                {actividades.length === 0 ? (
                <Typography>
                    Sin actividad registrada
                </Typography>
                ) : (
                actividades.map((item, index) => (
                    <Box key={index} sx={{ mb: 1, p: 1, bgcolor: "#f5f9ff", border: "1px solid #90caf9", borderRadius: 1 }}>
                        <Typography key={index} sx={{ mb: 1 }}>
                        • {item}
                        </Typography>
                    </Box>
                ))
                )}
            </CardContent>
        </Card>

        <Box sx={{ textAlign: "center", mb: 3 }}>
            <Button variant="contained" sx={{ margin: 3 }} onClick={() => navigate("/clientes")}>
                Ver Lista de Clientes
            </Button>        
        </Box>
        <Footer />
    </>   
)};

export default Dashboard;