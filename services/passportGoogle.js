const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/dev');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
  });
passport.use(
    new GoogleStrategy({
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const existingUser = await User.findOne({googleId: profile.id})
        if(existingUser){
            return done(null, existingUser)
        } else {
            const user = await new User({
                googleId: profile.id,
                displayName: profile.displayName,
                userImage: profile.photos[0].value
            }).save();
            done(null, user);
        }
    })
)