const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    from: {
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:[],
        required:true
    },
  

  

},{timestamps:true});

module.exports = mongoose.model('Mails', mailSchema);