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
    defaultValue: 'HOURLY'
  },
  hours: {
    type: Sequelize.STRING,
  },
  married: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  taxSocial: {
    type: Sequelize.VIRTUAL,
    get(){
      const gross = +this.get('gross');
      return gross * ((this.get('married')) ? 0.075 : 0.075);
    },
  },
  taxFederal: {
    type: Sequelize.VIRTUAL,
    get(){
      const gross = +this.get('gross');
      return gross * ((this.get('married')) ? 0.04 : 0.04);
    },
  },
  taxState: {
    type: Sequelize.VIRTUAL,
    get(){
      const gross = +this.get('gross');
      return gross * ((this.get('married')) ? 0.0425 : 0.0425);
    },
  },
  gross: {
    type: Sequelize.VIRTUAL,
    get(){
      const hourlyPay = this.get('rateType') === 'HOURLY';
      if (hourlyPay){
        return +this.get('rate') * +this.get('hours');
      }
      return +this.get('rate');
    }
  },
  pay: {
    type: Sequelize.VIRTUAL,
    get(){
      const [gross, taxState, taxFederal, taxSocial] = [this.get('gross'), this.get('taxState'), this.get('taxFederal'), this.get('taxSocial')];
      return gross - (taxState + taxFederal + taxSocial);
    }
  },
  start: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
    allowNull: false,

  },
  end: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
    allowNull: false,
  }
})


Stub.prototype.YTD = async function(){
  const allStubs = await Stub.findAll({
    where: {
      start: { [Sequelize.Op.lte]: this.start },
      employeeId: this.employeeId,
    }
  });
  let initialState = { taxFederal: 0, taxSocial:0, taxState:0, pay:0, gross:0 };
  const finalInfo = allStubs.reduce((acc, cur) => {
      for (let key in acc){
        acc[key] += cur[key];
      }
      return acc;
    }, initialState);
  return finalInfo;
};

module.exports = Stub;
