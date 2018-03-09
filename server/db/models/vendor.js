const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Vendor = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
})

module.exports = Vendor;
