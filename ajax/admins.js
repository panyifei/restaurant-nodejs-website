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
