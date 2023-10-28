const fs = require('fs');
const ProductModel = require('../Models/ProductModel');
const { default: slugify } = require('slugify');
var braintree = require("braintree");
const orderModel = require('../Models/orderModel');
const dotenv = require('dotenv');

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// create Product Controller
const createProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, type, quantity, shipping, article } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !type:
                return res.status(500).send({ error: 'Type is required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });
            case !article:
                return res.status(500).send({ error: 'Article is required' });
            case !photo && (photo && photo.size > 10000):
                return res.status(500).send({ error: 'Photo is required and should be less than 1mb' });
        }
        const product = new ProductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;

        }

        await product.save();
        res.status(200).send({
            success: true,
            message: 'Product created successfully',
            product,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Creating Product',
            error,
        });
    }
}

//get-All-Product-Controller
const getAllProductController = async (req, res) => {
    try {
        const product = await ProductModel.find({}).select("-photo").sort({ createdAt: -1 }).populate([
            {
                path: 'category',
                model: 'category', // Replace with your Category model name
            },
            {
                path: 'type',
                model: 'productType', // Replace with your ProductType model name
            },
        ]);
        res.status(200).send({
            success: true,
            message: 'All Products',
            total: product.length,
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting products',
            error,
        });
    }
}

//get-single-Product-Controller
const getSingleProductController = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ slug: req.params.slug }).select("-photo").populate([
            {
                path: 'category',
                model: 'category', // Replace with your Category model name
            },
            {
                path: 'type',
                model: 'productType', // Replace with your ProductType model name
            },
        ]);
        res.status(200).send({
            success: true,
            message: 'Single Product',
            total: product.length,
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting single products',
            error,
        });
    }
}

// get - photo
const getPhotoController = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting photo',
            error,
        });
    }
}


// delete-Product-Controller
const deleteProductController = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
            product,
        });
    } catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error,
        });
    }
}

// update product controller
const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, type, quantity, shipping, article } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !type:
                return res.status(500).send({ error: 'Type is required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });
            case !article:
                return res.status(500).send({ error: 'Article is required' });
            case !photo && (photo && photo.size > 10000):
                return res.status(500).send({ error: 'Photo is required and should be less than 1mb' });
        }
        const product = await ProductModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;

        }

        await product.save();
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            product,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating Product',
            error,
        });
    }
}

//product count 
const productCountController = async (req, res) => {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in product count ctrl',
            error,
        })
    }
}

//product-list base on per page
const productPerPageController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const product = await ProductModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
    } catch (error) {

    }
}

// search controller
const searchProductController = async (req,res) => {
try {
    const {keyword} = req.params;
    const result  = await ProductModel.find({
        $or :[
            {name:{$regex: keyword, $options:'i'}},
            {description:{$regex: keyword, $options:'i'}},
            {article:{$regex: keyword, $options:'i'}},
        ]
    }).select("-photo");
    res.json(result);
} catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        error,
        message:"Error in search controller",
    })
}
}

//product by type controller
const productByTypeController = async (req,res) => {
try {
    const { typeId } = req.params;
    // const typeId = "64e98b7841aa3d3186f7364d";
    const product = await ProductModel.find({ type: typeId }).select("-photo");
   
    console.log(product)
    res.status(200).send({
        success:true,
        product,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in product by type ctrl",
        error,
    })
}
}

// similar product controller
const similarProductController =async(req,res) =>{
    try {
        const {pid, cid} =req.params;
        const product = await ProductModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate('category');
        res.status(200).send({
            success:true,
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error in similar product ctrl",
            error,
        })
    }
}

//token controller
const braintreeTokenController = async (req,res) => {
try {
    gateway.clientToken.generate({}, function(err, response) {
        if(err){
          res.status(500).send(err)
        } else {
          res.send(response)
        }
      })
} catch (error) {
    console.log(error)
}
}

//payment controller
const braintreePaymentController = async(req,res) =>{
    try {
        const {cart, nonce} = req.body;
       let total = 0;
       cart.map((i) => {
            total += i.price;
       });
       let newTransaction = gateway.transaction.sale({
        amount:total,
        paymentMethodNonce: nonce,
        options:{
            submitForSettlement:true
        }
       },
       function(error,result){
        if(result){
          const order = new orderModel({
            products:cart,
            payment:result,
            buyer: req.user._id,

          }).save()
          res.json({ok:true})
        } else {
            res.status(500).send(error)
        }
       }
       )
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
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
    braintreePaymentController
 }