const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type: mongoose.ObjectId,
        ref: 'category',
        required: true,
    },
    type:{
        type: mongoose.ObjectId,
        ref: 'productType',
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean
    },
    article:{
        type:String,
        required:true,
    },
},{timestamps:true});

module.exports = mongoose.model('products', productSchema);