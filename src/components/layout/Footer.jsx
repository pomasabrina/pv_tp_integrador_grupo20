import React from 'react';
import { Box, Container, Typography, Grid, Divider, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ 
        mt: 'auto', 
        py: 3, 
        bgcolor: '#1976d2', 
        color: '#ffffff', 
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.05)'
      }}
    >
        <Container maxWidth="lg">
            <Grid container spacing={10}>
            
                <Grid xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                        Universidad Nacional de Jujuy
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e3f2fd', mb: 0.5 }}>
                        Facultad de Ingeniería | Analista Programador Universitario
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#bbdefb', display: 'block' }}>
                        Cátedra: <strong>Programación Visual (2026)</strong>
                    </Typography>
                </Grid>

                <Grid xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                        Panel de Control de Clientes
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
                        Desarrollado por: <strong>Grupo 20</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#bbdefb', fontStyle: 'italic' }}>
                        Trabajo Práctico Integrador Final
                    </Typography>
                </Grid>

            </Grid>

            <Divider sx={{ my: 2, bgcolor: 'rgb(255, 255, 255)' }} />

            <Box 
            display="flex" 
            gap={1}
            >
            
                <Typography variant="caption" sx={{ color: '#e3f2fd' }}>
                    Link del repositorio:{' '}
                    <Link 
                    href="https://github.com/pomasabrina/pv_tp_integrador_grupo20.git"
                    target="_blank"
                    rel="noopener"
                    sx={{ 
                        color: '#ffffff', 
                        fontWeight: 'bold', 
                        textDecoration: 'underline',
                        '&:hover': { color: '#bbdefb' } 
                    }}
                >
                    TP FINAL - Grupo 20
                    </Link>
                </Typography>
            </Box>
            
        </Container>
    </Box>
  );
};

export default Footer;