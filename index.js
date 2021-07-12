// setTimeout(() => console.log('Timeout 300'), 300);

const event = require('events');
const logger = new event();


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

logger.emit('message', 'Hello, World!');
logger.emit('message', 'Hello, Armenia!');
logger.emit('login', 'Naira');
logger.emit('login', 'Liza');
logger.emit('getUsers', users);

