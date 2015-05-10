var db = require("../connect").db;

module.exports = function(req,res){
    var activitys = db.select().table('activity').exec(function(){
        activitys = activitys._settledValue;

        res.render("activity", {
            title: "活动管理",
            currentUser:req.user,
            activitys:activitys
        });
    });
}