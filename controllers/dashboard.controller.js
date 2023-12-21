/**
 * @file        dashboard.controller.js
 * @author      Nader Hany Ahmed
 * @version     1.0.1
 * @date        2023/11/19
 * @description this module will control the dashboard routes
 */

const Dashboard = require("../model/dashboard.model");

/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const addCover = async (req, res) => {
  try {
    // console.log(req.params.url);
    let st = await Dashboard.addCover(req.body.url);
    if (st) {
      return res.send("cover added succesfuly...");
    }
  } catch (e) {
    console.log(
      "dashboard.controller->addCover():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("dashboard.controller->addCover():: couldn't add cover...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const addClient = async (req, res) => {
  try {
    // console.log(req.params.url);
    let st = await Dashboard.addClient(req.body.url);

    if (st) {
      return res.send("client added succesfuly...");
    }
  } catch (e) {
    console.log(
      "dashboard.controller->addClient():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("dashboard.controller->addClient():: couldn't add client ...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const addFeedback = async (req, res) => {
  try {
    let st = await Dashboard.addFeedback(
      req.body.doctor,
      req.body.details,
      req.body.url
    );
    if (st) {
      return res.send("feedback added succesfuly");
    }
  } catch (e) {
    console.log(
      "dashboard.controller->addFeedback():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("dashboard.controller->addFeedback():: couldn't add feedback ...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const removeCover = async (req, res) => {
  try {
    let st = await Dashboard.deleteCover(req.params.id);
    if (st) {
      return res.send("cover removed successfuly ....");
    }
  } catch (e) {
    console.log(
      "dashboard.controller->removeCover():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("dashboard.controller->removeCover():: couldn't upload image...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const removeClient = async (req, res) => {
  try {
    let st = await Dashboard.deleteClient(req.params.id);
    if (st) {
      return res.send("client removed successfuly ....");
    }
  } catch (e) {
    console.log(
      "dashboard.controller->removeClient():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("dashboard.controller->removeClient():: couldn't upload image...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const removeFeedback = async (req, res) => {
  try {
    let st = await Dashboard.deleteFeedback(req.params.id);
    if (st) {
      return res.send("feedback removed successfuly ....");
    }
  } catch (e) {
    console.log(
      "dashboard.controller->removeFeedback():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("dashboard.controller->removeFeedback():: couldn't upload image...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const getCovers = async (req, res) => {
   try {
     let covers = await Dashboard.getCovers();
     return res.send(covers);
   } catch (e) {
     console.log(
       "dashboard.controller->getCovers():: invalid request body ?!....."
     );
   }
   return res
     .status(400)
     .send("dashboard.controller->getCovers():: couldn't upload image...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const getClients = async (req, res) => {
    try {
        let covers = await Dashboard.getClients();
        return res.send(covers);
      } catch (e) {
        console.log(
          "dashboard.controller->getClients():: invalid request body ?!....."
        );
      }
      return res
        .status(400)
        .send("dashboard.controller->getClients():: couldn't upload image...");
};
/**************************************************************************************
 *
 * @param {request type} req
 * @param {responce type} res
 * @returns
 */
const getFeedbacks = async (req, res) => {
    try {
        let feeds = await Dashboard.getFeedbacks();
        return res.send(feeds);
      } catch (e) {
        console.log(
          "dashboard.controller->getFeedbacks():: invalid request body ?!....."
        );
      }
      return res
        .status(400)
        .send("dashboard.controller->getFeedbacks():: couldn't upload image...");
};

module.exports = {
  addCover,
  addClient,
  addFeedback,
  removeCover,
  removeClient,
  removeFeedback,
  getCovers,
  getClients,
  getFeedbacks,
};
