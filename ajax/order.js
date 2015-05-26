var db = require("../connect").db;

//商家
exports.getOrdersByType = function(req,res){
    var type = req.body.type;
    var status = req.meta.order_type[type].text;
    var orders = db.where({status:status}).select().table('order')
        .exec(function(){
            orders = orders._settledValue;
            res.send(200,orders);
        });
};
exports.acceptOrder = function(req,res){
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
};

exports.payOrder = function(req,res){
    var id = req.body.id;
    var telephone = req.body.telephone;
    db('order')
        .where('id', '=', id)
        .where('status','=',"已接受")
        .update({
            status: '已完结'
        }).exec(function (err,rows) {
            if(rows===1){
                var users = db('user').where('telephone', telephone).exec(function(){
                    users = users._settledValue;
                    var order = db('order').where('id', id).exec(function(){
                        order = order._settledValue;
                        users[0].creditnow = users[0].creditnow - order[0].creditused + order[0].total*10;
                        users[0].creditall = users[0].creditall + order[0].total*10;
                        if(users[0].creditall > 3000){
                            users[0].level = 5;
                        }else if(users[0].creditall > 1500){
                            users[0].level = 4;
                        }else if(users[0].creditall > 500){
                            users[0].level = 3;
                        }else if(users[0].creditall > 100){
                            users[0].level = 2;
                        }else{
                            users[0].level = 1;
                        }
                        db('user')
                            .where('telephone', '=', telephone)
                            .update(
                                users[0]
                            ).exec(function (err,rows) {
                                if(rows===1){
                                    res.send(200, "成功");
                                }else{
                                    res.send(200, "对不起，用户信息更新失败");
                                }

                            });
                    });


                });
            }else{
                res.send(200, "对不起，订单信息更新失败~");
            }

        });
};

exports.cancelOrder = function(req,res){
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
};



//客户
exports.addOrder = function(req,res){
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
};
exports.getOrders = function(req,res){
    var telephone = req.body.telephone;
    var orders = db.where({telephone:telephone}).select().table('order').exec(function(){
        orders = orders._settledValue;

        res.send(200,orders);

    });
};
exports.changeOrder = function(req,res){
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
};