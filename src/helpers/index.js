export const generarId = () => {
    const random = Math.random().toString(36).substr(2, 9);
    const fecha = new Date().getTime();
    return `${random}-${fecha}`;
}

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
}