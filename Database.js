const EnumValues = require('enum-values');
const database = require('mysql');
const General = require('./General');
"use strict";

module.exports = class Database
{

    constructor(host, userName, password, databaseName)
    {
        this.connection = database.createConnection({host: host, user: userName, password: password, database: databaseName});
        this.connection.connect();
        console.log("Connected to database '" + databaseName + "' on host '" + host + "'");
    }

    LogCmd(cmd)
    {
        console.log("Executing SQL command: " + cmd);
    }

    Insert(tableName, values, callback = function(result){})
    {

        //INSERT INTO tablename(column1,column2,etc) VALUES(value1, value2, etc);
        let command = "INSERT INTO " + tableName + "(" + General.EnumNamesToString(values) + ")" + " VALUES(" + General.EnumValuesToString(values) + ");";

        //Log the command
        this.LogCmd(command);

        //Get return value from command
        this.connection.query(command, function(err, value)
        {
            if(err) throw err;
            callback(value);
        });
        //-----------------------------
    }//Insert()

    ClearTable(tableName, callback = function(result){}){
        //TRUNCATE tablename;
        let command = "TRUNCATE "+tableName+";";

        //Execute command and get return value from it
        this.connection.query(command, function(err, value)
        {
            if(err) throw err;
            callback(value);
        });
        //--------------------------------------------

        //Log command
        this.LogCmd(command);

        return returnValue;
    }

}



