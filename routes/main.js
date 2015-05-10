var db = require("../connect").db;
module.exports = function(req,res){
    var menus = db.select().table('menu').exec(function(){
        menus = menus._settledValue;

        var users = db('user').where('id', 1).exec(function(){
            users = users._settledValue;

            var activitys = db.select().table('activity').exec(function(){
                activitys = activitys._settledValue;

                res.render("main", {
                    menus:menus,
                    users:users,
                    activitys:activitys
                });
            });

        });

    });
}