var database = require("../connect").db;
var _ = require("underscore");

module.exports = function (table, extend, _db) {
    var db = _db || database;
    extend = extend || {};
    for(var key in extend){
        extend[key] = extend[key].bind(db);
    }
    return _.extend({
        exists: function(where, callback){
            return db.select("*")
                .from(table)
                .where(where)
                .exec(function(err, rows){
                    if(err){
                        return callback(err);
                    }
                    callback(null, rows.length > 0);
                });
        },
        findAll: function (callback) {
            return db.select("*")
                .from(table)
                .exec(callback);
        },
        find: function(where, callback){
            return db.select("*")
                .from(table)
                .where(where)
                .exec(callback);
        },
        create: function (data, callback) {
            return db
                .insert(data)
                .into(table)
                .exec(callback)
        }
    }, extend);
}