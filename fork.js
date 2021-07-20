const http = require('http');
const {fork} = require('child_process');


const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/factorial') {
        const forkedProcess = fork('factorial.js');
        forkedProcess.on('message', (factorial) => {
            return res.end(`Factorial is: ${factorial}`);
        })
    } else {
        res.end('Ok')
    }
});

const port = 3000;
server.listen(port, ()=> {
    console.log(`The server listen to port: ${port}`)
})
