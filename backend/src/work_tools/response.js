const response = {};

response.getResponse = (code, body = null) => {
    const status = Number(String(code).substring(0,3));
    let msg = '';
    // 200 (OK)
    if (code === 20000) {
        msg = 'Token y rol obtenidos';
    }
    else if (code === 20001) {
        msg = 'Cursos del profesor obtenidos';
    }
    else if (code === 20002) {
        msg = 'Eventos de calendario y número total de alumnos del curso obtenidos';
    }
    // 400 (Bad Request)
    else if (code === 40000) {
        msg = '¡No se han recibido la plataforma, el nombre de usuario y la contraseña, o la plataforma no dispone del formato de URL adecuado, o el nombre de usuario o la contraseña no es una cadena!';
    }
    else if (code === 40001) {
        msg = '¡No se ha recibido alguna de las cabeceras de autorización necesarias, o alguna de ellas no dispone del formato adecuado!';
    }
    else if (code === 40002) {
        msg = '¡No se han recibido el identificador, la fecha de comienzo y la fecha de fin del curso, o uno de ellos no es un número natural, o la fecha de comienzo es posterior a la fecha de fin del curso!';
    }
    // 401 (Unauthorized)
    else if (code === 40100) {
        msg = '¡No se han obtenido el token y el rol dado que el nombre de usuario y la contraseña no corresponden a ningún administrador ni a ningún docente de la plataforma!';
    }
    else if (code === 40101) {
        msg = '¡El token no es válido!';
    }
    else if (code === 40102) {
        msg = '¡Lo sentimos, la sesión ha caducado!';
    }
    // 403 (Forbidden)
    else if (code === 40300) {
        msg = '¡El administrador no está autorizado a obtener los cursos que imparte!';
    }
    else if (code === 40301) {
        msg = '¡El administrador no está autorizado a obtener los eventos de calendario y el número total de alumnos del curso!';
    }
    // 404 (Not Found)
    else if (code === 40400) {
        msg = '¡No se ha encontrado la ruta solicitada!';
    }
    // 500 (Internal Server Error)
    else if (code === 50000) {
        msg = '¡Error interno del servidor, no se han podido obtener el token y el rol del usuario!';
    }
    else if (code === 50001) {
        msg = '¡Error interno del servidor, no se ha podido validar la petición debido a los datos de autorización!';
    }
    else if (code === 50002) {
        msg = '¡Error interno del servidor, no se han podido obtener los cursos que imparte el profesor!';
    }
    else if (code === 50003) {
        msg = '¡Error interno del servidor, no se han podido obtener los eventos de calendario y el número total de alumnos del curso!';
    }
    return { status, code, msg, body };
};

module.exports = response;