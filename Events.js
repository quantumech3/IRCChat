const Database = require('./Database');
const General = require('./General');
let database = new Database('localhost', 'root', '', 'irc');

exports.OnConnection = function(client)
{


};

exports.OnMessageSent = function(text)
{

};