var md5 = require('MD5');
var passport = require('passport');
var User;
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    if (!User) {
        User = req.services.User;
    }

    User.verify(username, password, function(err, user){
        if(err){
            return done(null, false, {
                message: err
            });
        }

        done(null, user)
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (req, id, done) {
    if (!User) {
        User = req.services.User;
    }
    User.get(id, function (err, user) {
        if (err || !user) {
            return done(null, false);
        }
        done(null, user);
    });
});