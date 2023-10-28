const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
  createProductController, 
    getAllProductController,
    getSingleProductController,
    getPhotoController,
    deleteProductController,
    updateProductController,
    productCountController,
    productPerPageController,
    searchProductController,
    productByTypeController,
    similarProductController,
    braintreeTokenController,
    braintreePaymentController, 
  } 
        = require('../Controllers/ProductController');
const formidable = require('express-formidable')

// route object
const router = express.Router();

//create-product || method post
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

//getall-product || method get
router.get("/getall-products",  getAllProductController);

//get-single-product || method get
router.get("/get-products/:slug",  getSingleProductController);

//get-photo || method get
router.get("/get-photo/:pid",  getPhotoController);

//delete-single-product || method get
router.delete("/delete-products/:pid", requireSignIn, isAdmin,  deleteProductController);

//update-product || method post
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//product count 
router.get("/product-count", productCountController);

//product-list base on per page 
router.get("/product-list/:page", productPerPageController);

//search controller 
router.get("/search/:keyword", searchProductController)

//Product By type controller

router.get("/type/:typeId", productByTypeController)

//similar product controller
router.get("/related-product/:pid/:cid", similarProductController)

//Payment route
//token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController )

module.exports = router;