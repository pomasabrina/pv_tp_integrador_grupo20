const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const SOLO_NUMEROS = /^\d+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_REGEX = /^[\d\s\-+()]+$/;
const USERNAME_REGEX = /^[A-Za-z0-9_]+$/;
const ALFANUMERICO = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

export const validarLogin = (nombre, contraseña) => {
  const errores = {};

  if (!nombre.trim()) {
    errores.nombre = "El nombre es obligatorio";
  } else if (!SOLO_LETRAS.test(nombre.trim())) {
    errores.nombre = "El nombre solo puede contener letras";
  } else if (nombre.trim().length < 2 || nombre.trim().length > 40) {
    errores.nombre = "El nombre debe tener entre 2 y 40 caracteres";
  }

  if (!contraseña) {
    errores.contraseña = "La contraseña es obligatoria";
  } else if (contraseña.length < 6 || contraseña.length > 20) {
    errores.contraseña = "La contraseña debe tener entre 6 y 20 caracteres";
  } else if (!ALFANUMERICO.test(contraseña)) {
    errores.contraseña = "La contraseña debe incluir letras y números";
  }

  return errores;
};

export const validarAltaCliente = (form) => {
  const errores = {};

  if (!form.firstname.trim()) {
    errores.firstname = "El nombre es obligatorio";
  } else if (!SOLO_LETRAS.test(form.firstname.trim())) {
    errores.firstname = "El nombre solo puede contener letras";
  } else if (form.firstname.trim().length < 2 || form.firstname.trim().length > 30) {
    errores.firstname = "El nombre debe tener entre 2 y 30 caracteres";
  }

  if (!form.lastname.trim()) {
    errores.lastname = "El apellido es obligatorio";
  } else if (!SOLO_LETRAS.test(form.lastname.trim())) {
    errores.lastname = "El apellido solo puede contener letras";
  } else if (form.lastname.trim().length < 2 || form.lastname.trim().length > 30) {
    errores.lastname = "El apellido debe tener entre 2 y 30 caracteres";
  }

  if (!form.email.trim()) {
    errores.email = "El email es obligatorio";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errores.email = "El email no tiene un formato válido";
  } else if (form.email.trim().length > 100) {
    errores.email = "El email no puede superar 100 caracteres";
  }

  if (!form.phone.trim()) {
    errores.phone = "El teléfono es obligatorio";
  } else if (!TELEFONO_REGEX.test(form.phone.trim())) {
    errores.phone = "El teléfono solo puede contener números y símbolos válidos";
  } else if (form.phone.replace(/\D/g, "").length < 7 || form.phone.replace(/\D/g, "").length > 15) {
    errores.phone = "El teléfono debe tener entre 7 y 15 dígitos";
  }

  if (!form.username.trim()) {
    errores.username = "El usuario es obligatorio";
  } else if (!USERNAME_REGEX.test(form.username.trim())) {
    errores.username = "El usuario solo puede contener letras, números y guion bajo";
  } else if (form.username.trim().length < 4 || form.username.trim().length > 20) {
    errores.username = "El usuario debe tener entre 4 y 20 caracteres";
  }

  if (!form.password) {
    errores.password = "La contraseña es obligatoria";
  } else if (form.password.length < 6 || form.password.length > 20) {
    errores.password = "La contraseña debe tener entre 6 y 20 caracteres";
  } else if (!ALFANUMERICO.test(form.password)) {
    errores.password = "La contraseña debe incluir letras y números";
  }

  if (!form.city.trim()) {
    errores.city = "La ciudad es obligatoria";
  } else if (!SOLO_LETRAS.test(form.city.trim())) {
    errores.city = "La ciudad solo puede contener letras";
  } else if (form.city.trim().length < 2 || form.city.trim().length > 50) {
    errores.city = "La ciudad debe tener entre 2 y 50 caracteres";
  }

  if (!form.street.trim()) {
    errores.street = "La calle es obligatoria";
  } else if (form.street.trim().length < 2 || form.street.trim().length > 50) {
    errores.street = "La calle debe tener entre 2 y 50 caracteres";
  }

  if (!form.number) {
    errores.number = "El número es obligatorio";
  } else if (!SOLO_NUMEROS.test(String(form.number))) {
    errores.number = "El número solo puede contener dígitos";
  } else if (String(form.number).length < 1 || String(form.number).length > 6) {
    errores.number = "El número debe tener entre 1 y 6 dígitos";
  }

  if (!form.zipcode.trim()) {
    errores.zipcode = "El código postal es obligatorio";
  } else if (!SOLO_NUMEROS.test(form.zipcode.trim())) {
    errores.zipcode = "El código postal solo puede contener números";
  } else if (form.zipcode.trim().length < 4 || form.zipcode.trim().length > 10) {
    errores.zipcode = "El código postal debe tener entre 4 y 10 dígitos";
  }

  return errores;
};
