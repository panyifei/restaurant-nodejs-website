var db = require("../connect").db;

module.exports = function(req,res){
    var admins = db.select().table('admin').exec(function(){
        admins = admins._settledValue;

        res.render("admins", {
            title: "员工管理",
            currentUser:req.user,
            admins:admins
        });
    });
}