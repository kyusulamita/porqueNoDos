const router = require('express').Router();
const { Bill, Vendor } = require('../db/models');


router.get('/', async (req, res, next) => {
  const vendors = await Vendor.findAll({
    include: [ model: Bill, attributes: ['total', 'date']]
  }).catch(next);
  res.json(vendors);
})

router.post('/', async (req, res, next) => {
  const newVendor = Vendor.create(req.body, {
    include: [ model: Bill, attributes: ['total', 'date']]
  }).catch(next);
  res.json(newVendor);
})

router.get('/:vendorId', async (req, res, next) => {
  const vendorWithBills = await Vendor.findById(req.params.vendorId, {
    include: [Bill]
  }).catch(next);
  res.json(vendorWithBills);
})

router.put('/:vendorId', async (req, res, next) => {
  const updatedVendor = await Vendor.update(req.body, {
    where: { id: req.params.vendorId },
    returning: true,
  }).catch(next);
  res.json(updatedVendor);
})

router.delete('/:vendorId', async (req, res, next) => {
  const vendorsDeleted = await Vendor.destroy({ where: { id: req.params.vendorId}}).catch(next);
  res.json(vendorsDeleted);
})

module.exports = router;
