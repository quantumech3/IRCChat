let GetIpOfSelf = function(callback = function(result){})
{
    $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data)
    {
        callback(data.ip);
    });
}//GetIpOfSelf()

let TextServer = function(server, text)
{
    GetIpOfSelf(function(result)
    {
        server.emit("MessageSent", {Text: text, Ip: result});
    });//GetIpOfSelf()
};

