var express = require('express');
var router = express.Router();
const checkAuthenticated = require('./checkAuthenticated');

router.get('/', checkAuthenticated, (req, res, next)=>{
  res.render('dashboard',{user:req.user});
});

module.exports = router;
