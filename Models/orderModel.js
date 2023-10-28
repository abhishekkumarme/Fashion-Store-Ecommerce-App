const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            type:mongoose.ObjectId,
            ref:'products'
        }
    ],
    payment: {},
    buyer:{
        type:mongoose.ObjectId,
            ref:'users'
    },
    status:{
         type:String,
         default:"Not Processed",
         enum:['Not Processed', 'processing', 'shipped', 'delivered', 'canceled']
    },

  

},{timestamps:true});

module.exports = mongoose.model('Order',orderSchema);