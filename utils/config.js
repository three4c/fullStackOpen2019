require('dotenv').config();

let PORT = process.env.PORT;
let MONGOB_URL = process.env.MONGOB_URL;

module.exports = {
  MONGOB_URL,
  PORT
};
