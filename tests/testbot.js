const discordjs = require('discord.js');
const CmdHandler = require('../src/main').CmdHandler;
const Command = require('../src/main').Command;

var client = new discordjs.Client();

var cmdHandler = new CmdHandler(client, {
    prefix: '--'
});

cmdHandler.registerCommand(require('./testcmd'));

client.login('NDE5ODM3NDcyMDQ2ODQxODY2.Dt1Psw.02aaOoTAYhXf1deSzw-GEaImMSw');