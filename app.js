var express = require('express');
var app = express();
var db = require("./connect").db;
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


var ajax = require("./ajax");



//商家用来确认订单的页面
app.get('/acceptorders', function(req, res){
    var orders = db.select().table('order').exec(function(){
        orders = orders._settledValue;

        res.render("acceptorders", {
            orders:orders
        });

    });
});

//主页面
//肉菜为1，素菜为2，饮品为3，小吃为4
app.get('/main', function(req, res){
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
});

//提交菜单
app.post("/ajax/addOrder",function(req,res){
    var telephone = req.body.telephone;
    var definition = req.body.menus;
    var total = req.body.total;
    var creditused = req.body.creditused;
    //这里需要判断一下是否点了，还有1个小时内只准点一次

    if(total==0){
        res.send(200, "对不起，请至少点一份~");
    }else {

        var orders = db('order')
            .whereIn('telephone', [telephone])
            .whereNotIn('status', ["已完结",'已撤单'])
            .exec(function () {
                orders = orders._settledValue;
                if(orders.length!=0){
                    res.send(200, "对不起，您今天有未完结的订单");
                }else{
                    db("order")
                        .insert({
                            telephone: telephone,
                            addTime: new Date,
                            definition: definition,
                            total: total,
                            creditused:creditused,
                            status: '已提交'
                        })
                        .exec(function () {
                            res.send(200, "已经成功提交~"+"您的消费金额为"+total+"消费积分为:"+creditused);
                        });
                }
            });

    }
});

//获得订单
app.post("/ajax/getOrders",function(req,res){
    var telephone = req.body.telephone;
    var orders = db.where({telephone:telephone}).select().table('order').exec(function(){
        orders = orders._settledValue;

        res.send(200,orders);

    });
});

//改变订单状态
app.post("/ajax/changeOrder",function(req,res){
    var id = req.body.id;
    db('order')
        .where('id', '=', id)
        .where('status','=',"已提交")
        .update({
            status: '已撤单'
        }).exec(function (err,rows) {
            if(rows===1){
                res.send(200, "已经成功取消订单");
            }else{
                res.send(200, "对不起，此单已经被接受，无法取消，请联系服务员~");
            }

        });
});

app.listen(3000);
console.log("server started at http://localhost:3000");
