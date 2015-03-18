var express = require('express');
var app = express();
var db = require("./connect").db;


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));



//主页面
app.get('/main', function(req, res){
    var menus = db.select().table('menu').exec(function(){
        menus = menus._settledValue;
        res.render("main", {
            menus:menus
        });
    });

});


app.listen(3000);
console.log("server started at http://localhost:3000");
