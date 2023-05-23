const data_token = require('../data_module/data_token');

const coordination_login = {};

coordination_login.login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = null;
            let index = 0;
            const services = ['moodexmanagerws', 'moodexeditingteacherws', 'moodexteacherws'];
            let service = null;
            while (!token && index < services.length) {
                service = services[index];
                const response = await data_token.getToken(username, password, service);
                token = response.data.token;
                index++;
            }
            let data = null;
            if (token) {
                const role = service.replace('moodex', '').replace('ws', '');
                data = { token, role };
            }
            resolve(data);
        }
        catch (error) {
            reject(50000);
        }
    });
};

module.exports = coordination_login;