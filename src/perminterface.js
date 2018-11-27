/**
 * Permission handler class interface.
 * @abstract
 * @class PermissionInterface
 */
class PermissionInterface {

    /**
     * Create instance of Permission Handler class.
     * The constructor needs to get passed a databaseDriver to
     * the super class in constructor.
     * @param {Object} databaseDriver instance of database driver
     */
    constructor(databaseDriver) {
        this.databaseDriver = databaseDriver;
        let check = this.checkUserPermission(null, null);
        if (!(check instanceof Promise)) {
            throw Error('checkUserPermission(userID, commandInstance) must return an instance of Promise!');
        }
        check.catch(() => {});
    }

    /**
     * Function to check if the user is permitted to perform this action.
     * This function must return a Promise instance with resolve() getting
     * passed either 'true' (is permitted) or 'false' (is not permitted) and
     * reject() getting passed the error object.
     * @abstract
     * @param {Object} commandArguments             Command arguments payload @see Command
     * @param {Object} commandArguments.channel     TextChannel where command was sent to
     * @param {Object} [commandArguments.member]    Member object of sender of the command
     * @param {Object} [commandArguments.guild]     Guild where the command was sent to ('undefined' if command was send to DM channel)
     * @param {Object} commandArguments.message     Message object of the command message
     * @param {Object} commandArguments.args        The arguments passed to the command as string array
     * @param {Object} commandArguments.cmdhandler  CommandHander instance
     * @param {Object} commandInstance              Command instance @see Command
     * @returns {Promise} pending promise
     */
    checkUserPermission(commandArguments, commandInstance) {
        throw Error('checkUserPermission(userID, commandInstance) must be implemented!');
    }
};

module.exports = PermissionInterface;