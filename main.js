/**
 * @file        dashboard.routes.js
 * @author      Nader Hany Ahmed
 * @version     2.0
 * @date        2023/12/4
 * @description this is the main api routes
 */

const express = require("express");
const cors = require("cors"); // Add this line
const Devices = require("./controllers/device.controller");
const apid = require("./routes/devices.routes");
const app = express();
const port = 4050;


app.use(cors());
app.use(apid);

app.get("/", (req, res) => {
  res.send("paradise api interface");
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ApiDailyTask() {
  let condition = true;

  while (condition) {
    await delay(1000);
    Devices.handleDay();
  }
}
ApiDailyTask();
