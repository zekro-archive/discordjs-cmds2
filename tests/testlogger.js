const LoggerInterface = require('../src/main').LoggerInterface;

module.exports = class TestLogger extends LoggerInterface {
    constructor(defLevel) {
        super(defLevel);
    }

    info(message, params) {
        console.log('INFO', message)
    }

    debug(message, params) {
        console.log('DEBUG', message)
    }

    warning(message, params) {
        console.log('WARNING', message)
    }

    error(message, params) {
        console.log('ERROR', message)
    }
}