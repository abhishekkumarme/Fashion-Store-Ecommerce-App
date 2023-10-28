const { default: slugify } = require("slugify");
const CategoryModel = require("../Models/CategoryModel");

const categoryController = async (req, res)=>{
  try {
      const {name, type} =req.body;
      if(!name){
        res.status(401).send({message:'Name is required'});
      }
      const existingCategory = await CategoryModel.findOne({name});
      if(existingCategory){
        res.status(200).send({
            success:false,
            message:'Category already exists'
        });
      }

      const category = await new CategoryModel({name,  slug:slugify(name)}).save();
      res.status(201).send({
        success:true,
        message:'Category created successfully',
        category,
      })

      }
   catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Something went wrong',
        error,
    })
  }
};

//update category controller
 const updateCategoryController = async (req,res) =>{
   try {
      const {name, type} =  req.body;
      const {id} = req.params;
      
      const category = await CategoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
      res.status(200).send({
        success:true,
        message:'Category successfully updated',
        category,
      });

   } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error in updating',
      error,
    });
   }
 }

 //get all category || get
 const getAllCategoryController = async (req,res) =>{
    try {
      const category = await CategoryModel.find({});
      res.status(200).send({
        success:true,
        message:'All categories',
        category,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:'Error in getting all categories',
        error,
      })
    }
 }

 //Single Category || get
 const getSingleCategoryController = async (req,res) =>{
     try {
     
       const category = await CategoryModel.findOne({slug:req.params.slug});
       res.status(200).send({
        success:true,
        message: 'Single Category',
        category,
       })
     } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:'Error in single Category',
        error,
      })
     }
 }

 //Delete Category || delete
 const deleteCategoryController = async (req,res) =>{
  try {
     const {id} = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      message: 'Category Deleted',
     })
  } catch (error) {
    console.log(error);
      res.status(500).send({
        success:false,
        message:'Error in deleting Category',
        error,
      })
  }
 }

module.exports = {categoryController, updateCategoryController, getAllCategoryController, getSingleCategoryController, deleteCategoryController};