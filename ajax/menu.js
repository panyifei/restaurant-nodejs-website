var db = require("../connect").db;


exports.update = function(req,res){
    var id = req.params.id;
    var data = {};
    for(var key in req.body){
        data[key] = req.body[key];
    }
    db('menu')
        .where('id', '=', id)
        .update(data).exec(function (err,rows) {
            if(rows===1){
                res.send(200, "成功");
            }else{
                res.send(500, "对不起，更新失败");
            }

        });
};


exports.delete = function(req,res){
    var id = req.params.id;
    db('menu')
        .where({
            id: id
        })
        .del()
        .exec(function (err,rows) {
            if(rows===1){
                res.send(200, "成功");
            }else{
                res.send(500, "对不起，删除失败");
            }

        });
};

exports.add = function(req,res){

    var name = req.body.name;
    var description = req.body.description;
    var kind = req.body.kind;
    var price = req.body.price;
    var creditprice = req.body.creditprice;
    var ifrecommend = req.body.ifrecommend;
    db('menu')
        .insert({
            name: name,
            description: description,
            kind: kind,
            price:price,
            creditprice:creditprice,
            ifrecommend:ifrecommend
        })
        .exec(function (err,array) {
            if(array.length===1){
                res.send(200, "成功");
            }else{
                res.send(500, "对不起，删除失败");
            }

        });

};