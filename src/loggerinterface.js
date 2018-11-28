/**
 * Interface class for logging handler classes.
 * @abstract
 * @class LoggerInterface
 */
class LoggerInterface {

    constructor(defaultLoggingLevel) {
        checkLogLevelInput(defaultLoggingLevel, true);
        this._logLevel = defaultLoggingLevel || 0;
    }

    ///// PUBLIC ABSTRACT /////

    /**
     * Will be executed by sending info logging messages.
     * @abstract
     * @public
     * @param {string} message Message to log
     * @param {*} params Other param objects (can be multiple parameters!) 
     */
    info(message, params) {
        throw Error('info(message, params) must be implemented!');
    }

    /**
     * Will be executed by sending debug logging messages.
     * @abstract
     * @public
     * @param {string} message Message to log
     * @param {*} params Other param objects (can be multiple parameters!) 
     */
    debug(message, params) {
        throw Error('debug(message, params) must be implemented!');
    }

    /**
     * Will be executed by sending warning logging messages.
     * @abstract
     * @public
     * @param {string} message Message to log
     * @param {*} params Other param objects (can be multiple parameters!) 
     */
    warning(message, params) {
        throw Error('warning(message, params) must be implemented!');
    }

    /**
     * Will be executed by sending error logging messages.
     * @abstract
     * @public
     * @param {string} message Message to log
     * @param {*} params Other param objects (can be multiple parameters!) 
     */
    error(message, params) {
        throw Error('error(message, params) must be implemented!');
    }

    /**
     * This method will be called after [setLogLevel()]{@link LoggerInterface#setLogLevel} was executed.
     * @abstract
     * @public
     * @param {number} logLevel This function will get passed the new log level
     */
    onLogLevelChange(logLevel) {}

    ///// PUBLIC /////

    /**
     * Set the log level of the logger.
     * @public
     * @param {number} level log level
     */
    setLogLevel(level) {
        checkLogLevelInput(level);
        this.logLevel = level;
        this.onLogLevelChange(level);
    }

    /**
     * Get the current log level of the logger.
     * @public
     * @returns {number} log level
     */
    get logLevel() {
        return this._logLevel;
    }

    /**
     * Transform IArguments to array.
     * @param {IArgument} args Function arguments 
     */
    argumentsToArray(args) {
        let params = [];
        for (var i = 1; i < args.length; i++) {
            params.push(args[i]);
        }
        return params;
    }
}


function checkLogLevelInput(level, canBeNull = false) {
    if ((!canBeNull && !level) || level < 0)
        throw Error('log level must be 0 or larger');
    if (!(canBeNull && !level) && !Number.isInteger(level))
        throw Error('log level must be a number');
}


module.exports = LoggerInterface;