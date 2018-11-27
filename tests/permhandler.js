const PermissionInterface = require('../src/main').PermissionInterface;

module.exports = class PermissionHandler extends PermissionInterface {

    constructor(dbDriver) {
        super(dbDriver);
    }

    checkUserPermission(commandArgs, commandInstance) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

}