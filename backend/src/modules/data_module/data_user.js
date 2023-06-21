const axios = require('axios');

const data_user = {};

data_user.getUserToken = async (platform, username, password) => {
    try {
        const url = `${platform}login/token.php`;
        const params = {
            params: {
                username,
                password,
                service: 'moodle_mobile_app'
            }
        };
        const response = await axios.get(url, params);
        const token = response.data.token;
        return token;
    }
    catch (error) {
        console.error(error);
    }
};

data_user.getUserid = async (platform, wstoken) => {
    try {
        const url = `${platform}webservice/rest/server.php`;
        const params = {
            params: {
                wstoken,
                moodlewsrestformat: 'json',
                wsfunction: 'core_webservice_get_site_info'
            }
        };
        const response = await axios.get(url, params);
        const userid = response.data.userid;
        return userid;
    }
    catch (error) {
        console.error(error);
    }
};

data_user.getUserCourses = async (platform, wstoken, userid) => {
    try {
        const url = `${platform}webservice/rest/server.php`;
        const params = {
            params: {
                wstoken,
                moodlewsrestformat: 'json',
                wsfunction: 'core_enrol_get_users_courses',
                userid
            }
        };
        const response = await axios.get(url, params);
        const courses = response.data;
        return courses;
    }
    catch (error) {
        console.error(error);
    }
};

data_user.getUserFullname = async (platform, wstoken) => {
    try {
        const url = `${platform}webservice/rest/server.php`;
        const params = {
            params: {
                wstoken,
                moodlewsrestformat: 'json',
                wsfunction: 'core_webservice_get_site_info'
            }
        };
        const response = await axios.get(url, params);
        const fullname = response.data.fullname;
        return fullname;
    }
    catch (error) {
        console.error(error);
    }
};

module.exports = data_user;