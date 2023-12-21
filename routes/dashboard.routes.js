/**
 * @file        dashboard.routes.js
 * @author      Nader Hany Ahmed
 * @version     7.0.1
 * @date        2023/12/4
 * @description this will handle dashboard routes 
 */

const DashboardController = require("../controllers/dashboard.controller");
const express = require("express");
const myapp = express.Router();
myapp.use(express.json());

/********************************************************************************
 * @description will reterieve the covers images 
 */
myapp.get("/covers", DashboardController.getCovers);
/********************************************************************************
 * @description will reterieve clients
 */
myapp.get("/clients", DashboardController.getClients);
/********************************************************************************
 * @description will reterieve the feedbacks
 */
myapp.get("/feedback", DashboardController.getFeedbacks);
/********************************************************************************
 * @description will add new cover 
 */
myapp.post("/covers", DashboardController.addCover);
/********************************************************************************
 * @description will add new client
 */
myapp.post("/clients", DashboardController.addClient);
/********************************************************************************
 * @description will add new feedback
 */
myapp.post("/feedback", DashboardController.addFeedback);
/********************************************************************************
 * @description will remove cover by its id 
 */
myapp.delete("/covers/:id", DashboardController.removeCover);
/********************************************************************************
 * @description will remove client by id
 */
myapp.delete("/clients/:id", DashboardController.removeClient);
/********************************************************************************
 * @description will remove feedback by id
 */
myapp.delete("/feedback/:id", DashboardController.removeFeedback);

module.exports = myapp;
