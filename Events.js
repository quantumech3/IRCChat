const Database = require('./Database');
let database = new Database('localhost', 'root', '', 'irc');

exports.OnConnection = function(client)
{
    //let ip = client.handshake.address;
    //ip = ip.toString().substr(7,ip.toString().length-1);
    //console.log(ip);

};

exports.OnMessageSent = function(text)
{

};