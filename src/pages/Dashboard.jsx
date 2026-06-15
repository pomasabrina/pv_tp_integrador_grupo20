import Header from "../components/layout/header";
import { Card, CardContent, Typography, Grid } from "@mui/material";


const Dashboard = () => {
  
   return(

    <>
      <Header />
      
      <Typography
                variant="h4"
                sx={{ margin: 3 }}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3} sx={{ padding: 3 }}>

                <Grid item xs={12} md={3}>
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

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Clientes Activos
                            </Typography>
                            <Typography variant="h4">
                                0
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Nuevos Clientes
                            </Typography>
                            <Typography variant="h4">
                                0
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Sector
                            </Typography>
                            <Typography variant="h4">
                                Admin
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

    </>

   ) 
  
  
};

export default Dashboard;