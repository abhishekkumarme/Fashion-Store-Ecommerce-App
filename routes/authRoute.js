const express = require('express');
const { 
    registerController,
    loginController, 
    testController, 
    forgotPasswordController, 
    updateProfileController, 
    getUserOrdersController, 
    getAdminOrdersController,
    updateOrderStatusController
 } = require('../Controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

// route object
const router = express.Router();

// rout
// register || method post
router.post("/register", registerController);

// login || method post
router.post("/login",loginController);

//Forgot Password || method post
router.post("/forgot-password", forgotPasswordController);

//test || method get
router.get("/test", requireSignIn, isAdmin, testController);

//private-user-route
router.get('/user-auth', requireSignIn, (req,res) =>{
    res.status(200).send({ok:true,});
});

//private-admin-route
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok:true,});
});

//update-profile
router.put('/profile', requireSignIn, updateProfileController);

//user Order
router.get('/user-order', requireSignIn, getUserOrdersController)

//admin Order
router.get('/admin-order', requireSignIn, getAdminOrdersController)

//admin Order
router.put('/status-update/:orderId', requireSignIn,isAdmin, updateOrderStatusController)

module.exports = router;