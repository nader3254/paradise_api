/**
 * @file        dashboard.controller.js
 * @author      Nader Hany Ahmed
 * @version     1.0.1
 * @date        2023/11/19
 * @description this module will control the dashboard routes
 */

const Devices = require("../model/device.model");
const Util = require("../utils");

let prevDay = Util.getDate();

const addDevice = async (req, res) => {
  try {
    console.log(req.params.name);
    let st = await Devices.register(req.params.name);
    if (st) {
      return res.send("device added succesfuly...");
    }
  } catch (e) {
    console.log(
      "device.controller->addDevice():: invalid request body ?!..... " + e
    );
  }
  return res
    .status(400)
    .send("device.controller->addDevice():: couldn't add cover...");
};

const renewDevice = async (req, res) => {
  try {
    let st = await Devices.renew(req.params.name,req.params.bal);
    if (st) {
      return res.send("device renewed succesfuly ...");
    }
  } catch (e) {
    console.log(
      "device.controller->addDevice():: invalid request body ?!....."
    );
  }
  return res
    .status(400)
    .send("device.controller->addDevice():: couldn't renew device...");
};

const notify = async (req, res) => {
  try {
    let st = await Devices.getShouldNotifyClients();
    return res.send(st);
  } catch (e) {
    console.log("device.controller->notify():: invalid request body ?!.....");
  }
  return res
    .status(400)
    .send("device.controller->notify():: couldn't get notifiying device...");
};

const getDeviceSt = async (req, res) => {
  try {
    let st = await Devices.getDeviceState(req.params.name);
    return res.send(st);
  } catch (e) {
    console.log("device.controller->getDeviceSt():: invalid request body ?!.....");
  }
  return res
    .status(400)
    .send("device.controller->getDeviceSt():: couldn't get device state...");
};

const ctrlDevice = async (req, res) => {
  try {
    let st = await Devices.control(req.params.name, req.params.state);
    return res.send(st);
  } catch (e) {
    console.log("device.controller->ctrlDevice():: invalid request ?!.....");
  }
  return res
    .status(400)
    .send(
      "device.controller->ctrlDevice():: couldn't get notifiying device..."
    );
};

const setDeviceClient = async (req, res) => {
  try {
    let st = await Devices.setClient(
      req.body.client,
      req.body.name,
      req.body.phone
    );
    return res.send(
      "device.controller->setDeviceClient():: client set succesfuly ......"
    );
  } catch (e) {
    console.log(
      "device.controller->setDeviceClient():: invalid request ?!....."
    );
  }
  return res
    .status(400)
    .send(
      "device.controller->setDeviceClient():: couldn't get notifiying device..."
    );
};

const getAllDevices = async (req, res) => {
  try {
    let st = await Devices.getDevices();
    return res.send(st);
  } catch (e) {
    console.log(
      "device.controller->getAllDevices():: invalid request ?!..... " + e
    );
  }
  return res
    .status(400)
    .send("device.controller->getAllDevices():: couldn't get devices ...");
};

const handleDay = async () => {
  try {
    if (Util.countDays(prevDay, Util.getDate()) > 0) {
      console.log("handle day");
      await Devices.handleEveryDay();
      prevDay = Util.getDate();
      console.log(
        "device.controller->handleDay():: day handled succesfuly...."
      );
    }
  } catch (e) {
    console.log("device.controller->handleDay():: invalid handling.....");
  }
};

module.exports = {
  addDevice,
  renewDevice,
  getAllDevices,
  setDeviceClient,
  ctrlDevice,
  getDeviceSt,
  notify,
  handleDay,
};
