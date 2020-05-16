var mysql = require('mysql');
var JSON = require('JSON');

class Db {

    static getInstance() {
        if(!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {
        console.log("Connecting!");        
        this.conn = '';
        this.Conn();
    }

    Conn() {
        if(!this.conn) {
            this.conn = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "960506quaN.",
                database: "Leetcodehelper"
              });
        } else {
            return this.conn;
        }
    }

    insert(targetObj) {
        var sql = "INSERT INTO item (id, name, diff, type1, type2, type3, grasp, lastaccessed) VALUES ?";
        var values = [
            [targetObj.id, targetObj.name, targetObj.diff,targetObj.type1,targetObj.type2, targetObj.type3, targetObj.grasp, targetObj.last]
        ]
        return new Promise((resolve, reject) => {        
            this.Conn().query(sql, [values], function(err, result) {
                if(err){
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(targetObj.id);
                }
            })       
        }).catch((error) => {
            return -1;
        });           
    }

    update(targetObj) {
        var sql = "UPDATE item SET " + 
        " name = '" + targetObj.name + "'," +
        " diff = '" + targetObj.diff + "'," +
        " type1 = '" + targetObj.type1 + "'," + 
        " type2 = '" + targetObj.type2 + "'," +
        " type3 = '" + targetObj.type3 + "'," +
        " grasp = '" + targetObj.grasp + "'," +
        " lastaccessed = '" + targetObj.last + "'" + 
        " WHERE id = " + targetObj.id;
        console.log(sql);
        return new Promise((resolve, reject) => {        
            this.Conn().query(sql, function(err, result) {
                if(err){
                    reject(err);
                } else {
                    //console.log(result);
                    resolve("Update:" + targetObj.id);
                }
            })       
        }).catch((error) => {
            return -1;
        });          
    }

    delete(id) {
        var sql = "DELETE FROM item WHERE id = " + mysql.escape(id);        
        return new Promise((resolve, reject) => {        
            this.Conn().query(sql, function(err, result) {
                if(err){
                    reject(err);
                } else {
                    //console.log(result);
                    resolve("Delete " + id);
                }
            })       
        }).catch((error) => {
            return -1;
        });           
    }

    query(id) {        
        let tail = '';
        if(id == 0) {
            tail = '';
        } else {
            tail = ' WHERE id = ' + mysql.escape(id);
        }
        var sql = 'SELECT * FROM item' + tail;
        return new Promise((resolve, reject) => {
            this.Conn().query(sql, function(err, result) {
                if(err) return reject(err);
                else {
                    //console.log(result);
                    resolve(result);
                }
            })
        })        
    }



}

module.exports = Db.getInstance();