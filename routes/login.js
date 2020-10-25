var express = require('express');
const bcrypt = require('bcryptjs');
const user = require('../modules/user');
var router = express.Router();
const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({usernameField: 'email'}, (email, password, done)=>{
    user.findOne({email:email}, (err, data)=>{
        if(err) throw err;
        if(!data){
            return done(null, false, {message : "User Dosen't Exists..."});
        }
        bcrypt.compare(password, data.password, (err, match)=>{
            if(err){
                done(null, false);
            }else if(!match){
                done(null, false, {message : "Password Not Match..."});
            }else{
                done(null, data);
            }
        });
    });
}));

passport.serializeUser(function(user, cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    user.findById(id, function(err, user){
        cb(err, user);
    });
});

router.post('/',(req, res, next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash:true
    })(req,res,next);
})

router.get('/',(req, res,)=>{
  if(req.user){
    res.redirect('dashboard');
  }else{ 
    res.render('login');
  }  
});
module.exports = router;
