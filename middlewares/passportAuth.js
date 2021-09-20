const localStrategy = require('passport-local').Strategy;
const Login = require('../models/Login');
const bcrypt = require('bcrypt');

const passportAuth = (passport) => {

    passport.use(new localStrategy({ usernameField: 'email' },

        (email, password, done) => {

            Login.findOne({ email: email }, (err, user) => {
                
                if (err) return done(err);

                if (!user) {
                    
                    return done(null, false, { message: 'Invalid User' });
                }

                //bcrypt compare password
                bcrypt.compare(password, user.password, (err, match) => {

                    if (err) return done(err);

                    if (match) {
                        
                        return done(null, user);

                    } else {
                        
                        return done(null, false, { message: 'Invalid Password' });
                    }


                });

            })
        }
    
    ));

    passport.serializeUser((user, done) => {

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        Login.findById(id, (err, user) => {

            done(err, user);
        })
    });
    
}

module.exports = passportAuth;