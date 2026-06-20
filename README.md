# Panel de Control de Clientes - Trabajo Práctico Integrador Final

¡Bienvenido al repositorio del proyecto final integrador para la cátedra de **Programación Visual (2026)**! Este desarrollo ha sido elaborado por el **Grupo 20** de la carrera **Analista Programador Universitario** en la **Universidad Nacional de Jujuy (UNJU)**.

---

## Descripción del Proyecto

El proyecto consiste en un **Panel de Gestión y Control de Clientes** interactivo desarrollado como una aplicación de página única (*Single Page Application*) utilizando **React** y el framework de diseño **Material UI**. 

La aplicación se conecta de forma asincrónica con una API externa (`https://fakestoreapi.com/users`) para la consulta de datos estructurados, permitiendo la visualización detallada, el filtrado dinámico en tiempo real y la simulación de persistencia de los datos. 

### Características Principales e Integración de Módulos:

* **Autenticación y Control de Accesos:** Gestión de sesiones simuladas persistidas en el almacenamiento local (*LocalStorage*).
* **Seguridad Basada en Roles/Sectores:** Restricciones lógicas de permisos en la interfaz de usuario. El sector de *Gerencia* posee facultades totales de administración (incluyendo la eliminación lógica de registros), mientras que el sector de *Soporte* opera bajo un entorno de solo lectura.
* **Alta y Validación:** Formulario controlado para la incorporación de nuevos clientes al sistema, acompañado de notificaciones contextuales integrales (*Snackbars*).
* **Ficha Detallada :** Renderizado estructurado y profesional de perfiles mediante un sistema adaptativo de tarjetas (*Grid y Box*), manejando de forma segura la deconstrucción de objetos anidados como las direcciones de residencia.
* **Navegación Global Semántica:** Encabezado (*Header*) de doble fila con información del administrador e interfaz de navegación visual activo de rutas y un pie de página (*Footer*) integrado.

---

## Tecnologías Implementadas

* **React.js** (v18+) - Biblioteca principal para la construcción de la interfaz.
* **React Router Dom** (v6) - Gestión de enrutamiento dinámico y protección de rutas privadas.
* **Material UI (@mui/material)** - Framework de diseño visual.
* **Vite** - Herramienta de construcción y entorno de desarrollo rápido.

---

## Integrantes del Grupo

| Nombre | LU | Usuario GitHub |
|--------|-----|----------|
| Bazan, Fabricio Agustín | 5291 | fabri982022 |
| Carlos, Gisella Yanina | 5541 | gisela1234 |
| Tapia, Carlos Matias | 6492 | cmatiastapia |
| Poma, Aldana Sabrina | 6126 | pomasabrina |

---

**Fecha de entrega:** Junio 2026  
**Grupo:** 20