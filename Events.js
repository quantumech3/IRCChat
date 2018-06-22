const Database = require('./Database');
const General = require('./General');
let database = new Database('localhost', 'root', '', 'irc');
database.debugEnabled = false;


let messages = [];
let users = [];

exports.OnConnection = function (client) {


    //IF(ip does not exist in database under ips)
    database.ExistsInColumn("users", {ip: General.IpFromClient(client)}, function (result) {
        if (!result) {
            //Insert new row(ip, rand 10 char array) into 'user' table
            database.InsertNewRow("users", {ip: General.IpFromClient(client), id: General.RandString(10)});
            console.log("New user added to 'user' table");
        }

        //Add client to currently connected clients
        console.log("Added user " + General.IpFromClient(client));
        users.push(client);
    });

    //VAR messages = Get * from database.messages
    database.GetTable("messages", function (result) {
        messages = [];
        //Add all previous messages to var 'messages'
        result.forEach(function (value, index) {
            messages.push({Text: value.text, Id: value.id});
        });
        //-------------------------------------------
    });


};

exports.OnDisconnect = function (client) {

    //Remove disconnected client from currentClients
    for (i = 0; i < users.length; i += 1) {
        if (users[i] == client){console.log("Removed user " + General.IpFromClient(users[i])); users = users.splice(i, i); }
    }

};

exports.OnMessageSent = function (message) {
    console.log("OnMessageSent event is being called");
    //VAR idOfMessenger = id next to ip of message from table 'users'
    database.GetOnSameRow("users", {ip: message.Ip}, "id", function (result) {
        console.log("Recieved text");
        if (!result[0]) {
            database.InsertNewRow("users", {ip: message.Ip, id: General.RandString(10)}, function(result){
                database.GetOnSameRow("users", {ip: message.Ip}, "id", function (result) {
                    //Add new row(idOfMessenger, message, text) to 'messages' table
                    database.InsertNewRow("messages", {id: result[0].id.toString(), text: message.Text});
                    //Add latest message and id to messages
                    messages.push({Text: message.Text, Id: result[0].id});
                    console.log("Added text from user: " + result[0].id);
                });
            });

        }
        else {
            //Add new row(idOfMessenger, message, text) to 'messages' table
            database.InsertNewRow("messages", {id: result[0].id.toString(), text: message.Text});
            //Add latest message and id to messages
            messages.push({Text: message.Text, Id: result[0].id});
            console.log(result[0].id);
        }


    });

};

exports.UpdateClientMessages = function () {

    users.forEach(function (user) {
        database.GetOnSameRow("users", {ip: General.IpFromClient(user)}, "id", function (result) {
            if (result[0]) {
                user.emit("UpdateMessages", {Messages: messages, SelfID: result[0].id.toString()});
            }//Null guard for result[0].id

        });

    });

};//UpdateClientMessages()