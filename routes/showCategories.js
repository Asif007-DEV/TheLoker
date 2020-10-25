var express = require('express');
const category =require('../modules/categoryModel');
var router = express.Router();
const checkAuthenticated = require('./checkAuthenticated');

router.get('/',checkAuthenticated,(req, res, next)=>{ 
    category.find({userID:req.user._id},{category:1}, (err, data)=>{
        if(err) throw err;
            res.render('showCategories',{user:req.user, records:data});
    })
});



module.exports = router;
