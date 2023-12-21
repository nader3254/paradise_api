/**
 * @file        db.js
 * @author      Nader Hany Ahmed
 * @version     2.0.1
 * @date        2023/11/19
 * @description this module will initialize the firebase
 */

const { firebaseConfig } = require("./db.config");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const { getStorage } = require("firebase/storage");

// Initialize Realtime Database and get a reference to the service
const getDB = async () => {
  try {
    const app = await initializeApp(firebaseConfig);
    const database = await getDatabase(app);
    return database;
  } catch (e) {
    console.log("Database already initialized.....\n");
    console.log(e.toString());
    console.log("\n********************\n");
  }
  const database = await getDatabase();
  return database;
};

// initialize the cloud storage
const getImages = async () => {
  try {
    const app = await initializeApp(firebaseConfig);
    const storage = await getStorage(app);
    return storage;
  } catch (e) {
    console.log("Database already initialized.....\n");
    console.log(e.toString());
    console.log("\n********************\n");
  }
  const storage = await getStorage();
  return storage;
};

module.exports = { getDB, getImages };
