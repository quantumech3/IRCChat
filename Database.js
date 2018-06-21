const EnumValues = require('enum-values');
const database = require('mysql');
const General = require('./General');
"use strict";

module.exports = class Database
{
    constructor(host, userName, password, databaseName)
    {
        this.debugEnabled = true;
        this.connection = database.createConnection({host: host, user: userName, password: password, database: databaseName});
        this.connection.connect();
        console.log("Connected to database '" + databaseName + "' on host '" + host + "'");
    }

    LogCmd(cmd)
    {
        if(this.debugEnabled) console.log("Executing SQL command: " + cmd);
    }

    InsertNewRow(tableName, values, callback = function(result){})
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
    }//InsertNewRow()

    GetFromRow(table, row, callback = function(result){}, column = "*")
    {
        //SELECT columnName FROM tablename where Y = rowNum;
        let cmd = "SELECT "+column+" FROM "+table+" WHERE y = "+row+";";
        this.LogCmd(cmd);
        this.connection.query(cmd, function(err, result)
        {
            if(err) throw err;
            callback(result);
        });
    }//GetFromRow()

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

    }

    ExistsInColumn(tableName, columnValues, callback = function(result){})
    {
        //SELECT EXISTS(SELECT columnname FROM tablename WHERE columnname = value) AS exists
        let cmd = "SELECT EXISTS(SELECT " + General.EnumNamesToString(columnValues) + " FROM " + tableName + " WHERE " + General.EnumNamesToString(columnValues) + "=" + General.EnumValuesToString(columnValues) + ") as n;";
        this.LogCmd(cmd);

        this.connection.query(cmd, function(err, result)
        {
            if(err) throw err;
            callback(result[0].n);
        });
    }

    GetTable(tableName, callback = function(result){})
    {

        //SELECT * FROM tableName
        let cmd = "SELECT *  FROM "+tableName+";";

        this.LogCmd(cmd);
        this.connection.query(cmd, function(err, result)
        {
           if(err) throw err;
           callback(result);
        });

    };//GetTable()

    GetOnSameRow(tableName, value, columnName, callback = function(result){})
    {
        //SELECT columnName FROM tableName WHERE value.column = value;
        let cmd = "SELECT " + columnName + " FROM " + tableName + " WHERE " + General.EnumNamesToString(value) + " = " + General.EnumValuesToString(value);

        this.LogCmd(cmd);

        this.connection.query(cmd, function(err, result)
        {
            if(err) throw err;
            callback(result);
        });

    };//GetOnSameRow()

}//class Database



