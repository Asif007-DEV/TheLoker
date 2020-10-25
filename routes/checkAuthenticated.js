module.exports = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.set('Cache-control','no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    }else{
        req.flash('error_message', 'You Need to Login');
        res.redirect('login');
    }
}