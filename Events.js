const Database = require('./Database');
const General = require('./General');
let database = new Database('localhost', 'root', '', 'irc');

let messages = [];
let currentClients = [];

exports.OnConnection = function(client)
{


    //IF(ip does not exist in database under ips)
    database.ExistsInColumn("users", {ip: General.IpFromClient(client)}, function (result)
    {
        if(!result)
        {
            //Insert new row(ip, rand 10 char array) into 'user' table
            database.InsertNewRow("users", {ip: General.IpFromClient(client), id: General.RandString(10)});
            console.log("New user added to 'user' table");
        }
    });

    //VAR messages = Get * from database.messages
    database.GetTable("messages", function(result)
    {
        //Add all previous messages to var 'messages'
        result.forEach(function(value, index)
        {
           messages.push({Text: value.text, Id: value.id});
        });
        //-------------------------------------------
    });

    //Add client to currently connected clients
    currentClients.push(client);
};

exports.OnDisconnect = function(client)
{

    //Remove disconnected client from currentClients
    for(i = 0; i < currentClients.length; i+=1)
    {
        if(currentClients[i] == client) currentClients = currentClients.splice(i,i);
    }
};

exports.OnMessageSent = function(message)
{
    //VAR idOfMessenger = id next to ip of message from table 'users'
    database.GetOnSameRow("users", {ip: message.Ip}, "id", function(result)
    {
        if(result[0].id)
        {
            //Add new row(idOfMessenger, message, text) to 'messages' table
            database.InsertNewRow("messages", {id: result[0].id, text: message.Text});
            //Add latest message and id to messages
            messages.push({Text: message.Text, Id: result[0].id});
            console.log("Recieved text");
        }//Null guard for result[0].id

    });

};