//Setup server------
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname));
app.get('/', function(req, res, next)
{
    res.sendFile('Client/index.html');
});//app.get();
//------------------

console.log(n);

server.listen(80);
