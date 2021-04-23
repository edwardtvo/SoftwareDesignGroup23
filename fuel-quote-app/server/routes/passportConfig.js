var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        
    }
))