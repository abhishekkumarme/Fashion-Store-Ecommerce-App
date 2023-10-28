const userModel = require('../Models/userModel');
const orderModel = require('../Models/orderModel');
const { hashPassword, comparedPassword } = require('../helpers/authHelper');
const JWT =require('jsonwebtoken');

const registerController = async(req,res)=>{
    try {
        const {name,email,phone, address, password, answer} = req.body;
    //    validation
    if(!name){
        res.send({error:'Name is required'})
    }
    if(!email){
        res.send({error:'Email is required'})
    }
    if(!phone){
        res.send({error:'Phone is required'})
    }
    if(!address){
        res.send({error:'Address is required'})
    }
    if(!password){
        res.send({error:'Password is required'})
    }
    if(!answer){
        res.send({error:'Answer is required'})
    }

    // check user
    const existingUser = await userModel.findOne({email})
    // existing user
    if(existingUser){
        res.status(200).send({
            success:true,
            message:'Already register please login'
        })
    }
    // register user
    const hashedPassword = await hashPassword(password);
    // save
      const user = await new userModel({
        name,
        email,
        phone,
        address,
        password:hashedPassword,
        answer,
      }).save();

      res.status(201).send({
        success:true,
        message:'Registered Successfully, Please Login',
        user,

      });

    } catch (error){
        
        res.status(500).send({
            success:false,
            message:'error in registration',
            error,
        })
    }
}

//login controller

const loginController = async (req, res) =>{
    try {
        const {email,password} = req.body
        // validate
        if(!email || !password){
            res.status(404).send({
                success:false,
                message:'invalid email or password'
            })    
        }

        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }

        const match = await comparedPassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        // token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.status(200).send({
            success:true,
            message:'Login Successful',
            user:{
               name:user.name,
               email:user.email,
               phone:user.phone,
               address:user.address,
               role:user.role,
            },
            token,
        })
      
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}

// forgotPasswordController

const forgotPasswordController = async(req,res) =>{
   try {
    const {email, answer, newPassword} =req.body;
    if(!email){
        res.status(500).send({message:'Email is required'});
    }
    if(!answer){
        res.status(500).send({message:'Answer is required'});
    }
    if(!newPassword){
        res.status(500).send({message:'New Password is required'});
    }
    //check
    const user = await userModel.findOne({email,answer});
    //validation
    if(!user){
        res.status(404).send({
            success:false,
            message:'Wrong email or answer',
        });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findOneAndUpdate(user._id,{password:hashed});
    res.status(200).send({
        success:true,
        message:'Password reset successfully',
    });

   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Something Went Wrong',
        error,
    });
   }
};

// test controller
 
 const testController = (req, res) =>{
    try {
        res.send('Protected route');
    } catch (error) {
        console.log(error);
        res.send({error});
    }
 }

 //update-profile
 const updateProfileController = async(req,res) => {
try {
    const {name, phone, address, password} = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if(password && password.length < 6){
        return res.JSON({error:"Password is required and 6 character long"});
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedProfile = await userModel.findByIdAndUpdate(
        req.user._id,
        {
         name: name || user.name,
         
         password: hashedPassword || user.password,
         address: address || user.address,
         phone : phone || user.phone
        },
        {
            new:true
        }
        
    ); 
    res.status(200).send({
       success:true,
       updatedProfile

    })
} catch (error) {
    console.log(error)
}
 }

 // get user orders
 const getUserOrdersController = async(req,res) => {
  try {
    const orders = await orderModel.find({buyer: req.user._id}).populate('products', '-photo').populate('buyer','name');
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send(
       { 
        success:false,
        message:'Getting error in orders',
        error,
       }
    )
  }
 }


 //get admin orders
 const getAdminOrdersController = async(req,res) => {
    try {
      const orders = await orderModel.find({}).populate('products', '-photo').populate('buyer','name').sort({createdAt: '-1'});
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(400).send(
         { 
          success:false,
          message:'Getting error in orders',
          error,
         }
      )
    }
   }

   // order status update
   const updateOrderStatusController = async (req,res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId , {status}, {new:true});
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'getting error in status update',
            error,
        })
    }
   }

module.exports = 
{
    registerController, 
    loginController, 
    testController, 
    forgotPasswordController, 
    updateProfileController,
    getUserOrdersController, 
    getAdminOrdersController ,
    updateOrderStatusController
};