import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaginaError = () => {

  const navigate = useNavigate();

  return (
    <Paper sx={{maxWidth: 600,margin: "80px auto",padding: 4, textAlign: "center"}}>
      <Typography variant="h2" color="error">
       ⚠️ 404
      </Typography>

      <Typography variant="h5" sx={{ mb: 3 }}>
        ¡Ups! Algo salió mal. La página solicitada no existe
      </Typography>

      <Button variant="contained" onClick={() => navigate("/dashboard")}>
        Volver al Dashboard
      </Button>
    </Paper>
  );
};

export default PaginaError;