var express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const user = require('../modules/user');
var router = express.Router();

router.get('/',(req, res,)=>{
  if(req.user){
    res.redirect('dashboard');
  }else{
    res.render('signup');
  }
  
});
router.post('/register', (req, res)=>{
  let {username, email, password, confpassword} = req.body;
  let err;
  if(!username || !email || !password || !confpassword){
      err = "Please Fill All The Fields";
      res.render('signup',{err:err, username:username,email:email});
  }else if(password.length < 5){
    err = "Password is Too Short";
      res.render('signup',{err:err, username:username,email:email});
  }else if(password != confpassword){
    err = "Password Don't Match";
      res.render('signup',{err:err, username:username,email:email});
  }else{
    user.findOne({email:email},(err,data)=>{
      if(err) throw err;
      if(data){
        err = "This Email is Already Exists";
        res.render('signup',{err:err, username:username,email:email});
      }else{
        bcrypt.genSalt(10,(err, salt)=>{
            if(err) throw err;
            bcrypt.hash(password, salt, (err, hash)=>{
              if(err) throw err;
              password = hash;
              user({
                username,
                email,
                password
              }).save((err,data)=>{
                if(err) throw err;
                req.flash('success_message','Registered Successfully... Login to Continue');
                res.redirect('login');
              });
            });
        });
      }
    });
  }
});

module.exports = router;
