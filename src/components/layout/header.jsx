import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../hook/useAdmin";

const Header = () => {
  const { admin, cerrarSesion } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Panel de Control
        </Typography>

        <Typography variant="h6" sx={{ marginRight: 2, fontWeight: "bold" }}>
          {admin?.nombre} - {admin?.rol}
        </Typography>

        <Button variant="contained" color="error" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>

      <Toolbar sx={{ bgcolor: "#e0e0e0", justifyContent: "center" }}>
        <Button
          onClick={() => navigate("/dashboard")}
          sx={{
            color: "primary.main",
            fontWeight: location.pathname === "/dashboard" ? "bold" : "normal",
            borderBottom:
              location.pathname === "/dashboard" ? "2px solid #1976d2" : "none",
            borderRadius: 0,
            px: 1.5,
            "&:hover": { bgcolor: "#eeeeee" },
          }}
        >
          Inicio
        </Button>

        <Button
          onClick={() => navigate("/clientes")}
          sx={{
            color: "primary.main",
            fontWeight: location.pathname.startsWith("/clientes")
              ? "bold"
              : "normal",
            borderBottom: location.pathname.startsWith("/clientes")
              ? "2px solid #1976d2"
              : "none",
            borderRadius: 0,
            px: 1.5,
            "&:hover": { bgcolor: "#eeeeee" },
          }}
        >
          Clientes
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
