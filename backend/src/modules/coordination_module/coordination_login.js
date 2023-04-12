const data_login = require('../data_module/data_login');

const coordination_login = {};

coordination_login.login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = null;
            let serviceNum = 0;
            const services = ['moodexmanagerws', 'moodexeditingteacherws', 'moodexteacherws'];
            let service = null;
            while (!token && serviceNum<services.length) {
                service = services[serviceNum];
                const response = await data_login.getToken(username, password, service);
                token = response.data.token;
                serviceNum++;
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