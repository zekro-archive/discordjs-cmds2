const DatabaseInterface = require('../src/main').DatabaseInterface;

const database = require('./testdb.json');

module.exports = class DefDbInterface extends DatabaseInterface {

    constructor() {
        super();
    }

    getUserPermissionLevel(userID) {
        return new Promise((resolve, reject) => {
            resolve(database.perms[userID]);
        });
    }

    getGuildPrefix(guildID) {
        return new Promise((resolve, reject) => {
            resolve(database.guildpres[guildID]);
        });
    }

}