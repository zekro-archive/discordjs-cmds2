<div align="center">
    <h1>~ discordjs-cmds2 ~</h1>
    <strong>Command parser framework for discord.js - rewrote version of discordjs-cmds</strong><br><br>
    <a href="https://zekro.de/docs/discordjs-cmds2"><img src="https://img.shields.io/badge/docs-jsdocs-c918cc.svg" /></a>
    <a href="https://www.npmjs.com/package/discordjs-cmds2" ><img src="https://img.shields.io/npm/v/discordjs-cmds2.svg" /></a>&nbsp;
    <a href="https://www.npmjs.com/package/discordjs-cmds2" ><img src="https://img.shields.io/npm/dt/discordjs-cmds2.svg" /></a>
<br>
<br>
<a href="https://nodei.co/npm/discordjs-cmds2/"><img src="https://nodei.co/npm/discordjs-cmds2.png?downloads=true"></a>
</div>

---

<div align="center">
    <code>npm i discordjs-cmds2</code>
</div>

---

# [👉 JSDOCS](https://zekro.de/docs/discordjs-cmds2)

---

# Features

- Simply create commands with invoke aliases, permission level, description and help text by creating a class for each command exteding the `Command` abstract class.
- Use whatever you want as Database source to manage permissions and guild prefixes by creating your own database driver extending the `DatabaseInterface` class.
- Permission system using permission levels.
- You can also implement your own permission system into discordjs-cmds2 by using the `PermissionInterface` class.
- Group your commands together
- Automatically created command list and help message
- Promise-Based safety: Every command will be executed in seperate threads which also will catch all exceptions thrown in the commands code.

---

# Usage

> main.js
```js
const discordjs = require('discord.js');
const CmdHandler = require('discordjs-cmds2').CmdHandler;

const DbDriver = require('./dbdriver');

// Create instance of discord.js Client
var client = new discordjs.Client();

// Create new instance of Command Handler
var cmdHandler = new CmdHandler(client, { prefix: 'bot!' })
    .setDatabaseDriver(DbDriver)
    .registerCommand(require('./testcmd'));

client.login('YOURTOKEN');
```

> dbdriver.js
```js
const DatabaseInterface = require('discordjs-cmds2').DatabaseInterface ;

// For this simple example, we just use a JSON file as
// "Database". Of course, you can use a MySql connection
// or something like that for your project.
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
```

> testcmd.js
```js
const Command = require('discordjs-cmds2').Command;

module.exports = class TestCommand extends Command {
    constructor() {
        super();
    }

    get invokes() {
        return ['test', 't'];
    }

    get description() {
        return 'Just for testing purposes';
    }

    get help() {
        return '`test` - execute test';
    }

    exec(options) {
        options.channel.send('Test! :ok_hand:');
    }
}
```

For further examples how to use this package, take a look [**here**](https://github.com/zekroTJA/discordjs-cmds2/tree/master/tests).

---