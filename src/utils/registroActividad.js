export const agregarActividad = (mensaje) => {
  const actividades =
    JSON.parse(localStorage.getItem("actividades")) || [];

  const hora = new Date().toLocaleString("es-AR");

  actividades.unshift(`${hora} - ${mensaje}`);

  localStorage.setItem(
    "actividades",
    JSON.stringify(actividades.slice(0, 10))
  );
};