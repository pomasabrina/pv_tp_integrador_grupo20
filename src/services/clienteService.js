const API_URL = "https://fakestoreapi.com/users";

export const crearCliente = async (cliente) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("No se pudo dar de alta al cliente");
  }

  return response.json();
};
