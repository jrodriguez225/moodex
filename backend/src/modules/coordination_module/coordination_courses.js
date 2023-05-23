const data_users = require('../data_module/data_users');
const data_courses = require('../data_module/data_courses');
const utils = require('../../work_tools/utils');

const cooordination_courses = {};

// obtener los cursos del profesor
cooordination_courses.getTeacherCourses = (token, userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            // lista que almacena los cursos en los que el usuario tiene rol de profesor
            const teacherCourses = [];
            // obtener los cursos del usuario
            let response = await data_users.getUserCourses(token, userid);
            const userCourses = response.data;
            // por cada curso del usuario
            for (let coursesIndex = 0; coursesIndex < userCourses.length; coursesIndex++) {
                const course = userCourses[coursesIndex];
                const courseid = course.id;
                // obtener los usuarios del curso
                response = await data_courses.getCourseUsers(token, courseid);
                const users = response.data;
                // recorrer la lista de usuarios del curso hasta dar con el usuario actual
                let enc = false;
                let usersIndex = 0;
                while(!enc) {
                    const user = users[usersIndex];
                    // al encontrar al usuario actual
                    if (userid === user.id) {
                        // mirar si tiene rol de profesor
                        const isTeacher = user.roles.some(role => role.shortname.includes('teacher'));
                        // si lo tiene
                        if (isTeacher) {
                            // añadir el curso a la lista
                            const coursename = course.shortname;
                            const coursestartdate = utils.getDate(course.startdate);
                            const courseenddate = utils.getDate(course.enddate);
                            teacherCourses.push({ courseid, coursename, coursestartdate, courseenddate });
                        }
                        enc = true;
                    }
                    usersIndex++;
                }
            }
            // devolver la lista
            resolve(teacherCourses);
        }
        catch (error) {
            reject(50002);
        }
    });
};

// obtener una lista de fechas y cantidad de alumnos que determine cuándo y cuantós alumnos del curso tienen asignado
// un evento de calendario
cooordination_courses.getCourseStudentsCalendarEvents = (token, courseid, coursestartdate, courseenddate) => {
    return new Promise(async (resolve, reject) => {
        try {
            // lista que almacena la fecha y la cantidad de alumnos que tienen asignado un evento de calendario
            const events = [];
            // número de alumnos
            let students = 0;
            // obtener los usuarios del curso
            let response = await data_courses.getCourseUsers(token, courseid);
            const users = response.data;
            // por cada usuario del curso
            for (let usersIndex = 0; usersIndex < users.length; usersIndex++) {
                const user = users[usersIndex];
                // mirar si tiene rol de alumno
                const isStudent = user.roles.some(role => role.shortname === 'student');
                // si lo tiene
                if (isStudent) {
                    // incrementar el número de alumnos
                    students++;
                    // obtener los cursos del alumno (enrolledcourses)
                    const courses = user.enrolledcourses;
                    // lista que almacena las fechas en las que el alumno tiene asignado al menos un evento de calendario
                    const dates = [];
                    // por cada curso del alumno
                    for (let coursesIndex = 0; coursesIndex < courses.length; coursesIndex++) {
                        const course = courses[coursesIndex];
                        // obtener los eventos de calendario del curso
                        response = await data_courses.getCourseCalendarEvents(token, course.id, coursestartdate, courseenddate);
                        const courseEvents = response.data.events;
                        // por cada evento de calendario del curso
                        for (let eventsIndex = 0; eventsIndex < courseEvents.length; eventsIndex++) {
                            const event = courseEvents[eventsIndex];
                            // obtener las fechas del evento de calendario
                            const eventDates = utils.getDates(event.timestart, event.timeduration);
                            // por cada fecha del evento de calendario
                            for (let eventDatesIndex = 0; eventDatesIndex < eventDates.length; eventDatesIndex++) {
                                const eventDate = eventDates[eventDatesIndex];
                                // si no está ya en la lista
                                if (!dates.some(date => utils.equalDates(eventDate, date))) {
                                    // añadir la fecha a la lista
                                    dates.push(eventDate);
                                }
                            }
                        }
                    }
                    // por cada fecha en la que el alumno tiene asignado al menos un evento de calendario
                    for (let datesIndex = 0; datesIndex < dates.length; datesIndex++) {
                        const date = dates[datesIndex];
                        // si no está ya en la lista
                        if (!events.some(event => utils.equalDates(date, event.date))) {
                            // añadir la fecha a la lista
                            events.push({ date, students: 1 });
                        }
                        // si lo está
                        else {
                            // incrementar el número de alumnos
                            const auxEvents = events.filter(event => utils.equalDates(date, event.date));
                            auxEvents[0].students++;
                        }
                    }
                }
            }
            // devolver la lista y el número total de alumnos
            resolve({ events, students });
        }
        catch (error) {
            reject(50003);
        }
    });
};

module.exports = cooordination_courses;