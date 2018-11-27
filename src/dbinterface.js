/**
 * Abstract class interface for database drivers.
 * @abstract
 * @class DatabaseInterface
 */
class DatabaseInterface {

    constructor() {
        if (!(this.getUserPermissionLevel(0) instanceof Promise)) {
            throw Error('getUserPermissionLevel(userID) must return instance of Promise!');
        }
        if (!(this.getGuildPrefix(0) instanceof Promise)) {
            throw Error('getGuildPrefix(guildID) must return instance of Promise!');
        }
    }

    /**
     * Get the permission level of a specific user by his ID. This function
     * must return an instance of Promise. resolve() should get passed the 
     * permission level of the user as number and reject() should get passed
     * the error object.
     * @public
     * @abstract
     * @param {string} userID ID (snowflake) of the user
     * @returns {Promise} pending promise
     */
    getUserPermissionLevel(userID) {
        throw Error('getUserPermissionLevel(userID) must be implemented!');
    }

    /**
     * Get the custom prefix of the guild, if set, by guild ID. This function
     * must return an instance of Promise. resolve() should get passed the
     * prefix of the guild as string if set, else none, if no custom prefix is
     * set on teh guild. reject() should get passed the error object.
     * @public
     * @abstract
     * @param {string} guildID ID (snowflake) of the guild
     * @returns {Promise} pending promise
     */
    getGuildPrefix(guildID) {
        throw Error('getGuildPrefix(guildID) must be implemented!');
    }

}

module.exports = DatabaseInterface;