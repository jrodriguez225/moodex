const utils = {};

utils.headerFormat = (header) => {
    const split = header.split(' ');
    return split.length === 2 && split[0] === 'Bearer';
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
    const date = new Date(unix_timestamp * 1000 + 28800000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year, month, day };
};

utils.getDates = (date, duration) => {
    const dates = [];
    const currentDate = new Date(date * 1000 + 28800000);
    const stopDate = new Date((date + duration) * 1000 + 28800000);
    while (currentDate <= stopDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        dates.push({ year, month, day });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

utils.equalDates = (date1, date2) => {
    return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
};

module.exports = utils;