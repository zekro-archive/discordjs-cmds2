const winston = require('winston');

const logFormat = winston.format.printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

module.exports.logger = winston.createLogger({
    level: 0,
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