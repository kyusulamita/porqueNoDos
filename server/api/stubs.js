const router = require('express').Router();
const { Stub, Employee } = require('../db/models');

router.param('stubId', async (req, res, next, id) => {
  const paystub = await Stub.findById(id, {
    include:[ Employee ],
  }).catch(next);
  if (!paystub){
    const err = Error('Employee not found');
    err.status = 404;
    throw err;
  }
  req.paystub = paystub;
  next()
})

router.get('/', async (req, res, next) => {
  const stubs = await Stub.findAll({
    include: { model: Employee, attributes: ['firstName', 'lastName', 'id']}
  }).catch(next);
  res.json(stubs);
})

router.post('/', async (req, res, next) => {
  const newStub = await Stub.create(req.body, {
    include: { model: Employee, attributes: ['firstName', 'lastName', 'id']}
  }).catch(next);
  res.json(newStub);
})

router.get('/:stubId', async (req, res, next) => {
  res.json(req.paystub);
})

router.put('/:stubId', async(req, res, next) => {
  const updatedStub = await req.paystub.update(req.body).catch(next);
  const reloadedStub = await updatedStub.reload({include: [ Employee ]})
  res.json(reloadedStub);
})

router.delete('/:stubId', async (req, res, next) => {
  const arr = await req.paystub.destroy().catch(next);
  res.json(`Destroyed ${arr}`);
})
module.exports = router;
