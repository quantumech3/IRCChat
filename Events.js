const Database = require('./Database');

exports.OnConnection = function(client)
{
    //let ip = client.handshake.address;
    //ip = ip.toString().substr(7,ip.toString().length-1);
    //console.log(ip);

    const n = new Database('localhost', 'root', '', 'irc');
};

exports.OnMessageSent = function(text)
{

};