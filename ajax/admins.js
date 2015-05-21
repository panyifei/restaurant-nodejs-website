var db = require("../connect").db;


exports.update = function(req,res){
    var id = req.params.id;
    var data = {};
    for(var key in req.body){
        data[key] = req.body[key];
    }
    db('admin')
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

    db('admin')
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
    var password = req.body.password;
    var role = req.body.role;
    db('admin')
        .insert({
            name: name,
            password: password,
            role: role
        })
        .exec(function (err,array) {
            if(array.length===1){
                res.send(200, "成功");
            }else{
                res.send(500, "对不起，删除失败");
            }

        });

};