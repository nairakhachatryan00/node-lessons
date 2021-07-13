const event = require('events');
const logger = new event();
const argv = require('minimist')(process.argv.slice(2));

let users = [],
    msgs = [];

logger.on('message', (msg) => {
    console.log(`New message ${msg}`);
    msgs.push(msg);
});

logger.on('login', (name) => {
    console.log(`New user ${name}`);
    users.push(name);
});

logger.on('getUsers', () => {
    console.log(`Logged users:\n ${users.join('\n')}`);
    console.log(`Messages:\n ${msgs.join('\n')}`);
});

logger.emit('message', argv.message);
logger.emit('login', argv.addUser);
logger.emit('getUsers');
