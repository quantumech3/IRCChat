let messages = [];

//Setup server------
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {'pingInterval': 10000, 'pingTimeout': 100000});
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
    client.on("disconnect", function(){serverLogic.OnDisconnect(client);});
    client.on("MessageSent", serverLogic.OnMessageSent);
    client.on("IpRequest", function(){serverLogic.OnIpRequest(client);});
    //-----------------
});//OnConnection()

//Set frequency of Client updates
setInterval(serverLogic.UpdateClientMessages, 1000);

server.listen(25565);