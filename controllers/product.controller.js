/**
 * @file        products.controller.js
 * @author      Nader Hany Ahmed
 * @version     1.0.1
 * @date        2023/11/19
 * @description this module will control the product routes
 */

const Products = require("../model/product.model");
const multer = require("multer");

/**
 *
 */
const expectFileOnMemory = multer({ storage: multer.memoryStorage() });
/********************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the publish_image route
 */
const publishImage = async (req, res) => {
  let url = await Products.addProductImage(req);
  if (url != "") {
    return res.send({
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: url,
    });
  }
  return res
    .status(400)
    .send("product.controller->publishImage():: couldn't upload image...");
};
/********************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the product route
 * {
 *    "title":"product title",
 *    "info":"product info",
 *    "category":"category",
 *    "status":"status",
 *    "brand":" brand",
 *    "stars":5,
 *    "img":"img url"
 * }
 */
const publishProduct = async (req, res) => {
  console.log("inside");
  console.log(req.body);

  try {
    let status = await Products.addProduct(
      req.body.title,
      req.body.info,
      req.body.category,
      req.body.status,
      req.body.brand,
      req.body.stars,
      req.body.img
    );
    if (status) {
      return res.send("product added succesfuly");
    }
  } catch (e) {
    console.log(
      "product.controller->publishProduct():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send(
      "product.controller->publishProduct():: couldn't add new product ..."
    );
};
/********************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the publish_image route
 */
const editProduct = async (req, res) => {
  console.log(req.body);
  try {
    let status = await Products.modifyProduct(
      req.body.id,
      req.body.title,
      req.body.info,
      req.body.category,
      req.body.status,
      req.body.brand,
      req.body.stars,
      req.body.img
    );
    if (status) {
      return res.send("product modified succesfuly");
    }
  } catch (e) {
    console.log(
      "product.controller->editProduct():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("product.controller->editProduct():: couldn't upload image...");
};
/********************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the publish_image route
 */
const deleteProduct = async (req, res) => {
  console.log(req.body);
  try {
    let status = await Products.deleteProduct(req.body.id);
    if (status) {
      return res.send("product deleted succesfuly");
    }
  } catch (e) {
    console.log(
      "product.controller->deleteProduct():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("product.controller->deleteProduct():: couldn't deleted product ...");
};
/********************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the publish_image route
 */
const getProducts = async (req, res) => {
  try {
    let productList = await Products.getProducts();
    return res.send(productList);
  } catch (e) {
    console.log(
      "product.controller->getProducts():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("product.controller->getProducts():: couldn't get products...");
};
/********************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the publish_image route
 */
const getProductsByID = async (req, res) => {
  try {
    console.log(req.params.id);
    let productList = await Products.getProductsID(req.params.id);
    return res.send(productList);
  } catch (e) {
    console.log(
      "product.controller->getProducts():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("product.controller->getProducts():: couldn't get products...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns the request to the publish_image route
 */
const searchProduct = async (req, res) => {
  try {
    console.log(req.params.keyword);
    let productList = await Products.searchProducts(req.params.keyword);
    return res.send(productList);
  } catch (e) {
    console.log(
      "product.controller->getProducts():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("product.controller->searchProduct():: couldn't upload image...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const filterProducts = async (req, res) => {
  try {
    // console.log(req.params.category);
    // console.log(req.params.status);
    // console.log(req.params.brand);
    let productList = await Products.filter(
      req.params.category,
      req.params.status,
      req.params.brand
    );
    return res.send(productList);
  } catch (e) {
    console.log(
      "product.controller->filterProducts():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("product.controller->filterProducts():: couldn't upload image...");
};


module.exports = {
  expectFileOnMemory,
  publishImage,
  publishProduct,
  searchProduct,
  getProducts,
  deleteProduct,
  editProduct,
  getProductsByID,
  filterProducts
};
