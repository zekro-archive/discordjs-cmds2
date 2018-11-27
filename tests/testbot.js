const discordjs = require('discord.js');
const CmdHandler = require('../src/main').CmdHandler;
const DbDriver = require('./dbdriver');
const PermissionHandler = require('./permhandler');

const conf = require('../private.conf.json');

var client = new discordjs.Client();

var cmdHandler = new CmdHandler(client, {
    prefix: '--'
});

cmdHandler
    .setDatabaseDriver(DbDriver)
    .setPermissionHandler(PermissionHandler)
    .registerCommand(require('./testcmd'));

client.login(conf.token);