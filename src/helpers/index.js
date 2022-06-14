export const formatearCantidad = cantidad => {
  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

// FUNCIOON HELPER
export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };
  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const generarId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);

  return random + fecha;
};

/* Comentarios*/

/* Los HELPERS son FUNCIONES que puedo reutilizar en cualquier componente*/

/** export const ** , lo hago disponible en los demas componentes*/
/* formatearCantidad, es como estoy nombrando a mi fx*/
/* Mi funcion, *FORMATEARCANTIDAD* , lo que va a tomar es una cantidad y convertirla a una representacion de dinero */
/* como toma un único parametro se puede eliminar () y colocar solo cantidad */
/* return Number() lo vamos a convertir a numero */
/* tiene que ser un numero para que el **método toLocaleString** API, pueda estar disponible, si no no funciona*/
/* style: 'currency' para que sea dinero */
/* currency moneda*/
