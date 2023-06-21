const utils = {};

utils.headerFormat = (header) => {
    const split = header.split(' ');
    return split.length === 2 && split[0] === 'Bearer';
};

utils.urlFormat = (url) => {
    const split = url.split('/');
    return split.length === 4 && (split[0] === 'http:' || split[0] === 'https:') && split[1] === '' && split[2] !== '' && split[3] === '';
};

utils.isISOString = (string) => {
    let isISOString = false;
    const date = new Date(string);
    if (!isNaN(date)) {
        const isoString = date.toISOString();
        isISOString = string === isoString;
    }
    return isISOString;
};

utils.isNaturalNumber = (number) => {
    let isNaturalNumber = false;
    if (number === 0) isNaturalNumber = true;
    else {
        const int = parseInt(number);
        if (int && number === int && int > 0) {
            isNaturalNumber = true;
        }
    }
    return isNaturalNumber;
};

utils.getDate = (unix_timestamp) => {
    const date = new Date((unix_timestamp + 21600) * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return { year, month, day, hour, minute, second };
};

utils.equalDates = (date1, date2) => {
    return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
};

module.exports = utils;