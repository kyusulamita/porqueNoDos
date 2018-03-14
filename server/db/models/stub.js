const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Stub = db.define('stub', {
  rate: {
    type: Sequelize.STRING,
    defaultValue: '12',
    allowNull: false,
    get(){
      return Number(this.getDataValue('rate')).toFixed(2)
    }
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
      const deduction =  (gross * ((this.get('married')) ? 0.075 : 0.075));
      return Number(deduction).toFixed(2);
    },
  },
  taxFederal: {
    type: Sequelize.VIRTUAL,
    get(){
      const gross = +this.get('gross');
      const deduction = gross * ((this.get('married')) ? 0.04 : 0.04);
      return Number(deduction).toFixed(2);
    },
  },
  taxState: {
    type: Sequelize.VIRTUAL,
    get(){
      const gross = +this.get('gross');
      const deduction = gross * ((this.get('married')) ? 0.0425 : 0.0425);
      return Number(deduction).toFixed(2);
    },
  },
  gross: {
    type: Sequelize.VIRTUAL,
    get(){
      const hourlyPay = this.get('rateType') === 'HOURLY';
      if (hourlyPay){
        const pay =  +this.get('rate') * +this.get('hours');
        return Number(pay).toFixed(2);
      }
      return this.rate;
    }
  },
  pay: {
    type: Sequelize.VIRTUAL,
    get(){
      const [gross, taxState, taxFederal, taxSocial] = [+this.get('gross'), +this.get('taxState'), +this.get('taxFederal'), +this.get('taxSocial')];
      const totalPay =  gross - (taxState + taxFederal + taxSocial);
      return Number(totalPay).toFixed(2);

    }
  },
  start: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
    allowNull: false,

  },
  end: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  payDate: {
    type: Sequelize.DATEONLY,
    defaultValue:  Sequelize.NOW,
    allowNull: false,
  },
})


Stub.prototype.YTD = async function(){
  const allStubs = await Stub.findAll({
    where: {
      start: { [Sequelize.Op.lte]: this.getDataValue('start') },
      employeeId: this.employeeId,
    }
  });
  let initialState = { taxFederal: 0, taxSocial:0, taxState:0, pay:0, gross:0 };
  const finalInfo = allStubs.reduce((acc, cur) => {
      for (let key in acc){
        acc[key] += +cur[key];
      }
      return acc;
    }, initialState);
  for (let key in finalInfo){
    finalInfo[key] = Number(finalInfo[key]).toFixed(2);
  }
  return finalInfo;
};

module.exports = Stub;
