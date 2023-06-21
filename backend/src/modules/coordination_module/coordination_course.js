const data_user = require('../data_module/data_user');
const data_course = require('../data_module/data_course');
const utils = require('../../work_tools/utils');

const coordination_course = {};

// obtener los cursos del profesor
coordination_course.getTeacherCourses = (platform, token, userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            // se declara una lista que almacena los cursos en los que el usuario tiene rol de profesor
            const teacherCourses = [];
            // se obtienen los cursos del usuario
            const userCourses = await data_user.getUserCourses(platform, token, userid);
            // por cada curso del usuario
            for (let index = 0; index < userCourses.length; index++) {
                const course = userCourses[index];
                // se obtiene el identificador del curso
                const courseid = course.id;
                // se obtienen los roles del usuario en el curso
                const roles = await data_course.getCourseUserRoles(platform, token, courseid, userid);
                // se mira a ver si el usuario tiene rol de profesor o de profesor con permiso de edición
                const isTeacher = roles.some(role => role.shortname === 'teacher' || role.shortname === 'editingteacher');
                // si tiene alguno de los dos
                if (isTeacher) {
                    // se obtienen los datos del curso necesarios (nombre, fecha de comienzo, fecha de fin y si el profesor tiene permiso de edición)
                    const coursename = course.fullname;
                    const coursestartdate = utils.getDate(course.startdate);
                    const courseenddate = utils.getDate(course.enddate);
                    const editablecourse = roles.some(role => role.shortname === 'editingteacher');
                    // se añade el curso a la lista
                    teacherCourses.push({ courseid, coursename, coursestartdate, courseenddate, editablecourse });
                }
            }
            // se devuelve la lista
            resolve(teacherCourses);
        }
        catch (error) {
            reject(50002);
        }
    });
};

// obtener una lista de fechas y alumnos que determine cuando y cuantos alumnos del curso tienen asignado
// al menos un evento de calendario y el número total de alumnos del curso
coordination_course.getCourseStudentsCalendarEvents = (platform, token, courseid, coursestartdate, courseenddate) => {
    return new Promise(async (resolve, reject) => {
        try {
            // se declara una lista que almacena la fecha y los alumnos que tienen asignado al menos un evento de calendario
            const events = [];
            // se declara el número total de alumnos
            let students = 0;
            // se obtienen los usuarios del curso
            const users = await data_course.getCourseUsers(platform, token, courseid);
            // por cada usuario del curso
            for (let usersIndex = 0; usersIndex < users.length; usersIndex++) {
                const user = users[usersIndex];
                // se mira a ver si el usuario tiene rol de alumno
                let isStudent = user.roles.some(role => role.shortname === 'student');
                // si lo tiene
                if (isStudent) {
                    // se incrementa el número total de alumnos
                    students++;
                    // se obtienen los cursos del alumno
                    const courses = user.enrolledcourses;
                    // por cada curso del alumno
                    for (let coursesIndex = 0; coursesIndex < courses.length; coursesIndex++) {
                        const course = courses[coursesIndex];
                        // se obtienen los roles del alumno en el curso
                        const roles = await data_course.getCourseUserRoles(platform, token, course.id, user.id);
                        // si se obtienen los roles del alumno en el curso
                        if (roles) {
                            // se mira a ver si el alumno tiene rol de alumno en este curso
                            isStudent = roles.some(role => role.shortname === 'student');
                            // si lo tiene
                            if (isStudent) {
                                // se obtienen los eventos de calendario del curso
                                const courseEvents = await data_course.getCourseCalendarEvents(platform, token, course.id, coursestartdate, courseenddate);
                                // por cada evento de calendario del curso
                                for (let eventsIndex = 0; eventsIndex < courseEvents.length; eventsIndex++) {
                                    const event = courseEvents[eventsIndex];
                                    // si el evento de calendario es visible y es un evento de curso
                                    if (event.visible === 1 && event.eventtype === 'course') {
                                        // se obtienen la fecha de comienzo y la fecha de fin del evento de calendario
                                        const currentDate = new Date((event.timestart + 21600) * 1000);
                                        const stopDate = new Date((event.timestart + event.timeduration + 21600) * 1000);
                                        // por cada fecha del evento de calendario
                                        while (currentDate <= stopDate) {
                                            const year = currentDate.getFullYear();
                                            const month = currentDate.getMonth() + 1;
                                            const day = currentDate.getDate();
                                            const eventDate = { year, month, day };
                                            // si no está ya en la lista
                                            if (!events.some(event => utils.equalDates(eventDate, event.date))) {
                                                // se añaden la fecha y el alumno a la lista
                                                events.push({ date: eventDate, students: [user.id] });
                                            }
                                            // si lo está
                                            else {
                                                // se obtiene la lista de alumnos del evento de calendario
                                                const auxStudents = events.filter(event => utils.equalDates(eventDate, event.date))[0].students;
                                                // si el alumno no forma parte de la lista
                                                if (!auxStudents.includes(user.id)) {
                                                    // se añade el alumno a la lista
                                                    auxStudents.push(user.id);
                                                }
                                            }
                                            currentDate.setDate(currentDate.getDate() + 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // se devuelven la lista de eventos y el número total de alumnos
            resolve({ events, students });
        }
        catch (error) {
            reject(50003);
        }
    });
};

module.exports = coordination_course;