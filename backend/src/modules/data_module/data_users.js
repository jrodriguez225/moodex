const moodle = require('../../work_tools/moodle');

const data_users = {};

data_users.getUserCourses = async (wstoken, userid) => {
    try {
        const url = 'http://localhost/webservice/rest/server.php';
        const params = {
            params: {
                wstoken,
                wsfunction: 'core_enrol_get_users_courses',
                moodlewsrestformat: 'json',
                userid
            }
        };
        return await moodle.get(url, params);
    }
    catch (error) {}
};

module.exports = data_users;