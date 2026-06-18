import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAdmin } from '../../hook/useAdmin.js';

const Header = () => {
 const{admin,cerrarSesion} = useAdmin(); //1) Obtenemos el administrador del contexto para mostrar su nombre y sector en el header, y también para usar la función de cerrar sesión.
 const navigate = useNavigate();

 const handleLogout = () => {
  cerrarSesion();
  navigate("/login");
 } ;

 return (
     <AppBar position="static">

            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Panel de Control
                </Typography>

                <Typography sx={{ marginRight: 2 }}>
                    {admin?.nombre} - {admin?.sector}
                </Typography>

                <Button 
                    color="inherit"
                    onClick={handleLogout}>Cerrar Sesión
                </Button>
            </Toolbar>
        </AppBar>
    );
};
export default Header;  