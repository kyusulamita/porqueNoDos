const router = require('express').Router();
const { Bill, Vendor } = require('../db/models');


router.get('/', async (req, res, next) => {
  const bills = await Bill.findAll({
    include: [ { model: Vendor, attributes: ['name', 'id'] }],
  })
  .catch(next);
  res.json(bills);
})

router.post('/', async (req, res, next) => {
  const createdBill = await Bill.create(req.body)
    .catch(next);
  res.json(createdBill)
})

router.get('/:billId', async (req, res, next) => {
 const billWithVendor = await Bill.findById(req.params.billId, { include: [ Vendor ]})
    .catch(next);
  res.json(billWithVendor)
})


router.put('/:billId', async (req, res, next) => {
  const [numOfBills, billsAffected ] = await Bill.update(req.body, {
    where: { id: req.params.billId },
    returning: true,
  })
    .catch(next);
   res.json(billsAffected[0]);
})

router.delete('/:billId', (req, res, next) => {
  const billsDeleted = Bill.destroy({
    where: { id: req.params.billId }
  }).catch(next);
  res.send(`Succesfully deleted ${billsDeleted.length} bills => ${req.params.billId}`)
})

module.exports = router;
