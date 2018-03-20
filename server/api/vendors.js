const router = require('express').Router();
const { Bill, Vendor } = require('../db/models');
const { isLoggedIn, isAdmin, isAuthorized, adminOrSelf } = require('./utilFuncs');

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

router.get('/', isAuthorized ,async (req, res, next) => {
  const vendors = await Vendor.findAll({
    attributes: ['name', 'id'],
    include: { model: Bill, attributes: ['total', 'date']}
  }).catch(next);
  res.json(vendors);
})

router.post('/', isAuthorized,async (req, res, next) => {
  const newVendor = await Vendor.create(req.body, {
    include: { model: Bill, attributes: ['total', 'date']}
  }).catch(next);
  res.json(newVendor);
})

router.get('/:vendorId', isAuthorized ,async (req, res, next) => {
  const vendorWithBills = req.vendor;
  res.json(vendorWithBills);
})

router.put('/:vendorId', isAuthorized, async (req, res, next) => {
  const updatedVendor = await req.vendor(req.body).catch(next);
  const reloadedVendor = await updatedVendor.reload({ include: [ Bill ]})
  res.status(200).json(updatedVendor);
})

router.delete('/:vendorId', isAuthorized, async (req, res, next) => {
  const vendorsDeleted = await req.vendor.destroy().catch(next);
  res.json(vendorsDeleted);
})

module.exports = router;
