const discordjs = require('discord.js');
const consts = require('./const');

/**
 * Abstract Class Command for creating command classes.
 * @abstract
 * @class Command
 */
class Command {

    ///// PUBLIC ABSTRACT /////

    /**
     * Create instance of Command.
     */
    constructor() {
        this.help;
        this.description;
        this.exec;
        if (!Array.isArray(this.invokes)) {
            throw Error('Command invokes() needs to return an array, also if there is only one invoke!');
        }
        if (this.permission < 0) {
            throw Error('Permission level must be larger then or even as 0');
        }
    }

    /**
     * Returns invoke of the command.
     * First invoke will be displayed in help command and be interpreted
     * as main invoke.
     * @public
     * @abstract
     * @returns {string[]} command invokes
     */
    get invokes() {
        throw Error('get invoke() must be implemented!');
    }

    /**
     * Returns a short description text of the command.
     * @public
     * @abstract
     * @returns {string} description
     */
    get description() {
        throw Error('get description() must be implemented!');
    }
    
    /**
     * Returns a detailed help text how to use this command.
     * @public
     * @abstract
     * @returns {string} help text
     */
    get help() {
        throw Error('get help() must be implemented!');
    }

    /**
     * Returns the minimum permission level required for this command
     * as a number larger then or even as 0.
     * @public
     * @abstract
     * @returns {number} permission level 
     */
    get permission() {
        return 0;
    }

    /**
     * Function which will be executed on command execution.
     * This function will get passed an object with following properties:
     * - channel:    TextChannel where command was sent to
     * - member:     Member object of sender of the command
     * - guild:      Guild where the command was sent to ('undefined' if command was send to DM channel)
     * - message:    Message object of the command message
     * - args:       The arguments passed to the command as string array
     * - cmdhandler: Commandhandler instance
     * @public
     * @abstract
     * @param {Object} commandArguments
     * @param {Object} commandArguments.channel     TextChannel where command was sent to
     * @param {Object} [commandArguments.member]    Member object of sender of the command
     * @param {Object} [commandArguments.guild]     Guild where the command was sent to ('undefined' if command was send to DM channel)
     * @param {Object} commandArguments.message     Message object of the command message
     * @param {Object} commandArguments.args        The arguments passed to the command as string array
     * @param {Object} commandArguments.cmdhandler  CommandHander instance
     */
    exec(commandArguments) {
        throw Error('exec() must be implemented!');
    }

    /**
     * Function which will be executed when the command failed.
     * This function will get passed an error object and the commandArguments
     * which were passed to the command before.
     * @public
     * @abstract
     * @param {error}  error
     * @param {Object} commandArguments [→ see exec]{@link Command#exec}
     * @param {Object} commandArguments
     * @param {Object} commandArguments.channel     TextChannel where command was sent to
     * @param {Object} [commandArguments.member]    Member object of sender of the command
     * @param {Object} [commandArguments.guild]     Guild where the command was sent to ('undefined' if command was send to DM channel)
     * @param {Object} commandArguments.message     Message object of the command message
     * @param {Object} commandArguments.args        The arguments passed to the command as string array+
     * @param {Object} commandArguments.cmdhandler  CommandHander instance
     */
    error(error, commandArguments) {
        if (commandArguments && commandArguments.channel) {
            let emb = new discordjs.RichEmbed()
                .setColor(consts.COLORS.ERROR)
                .setTitle('Command Error')
                .setDescription('```\n' + error + '\n```');
            return commandArguments.channel.send('', emb).catch((err) => {
                throw err;
            });
        }
    }

    ///// PUBLIC /////

    /**
     * Returns the main invoke which will be used in help message,
     * for example. This is the fist invoke of the invokes list.
     * @public
     * @returns {string} mainInvoke
     */
    get mainInvoke() {
        return this.invokes[0];
    }

    /**
     * Returns group of command, if set.
     * @public
     * @returns {string} group
     */
    get group() {
        return this._group;
    }

    /**
     * Sends an assembled help message embed into a discord
     * chat.
     * @param {Object} channel discord.js channel object
     */
    sendHelp(channel) {
        let emb = new discordjs.RichEmbed()
            .setColor(consts.COLORS.DEFAULT)
            .setTitle(this.mainInvoke + ' - Command Help')
            .addField('Description', this.description.length > 0 ? this.description : 'no description set')
            .addField('Help', this.help.length > 0 ? this.help : '*no help set*')
            .addField('Aliases', this.invokes.map((i) => `- \`${i}\``).join('\n'))
            .addField('Group', this.group, true)
            .addField('Permission', this.permission, true);
        return channel.send('', emb);
    }

    ///// PRIVATES /////

    /**
     * Set discord client instance.
     * @private
     */
    _setClient(client) {
        if (!client) {
            throw Error('discord.js client instance is undefined');
        }
        this.client = client;
        return this;
    }

    /**
     * Set group of command.
     * @private
     */
    _setGroup(group) {
        if (group) {
            this._group = group;
        }
        return this;
    }
};

module.exports = Command;