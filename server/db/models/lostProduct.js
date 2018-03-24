const Sequelize = require('sequelize');
const db = require('../db');

const lostProduct = db.define('lostProduct', {
  total: {
    type: Sequelize.VIRTUAL,
    get(){
      const possibleTotal = +this.get('price') * this.get('amount');
      return Number(possibleTotal).toFixed(2);
    }
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
    get(){
      const newDate = this.getDataValue('date');
      return newDate.toDateString();
    }
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
    allowNull: false,
    get(){
      let possiblePrice = +this.getDataValue('price');
      return Number(possiblePrice).toFixed(2);
    }
  }
});

module.exports = lostProduct;
