

const { default: slugify } = require('slugify');
const ProductType = require('../Models/ProductType');

//create product type
const createProductTypeController = async(req,res) =>{
try {
    const {name} = req.body;
    if(!name){
        res.status(500).send({message:'Name is required'})
    }
    const existingType = await ProductType.findOne({name});
    if(existingType){
        res.status(200).send({
            success:false,
            message:'Type already exists'
        });
      }
      const productType = await new ProductType({name, slug:slugify(name)}).save();
      res.status(200).send({
        success:true,
        message: 'Type successfully created',
        productType,
      })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error found in create product type',
        error,
    })
}
}

//get product type
const getProductTypeController = async (req,res) => {
try {
    const productType =  await ProductType.find({});
      res.status(200).send({
        success:true,
        message:"All product type",
        productType
      })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error found in getting product type',
        error,
    })
}
}

//update product type
const updateProductTypeController = async (req,res) =>{
try {
    const {name} = req.body;
    const {id} = req.params;
    const productType = await ProductType.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
      res.status(200).send({
        success:true,
        message:"Product type updated",
        productType,
      })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error found in updating product type',
        error,
    })
}
}

// delete product type
const deleteProductTypeController  = async (req,res) =>{
try {
    const {id} = req.params;
     await ProductType.findByIdAndDelete(id)
     res.status(200).send({
        success:true,
        message:"Product type deleted",
       
      })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error found in deleting product type',
        error,
    })
}
}

const getSingleProductTypeController = async(req,res) => {
try {
    const type = await ProductType.findOne({slug:req.params.slug});
    res.status(200).send({
     success:true,
     message: 'Single product type',
     type,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error found in single product type',
        error,
    })
}
}

module.exports = {createProductTypeController, getProductTypeController, updateProductTypeController, deleteProductTypeController, getSingleProductTypeController }