 const mongoose = require('mongoose');

 const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected successfully ${conn.connection.host}`)
    }
    catch(error){
        console.log(`error in connect ${error}`)
    }
    
 }
  
 module.exports = connectDB;