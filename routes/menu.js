var db = require("../connect").db;

module.exports = function(req,res){
    var menus = db.select().table('menu').exec(function(){
        menus = menus._settledValue;

        res.render("menu", {
            title: "菜单管理",
            currentUser:req.user,
            menus:menus
        });
    });
}