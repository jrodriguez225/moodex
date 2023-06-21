const data_user = require('../data_module/data_user');
const data_course = require('../data_module/data_course');

const coordination_login = {};

// iniciar sesión en Moodex
coordination_login.login = (platform, username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // se obtiene el token del usuario en la plataforma
            const token = await data_user.getUserToken(platform, username, password);
            // se declaracan los datos que se van a devolver
            let data = null;
            // si se obtiene el token del usuario
            if (token) {
                // se obtiene el identificador del usuario
                const userid = await data_user.getUserid(platform, token);
                // si se obtiene el identificador del usuario
                if (userid) {
                    // se declara un booleano que determina si el usuario tiene rol de gestor en algún curso
                    let isManager = false;
                    // se declara un booleano que determina si el usuario tiene rol de profesor en algún curso
                    let isTeacher = false;
                    // se obtienen los cursos del usuario
                    const userCourses = await data_user.getUserCourses(platform, token, userid);
                    // se declara un índice para poder recorrer los cursos del usuario
                    let index = 0;
                    // mientras el usuario no tenga ni rol de manager ni rol de profesor y el índice sea menor a los cursos del usuario
                    while (!isManager && !isTeacher && index < userCourses.length) {
                        // se obtiene un curso de la lista de cursos del usuario
                        const course = userCourses[index];
                        // se obtienen los roles del usuario en el curso
                        const roles = await data_course.getCourseUserRoles(platform, token, course.id, userid);
                        // se mira a ver si el usuario tiene rol de gestor
                        isManager = roles.some(role => role.shortname === 'manager');
                        // si no lo tiene
                        if (!isManager) {
                            // se mira a ver si el usuario tiene rol de profesor o de profesor con permiso de edición
                            isTeacher = roles.some(role => role.shortname === 'teacher' || role.shortname === 'editingteacher');
                            // si no tiene ninguno
                            if (!isTeacher) {
                                // se incrementa el indíce
                                index++;
                            }
                        }
                    }
                    // si el usuario tiene rol de gestor o rol de profesor en algún curso
                    if (isManager || isTeacher) {
                        // se obtiene el nombre completo del usuario
                        const fullname = await data_user.getUserFullname(platform, token);
                        // si se obtiene el nombre completo del usuario
                        if (fullname) {
                            // si el usuario tiene rol de gestor en algún curso
                            if (isManager) {
                                // se introducen el token, el rol de gestor y el nombre completo en los datos
                                data = { token, role: 'manager', fullname };
                            }
                            // si el usuario tiene rol de profesor en algún curso
                            else if (isTeacher) {
                                // se introducen el token, el rol de profesor y el nombre completo en los datos
                                data = { token, role: 'teacher', fullname };
                            }
                        }
                    }
                }
            }
            // se devuelven los datos
            resolve(data);
        }
        catch (error) {
            reject(50000);
        }
    });
};

module.exports = coordination_login;