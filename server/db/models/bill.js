const Sequelize = require('sequelize');
const db = require('../db');

const Bill = db.define('bill', {
  total: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,

  },
});

module.exports = Bill;
