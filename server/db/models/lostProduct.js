const Sequelize = require('sequelize');
const db = require('../db');

const lostProduct = db.define('lostProduct', {
  total: {
    type: Sequelize.VIRTUAL,
    get(){
      return +this.get('price') * this.get('amount')
    }
  },
  date: {
    type: Sequelize.STRING,

  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = lostProduct;
