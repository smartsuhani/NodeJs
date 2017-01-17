/**
 * Created by lcom35new on 17/1/17.
 */
var dbconn = require("../core/db");
var md5 = require('md5');

function user() {
    this.get =function (res) {
        dbconn.aquire(function (err,con) {
            con.query('select * from user',function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (user,res) {
        var post = {fullname : user.firstname+" "+user.lastname, username : user.username,email_id:user.email_id,password:md5(user.password),contact_no:user.contact_no};
        dbconn.aquire(function (err,con) {
            con.query('insert into user (fullname,username,email_id,password,contact_no) VALUES (?)',post,function (err,result) {
                con.release();
                if(err){
                    res.send({status:1,message:'User creation failed'});
                }else{
                    res.send({status:0,message:'User created successfully'+result});
                }
            });
        });
    };

    this.update = function(user, res) {
        connection.acquire(function(err, con) {
            con.query('update user set ? where username = ?', [user, user.username], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'user update failed'});
                } else {
                    res.send({status: 0, message: 'user updated successfully'+result});
                }
            });
        });
    };

    this.delete = function(username, res) {
        connection.acquire(function(err, con) {
            con.query('delete from user where username = ?', [username], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    res.send({status: 0, message: 'Deleted successfully'+result});
                }
            });
        });
    };
}

module.exports = new user();