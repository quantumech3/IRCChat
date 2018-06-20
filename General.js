const EnumValues = require('enum-values');

exports.EnumValuesToString = function(values)
{
    let output = "";
    EnumValues.EnumValues.getValues(values).forEach(function(value, index){
        if(typeof value == "string"){ output += '"'; output += value.toString(); output += '"';}
        else output += value;
        if(index < EnumValues.EnumValues.getValues(values).length-1) output += ",";
    });
    return output;
};
exports.EnumNamesToString = function(values)
{
    return EnumValues.EnumValues.getNames(values).toString().substr(0, values.toString().length-2);
};
exports.IpFromClient = function(client)
{
    let ip = client.handshake.address;
    ip = ip.toString().substr(7,ip.toString().length-1);

    return ip;
}

exports.RandString = function(length)
{
    let output = "";
    for(i = 0; i < length; i++) output += String.fromCharCode(Math.round(Math.random() * 255));

    return output;
}