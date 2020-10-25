var express = require('express');
const user = require('../modules/user');
const category =require('../modules/categoryModel');
var router = express.Router();
const checkAuthenticated = require('./checkAuthenticated');

router.get('/',checkAuthenticated,(req, res,)=>{ 
    res.render('addCategory',{user:req.user}); 
});

const isData =(data,categoryField)=>{
    for(i=0;i<data.length;i++){
        if(data[i].category == categoryField){
            return true;
        }
    }
    return false;
}


router.post('/', (req, res, next)=>{
    let categoryField = req.body.passwordCategory;
    if(!categoryField || categoryField.length < 2){
        req.flash('error_message', 'Enter Password Category...');
        res.redirect('category');
    }else{
        category.find({userID:req.user._id},{category:1,_id:0}, (err,data)=>{
            if(err) throw err;
            if(isData(data,categoryField)){
                req.flash('error_message', 'Category Already Exists...');
                res.redirect('category');
            }else{
                category({
                    category: categoryField,
                    userID: req.user._id
                }).save((err,data)=>{
                    if(err) throw err;
                    req.flash('success_message','Add Category Successfully...');
                    res.redirect('category');
                });
            }
        });
    }    
});

module.exports = router;
