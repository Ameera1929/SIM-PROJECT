const Product = require("../models/Product");

exports.createProduct = async (req, res) => {


try {

    const {
        name,
        sku,
        category,
        price,
        quantity,
        description

    } = req.body;

    const product =
        await Product.create({
            name,
            sku,
            category,
            price,
            quantity,
            description,
            customerId: req.user.customerId

        });

    res.status(201).json({
        success: true,
        product
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });

}


};

exports.getProducts = async (req, res) => {


try {

    if(req.user.role === "super_admin"){

        return res.status(403).json({
            success:false,
            message:"Super Admin cannot access customer products"
        });

    }

    const products =
        await Product.find({
            customerId: req.user.customerId,
            isActive: true
        });

    res.status(200).json({
        success: true,
        products
    });

} catch (error) {

    res.status(500).json({
        success: false,
        message: error.message
    });

}

};

exports.deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const product =
            await Product.findOneAndUpdate(
                {
                    _id:id,
                    customerId:req.user.customerId
                },
                {
                    isActive:false
                },
                {
                     new:true
                }
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedData = {
            ...req.body,
            updatedBy: req.user.username,
            updatedAt: new Date()
        };

        const product =
        await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if(!product){

            return res.status(404).json({
                success:false,
                message:"Product not found"
            });

        }

        res.status(200).json({
            success:true,
            product
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

exports.getProductStats = async (req, res) => {

    try {

        if(req.user.role !== "customer_admin"){

             return res.status(403).json({
                success:false,
                message:"Access Denied"
            });

        }

        const products =
        await Product.find({
            customerId:req.user.customerId,
            isActive:true
        });

        const totalProducts =
        products.length;

        let totalStock = 0;

        products.forEach(product => {

            totalStock += product.quantity;

        });

        const lowStock =
        products.filter(
            product => product.quantity < 10
        ).length;

        res.status(200).json({

            success: true,

            totalProducts,

            totalStock,

            lowStock

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
