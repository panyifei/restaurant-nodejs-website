var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'restaurant'
    },
    pool: {
        min: 0,
        max: 7
    }
});
exports.db=knex;