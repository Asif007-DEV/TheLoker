var express = require('express');
const category =require('../modules/categoryModel');
var router = express.Router();
const checkAuthenticated = require('./checkAuthenticated');

router.get('/:id',checkAuthenticated,(req, res)=>{
    category.findByIdAndDelete(req.params.id,(err, data)=>{
        if(err) throw err;
        req.flash('error_message','Category Delete Successfully');
        res.redirect('/showCategories');
    });
});


module.exports = router;
