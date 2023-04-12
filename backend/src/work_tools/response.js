const response = {};

response.getResponse = (code, body = null) => {
    const status = Number(String(code).substring(0,3));
    let msg = '';
    // 200 (OK)
    if (code === 20000) {
        msg = 'Token obtenido';
    }
    else if (code === 20001) {
        msg = 'Nombre de usuario obtenido';
    }
    // 400 (Bad Request)
    else if (code === 40000) {
        msg = '¡No se ha obtenido el nombre de usuario o la contraseña, o uno de ellos no es una cadena!';
    }
    else if (code === 40001) {
        msg = '¡No se han obtenido todas las cabeceras de autorización necesarias!';
    }
    else if (code === 40002) {
        msg = '¡Alguna de las cabeceras de autorización no dispone de los datos necesarios, o alguno de ellos no es una cadena!';
    }
    else if (code === 40003) {
        msg = '¡No se ha obtenido el nombre de usuario o no es una cadena!';
    }
    // 401 (Unauthorized)
    else if (code === 40100) {
        msg = '¡No se ha obtenido el token dado que el nombre de usuario y la contraseña no corresponden a ningún usuario!';
    }
    else if (code === 40101) {
        msg = '¡El token no es válido!';
    }
    else if (code === 40102) {
        msg = '¡El rol no es válido!';
    }
    else if (code === 40103) {
        msg = '¡Lo sentimos, la sesión ha caducado!';
    }
    // 403 (Forbidden)
    // 404 (Not Found)
    // 500 (Internal Server Error)
    else if (code === 50000) {
        msg = '¡Error interno del servidor, no se ha podido obtener el token!';
    }
    else if (code === 50001) {
        msg = '¡Error interno del servidor, no se ha podido obtener el nombre de usuario!';
    }
    return { status, code, msg, body };
};

module.exports = response;