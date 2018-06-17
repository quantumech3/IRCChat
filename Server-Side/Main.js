//Setup server------
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const serverLogic = require('./Events');
app.use(express.static(__dirname + "/Client/"));
app.get('/', function(req, res, next)
{
    res.sendFile('index.html');
});//app.get();
//------------------



io.on("connection", function(client)
{
    //Do all connection logic
    serverLogic.OnConnection(client);

    //Assign all events
    client.on("MessageSent", serverLogic.OnMessageSent);
    //-----------------
});//OnConnection()

server.listen(80);