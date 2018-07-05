/* globals process */
const app = require('../src/app');
const debug = require('debug')('http');
const http = require('http');


const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

/* eslint-disable */
const port = normalizePort(process.env.PORT || '3001');
/* eslint-enable */

const onError = (err) => {
    if (err.syscall !== 'listen') {
        throw err;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (err.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated priviliges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw err;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'Pipe ' + addr :
        'Port ' + addr.port;
    debug('Listening on ' + bind);
};

if (debug.enabled) {
    console.log('DEBUG');
}

app.set('port', port);

const server = http.createServer(app);

console.log(`Server is on port ${port}`);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
