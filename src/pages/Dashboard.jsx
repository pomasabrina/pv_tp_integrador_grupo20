import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Card, CardContent, Typography, Grid, Box ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hook/useAdmin";


const Dashboard = () => {
    const navigate = useNavigate();
    const { admin } = useAdmin();
return(
    <>
        <Header />

        <Typography variant="h4" sx={{ margin: 3 }}>
            Panel de Clientes
        </Typography>
                <Card sx={{ margin: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Bienvenido al Panel de Control de Clientes
                </Typography>

                <Typography>
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
                                0
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

        <Box sx={{ textAlign: "center", mb: 3 }}>
            <Button variant="contained" sx={{ margin: 3 }} onClick={() => navigate("/clientes")}>
                Ver Lista de Clientes
            </Button>        
        </Box>
        <Footer />
    </>   
)};

export default Dashboard;