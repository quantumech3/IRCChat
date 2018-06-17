exports.OnConnection = function(client)
{
    console.log("OnConnection is called!");
};

exports.OnMessageSent = function(text)
{
    console.log(text);
};