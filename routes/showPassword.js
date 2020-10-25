var express = require('express');
const passwordModel = require('../modules/passwordModel');
const category = require('../modules/categoryModel');
var router = express.Router();
const checkAuthenticated = require('./checkAuthenticated');

router.get('/',checkAuthenticated,(req, res)=>{
    passwordModel.find({userID:req.user._id}, (err, data)=>{  
        if(err) throw err;
        res.render('showPassword',{user:req.user,records:data});
    }) ; 
});

router.get('/edit/:id',checkAuthenticated,(req, res)=>{
    passwordModel.findById({_id:req.params.id}, (err, data)=>{
        if(err) throw err;
        category.find({userID:req.user._id},(err, category)=>{
            if(err) throw err;
            res.render('editPassDetails',{
                user:req.user,
                category :category,
                records : data
            });
        });
    });
});

router.post('/update/',(req,res)=>{
    passwordModel.findByIdAndUpdate(req.body.updateID,{
        category : req.body.editCategory,
        proName : req.body.editProName,
        addPasswordDetails : req.body.editPasswordDetails,
        userID:req.user._id
    }, (err, data)=>{
        if(err) throw err;
        res.redirect('/showPassword');
    });
});

router.get('/delete/:id',checkAuthenticated,(req, res)=>{
    passwordModel.findByIdAndDelete(req.params.id, (err, data)=>{
        if(err) throw err;
        res.redirect('/showPassword');
    });
});

module.exports = router;
