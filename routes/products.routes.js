/**
 * @file        products.routes.js
 * @author      Nader Hany Ahmed
 * @version     7.0.1
 * @date        2023/11/20
 * @description this module will initialize the firebase
 */

const ProductController = require("../controllers/product.controller");
const express = require("express");
const myapp = express.Router();
myapp.use(express.json());

/********************************************************************************
 * @description this route will publish
 *              an image to the firebase
 */
myapp.post(
  "/publish-image",
  ProductController.expectFileOnMemory.single("filename"),
  ProductController.publishImage
);
/********************************************************************************
 * @description this route will return an array of all products
 */
myapp.get("/products", ProductController.getProducts);
/********************************************************************************
 * @description this route will return one product by id
 */
myapp.get("/products/:id", ProductController.getProductsByID);
/********************************************************************************
 * @description this route will return an array of search keyword products
 */
myapp.get("/products/search/:keyword", ProductController.searchProduct);
/********************************************************************************
 * @description this route will add new product
 */
myapp.post("/products", ProductController.publishProduct);
/********************************************************************************
 * @description this route will modify specific product
 */
myapp.put("/products", ProductController.editProduct);
/********************************************************************************
 * @description this route will delete specific product
 */
myapp.delete("/products", ProductController.deleteProduct);
/********************************************************************************
 * @description this will filter products by ctegory - status - brand 
 */
myapp.get("/products/filter/:category/:status/:brand", ProductController.filterProducts);



module.exports = myapp;
