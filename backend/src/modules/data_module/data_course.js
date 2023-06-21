const axios = require('axios');

const data_course = {};

data_course.getCourseUserRoles = async (platform, wstoken, courseid, userid) => {
    try {
        const url = `${platform}webservice/rest/server.php`;
        const params = {
            params: {
                wstoken,
                moodlewsrestformat: 'json',
                wsfunction: 'core_user_get_course_user_profiles',
                userlist: {
                    0: {
                        userid,
                        courseid
                    }
                }
            }
        };
        const response = await axios.get(url, params);
        const user = response.data[0];
        let roles = null;
        if (user) {
            roles = user.roles;
        }
        return roles;
    }
    catch (error) {
        console.error(error);
    }
};

data_course.getCourseUsers = async (platform, wstoken, courseid) => {
    try {
        const url = `${platform}webservice/rest/server.php`;
        const params = {
            params: {
                wstoken,
                moodlewsrestformat: 'json',
                wsfunction: 'core_enrol_get_enrolled_users',
                courseid
            }
        };
        const response = await axios.get(url, params);
        const users = response.data;
        return users;
    }
    catch (error) {
        console.error(error);
    }
};

data_course.getCourseCalendarEvents = async (platform, wstoken, courseid, timestart, timeend) => {
    try {
        const url = `${platform}webservice/rest/server.php`;
        const params = {
            params: {
                wstoken,
                moodlewsrestformat: 'json',
                wsfunction: 'core_calendar_get_calendar_events',
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
        const response = await axios.get(url, params);
        const events = response.data.events;
        return events;
    }
    catch (error) {
        console.error(error);
    }
};

module.exports = data_course;