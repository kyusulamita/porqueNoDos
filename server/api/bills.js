const router = require('express').Router();
const { Bill, Vendor } = require('../db/models');


router.get('/', (req, res, next) => {
  Bill.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [ { model: Vendor, attributes: ['name', 'id'] }],
  })
    .then(bills => res.json(bills))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Bill.create(req.body)
    .then(createdBill => res.json(createdBill))
    .catch(next);
})

router.get('/:billId', (req, res, next) => {
  Bill.findById(req.params.billId, { include: [ Vendor ]})
    .then(billWithVendor => res.json(billWithVendor))
    .catch(next);
})

router.put('/:billId', (req, res, next) => {
  Bill.update(req.body, {
    where: { id: req.params.billId },
    returning: true,
  })
    .then(({nums, rows}) => res.json(rows[0]))
    .catch(next);
})

router.delete('/:billId', (req, res, next) => {
  Bill.delete({
    where: { id: req.params.billId }
  })
    .then((() => res.send(`Succesfully deleted bill ${req.params.billId}`)))
    .catch(next);
})

module.exports = router;
