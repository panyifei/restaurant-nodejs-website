var md5 = require('MD5');

var TABLE = "admin";

module.exports = require("./base")(TABLE, {
    get: function (id, callback) {
        var db = this;
        return db.first("*")
            .from(TABLE)
            .where({
                id: id
            })
            .exec(callback);

    },
    verify: function (username, password, callback) {
        var db = this;
        return db.select("*")
            .from(TABLE)
            .where({
                name: username,
                password:password
            })
            .exec(function (err, rows) {
                if (err) {
                    return callback(err);
                }

                var user = rows[0];
                if (!user) {
                    return callback("用户不存在");
                } else if (password!= user.password) {
                    return callback("密码不正确");
                } else {
                    return callback(null, user);
                }
            });
    },
    update: function(id, data, callback){
        var db = this;
        data.UpdateTime = new Date;
        return db(TABLE)
            .where({
                id: id
            })
            .update(data)
            .exec(callback);
    },
    remove: function(id, callback){
        var db = this;
        return db(TABLE)
            .where({
                id: id
            })
            .del()
            .exec(callback);
    }
});