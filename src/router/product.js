const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyJWT = require("../middleware/verifyJWT");
const { adminAccess } = require("../middleware/accessMiddleWare");
router.route("/published").get(productController.getPublished);
router
  .route("/admin/:userId")
  .get(verifyJWT, adminAccess, productController.getProductByUserId)
  .post(verifyJWT, adminAccess, productController.addProductByUserId);
router
  .route("/admin/:userId/:productId")
  .put(verifyJWT, productController.updateProductByUserId);
router
  .route("/")
  .post(verifyJWT, adminAccess, productController.addProduct)
  .get(verifyJWT, productController.allProduct)
  .delete(verifyJWT, adminAccess, productController.removeAllProduct);

router
  .route("/:id")
  .get(verifyJWT, productController.getProduct)
  .put(verifyJWT, adminAccess, productController.updateProduct)
  .delete(verifyJWT, adminAccess, productController.deleteProduct);

module.exports = router;
