const LoggerInterface = require('./loggerinterface');
const WinstonLogger = require('./winstonlogger');

class LoggerContainer {
    constructor(useDefaultLogger) {
        this.registeredLoggers = {};
        if (useDefaultLogger) {
            this.registeredLoggers['winston'] = new WinstonLogger();
        }
    }

    ///// PUBLIC /////

    registerLogger(name, LoggerClass, defaultLogLevel) {
        if (!name) {
            throw Error('A name must be specified for the registered logger');
        }
        if (Object.keys(this.registeredLoggers).includes(name)) {
            throw Error('The name for the logger is already given');
        }
        if (!LoggerClass) {
            throw Error('logger class is undefined!');
        }
        if (!(LoggerClass.prototype instanceof LoggerInterface)) {
            throw Error('logger class must extend DatabaseInterface!');
        }
        this.registeredLoggers[name] = new LoggerClass(defaultLogLevel);
    }

    getLoggerByName(name) {
        if (!Object.keys(this.registeredLoggers).includes(name)) {
            throw Error('There is no logger registered with the name "' + name + '"');
        }
        return this.registeredLoggers[name];
    }

    info(message, params) {
        this._iterateLoggers((logger) => {
            logger.info(...arguments);
        });
    }

    debug(message, params) {
        this._iterateLoggers((logger) => {
            logger.debug(...arguments);
        });
    }

    warning(message, params) {
        this._iterateLoggers((logger) => {
            logger.warning(...arguments);
        });
    }

    error(message, params) {
        this._iterateLoggers((logger) => {
            logger.error(...arguments);
        });
    }

    ///// PRIVATE /////

    _iterateLoggers(cb) {
        Object.values(this.registeredLoggers).forEach(cb);
    }
}

module.exports = LoggerContainer;