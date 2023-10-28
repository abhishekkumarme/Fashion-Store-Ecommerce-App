const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        lowercase:true,
    },
  

},{timestamps:true});

module.exports = mongoose.model('category',categorySchema);