var mongoose = require('mongoose');

var passwordSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    proName:{
        type:String,
        required: true
    },
    addPasswordDetails:{
        type : String,
        required : true
    },
    userID:{
        type: String,
        required :true
    },  
    date : {
        type:Date,
        default:Date.now
    }
});

module.exports = new mongoose.model('AllPasswords',passwordSchema);