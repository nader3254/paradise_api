/**
 * @file        products.routes.js
 * @author      Nader Hany Ahmed
 * @version     7.0.1
 * @date        2023/11/20
 * @description this module will initialize the firebase
 */

const Devices = require("../controllers/device.controller");
const express = require("express");
const myapp = express.Router();
myapp.use(express.json());

/********************************************************************************
 * @description this route will register a new device
 */
// tested
myapp.post("/device/:name", Devices.addDevice);
// tested
myapp.get("/notify-subscribers", Devices.notify);
// tested
myapp.get("/device", Devices.getAllDevices);
// tested
// {
//     name:"",
//     client:"",
//     phone:"",
// }
myapp.put("/device/client", Devices.setDeviceClient);
// tested
//{
// name:"value",
// client:"value",
// phone:"value",
// balance:"value",
// }
myapp.post("/device/subscription/:name/:bal", Devices.renewDevice);




myapp.get("/device/state/:name", Devices.getDeviceSt);


myapp.post("/device/ctrl/:name/:state", Devices.ctrlDevice);



module.exports = myapp;