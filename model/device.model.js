/**
 * @file        dashboard.model.js
 * @author      Nader Hany Ahmed
 * @version     4.8.1
 * @date        2023/12/4
 * @description this module will handle all the products db requests
 */

const { getDB } = require("./db");
const { ref: dbRef, update, set, get } = require("firebase/database");
const Utils = require("../utils");

let product_count = 0;
/************************************************************************
 * @description this will get all devices from database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getDevices = async () => {
  try {
    let db = await getDB();
    const snapshot = await get(dbRef(db, "devices/"));

    if (snapshot.exists()) {
      const res = Object.values(snapshot.val() || {}).filter(
        (item) => item !== undefined
      );
      // console.log(res);
      return res;
    } else {
      console.log("device.model->getDevices():: No data available");
      return [];
    }
  } catch (e) {
    console.log(
      "device.model->getDevices():: failed to retrieve devices ......"
    );
    console.log(e.toString());
    return [];
  }
};
/************************************************************************
 * @description this will add new device to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const register = async (device_name) => {
  try {
    let x = getDevices();
    for (const item of x) {
      if (item.name.toString().includes(device_name)) {
        console.log("devices.model->register():: device already exist !");
        return true;
      }
    }
    product_count++;
    let product = {
      id: product_count,
      client: "",
      name: device_name,
      phone: "",
      enable: true,
      state: 0,
      renewdate: Utils.getDate().toString(),
      balance: 30,
    };
    let db = await getDB();
    set(dbRef(db, "devices/" + product_count.toString()), product);
    console.log("devices.model->register():: device added succesfuly");
    return true;
  } catch (e) {
    product_count--;
    console.log("devices.model->addProduct():: failed to add device ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will renew device to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const renew = async (device_name, newBalance) => {
  try {
    let result = await getDevices();
    console.log(device_name);
    for (const item of result) {
      if (item.name.toString().includes(device_name)) {
        item.balance = newBalance;
        item.enable = true;
        item.renewdate = Utils.getDate().toString();
        let db = await getDB();
        update(dbRef(db, "devices/" + item.id.toString()), item);
        console.log("devices.model->renew():: device renewed succesfuly");
        return true;
      }
    }
  } catch (e) {
    console.log("devices.model->renew():: failed to renew device ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will control device to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const control = async (device_name, cstate) => {
  try {
    let result = await getDevices();
    for (const item of result) {
      //   if (item.client.toString().includes(cclient)) {
      if (item.name.toString().includes(device_name)) {
        if (item.enable == true) {
          item.state = cstate;
          let db = await getDB();
          update(dbRef(db, "devices/" + item.id.toString()), item);
          console.log("devices.model->control():: device controled succesfuly");
          return true;
        }
      }
      //   }
    }
  } catch (e) {
    console.log("devices.model->control():: failed to control device ......");
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will control device to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const setClient = async (cclient, device_name, cphone) => {
  try {
    let result = await getDevices();
    for (const item of result) {
      if (item.name.toString().includes(device_name)) {
        item.phone = cphone;
        item.client = cclient;
        let db = await getDB();
        update(dbRef(db, "devices/" + item.id.toString()), item);
        console.log(
          "devices.model->setClient():: device client set succesfuly"
        );
        return true;
      }
    }
  } catch (e) {
    console.log(
      "devices.model->setClient():: failed to set device client ......"
    );
    console.log(e.toString());
  }
  return false;
};
/************************************************************************
 * @description this will control device to the database.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getDeviceState = async (device_name) => {
  try {
    let result = await getDevices();
    for (const item of result) {
      if (item.name.toString().includes(device_name)) {
        // if (item.client.toString().includes(cclient)) {
        //   if (item.phone.toString().includes(cphone)) {
        return item.state.toString();
        //   }
        // }
      }
    }
  } catch (e) {
    console.log(
      "devices.model->getDeviceState():: failed to get device client ......"
    );
    console.log(e.toString());
  }
  return 255;
};
/************************************************************************
 * @description this will get all ended subscription users.
 * @param {request type} req
 * @returns true if success , false if failed
 */
const getShouldNotifyClients = async () => {
  try {
    let result = await getDevices();
    let cn = [];
    for (const item of result) {
      if (item.enable === false) {
        cn.push(item);
      }
    }
    console.log(cn);
    return cn;
  } catch (e) {
    console.log("devices.model->getShouldNotifyClients():: failed  ......");
    console.log(e.toString());
  }
  return 255;
};

const handleEveryDay = async () => {
  try {
    let result = await getDevices();
    for (const item of result) {
      if (item.enable === true) {
        item.balance =
          item.balance -
          Utils.countDays(item.renewdate, Utils.getDate().toString());
        if (item.balance < 0) {
          item.enable = false;
        }
        let db = await getDB();
        update(dbRef(db, "devices/" + item.id.toString()), item);
      }

      console.log(
        "devices.model->handleEveryDay():: devices updated succesfuly"
      );
    }
  } catch (e) {
    console.log("devices.model->renew():: failed to update devices......");
    console.log(e.toString());
  }
};

module.exports = {
  register,
  renew,
  getDevices,
  control,
  setClient,
  getDeviceState,
  getShouldNotifyClients,
  handleEveryDay,
};
