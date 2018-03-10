const router = require('express').Router();
const { Stub, Employee } = require('../db/models');


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
  res.json(stubs);
})

router.get('/:stubId', async (req, res, next) => {
  const stubWithEmployee = await Stub.findById(req.params.stubId, {
    include: [ Employee ],
  }).catch(next);
  res.json(stubWithEmployee);
})

router.put('/:stubId', async(req, res, next) => {
  const updatedStub = await Stub.update(req.body, {
    include: [ Employee ],
    where: { id: req.params.stubId },
    returning: true,
  }).catch(next);
  res.json(updatedStub);
})

router.delete('/:stubId', async (req, res, next) => {
  const stubsDestroyed = await Stub.destroy({
    where: { id: req.params.stubId }
  }).catch(next);
  res.json(stubsDestroyed);
})
module.exports = router;
