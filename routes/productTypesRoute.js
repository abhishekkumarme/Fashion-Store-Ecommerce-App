const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductTypeController, 
    getProductTypeController, 
    updateProductTypeController,
    deleteProductTypeController,
    getSingleProductTypeController
} = require('../Controllers/ProductTypeController');



// route object
const router = express.Router();


//Create product type
router.post("/create-product-type", requireSignIn, isAdmin, createProductTypeController);

//get product type
router.get("/get-product-type", getProductTypeController);

//update product type
router.put("/update-product-type/:id",requireSignIn, isAdmin, updateProductTypeController)

//delete product type
router.delete("/delete-product-type/:id",requireSignIn, isAdmin, deleteProductTypeController )

//get single product type
router.get("/single-product-type/:slug", getSingleProductTypeController);

module.exports = router;