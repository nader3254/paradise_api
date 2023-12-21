/**
 * @file        products.model.js
 * @author      Nader Hany Ahmed
 * @version     4.8.1
 * @date        2023/11/20
 * @description this module will handle all the products db requests
 */

const { getDB, getImages } = require("./db");
const { ref: dbRef, update, remove, set, get } = require("firebase/database");
const {
  ref: storageRef,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

let product_count = 0;

/************************************************************************
 * @description this will add new image to the database.
 * @param {request type} req
 * @returns an image url after being added.
 */
const addProductImage = async (req) => {
  try {
    console.log(req.file);
    let path = "images/" + req.file.originalname.toString();
    const myImageStorage = await getImages();
    const m_storageRef = storageRef(myImageStorage, path);
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      m_storageRef,
      req.file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("product.model::addImage-> File successfully uploaded.");
    return downloadURL;
  } catch (e) {
    console.log("product.model::addImage-> failed to publish image...");
    console.log(e.toString());
  }
  return "";
};

/************************************************************************
 * @description this will add new product to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const addProduct = async (
  product_name,
  product_details,
  product_category,
  product_status,
  product_brand,
  product_stars,
  product_image
) => {
  try {
    product_count++;
    let product = {
      id: product_count,
      title: product_name,
      info: product_details,
      category: product_category,
      status: product_status,
      brand: product_brand,
      stars: product_stars,
      img: product_image,
    };
    let db = await getDB();
    set(dbRef(db, "products/" + product_count.toString()), product);
    console.log("product.model->addProduct():: product added succesfuly");
    return true;
  } catch (e) {
    product_count--;
    console.log("product.model->addProduct():: failed to add product ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will modify product on the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const modifyProduct = async (
  product_id,
  product_name,
  product_details,
  product_category,
  product_status,
  product_brand,
  product_stars,
  product_image
) => {
  try {
    let product = {
      id: product_id,
      title: product_name,
      info: product_details,
      category: product_category,
      status: product_status,
      brand: product_brand,
      stars: product_stars,
      img: product_image,
    };
    console.log(product);
    let db = await getDB();
    update(dbRef(db, "products/" + product_id.toString()), product);
    console.log("product.model->modifyProduct():: product modified succesfuly");
    return true;
  } catch (e) {
    console.log(
      "product.model->modifyProduct():: failed to modified product ......"
    );
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will delete product on the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const deleteProduct = async (product_id) => {
  try {
    let db = await getDB();
    remove(dbRef(db, "products/" + product_id.toString()));
    console.log("product.model->deleteProduct():: product deleted succesfuly");
    return true;
  } catch (e) {
    console.log(
      "product.model->deleteProduct():: failed to delete product ......"
    );
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will get all products on the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getProducts = async () => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "products/"));

    if (snapshot.exists()) {
      // Convert the snapshot.val() to an array and filter out undefined items
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );
      console.log(res);
      return res;
    } else {
      console.log("product.model->getProducts():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "product.model->getProducts():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};
/************************************************************************
 * @description this will get one product with id on the database.
 * @param {request type} req
 * @returns one object
 */
const getProductsID = async (id) => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "products/" + id.toString()));

    if (snapshot.exists()) {
      const res = snapshot.val();
      console.log(res);
      return res;
    } else {
      console.log("product.model->getProductsID():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "product.model->getProductsID():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};
/**********************************************************************
 * @description this will search products on the database by keyword.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const searchProducts = async (keyword) => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "products/"));

    if (snapshot.exists()) {
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );
      let searchResult = [];
      for (const item of res) {
        if (item.title.toString().includes(keyword)) {
          searchResult.push(item);
        }
      }
      for (const item of res) {
        if (item.info.toString().includes(keyword)) {
          searchResult.push(item);
        }
      }

      return searchResult.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    } else {
      console.log("product.model->searchProducts():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "product.model->searchProducts():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};

/**********************************************************************
 * @description this will search products on the database by keyword.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const filter = async (category, status, brand) => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "products/"));

    if (snapshot.exists()) {
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );

      // let searchResult = [];
      let p1Filter = [];
      let p2Filter = [];
      let p3Filter = [];

      if (category !== "all") {
        for (const item of res) {
          if (item.category.toString().includes(category)) {
            p1Filter.push(item);
          }
        }
      } else {
        p1Filter = res;
      }
      if (status !== "all")
        for (const item of p1Filter) {
          // console.log(item);
          if (item.status.toString().includes(status)) {
            p2Filter.push(item);
          }
        }
      else {
        p2Filter = p1Filter;
      }
      if (brand !== "all")
        for (const item of p2Filter) {
          if (item.brand.toString().includes(brand)) {
            p3Filter.push(item);
          }
        }
      else {
        p3Filter = p2Filter;
      }

      return p3Filter.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    } else {
      console.log("product.model->filter():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "product.model->filter():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};

module.exports = {
  addProductImage,
  deleteProduct,
  modifyProduct,
  getProducts,
  addProduct,
  getProductsID,
  searchProducts,
  filter,
};
