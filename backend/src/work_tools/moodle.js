const axios = require('axios');

const moodle = {};

moodle.get = async (url, params) => {
    try {
        return await axios.get(url, params);
    }
    catch (error) {
        console.error(error);
    }
};

moodle.getUsername = async (wstoken) => {
    try {
        const url = 'http://localhost/webservice/rest/server.php';
        const params = {
            params: {
                wstoken,
                wsfunction: 'core_webservice_get_site_info',
                moodlewsrestformat: 'json'
            }
        };
        const response = await moodle.get(url, params);
        const username = response.data.username;
        return username;        
    }
    catch (error) {}
};

module.exports = moodle;