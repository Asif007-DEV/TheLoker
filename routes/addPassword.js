var express = require('express');
const category =require('../modules/categoryModel');
const passwordModel = require('../modules/passwordModel');
var router = express.Router();
const checkAuthenticated = require('./checkAuthenticated');

router.get('/',checkAuthenticated,(req, res,)=>{
    category.find({userID:req.user._id},{category:1,_id:0}, (err, data)=>{
        if(err) throw err;
        res.render('addPassword',{user:req.user,records:data});
    }) ; 
});

router.post('/',(req,res)=>{
    var {category, proName, addPasswordDetails} =req.body;
    if(!category || !proName || !addPasswordDetails){
        req.flash('error_message','Fill All The Fields');
        res.redirect('/addPassword');
    }else{
        passwordModel({
            category : category,
            proName : proName,
            addPasswordDetails : addPasswordDetails,
            userID: req.user._id
        }).save((err, data)=>{
            if(err) throw err;
            req.flash('success_message','Add Password Details Successfully...');
            res.redirect('/addPassword');
        });
    }
});


module.exports = router;
