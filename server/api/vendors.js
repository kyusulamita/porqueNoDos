const router = require('express').Router();
const { Bill, Vendor } = require('../db/models');


router.param('vendorId', async (req, res, next, id) => {
  const vendor = await Vendor.findById(id, {include: [ Bill ]}).catch(next)
  if (!vendor) {
    const err = Error('User not found');
    err.status = 404;
    throw err;
  }
  req.vendor = vendor;
  next();
  return null;
})

router.get('/', async (req, res, next) => {
  const vendors = await Vendor.findAll({
    attributes: ['name', 'id'],
    include: { model: Bill, attributes: ['total', 'date']}
  }).catch(next);
  res.json(vendors);
})

router.post('/', async (req, res, next) => {
  const newVendor = Vendor.create(req.body, {
    include: { model: Bill, attributes: ['total', 'date']}
  }).catch(next);
  res.json(newVendor);
})

router.get('/:vendorId', async (req, res, next) => {
  const vendorWithBills = req.vendor;
  res.json(vendorWithBills);
})

router.put('/:vendorId', async (req, res, next) => {
  const updatedVendor = await req.vendor(req.body).catch(next);
  res.status(200).json(updatedVendor);
})

router.delete('/:vendorId', async (req, res, next) => {
  const vendorsDeleted = await req.vendor.destroy().catch(next);
  res.json(vendorsDeleted);
})

module.exports = router;
