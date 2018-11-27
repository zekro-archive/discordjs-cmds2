const PermissionInterface = require('./perminterface');

class DefaultPermissionInterface extends PermissionInterface {

    constructor(databaseDriver) {
        super(databaseDriver);
    }

    checkUserPermission(commandArguments, commandInstance) {
        return new Promise((resolve, reject) => {
            if (!commandArguments || !commandInstance) {
                reject();
                return;
            }
            this.databaseDriver.getUserPermissionLevel(commandArguments.author.id).then((lvl) => {
                resolve(lvl >= commandInstance.permission);
            }).catch(reject);
        });
    }

};

module.exports = DefaultPermissionInterface;