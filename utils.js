/**
 * @file        utils.js
 * @author      Nader Hany Ahmed
 * @version     2.0
 * @date        2023/12/12
 * @description this is the main api routes
 */

const getDate = () => {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDateTime.getDate().toString().padStart(2, "0");
  //   const hours = currentDateTime.getHours().toString().padStart(2, "0");
  //   const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
  //   const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");
  const formattedDateTime = `${year}/${month}/${day}`;
  return formattedDateTime;
};

const countDays = (date1, date2) => {
  const parsedDate1 = new Date(date1);
  const parsedDate2 = new Date(date2);
  const timeDifference = parsedDate2 - parsedDate1;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
};


module.exports = {
 getDate,
 countDays
};
