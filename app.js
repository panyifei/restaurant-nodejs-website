var express = require('express');
var app = express();
var db = require("./connect").db;
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

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
    req.meta = {
        order_type: require('./meta/order_type')
    };
    next();
});

//这里是密码的初始化
require("./util/passport-init");
var config = require('config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session_secret,
    cookie: { maxAge: 60 * 24 * 60 * 60 * 1000 },
    resave: true,
    unset: "destroy",
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//下面是需要登录的说法
function assureLogin(req, res, next) {
    if (!req.user) {
        return res.redirect("/login?redir=" + encodeURIComponent(req.path));
    }
    next();
}


//商家的ajax
//商家获得某种情况的订单
app.post("/ajax/getOrdersByType",assureLogin,ajax.order.getOrdersByType);
//商家接受订单状态
app.post("/ajax/acceptOrder",assureLogin,ajax.order.acceptOrder);
//商家确认订单支付
app.post("/ajax/payOrder",assureLogin,ajax.order.payOrder);
//商家撤销订单
app.post("/ajax/cancelOrder",assureLogin,ajax.order.cancelOrder);

//商家的修改的ajax
app.post("/ajax/users/:id/detail", assureLogin, ajax.users.update);
app.post("/ajax/activity/:id/detail", assureLogin, ajax.activity.update);
app.post("/ajax/admins/:id/detail", assureLogin, ajax.admins.update);
app.post("/ajax/menu/:id/detail", assureLogin, ajax.menu.update);


//删除的ajax
app.delete("/ajax/users/:id/delete", assureLogin, ajax.users.delete);
app.delete("/ajax/activity/:id/delete", assureLogin, ajax.activity.delete);
app.delete("/ajax/admins/:id/delete", assureLogin, ajax.admins.delete);
app.delete("/ajax/menu/:id/delete", assureLogin, ajax.menu.delete);

//添加的ajax
app.put("/ajax/admins/add", assureLogin, ajax.admins.add);
app.put("/ajax/menu/add", assureLogin, ajax.menu.add);
app.put("/ajax/activity/add", assureLogin, ajax.activity.add);

//客户的ajax
//提交菜单
app.post("/ajax/addOrder",ajax.order.addOrder);
//根据手机号获得订单
app.post("/ajax/getOrders",ajax.order.getOrders);
//改变订单状态
app.post("/ajax/changeOrder",ajax.order.changeOrder);


//登录和登出
app.get("/login", routes.login);
app.post("/login", passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true }), function (req, res, next) {
    res.redirect(req.body.redir || "/");
});
app.get("/logout", routes.logout);
app.get("/",assureLogin, routes.orders);


//主页面
//肉菜为1，素菜为2，饮品为3，小吃为4
app.get('/main', routes.main);

//商家这里的页面，需要登录
app.get('/orders',assureLogin, routes.orders);
app.get('/activity',assureLogin, routes.activity);
app.get('/admins',assureLogin, routes.admins);
app.get('/menu',assureLogin, routes.menu);
app.get('/users',assureLogin, routes.users);

app.listen(3000);
console.log("server started at http://localhost:3000");
