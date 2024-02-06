const express = require("express");
const router = express.Router();
const productController = require("./../controller/product-controller");

router.get("/:uid/:field", productController.getProductOfUser);

router.post("/addProduct", productController.addProductOfUser);
router.post("/updateProductDetails", productController.addProductDetails);

module.exports = router;
