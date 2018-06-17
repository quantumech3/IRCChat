let TextServer = function(server, text)
{
    server.emit("MessageSent", text);
};