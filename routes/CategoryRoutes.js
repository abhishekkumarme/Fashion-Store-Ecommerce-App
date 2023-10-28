const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {categoryController, 
    updateCategoryController,
    getAllCategoryController,
    getSingleCategoryController,
    deleteCategoryController,
} =require('../Controllers/CategoryController');

// route object
const router = express.Router();

//category || method post
router.post("/create-category", requireSignIn, isAdmin, categoryController);

//update-category || method put
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//get-all-category || method put
router.get("/getall-category",  getAllCategoryController);

//get-single-category || method put
router.get("/getsingle-category/:slug",  getSingleCategoryController);

//delete-category || method delete
router.delete("/delete-category/:id",  requireSignIn, isAdmin, deleteCategoryController);  

module.exports = router;