const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Stub = db.define('stub', {
  rate: {
    type: Sequelize.STRING,
    defaultValue: '12',
    allowNull: false
  },
  rateType: {
    type: Sequelize.ENUM('HOURLY', 'WEEKLY'),
    default: 'HOURLY'
  },
  hours: {
    type: Sequelize.STRING,

  },
  pay: {
    type: Sequelize.VIRTUAL,
    get(){
      const hourlyPay = this.get('rateType') === 'HOURLY';
      if (hourlyPay){
        return +this.get('rate') * +this.get('hours');
      }
      return +this.get('rate');
    }
  },
  start: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  end: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Stub;
