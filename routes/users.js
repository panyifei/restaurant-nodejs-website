var db = require("../connect").db;

module.exports = function(req,res){
    var users = db.select().table('user').exec(function(){
        users = users._settledValue;

        res.render("users", {
            title: "用户管理",
            currentUser:req.user,
            users:users
        });
    });
}