const moodle = require('../../work_tools/moodle');

const data_courses = {};

data_courses.getCourseUsers = async (wstoken, courseid) => {
    try {
        const url = 'http://localhost/webservice/rest/server.php';
        const params = {
            params: {
                wstoken,
                wsfunction: 'core_enrol_get_enrolled_users',
                moodlewsrestformat: 'json',
                courseid
            }
        };
        return await moodle.get(url, params);
    }
    catch (error) {}
};

data_courses.getCourseCalendarEvents = async (wstoken, courseid, timestart, timeend) => {
    try {
        const url = 'http://localhost/webservice/rest/server.php';
        const params = {
            params: {
                wstoken,
                wsfunction: 'core_calendar_get_calendar_events',
                moodlewsrestformat: 'json',
                events: {
                    courseids: {
                        0: courseid
                    }
                },
                options: {
                    timestart,
                    timeend
                }
            }
        };
        return await moodle.get(url, params);
    }
    catch (error) {}
};

module.exports = data_courses;