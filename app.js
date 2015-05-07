var express = require('express');
var app = express();
var db = require("./connect").db;
var bodyParser = require('body-parser');
var passport = require('passport');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes");
var services = require('./service');
var ajax = require("./ajax");

app.use(function(req,res,next){
    req.services = {
        User: services.user
    };
    next();
});


//商家用来确认订单的页面
app.get('/acceptorders', function(req, res){
    var orders = db.select().table('order').exec(function(){
        orders = orders._settledValue;

        res.render("acceptorders", {
            orders:orders
        });

    });
});

//商家获得所有订单
app.post("/ajax/getAllOrders",function(req,res){
    var orders = db.select().table('order').exec(function(){
        orders = orders._settledValue;
        res.send(200,orders);
    });
});


//商家接受订单状态
app.post("/ajax/acceptOrder",function(req,res){
    var id = req.body.id;
    db('order')
        .where('id', '=', id)
        .where('status','=',"已提交")
        .update({
            status: '已接受'
        }).exec(function (err,rows) {
            if(rows===1){
                res.send(200, "成功");
            }else{
                res.send(200, "对不起，此单已经被撤销，无法接受，请刷新页面~");
            }

        });
});

//商家撤销改单
app.post("/ajax/cancelOrder",function(req,res){
    var id = req.body.id;
    db('order')
        .where('id', '=', id)
        .where('status','=',"已提交")
        .update({
            status: '已撤单'
        }).exec(function (err,rows) {
            if(rows===1){
                res.send(200, "成功");
            }else{
                res.send(200, "对不起，此单已经被用户撤销");
            }

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

//下面是需要登录的说法了
function assureLogin(req, res, next) {
    if (!req.user) {
        return res.redirect("/login?redir=" + encodeURIComponent(req.path));
    }
    next();
}
//这里是密码的初始化
require("./util/passport-init");
app.use(passport.initialize());
app.use(passport.session());
app.get("/login", routes.login);
app.post("/login", passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true }), function (req, res, next) {
    console.log(req.body.redir);
    res.redirect(req.body.redir || "/");
});
app.get("/logout", routes.logout);

//管理员登录
app.get('/orders',assureLogin, function(req, res){
    var orders = db.select().table('order').exec(function(){
        orders = orders._settledValue;

        res.render("device", {
            orders:orders,
            currentUser:{Username:"w",Role:"管理员"},
            devices:{}
        });

    });
});

app.listen(3000);
console.log("server started at http://localhost:3000");
