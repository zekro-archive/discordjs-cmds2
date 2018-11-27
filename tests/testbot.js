const discordjs = require('discord.js');
const CmdHandler = require('../src/main').CmdHandler;
const Command = require('../src/main').Command;
const DbDriver = require('./dbdriver');

const conf = require('../private.conf.json');

var client = new discordjs.Client();

var cmdHandler = new CmdHandler(client, {
    prefix: '--'
});

cmdHandler
    .setDatabaseDriver(DbDriver)
    .registerCommand(require('./testcmd'));

client.login(conf.token);