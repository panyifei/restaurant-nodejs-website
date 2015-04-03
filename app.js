var express = require('express');
var app = express();
var db = require("./connect").db;
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


//主页面
//肉菜为1，素菜为2，饮品为3，小吃为4
app.get('/main', function(req, res){
    var menus = db.select().table('menu').exec(function(){
        menus = menus._settledValue;

        var users = db('user').where('id', 1).exec(function(){
            users = users._settledValue;
            console.log(users);
            res.render("main", {
                menus:menus,
                users:users
            });
        });

    });
});

//提交菜单
app.post("/ajax/addOrder",function(req,res){
    var telephone = req.body.telephone;
    var definition = req.body.menus;
    var total = req.body.total;
    //这里需要判断一下是否点了，还有1个小时内只准点一次

    if(total==0){
        res.send(200, "对不起，请至少点一份~");
    }else {
        db("order")
            .insert({
                telephone: telephone,
                addTime: new Date,
                definition: definition,
                total: total,
                status: 1
            })
            .exec(function () {
                res.send(200, "已经成功提交~"+"您的消费金额为"+total);
            });
    }

});



app.listen(3000);
console.log("server started at http://localhost:3000");
