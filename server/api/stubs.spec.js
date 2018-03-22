/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Bill = db.model('bill')

describe('Bill routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/bills/', () => {
    const billTotal = '123.45'

    beforeEach(() => {
      return Bill.create({
        total: billTotal,
        date: '2018-01-02'
      })
    })

    it('GET /api/bills', () => {
      return request(app)
        .get('/api/bills')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(1);
          expect(res.body[0].total).to.be.equal(billTotal);
        })
        .catch(err => console.log(err));
    })
  })
})
