const express = require("express");

const router = express.Router();

const {
    canManageProducts,
    canViewProducts
} = require("../middleware/roleMiddleware");

const {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductStats
} = require("../controllers/productController");

const {
    auth
} = require("../middleware/authMiddleware");



// CREATE PRODUCT
router.post(
    "/create",
    auth,
    canManageProducts,
    createProduct
);


// VIEW PRODUCTS
router.get(
    "/all",
    auth,
    canViewProducts,
    getProducts
);


// DELETE PRODUCT
router.delete(
    "/delete/:id",
    auth,
    canManageProducts,
    deleteProduct
);


// UPDATE PRODUCT
router.put(
    "/update/:id",
    auth,
    canManageProducts,
    updateProduct
);


// PRODUCT STATS
router.get(
    "/stats",
    auth,
    canViewProducts,
    getProductStats
);


module.exports = router;