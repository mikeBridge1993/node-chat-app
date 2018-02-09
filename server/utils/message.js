var moment = require('moment');

var generateMessage = (from, text, color) => {
    return {
        from,
        text,
        createdAt: moment().valueOf(),
        color
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: 'https://www.google.com/maps?q='+latitude+","+longitude,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage} 