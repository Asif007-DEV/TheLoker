var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
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

module.exports = new mongoose.model('category',categorySchema);