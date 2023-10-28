 const JWT = require('jsonwebtoken');
const userModel = require('../Models/userModel');

// protected rotes token base
const requireSignIn = async (req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
        
    } catch (error) {
        console.log(error)
        
    }
}

const isAdmin = async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized access',
            });
        } else {
             next();
        }
        
    } catch (error) {
        console.log(error);
      
    }
}

module.exports = {requireSignIn, isAdmin };