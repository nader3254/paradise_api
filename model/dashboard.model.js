/**
 * @file        dashboard.model.js
 * @author      Nader Hany Ahmed
 * @version     4.8.1
 * @date        2023/12/4
 * @description this module will handle all the products db requests
 */

const { getDB } = require("./db");
const { ref: dbRef, remove, set, get } = require("firebase/database");
// const {
//   ref: storageRef,
//   uploadBytesResumable,
//   getDownloadURL,
// } = require("firebase/storage");

let cover_count = 0;
let client_count = 0;
let feedback_count = 0;

/************************************************************************
 * @description this will add new product to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const addCover = async (url) => {
  try {
    cover_count++;
    let cover = {
      id: cover_count,
      img: url,
    };
    let db = await getDB();
    set(dbRef(db, "covers/" + cover_count.toString()), cover);
    console.log("dashboard.model->addCover():: cover added succesfuly");
    return true;
  } catch (e) {
    cover_count--;
    console.log("dashboard.model->addCover():: failed to add cover ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will add new client to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const addClient = async (url) => {
  try {
    client_count++;
    let cover = {
      id: client_count,
      img: url,
    };
    let db = await getDB();
    set(dbRef(db, "clients/" + client_count.toString()), cover);
    console.log("dashboard.model->addClient():: client added succesfuly");
    return true;
  } catch (e) {
    client_count--;
    console.log("dashboard.model->addClient():: failed to add client ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will add new Feedback to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const addFeedback = async (doctor_name, doctor_feedback, url) => {
  try {
    feedback_count++;
    let cover = {
      id: feedback_count,
      doctor: doctor_name,
      details: doctor_feedback,
      img: url,
    };
    let db = await getDB();
    set(dbRef(db, "feedback/" + feedback_count.toString()), cover);
    console.log("dashboard.model->addFeedback():: Feedback added succesfuly");
    return true;
  } catch (e) {
    feedback_count--;
    console.log(
      "dashboard.model->addFeedback():: failed to add Feedback ......"
    );
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will get all covers from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getCovers = async () => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "covers/"));

    if (snapshot.exists()) {
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );
      console.log(res);
      return res;
    } else {
      console.log("dashboard.model->getCovers():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "dashboard.model->getCovers():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};
/************************************************************************
 * @description this will get all clients from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getClients = async () => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "clients/"));

    if (snapshot.exists()) {
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );
      console.log(res);
      return res;
    } else {
      console.log("dashboard.model->getClients():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "dashboard.model->getClients():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};
/************************************************************************
 * @description this will get all covers from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getFeedbacks = async () => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "feedback/"));

    if (snapshot.exists()) {
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );
      console.log(res);
      return res;
    } else {
      console.log("dashboard.model->getCovers():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "dashboard.model->getCovers():: failed to retrieve products ......"
    );
    console.log(e.toString());
    return [];
  }
};
/************************************************************************
 * @description this will get all covers from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const deleteCover = async (cover_id) => {
  try {
    let db = await getDB();
    remove(dbRef(db, "covers/" + cover_id.toString()));
    console.log("product.model->deleteCover():: cover deleted succesfuly");
    return true;
  } catch (e) {
    console.log("product.model->deleteCover():: failed to delete cover ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will get all covers from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const deleteClient = async (cover_id) => {
  try {
    let db = await getDB();
    remove(dbRef(db, "clients/" + cover_id.toString()));
    console.log("product.model->deleteClient():: client deleted succesfuly");
    return true;
  } catch (e) {
    console.log(
      "product.model->deleteClient():: failed to delete client ......"
    );
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will get all covers from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const deleteFeedback = async (cover_id) => {
  try {
    let db = await getDB();
    remove(dbRef(db, "feedback/" + cover_id.toString()));
    console.log(
      "product.model->deleteFeedback():: feedback deleted succesfuly"
    );
    return true;
  } catch (e) {
    console.log(
      "product.model->deleteFeedback():: failed to delete feedback ......"
    );
    console.log(e.toString());
  }
  return false;
};

module.exports = {
  addCover,
  addClient,
  addFeedback,
  getCovers,
  getClients,
  getFeedbacks,
  deleteCover,
  deleteClient,
  deleteFeedback,
};
