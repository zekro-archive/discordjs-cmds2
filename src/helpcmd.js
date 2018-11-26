const Command = require('./command');
const consts = require('./const');
const discordjs = require('discord.js');

module.exports = class HelpCmd extends Command {

    constructor() {
        super();
    }

    get invokes() {
        return ['help'];
    }

    get description() {
        return 'Get help about commands'
    }

    get help() {
        return '`help`\n`help <command>`';
    }

    exec(opt) {
        let cmdInstance = opt.cmdhandler.registeredCommands[opt.args[0]];
        if (opt.args.length > 0 && cmdInstance) {
            cmdInstance.sendHelp(opt.channel);
        } else {
            let emb = new discordjs.RichEmbed()
                .setColor(consts.COLORS.DEFAULT)
                .setTitle('Command List');
            
            let cmdsSorted = {};

            opt.cmdhandler.registeredCommandInstancesSingle.forEach((cmd) => {
                if (!Object.keys(cmdsSorted).includes(cmd.group)) {
                    cmdsSorted[cmd.group] = [cmd];
                } else {
                    cmdsSorted[cmd.group].push(cmd);
                }
            });

            Object.keys(cmdsSorted).forEach((groupName) => {
                let fieldText = cmdsSorted[groupName].map((cmd) => {
                    return `**\`${cmd.mainInvoke}\`** - *${cmd.description}*`;
                }).join('\n');
                emb.addField(groupName, fieldText);
            });

            opt.channel.send('', emb);
        }
    } 

}