//This is set by the IpRecieve event
let selfIP = "";

let OnIpRecieve = function(ip)
{
    console.log("OnIpRecieve event called and got result: " + ip);
    selfIP = ip;
};

let GetIpOfSelf = function(callback = function(result){})
{
    callback(selfIP);
}//GetIpOfSelf()

let TextServer = function(server, text)
{
    GetIpOfSelf(function(result)
    {
        server.emit("MessageSent", {Text: text, Ip: result});
    });//GetIpOfSelf()
};

