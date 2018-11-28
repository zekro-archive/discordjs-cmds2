const winston = require('winston');
const LoggerInterface = require('./loggerinterface');

const logFormat = winston.format.printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

module.exports = class WinstonLogger extends LoggerInterface {
    constructor(defaultLogLevel) {
        super(defaultLogLevel);

        this.winston = winston.createLogger({
            level: this.logLevel,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                logFormat
            ),
            transports: [
                new winston.transports.Console()
            ],
            levels: {
                debug: 0,
                info: 1,
                warning: 2,
                error: 3
            }
        });

        winston.addColors({
            info: 'cyan',
            debug: 'green',
            warning: 'yellow',
            error: 'red'
        });
    }

    info(message, params) {
        params = this.argumentsToArray(arguments).slice(1);
        this.winston.info(message, ...params);
    }

    debug(message, params) {
        params = this.argumentsToArray(arguments).slice(1);
        this.winston.debug(message, ...params);
    }

    warning(message, params) {
        params = this.argumentsToArray(arguments).slice(1);
        this.winston.warning(message, ...params);
    }

    error(message, params) {
        params = this.argumentsToArray(arguments).slice(1);
        this.winston.error(message, ...params);
    }

    onLogLevelChange(level) {
        this.winston.level = level;
    }
}




