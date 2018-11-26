const Command = require('../src/main').Command;

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
        return '';
    }

    exec(options) {
        throw Error('test');
        console.log(options);
    }
}